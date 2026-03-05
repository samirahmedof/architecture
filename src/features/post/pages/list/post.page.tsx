import { NAMESPACES } from '@app/lang/i18n.config.ts';
import { type PostModel, postQueries } from '@features/post';
import { type ColumnType, Table, TableActions } from '@shared/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const PostPage = () => {
  const { t } = useTranslation(NAMESPACES.POST);

  const columns: ColumnType<PostModel>[] = [
    {
      key: 'name',
      title: t('title'),
      dataIndex: 'title',
    },
    {
      key: 'role',
      title: t('description'),
      dataIndex: 'description',
    },
    {
      key: 'actions',
      title: t('list.actions'),
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
