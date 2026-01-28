import type { ReactNode } from 'react';

export type ColumnAlign = 'left' | 'center' | 'right';

export type ColumnType<T> = {
  key: string;
  title: ReactNode;
  dataIndex?: keyof T;
  width?: string | number;
  align?: ColumnAlign;
  render?: (record: T, index: number) => ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
  rowKey: (record: T) => string | number;
  isLoading?: boolean;
  onRowClick?: (record: T) => void;
  emptyText?: string;
  className?: string;
};
