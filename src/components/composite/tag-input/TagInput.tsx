import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Badge } from '../../primitives/badge';

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
}

export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      suggestions = [],
      placeholder = 'Thêm thẻ... (Nhấn Enter hoặc dấu phẩy)',
      maxTags,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue);
    const [inputVal, setInputVal] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    const tags = value ?? internalTags;

    const addTag = (tagToAdd: string) => {
      const clean = tagToAdd.trim();
      if (!clean) return;
      if (tags.includes(clean)) {
        setInputVal('');
        return;
      }
      if (maxTags && tags.length >= maxTags) return;

      const nextTags = [...tags, clean];
      if (!value) setInternalTags(nextTags);
      onChange?.(nextTags);
      setInputVal('');
    };

    const removeTag = (tagToRemove: string) => {
      const nextTags = tags.filter((t) => t !== tagToRemove);
      if (!value) setInternalTags(nextTags);
      onChange?.(nextTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(inputVal);
      } else if (e.key === 'Backspace' && !inputVal && tags.length > 0) {
        removeTag(tags[tags.length - 1]);
      }
    };

    const filteredSuggestions = React.useMemo(() => {
      if (!inputVal.trim()) return [];
      const lower = inputVal.toLowerCase();
      return suggestions.filter(
        (s) => s.toLowerCase().includes(lower) && !tags.includes(s)
      );
    }, [inputVal, suggestions, tags]);

    return (
      <div className="relative w-full">
        <div
          className={cn(
            'flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 py-1.5 text-sm shadow-xs transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent',
            disabled && 'cursor-not-allowed opacity-50 bg-muted/40',
            className
          )}
        >
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 pl-2 pr-1 py-0.5 text-xs font-mono font-normal bg-secondary border border-border"
            >
              <span>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label={`Xóa thẻ ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}

          <input
            ref={ref}
            type="text"
            disabled={disabled || (Boolean(maxTags) && tags.length >= (maxTags || 0))}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed"
          />
        </div>

        {isFocused && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-lg border border-border bg-popover p-1 shadow-lg">
            <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase font-mono">
              Gợi ý có sẵn
            </div>
            {filteredSuggestions.map((sug) => (
              <button
                key={sug}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(sug);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs hover:bg-accent text-foreground font-mono flex items-center justify-between"
              >
                <span>{sug}</span>
                <span className="text-[10px] text-muted-foreground">Nhấn để thêm</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';
