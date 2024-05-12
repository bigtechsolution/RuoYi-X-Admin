import { Access } from '@/components';
import { useAtomValueMainTableActions } from '@/pages/system/post/model';
import {removeUser, } from '@/services/system/System';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { App, Button } from 'antd';
import type { FC } from 'react';

const ButtonRemove: FC<{
  id: number[];
  isBatch?: boolean;
  disabled?: boolean;
}> = ({ id, isBatch, disabled }) => {
  const text = isBatch ? '일괄삭제' : '삭제';

  const mainTableActions = useAtomValueMainTableActions();

  const { message, modal } = App.useApp();

  const { mutateAsync, isLoading } = useMutation(
    async (ids: number[]) => {
      await removeUser({ ids });
    },
    {
      onSuccess: () => {
        mainTableActions?.reload();
        mainTableActions?.clearSelected?.();
        message.success('성공적으로 삭제되었습니다');
      },
    },
  );

  const onRemove = () => {
    modal.confirm({
      title: '삭제하기',
      content: `아이디 ${id} 를 삭제하시겠습니까？`,
      onOk: async () => mutateAsync(id),
      okButtonProps: {
        loading: isLoading,
      },
    });
  };

  return (
    <Access accessible>
      <Button type="link" danger disabled={disabled} icon={<DeleteOutlined />} onClick={onRemove}>
        {text}
      </Button>
    </Access>
  );
};

export default ButtonRemove;
