import type { PostDto } from '../domain/post.dto.ts';

// Fixed test fixtures
export const mockPosts: PostDto[] = [
  { id: 1, userId: 1, title: 'Test Post', body: 'Test body' },
  { id: 2, userId: 1, title: 'Another Post', body: 'Another body' },
];
