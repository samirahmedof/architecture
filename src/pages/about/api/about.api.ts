import { queryOptions } from '@tanstack/react-query';
import {fetchAboutInfo} from '@pages/about/api/about.service.ts'; // Query Options Helper


export const aboutKeys = {
    all: ['about'] as const,
    details: () => [...aboutKeys.all, 'details'] as const,
};


// Query Options (Hook əvəzinə bunu istifadə etmək TanStack Router üçün daha idealdır)
export const aboutQueryOptions = queryOptions({
    queryKey: aboutKeys.details(),
    queryFn: fetchAboutInfo,
});