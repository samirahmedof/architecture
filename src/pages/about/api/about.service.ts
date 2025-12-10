import { api } from '@core/http';
import { queryOptions } from '@tanstack/react-query';
import * as v from 'valibot';
import { type AboutModel, AboutModelSchema } from '../models/about.schema';

// 1. Query Keys
// Niyə edirik? Cache-i idarə etmək (invalidate/refetch) üçün unikal açar lazımdır.
export const aboutKeys = {
	details: ['about', 'details'] as const,
};

// 2. Fetch Function
// Niyə edirik? API-yə sorğu atıb, gələn datanı Valibot ilə "süzgəcdən" keçirmək üçün.
export const fetchAboutInfo = async (): Promise<AboutModel> => {
	// /posts/1 endpoint-i bizə "About" datasını simulyasiya edəcək
	const { data } = await api.get('/posts/1');

	// Parse: Data sxemə uyğundursa çevirir, deyilsə XƏTA atır (Error Boundary tutacaq)
	return v.parse(AboutModelSchema, data);
};

// 3. Query Options
// Niyə edirik? Bu obyekti həm Router-in loader-ində, həm də Komponentdə istifadə etmək üçün.
// "Single Source of Truth" prinsipi.
export const aboutQueryOptions = queryOptions({
	queryKey: aboutKeys.details,
	queryFn: fetchAboutInfo,
});
