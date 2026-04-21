import { Button } from "@/components/ui/button";
import { AlertCircle, Film, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ExternalBlob } from "../backend";

interface VideoUploadProps {
  onUploadComplete: (videoId: string) => void;
  disabled?: boolean;
}

const ACCEPTED = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_SIZE = 200 * 1024 * 1024; // 200 MB

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function VideoUpload({ onUploadComplete, disabled }: VideoUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED.includes(f.type)) {
      setError("Unsupported format. Please use MP4, WebM, or MOV.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("File too large. Maximum size is 200 MB.");
      return;
    }
    setFile(f);
    setUploadProgress(0);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile],
  );

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      // Use the ExternalBlob's direct URL as the stable video identifier
      const videoId = blob.getDirectURL();
      onUploadComplete(videoId);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const extLabel = (type: string) => {
    const map: Record<string, string> = {
      "video/mp4": "MP4",
      "video/webm": "WebM",
      "video/quicktime": "MOV",
    };
    return map[type] ?? type.split("/")[1].toUpperCase();
  };

  return (
    <div className="space-y-4" data-ocid="video_upload.dropzone">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
              relative cursor-pointer rounded-2xl border-2 border-dashed p-12
              flex flex-col items-center gap-4 transition-smooth select-none
              ${
                isDragging
                  ? "border-primary bg-primary/10 glow-accent"
                  : "border-border hover:border-primary/60 hover:bg-primary/5"
              }
            `}
          >
            <motion.div
              animate={{ y: isDragging ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-2xl bg-chart-5/15 border border-chart-5/30 flex items-center justify-center"
            >
              <Film size={28} className="text-chart-5" />
            </motion.div>
            <div className="text-center">
              <p className="font-display font-semibold text-foreground">
                Drop your video here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                MP4, WebM, or MOV · Max 200 MB
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/40 border border-border">
              <Upload size={14} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Browse files
              </span>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED.join(",")}
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
              data-ocid="video_upload.input"
            />
          </motion.div>
        ) : (
          <motion.div
            key="file-info"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-border bg-card p-5 space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-5/15 border border-chart-5/30 flex items-center justify-center flex-shrink-0">
                <Film size={22} className="text-chart-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {extLabel(file.type)} · {formatBytes(file.size)}
                </p>
              </div>
              <button
                onClick={clearFile}
                disabled={isUploading}
                className="w-8 h-8 rounded-lg border border-border hover:bg-destructive/15 hover:border-destructive/40 flex items-center justify-center transition-smooth disabled:opacity-40"
                type="button"
                aria-label="Remove file"
                data-ocid="video_upload.close_button"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading video…</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-chart-5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30"
          data-ocid="video_upload.error_state"
        >
          <AlertCircle size={14} className="text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </motion.div>
      )}

      {file && !isUploading && (
        <Button
          onClick={handleUpload}
          disabled={disabled}
          className="w-full h-11 font-semibold bg-chart-5 hover:bg-chart-5/90 text-background"
          data-ocid="video_upload.upload_button"
        >
          <Upload size={16} className="mr-2" />
          Upload &amp; Analyze
        </Button>
      )}
    </div>
  );
}
