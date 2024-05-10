import { useQueryDictSysNormalDisable } from '@/models';
import { useAtomValueMainTableActions, useHideAddOrEditModal, useValueAddOrEditModal } from '@/pages/system/post/model';
import type { SysPostAddBo } from '@/services/system/data-contracts';
import { sysPostPostAdd, sysPostPostEdit } from '@/services/system/System';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDigit, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { App, Modal } from 'antd';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

const ModalAddOrEdit: FC = () => {
  const formRef = useRef<ProFormInstance<SysPostAddBo>>();

  const { message } = App.useApp();

  const { open, actionType, record } = useValueAddOrEditModal();
  const hideAddOrEditModal = useHideAddOrEditModal();
  const onCancel = () => {
    if (actionType === 'edit') {
      formRef.current?.resetFields();
    }
    hideAddOrEditModal();
  };

  const mainTableActions = useAtomValueMainTableActions();

  const { valueEnumSysNormalDisable, defaultValueSysNormalDisable } = useQueryDictSysNormalDisable();

  const { mutate, isLoading } = useMutation(
    async () => {
      const values = await formRef.current?.validateFields();

      if (!values) return;

      if (actionType === 'add') {
        await sysPostPostAdd(values);
        return;
      }

      await sysPostPostEdit({
        ...values,
        postId: record!.postId,
      });
    },
    {
      onSuccess: () => {
        mainTableActions?.reload();
        onCancel();
        message.success(actionType === 'add' ? '新增成功' : '保存成功');
      },
    },
  );

  useEffect(() => {
    if (open && actionType === 'edit') {
      const timer = setTimeout(() => {
        formRef.current?.setFieldsValue(record!);
        clearTimeout(timer);
      }, 0);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      okText="확인"
      okButtonProps={{
        loading: isLoading,
      }}
      onOk={() => mutate()}
      title={actionType === 'add' ? '신규등록' : '수정하기'}
    >
      <ProForm<SysPostAddBo> submitter={false} formRef={formRef}>
        <ProFormText name="name" label="이름" rules={[{ required: true }]} />

        <ProFormText name="email" label="email" rules={[{ required: true }]} />

        <ProFormDigit name="nickName" label="닉네임" rules={[{ required: true }]} initialValue={0} />

        <ProFormRadio.Group
          name="status"
          label="状态"
          valueEnum={valueEnumSysNormalDisable}
          initialValue={defaultValueSysNormalDisable}
        />

        <ProFormTextArea name="remark" label="확인" />
      </ProForm>
    </Modal>
  );
};

export default ModalAddOrEdit;
