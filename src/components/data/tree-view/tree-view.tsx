import * as React from 'react';
import { ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  badge?: React.ReactNode;
}

export interface TreeViewProps {
  data: TreeNode[];
  selectedId?: string;
  onSelectNode?: (node: TreeNode) => void;
  defaultExpandedIds?: string[];
  className?: string;
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  selectedId?: string;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  onSelectNode?: (node: TreeNode) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  selectedId,
  expandedIds,
  toggleExpand,
  onSelectNode,
}) => {
  const isBranch = Boolean(node.children && node.children.length > 0);
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.disabled) return;
    if (isBranch) {
      toggleExpand(node.id);
    }
    onSelectNode?.(node);
  };

  const defaultIcon = isBranch ? (
    isExpanded ? (
      <FolderOpen className="h-4 w-4 text-primary shrink-0" />
    ) : (
      <Folder className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
    )
  ) : (
    <FileText className="h-4 w-4 text-muted-foreground/80 shrink-0" />
  );

  return (
    <div className="select-none">
      <div
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={isBranch ? isExpanded : undefined}
        onClick={handleClick}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        className={cn(
          'group relative flex items-center justify-between rounded-md py-1.5 pr-2.5 text-xs font-medium transition-colors cursor-pointer',
          isSelected
            ? 'bg-primary/15 text-primary font-semibold'
            : 'text-foreground hover:bg-secondary/80',
          node.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
        )}
      >
        <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
          {/* Expand chevron button */}
          {isBranch ? (
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="flex h-4 w-4 items-center justify-center rounded hover:bg-muted text-muted-foreground transition-transform cursor-pointer"
            >
              <ChevronRight
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isExpanded && 'rotate-90 text-foreground'
                )}
              />
            </span>
          ) : (
            <span className="w-4 shrink-0" />
          )}

          {/* Node icon */}
          <span className="shrink-0">{node.icon || defaultIcon}</span>

          {/* Node label */}
          <span className="truncate">{node.label}</span>
        </div>

        {node.badge && <span className="ml-2 shrink-0">{node.badge}</span>}
      </div>

      {/* Children branches */}
      {isBranch && isExpanded && (
        <div className="relative pl-1">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
              onSelectNode={onSelectNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  selectedId,
  onSelectNode,
  defaultExpandedIds = [],
  className,
}) => {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div role="tree" className={cn('space-y-0.5 font-sans', className)}>
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          level={0}
          selectedId={selectedId}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onSelectNode={onSelectNode}
        />
      ))}
    </div>
  );
};

TreeView.displayName = 'TreeView';
