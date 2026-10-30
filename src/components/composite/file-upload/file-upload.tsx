import * as React from 'react';
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ProgressBar } from '@/components/composite/progress-bar';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress?: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  file?: File;
}

export interface FileUploadProps {
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  accept?: string;
  maxSize?: number; // In bytes
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value = [],
  onChange,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  multiple = true,
  disabled = false,
  className,
  title = 'Kéo thả tệp tin vào đây hoặc bấm để chọn',
  description,
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const effectiveDescription =
    description || `Hỗ trợ ${accept || 'tất cả định dạng'}, dung lượng tối đa ${formatFileSize(maxSize)}`;

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0 || disabled) return;

    const newFiles: UploadedFile[] = [];
    const currentCount = value.length;

    for (let i = 0; i < incomingFiles.length; i++) {
      if (currentCount + newFiles.length >= maxFiles) break;

      const f = incomingFiles[i];
      const isTooLarge = f.size > maxSize;

      newFiles.push({
        id: `${f.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: f.name,
        size: f.size,
        progress: isTooLarge ? 0 : 100,
        status: isTooLarge ? 'error' : 'completed',
        errorMessage: isTooLarge ? `Vượt quá giới hạn ${formatFileSize(maxSize)}` : undefined,
        file: f,
      });
    }

    const updated = [...value, ...newFiles];
    onChange?.(updated);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = value.filter((f) => f.id !== id);
    onChange?.(updated);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className={cn('space-y-3 w-full', className)}>
      {/* Dropzone Container */}
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer select-none group',
          isDragOver
            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-[1.01]'
            : 'border-border bg-card/40 hover:border-primary/60 hover:bg-card/70',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            handleFiles(e.target.files);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className="hidden"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/80 text-primary border border-border group-hover:scale-110 group-hover:border-primary/40 transition-all duration-200 shadow-sm">
          <UploadCloud className="h-6 w-6" />
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </p>
          <p className="text-xs text-muted-foreground">{effectiveDescription}</p>
        </div>
      </div>

      {/* File List */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file) => (
            <div
              key={file.id}
              className={cn(
                'flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border bg-card text-xs transition-colors',
                file.status === 'error' && 'border-destructive/40 bg-destructive/5'
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary',
                    file.status === 'completed' && 'text-primary',
                    file.status === 'error' && 'text-destructive border-destructive/30'
                  )}
                >
                  <File className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground truncate">{file.name}</span>
                    <span className="text-muted-foreground shrink-0 font-mono text-[11px]">
                      {formatFileSize(file.size)}
                    </span>
                  </div>

                  {file.status === 'uploading' && file.progress !== undefined && (
                    <div className="mt-1.5">
                      <ProgressBar value={file.progress} size="sm" variant="primary" />
                    </div>
                  )}

                  {file.status === 'error' && file.errorMessage && (
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-destructive">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span className="truncate">{file.errorMessage}</span>
                    </div>
                  )}

                  {file.status === 'completed' && (
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-400">
                      <CheckCircle2 className="h-3 w-3 shrink-0" />
                      <span>Đã sẵn sàng</span>
                    </div>
                  )}
                </div>
              </div>

              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => handleRemove(file.id, e)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0 cursor-pointer"
                  title="Xóa tệp"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';
