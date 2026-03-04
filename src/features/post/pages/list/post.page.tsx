import { postQueries } from '@features/post/api/post.queries.ts';
import type { PostModel } from '@features/post/domain/post.model.ts';
import { Table } from '@shared/ui/table/table.tsx';
import type { ColumnType } from '@shared/ui/table/table.types.ts';
import { TableActions } from '@shared/ui/table-actions/table-actions.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';

const columns: ColumnType<PostModel>[] = [
  {
    key: 'name',
    title: 'Başlıq',
    dataIndex: 'title',
  },
  {
    key: 'role',
    title: 'Təsvir',
    dataIndex: 'description',
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    render: (record) => (
      <TableActions
        onView={() => console.log('Bax:', record.id)}
        onEdit={() => console.log('Düzəlt:', record.id)}
        onDelete={() => console.log('Sil:', record.id)}
      />
    ),
  },
];

const PostPage = () => {
  // TODO: check suspend query for load
  const { data: posts } = useSuspenseQuery(postQueries.list());
  return (
    <Table
      data={posts}
      columns={columns}
      rowKey={(record) => record.id}
      isLoading={false}
      onRowClick={(record) => console.log('Seçildi:', record.title)}
    />
  );
};

export default PostPage;
