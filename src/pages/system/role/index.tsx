import ButtonCreate from '@/pages/system/role/components/ButtonCreate';
import ButtonDelete from '@/pages/system/role/components/ButtonDelete';
import DescriptionsDetails from '@/pages/system/role/components/DescriptionsDetails';
import List from '@/pages/system/role/components/List';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import type { FC } from 'react';

const PageRole: FC = () => {
  return (
    <PageContainer>
      <ProCard ghost gutter={24}>
        <ProCard title="角色列表" colSpan="400px" extra={<ButtonCreate />}>
          <List />
        </ProCard>

        <ProCard title="角色详情" extra={<ButtonDelete />}>
          <DescriptionsDetails />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default PageRole;
