import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface VideoAnalysisResult {
    overallVerdict: string;
    processingStatus: string;
    suspiciousEdits: Array<string>;
    confidence: bigint;
    editDetectionScore: bigint;
}
export interface ImageAnalysisResult {
    verdict: string;
    authenticityScore: bigint;
    manipulationIndicators: Array<string>;
    deepfakeScore: bigint;
    confidence: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type AnalysisKind = {
    __kind__: "video";
    video: {
        videoBlob: ExternalBlob;
    };
} | {
    __kind__: "text";
    text: {
        snippet: string;
    };
} | {
    __kind__: "image";
    image: {
        imageBlob: ExternalBlob;
    };
};
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface HistoryItem {
    id: bigint;
    userId: UserId;
    kind: AnalysisKind;
    credibilityScore: bigint;
    language: string;
    summary: string;
    timestamp: Timestamp;
    classification: AnalysisClassification;
}
export interface AnalysisResult {
    biasIndicator: string;
    keyPhrases: Array<string>;
    explanation: string;
    emotionalScore: bigint;
    credibilityScore: bigint;
    eli15: string;
    confidence: bigint;
    classification: AnalysisClassification;
}
export enum AnalysisClassification {
    misleading = "misleading",
    satire = "satire",
    fake = "fake",
    genuine = "genuine"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    analyzeImage(imageId: string, language: string): Promise<ImageAnalysisResult>;
    analyzeText(text: string, language: string): Promise<AnalysisResult>;
    analyzeVideo(videoId: string, language: string): Promise<VideoAnalysisResult>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAnalysisHistory(): Promise<Array<HistoryItem>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    setApiKey(apiKey: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
