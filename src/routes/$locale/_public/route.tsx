// src/routes/$locale/_public/route.tsx
import PublicLayout from '@app/layouts/public/public.layout.tsx';
import { createFileRoute, redirect } from '@tanstack/react-router';

const isAuth = true; // TODO: real auth logic

export const Route = createFileRoute('/$locale/_public')({
  component: PublicLayout,
  beforeLoad: ({ location, params }) => {
    if (!isAuth) {
      throw redirect({
        to: '/$locale/auth/login',
        params: { locale: params.locale },
        search: { redirect: location.href },
      });
    }
  },
});
