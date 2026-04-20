import { NAMESPACES } from '@shared/config/i18n.config.ts';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import s from './table.module.css';
import type { TableProps } from './table.types.ts';

export const Table = <T extends object>({
  data,
  columns,
  rowKey,
  isLoading,
  onRowClick,
  emptyText,
  className,
}: TableProps<T>) => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const fallbackEmpty = emptyText ?? t('table.empty');
  const isEmpty = !isLoading && (!data || data.length === 0);
  return (
    <div className={clsx(s.wrapper, className)}>
      <table className={clsx(s.table, isLoading && s.loading)}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width, textAlign: col.align || 'left' }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        {!isEmpty && (
          <tbody>
            {data.map((row, index) => {
              const key = rowKey(row);

              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(row)}
                  className={clsx(onRowClick && s.clickable)}
                >
                  {columns.map((col) => {
                    let cellContent: ReactNode;

                    if (col.render) {
                      cellContent = col.render(row, index);
                    } else if (col.dataIndex) {
                      cellContent = row[col.dataIndex] as ReactNode;
                    } else {
                      cellContent = null;
                    }
                    return (
                      <td key={`${key}-${col.key}`} style={{ textAlign: col.align || 'left' }}>
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      {isEmpty && <div className={s.empty}>{fallbackEmpty}</div>}
    </div>
  );
};
