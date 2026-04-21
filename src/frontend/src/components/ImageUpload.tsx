import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

interface ImageUploadProps {
  onUploadComplete: (imageId: string, previewUrl: string) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 10;

export function ImageUpload({ onUploadComplete, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (f: File) => {
      setError(null);
      if (!ACCEPTED_TYPES.includes(f.type)) {
        setError("Unsupported file type. Please use JPG, PNG, WEBP, or GIF.");
        return;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
      setUploadDone(false);
      setUploading(true);
      setProgress(0);

      // Simulate chunked upload progress, then read as data URL for AI analysis
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 85) {
            clearInterval(interval);
            return 85;
          }
          return p + Math.floor(Math.random() * 15) + 5;
        });
      }, 120);

      const reader = new FileReader();
      reader.onload = () => {
        clearInterval(interval);
        setProgress(100);
        const dataUrl = reader.result as string;
        setUploading(false);
        setUploadDone(true);
        onUploadComplete(dataUrl, url);
      };
      reader.onerror = () => {
        clearInterval(interval);
        setUploading(false);
        setError("Failed to read image file.");
      };
      reader.readAsDataURL(f);
    },
    [onUploadComplete],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) processFile(dropped);
    },
    [processFile],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleClear = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadDone(false);
    setProgress(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            data-ocid="image_upload.dropzone"
            className={cn(
              "relative rounded-xl border-2 border-dashed transition-smooth cursor-pointer overflow-hidden",
              "flex flex-col items-center justify-center gap-3 p-10 min-h-[200px]",
              isDragging
                ? "border-primary bg-primary/5 glow-cyan"
                : "border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5",
              disabled && "opacity-50 pointer-events-none",
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* Animated background grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <motion.div
              animate={{ scale: isDragging ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center"
            >
              <ImageIcon size={28} className="text-secondary" />
            </motion.div>
            <div className="text-center relative z-10">
              <p className="font-display font-semibold text-foreground text-base">
                {isDragging
                  ? "Drop image here"
                  : "Drop image here or click to browse"}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                JPG, PNG, WEBP, GIF — up to {MAX_SIZE_MB}MB
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {["JPG", "PNG", "WEBP", "GIF"].map((ext) => (
                <Badge
                  key={ext}
                  variant="outline"
                  className="text-xs font-mono text-muted-foreground border-border"
                >
                  {ext}
                </Badge>
              ))}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="hidden"
              onChange={handleChange}
              disabled={disabled}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="surface-card rounded-xl overflow-hidden"
            data-ocid="image_upload.preview"
          >
            <div className="relative">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="w-full max-h-64 object-contain bg-background/60"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 bg-card/80 backdrop-blur-sm border border-border hover:bg-destructive/20 hover:text-destructive"
                onClick={handleClear}
                data-ocid="image_upload.clear_button"
              >
                <X size={14} />
              </Button>
              {/* Upload overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <Loader2 size={28} className="animate-spin text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    Uploading...
                  </p>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Upload
                    size={14}
                    className="text-muted-foreground shrink-0"
                  />
                  <span className="text-sm text-foreground truncate">
                    {file.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              {uploading && (
                <motion.div className="space-y-1">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {progress}%
                  </p>
                </motion.div>
              )}
              {uploadDone && (
                <div className="flex items-center gap-1.5 text-chart-1">
                  <CheckCircle2 size={13} />
                  <span className="text-xs font-medium">Ready to analyze</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive flex items-center gap-1.5"
          data-ocid="image_upload.error_state"
        >
          <X size={13} />
          {error}
        </motion.p>
      )}
    </div>
  );
}
