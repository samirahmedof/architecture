import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ValiError } from 'valibot';

type ServerError = {
  message?: string;
  errors?: Record<string, string[]>;
};
const handleGlobalError = (error: unknown) => {
  // Valibot errors (status 200/201)
  if (error instanceof ValiError) {
    console.error('Validation Error:', error.issues);
    toast.error('Data Xətası: Serverdən gələn məlumat düzgün formatda deyil.');
    return;
  }

  // Axios (Server/Network) errors
  const axiosError = error as AxiosError<ServerError>;

  // 1. İnternet yoxdur və ya Server tamamilə ölüb
  if (!axiosError.response) {
    toast.error('Serverlə əlaqə yoxdur. İnternetinizi yoxlayın.');
    return;
  }

  const { status, data } = axiosError.response;
  const serverMessage = data?.message || 'Naməlum xəta baş verdi.';

  // 2. Statusa görə xüsusi mesajlar
  switch (status) {
    case 400:
      toast.error(`Səhv sorğu: ${serverMessage}`);
      break;

    case 403:
      toast.error('İcazəniz yoxdur (Forbidden).');
      break;

    case 404:
      toast.error('Axtarılan məlumat tapılmadı.');
      break;

    case 422:
      toast.warning('Zəhmət olmasa daxil etdiyiniz məlumatları yoxlayın.');
      break;

    case 500:
      toast.error('Server daxili xətası. Texniki dəstəklə əlaqə saxlayın.');
      break;

    default:
      toast.error(serverMessage);
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleGlobalError(error);
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;
      handleGlobalError(error);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});
