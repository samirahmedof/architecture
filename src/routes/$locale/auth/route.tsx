import { createFileRoute } from '@tanstack/react-router';
import AuthLayout from '../../../layouts/auth/auth.layout.tsx';

export const Route = createFileRoute('/$locale/auth')({
  component: AuthLayout,
});
