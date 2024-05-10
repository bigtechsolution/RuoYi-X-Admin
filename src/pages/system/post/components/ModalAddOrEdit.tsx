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

  // const { valueEnumSysNormalDisable, defaultValueSysNormalDisable } = useQueryDictSysNormalDisable();
  const defaultValueSysNormalDisable= "NORMAL"
 const valueEnumSysNormalDisable= [
    {
      "createBy": "admin",
      "createTime": "2022-06-19 06:27:41",
      "updateBy": "admin",
      "updateTime": "2023-02-18 21:21:37",
      "dictCode": 6,
      "dictSort": 1,
      "dictLabel": "正常",
      "dictValue": "NORMAL",
      "dictType": "sys_normal_disable",
      "cssClass": "",
      "listClass": "success",
      "isDefault": "YES",
      "status": "NORMAL",
      "remark": "正常状态"
    },
    {
      "createBy": "admin",
      "createTime": "2022-06-19 06:27:41",
      "updateBy": "admin",
      "updateTime": "2023-02-18 21:21:41",
      "dictCode": 7,
      "dictSort": 2,
      "dictLabel": "停用",
      "dictValue": "DISABLE",
      "dictType": "sys_normal_disable",
      "cssClass": "",
      "listClass": "error",
      "isDefault": "NO",
      "status": "NORMAL",
      "remark": "停用状态"
    }
  ]
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
        message.success(actionType === 'add' ? '성공적으로 추가되었습니다' : '성공적으로 수정 되었습니다');
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
