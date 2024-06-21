import { Access } from '@/components';
import {useShowCureEditModal, useShowEditModal} from '../model';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { FC } from 'react';

const CureButtonEdit: FC<{ record: any }> = ({ record }) => {
  const showEditModal = useShowCureEditModal();

  return (
    <Access accessible>
      <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
        지원아동 리스트
      </Button>
    </Access>
  );
};

export default CureButtonEdit;
