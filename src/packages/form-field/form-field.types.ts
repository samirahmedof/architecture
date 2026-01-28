import type { ReactNode } from 'react';

export type FormFieldProps = {
  name: string; // Inputun adı (Valibot schema-dakı ad)
  label?: string;
  children: ReactNode;
};
