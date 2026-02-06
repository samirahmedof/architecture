export type PostModel = {
  id: number;
  title: string;
  description: string;
  randNumber: boolean;
};

export type PostCreateModel = {
  title: string;
  description: string;
};

export type PostUpdateModel = PostCreateModel & {
  id: number;
};
