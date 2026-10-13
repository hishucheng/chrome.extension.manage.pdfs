// Dropzone component: handles file picker and OS drag-and-drop ingestion.

import { useRef, useState, useCallback, type DragEvent, type ChangeEvent } from 'react';

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export function Dropzone({ onFiles, disabled = false }: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFiles(files);
    },
    [disabled, onFiles],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) onFiles(files);
      // Reset so the same file can be re-selected after removal.
      if (inputRef.current) inputRef.current.value = '';
    },
    [onFiles],
  );

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const borderClass = isDragOver
    ? 'border-blue-400 bg-blue-500/10'
    : 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/40';

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="文件导入区：拖入 PDF、图片或文本文件"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className={[
        'w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 text-center cursor-pointer transition-colors select-none',
        borderClass,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]
        .join(' ')
        .trim()}
    >
      {/* Upload icon */}
      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center pointer-events-none">
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0L8 12m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
          />
        </svg>
      </div>

      <p className="text-sm text-gray-300 pointer-events-none">
        {isDragOver ? '松开鼠标，导入文件' : '将 PDF、图片或文本文件拖到此处'}
      </p>
      <p className="text-xs text-gray-500 pointer-events-none">或单击选择文件</p>
      <p className="text-xs text-gray-600 pointer-events-none">
        支持 PDF、PNG、JPEG、WebP、GIF、TXT &mdash; 每个文件不超过 200 MB
      </p>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,application/pdf,image/png,image/jpeg,image/webp,image/gif,text/plain"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleChange}
      />
    </div>
  );
}
