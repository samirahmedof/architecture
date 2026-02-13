import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';

// MSW Serverini işə salırıq (API Mocking)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Hər testdən sonra təmizlik
afterEach(() => {
  cleanup(); // DOM-u təmizlə
  server.resetHandlers(); // Mock handler-ləri sıfırla
});

// Sonda serveri söndür
afterAll(() => server.close());
