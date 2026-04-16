import { AuthLayout } from '@layouts/auth/auth.layout.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/auth')({
  component: AuthLayout,
});
