import type { backendInterface, AnalysisResult, ImageAnalysisResult, VideoAnalysisResult, HistoryItem, UserRole, TransformationOutput, _ImmutableObjectStorageRefillInformation, _ImmutableObjectStorageRefillResult, _ImmutableObjectStorageCreateCertificateResult } from "../backend";
import { AnalysisClassification } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>): Promise<Array<boolean>> => [],
  _immutableObjectStorageBlobsToDelete: async (): Promise<Array<Uint8Array>> => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>): Promise<void> => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({ method: "PUT", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async (): Promise<void> => undefined,
  _initializeAccessControl: async (): Promise<void> => undefined,

  analyzeText: async (_text: string, _language: string): Promise<AnalysisResult> => ({
    biasIndicator: "Moderate political bias detected",
    keyPhrases: ["potential misinformation", "verified statements", "misleading content", "credibility analysis"],
    explanation: "This content contains elements of potential misinformation mixed with verified statements. The text uses emotionally charged language to manipulate readers while presenting some factual information.",
    emotionalScore: BigInt(32),
    credibilityScore: BigInt(84),
    eli15: "This article is like a sandwich with some good bread but a sneaky filling — parts of it are true, but some bits are trying to trick you into feeling upset so you share it without thinking!",
    confidence: BigInt(91),
    classification: AnalysisClassification.misleading,
  }),

  analyzeImage: async (_imageId: string, _language: string): Promise<ImageAnalysisResult> => ({
    verdict: "Potentially Manipulated",
    authenticityScore: BigInt(62),
    manipulationIndicators: ["Inconsistent lighting in background", "Metadata timestamp mismatch", "Edge artifact detection positive"],
    deepfakeScore: BigInt(38),
    confidence: BigInt(78),
  }),

  analyzeVideo: async (_videoId: string, _language: string): Promise<VideoAnalysisResult> => ({
    overallVerdict: "Suspicious Content Detected",
    processingStatus: "complete",
    suspiciousEdits: ["Jump cut at 0:23 suggesting removed context", "Audio-video sync issues at 0:45", "Color grading inconsistency"],
    confidence: BigInt(71),
    editDetectionScore: BigInt(55),
  }),

  assignCallerUserRole: async (_user: Principal, _role: UserRole): Promise<void> => undefined,

  getAnalysisHistory: async (): Promise<Array<HistoryItem>> => [
    {
      id: BigInt(1),
      userId: { toText: () => "user-1" } as unknown as Principal,
      kind: { __kind__: "text", text: { snippet: "Breaking news: Scientists discover new breakthrough..." } },
      credibilityScore: BigInt(84),
      language: "en",
      summary: "Mixed credibility — partially verified claims",
      timestamp: BigInt(Date.now() * 1_000_000 - 3600 * 1_000_000_000),
      classification: AnalysisClassification.misleading,
    },
    {
      id: BigInt(2),
      userId: { toText: () => "user-1" } as unknown as Principal,
      kind: { __kind__: "text", text: { snippet: "New vaccine research shows promising results..." } },
      credibilityScore: BigInt(96),
      language: "en",
      summary: "High credibility — sourced from peer-reviewed study",
      timestamp: BigInt(Date.now() * 1_000_000 - 7200 * 1_000_000_000),
      classification: AnalysisClassification.genuine,
    },
    {
      id: BigInt(3),
      userId: { toText: () => "user-1" } as unknown as Principal,
      kind: { __kind__: "text", text: { snippet: "Viral claim about government conspiracy..." } },
      credibilityScore: BigInt(12),
      language: "en",
      summary: "Very low credibility — unverified conspiracy claims",
      timestamp: BigInt(Date.now() * 1_000_000 - 86400 * 1_000_000_000),
      classification: AnalysisClassification.fake,
    },
  ],

  getCallerUserRole: async (): Promise<UserRole> => "user" as UserRole,

  isCallerAdmin: async (): Promise<boolean> => false,

  setApiKey: async (_apiKey: string): Promise<void> => undefined,

  transform: async (_input: unknown): Promise<TransformationOutput> => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
};
