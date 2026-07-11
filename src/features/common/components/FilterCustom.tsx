import { useLingui } from '@lingui/react';
import { Filter, RotateCcw, Search, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface FilterOption {
  label: string;
  value: string;
}
export interface FilterField {
  key: string;
  label: string;
  options: FilterOption[];
}
interface FilterCustomProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  fields?: FilterField[];
  values?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onReset?: () => void;
  placeholder?: string;
  actions?: ReactNode;
}

export function FilterCustom({
  keyword,
  onKeywordChange,
  fields = [],
  values = {},
  onFilterChange,
  onReset,
  placeholder,
  actions,
}: FilterCustomProps) {
  const { i18n } = useLingui();
  const en = i18n.locale === 'en';
  const [expanded, setExpanded] = useState(false);
  const hasFilters = keyword.length > 0 || Object.values(values).some(Boolean);
  const activeCount = Object.values(values).filter(Boolean).length;

  return (
    <section className="rounded-xl border border-brand-border bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-52 flex-1 sm:max-w-sm">
          <span className="sr-only">{en ? 'Keyword' : 'Từ khóa'}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder={placeholder ?? (en ? 'Search...' : 'Tìm kiếm...')}
            className="h-8 rounded-lg border-0 bg-slate-50 pl-9 text-xs shadow-none focus:ring-1"
          />
          {keyword ? (
            <button
              type="button"
              onClick={() => onKeywordChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
              aria-label={en ? 'Clear search' : 'Xóa tìm kiếm'}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </label>
        {fields.length ? (
          <Button
            variant={expanded ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setExpanded((value) => !value)}
            className="h-8 rounded-lg px-2.5 text-xs"
          >
            <Filter className="h-3.5 w-3.5" />
            {en ? 'Filters' : 'Bộ lọc'}
            {activeCount ? <span className="rounded bg-white/20 px-1">{activeCount}</span> : null}
          </Button>
        ) : null}
        {hasFilters ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 rounded-lg px-2 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {en ? 'Reset' : 'Đặt lại'}
          </Button>
        ) : null}
        <div className="ml-auto">{actions}</div>
      </div>
      {expanded && fields.length ? (
        <div className="mt-2 flex flex-wrap gap-2 border-t border-slate-100 pt-2">
          {fields.map((field) => (
            <label key={field.key} className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">{field.label}</span>
              <select
                value={values[field.key] ?? ''}
                onChange={(event) => onFilterChange?.(field.key, event.target.value)}
                className="h-8 min-w-40 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700 outline-none focus:border-primary"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}
    </section>
  );
}
