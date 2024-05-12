import { Access } from '@/components';
import { useShowEditModal } from '../model';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { FC } from 'react';

const ButtonEdit: FC<{ record: any }> = ({ record }) => {
  const showEditModal = useShowEditModal();

  return (
    <Access accessible>
      <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
        수정
      </Button>
    </Access>
  );
};

export default ButtonEdit;
