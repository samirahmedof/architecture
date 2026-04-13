import type { PostDto } from './post.dto.ts';
import type { PostCreateModel, PostTypes, PostUpdateModel } from './post.types.ts';

export const toPostModel = (dto: PostDto): PostTypes => {
  return {
    id: dto.id,
    title: dto.title.toUpperCase(),
    description: dto.body,
    randNumber: dto.id % 3 === 0,
  };
};

export const toPostCreateModel = (data: PostCreateModel) => ({
  title: data.title,
  body: data.description,
});

export const toPostUpdateModel = (data: PostUpdateModel) => ({
  id: data.id,
  title: data.title,
  body: data.description,
});
