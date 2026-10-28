import * as React from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  prefix?: string;
  variant?: 'inline' | 'block' | 'bordered';
  className?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language,
  showLineNumbers = false,
  prefix = '$',
  variant = 'block',
  className,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'inline') {
    return (
      <span
        onClick={handleCopy}
        title="Nhấn để sao chép"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-foreground border border-border cursor-pointer hover:border-primary/60 transition-colors',
          className
        )}
      >
        <code className="truncate max-w-xs">{code}</code>
        {copied ? (
          <Check className="h-3 w-3 text-emerald-400 shrink-0" />
        ) : (
          <Copy className="h-3 w-3 text-muted-foreground shrink-0 opacity-70" />
        )}
      </span>
    );
  }

  const lines = code.trim().split('\n');

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-border bg-card/80 font-mono text-xs overflow-hidden shadow-sm backdrop-blur-xs',
        variant === 'bordered' && 'border-primary/30',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/80 bg-secondary/50 px-3.5 py-2 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          {language && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {language}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-sans font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-all cursor-pointer border border-transparent hover:border-border"
          aria-label="Sao chép mã lệnh"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Đã chép</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 opacity-70" />
              <span>Sao chép</span>
            </>
          )}
        </button>
      </div>

      <div className="p-3.5 overflow-x-auto text-foreground leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-3">
            {showLineNumbers && (
              <span className="w-5 select-none text-right text-muted-foreground/50">
                {idx + 1}
              </span>
            )}
            {!showLineNumbers && prefix && (
              <span className="select-none text-primary/70">{prefix}</span>
            )}
            <code className="flex-1 whitespace-pre">{line}</code>
          </div>
        ))}
      </div>
    </div>
  );
};
