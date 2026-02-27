import { HttpResponse, http } from 'msw';

export const handlers = [
  // Nümunə: /api/health sorğusuna həmişə OK qaytar
  http.get('*/api/health', () => {
    return HttpResponse.json({ status: 'ok' });
  }),
];
