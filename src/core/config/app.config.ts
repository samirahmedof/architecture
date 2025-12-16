export const APP = {
  NAME: 'Architecture',

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  DATE: {
    FORMAT_DISPLAY: 'DD.MM.YYYY', // 25.12.2025
    FORMAT_API: 'YYYY-MM-DD', // 2025-12-25
    DATETIME_DISPLAY: 'DD.MM.YYYY HH:mm',
  },

  UPLOAD: {
    MAX_SIZE_MB: 5,
    ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;
