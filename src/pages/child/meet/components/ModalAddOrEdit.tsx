import { useAtomValueMainTableActions, useHideAddOrEditModal, useValueAddOrEditModal } from '../model';
import {addUser, editUser,} from '@/services/system/System';
import {ProFormInstance, ProFormSelect} from '@ant-design/pro-components';
import { ProForm, ProFormRadio, ProFormText,  } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { App, Modal } from 'antd';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import {cureTypeOptions,  TherapistStatusEnums} from "@/models";

const ModalAddOrEdit: FC = () => {

  const formRef = useRef<ProFormInstance<any>>();
  const { message } = App.useApp();

// valueEnum 객체 생성
  const cureTypeValueEnum:any = {};
  cureTypeOptions.forEach(option => {
    cureTypeValueEnum[option.value] = option.label;
  });
  // Enum을 객체로 변환
  const therapistStausEnums:any = Object.values(TherapistStatusEnums).reduce((obj :any, key) => {
    obj[key] = key;
    return obj;
  }, {});


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

  // const defaultValueSysNormalDisable= "DISABLE"
  const valueEnumSysNormalDisable= new Map([
     ["남", {text: "남"}],
     ["여", {text: "여"}]
   ]);
  const { mutate, isLoading } = useMutation(
    async () => {
      const values = await formRef.current?.validateFields();

      if (!values) return;

      if (actionType === 'add') {
        await addUser(values);
        return;
      }

      await editUser({
        ...values,
        id: record!.id,
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
    console.log(open)
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
      <ProForm<any> submitter={false} formRef={formRef}>
        <ProFormSelect name="status" label="현황" valueEnum={therapistStausEnums} rules={[{ required: true }]}  />
        <ProFormText name="name" label="이름" rules={[{ required: true }]} />
        <ProFormText name={['user', 'email']} label="email" rules={[{ required: true }]} />
        <ProFormText name="phone" label="연락처" rules={[{ required: true }]} />
        <ProFormRadio.Group
          name="sex"
          label="성별"
          valueEnum={valueEnumSysNormalDisable}
        />
        <ProFormText name="birth" label="생년월일" rules={[{ required: true }]} />
        <ProFormSelect name="mainSubject" label="주치료과목" valueEnum={cureTypeValueEnum} rules={[{ required: true }]}  />
      </ProForm>
    </Modal>
  );
};

export default ModalAddOrEdit;
