import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AnalysisResult,
  HistoryItem,
  ImageAnalysisResult,
  VideoAnalysisResult,
} from "../types/analysis";

function useBackendActor() {
  return useActor(createActor);
}

/** Normalize backend errors to user-friendly messages */
function friendlyError(err: unknown): Error {
  const raw =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : "Unknown error";

  if (/authentication required|unauthorized|not authenticated/i.test(raw)) {
    return new Error("AUTH_REQUIRED");
  }
  if (/actor not ready/i.test(raw)) {
    return new Error(
      "Analysis service is starting up. Please try again in a moment.",
    );
  }
  return new Error("Analysis temporarily unavailable. Please try again.");
}

export function useAnalysisHistory() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<HistoryItem[]>({
    queryKey: ["analysisHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAnalysisHistory();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAnalyzeText() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<AnalysisResult, Error, { text: string; language: string }>(
    {
      mutationFn: async ({ text, language }) => {
        if (!actor) throw new Error("Actor not ready");
        return actor.analyzeText(text, language);
      },
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["analysisHistory"] });
      },
      onError: (err, _vars, _ctx) => {
        const friendly = friendlyError(err);
        err.message = friendly.message;
      },
    },
  );
}

const ANALYSIS_TIMEOUT_MS = 30_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT")), ms),
    ),
  ]);
}

export function useAnalyzeImage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    ImageAnalysisResult,
    Error,
    { imageId: string; language: string }
  >({
    mutationFn: async ({ imageId, language }) => {
      if (!actor) throw new Error("Actor not ready");
      try {
        return await withTimeout(
          actor.analyzeImage(imageId, language),
          ANALYSIS_TIMEOUT_MS,
        );
      } catch (err) {
        if (err instanceof Error && err.message === "TIMEOUT") {
          throw new Error("TIMEOUT");
        }
        throw err;
      }
    },
    // No retry — a timed-out call should not be retried automatically
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysisHistory"] });
    },
    onError: (err) => {
      if (err.message === "TIMEOUT") return; // keep TIMEOUT sentinel for page-level handling
      const friendly = friendlyError(err);
      err.message = friendly.message;
    },
  });
}

export function useAnalyzeVideo() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    VideoAnalysisResult,
    Error,
    { videoId: string; language: string }
  >({
    mutationFn: async ({ videoId, language }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.analyzeVideo(videoId, language);
    },
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysisHistory"] });
    },
    onError: (err) => {
      const friendly = friendlyError(err);
      err.message = friendly.message;
    },
  });
}

export function useSetApiKey() {
  const { actor } = useBackendActor();
  return useMutation<void, Error, string>({
    mutationFn: async (apiKey: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setApiKey(apiKey);
    },
    onError: (err) => {
      const friendly = friendlyError(err);
      err.message = friendly.message;
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}
