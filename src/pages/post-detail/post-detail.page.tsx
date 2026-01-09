import { postDetailRoute } from '@pages/post-detail/post-detail.route.ts';

const PostDetailPage = () => {
  const { postId } = postDetailRoute.useParams();
  return <div>post detail {postId}</div>;
};

export default PostDetailPage;
