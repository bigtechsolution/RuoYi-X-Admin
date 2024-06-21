import {useAtomValueMainTableActions, useHideAddOrEditModal, useValueAddOrEditModal} from '../model';
import {addUser, editUser,} from '@/services/system/System';
import {ProFormDigit, ProFormInstance} from '@ant-design/pro-components';
import {ProFormSelect} from '@ant-design/pro-components';
import {ProForm, ProFormRadio, ProFormText,} from '@ant-design/pro-components';
import {useMutation} from '@tanstack/react-query';
import {App, Modal} from 'antd';
import {FC, useState} from 'react';
import {useEffect, useRef} from 'react';
import {banks, cureTypeOptions, KoDistrict, koreaRegions, TherapistStatusEnums} from "@/models";
import TableMain from "./ChildTableMain";

const CureModalAddOrEdit: FC = () => {

  const formRef = useRef<ProFormInstance<any>>();
  const {message} = App.useApp();

// valueEnum 객체 생성
  const cureTypeValueEnum: any = {};
  cureTypeOptions.forEach(option => {
    cureTypeValueEnum[option.value] = option.label;
  });
  const banksEnum: any = {};
  banks.forEach(option => {
    banksEnum[option.value] = option.label;
  });
  // Enum을 객체로 변환
  const therapistStausEnums: any = Object.values(TherapistStatusEnums).reduce((obj: any, key) => {
    obj[key] = key;
    return obj;
  }, {});
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);

  const [selectedCity2, setSelectedCity2] = useState<string | undefined>(undefined);
  const [selectedCounties2, setSelectedCounties2] = useState<string[]>([]);

  const [countyOptions, setCountyOptions] = useState<KoDistrict[]>([]);
  const [countyOptions2, setCountyOptions2] = useState<KoDistrict[]>([]);



  const {cureOpen, actionType, record} = useValueAddOrEditModal();
  console.log(record)
  const hideAddOrEditModal = useHideAddOrEditModal();
  const onCancel = () => {
    if (actionType === 'edit') {
      formRef.current?.resetFields();
    }
    hideAddOrEditModal();
  };

  const mainTableActions = useAtomValueMainTableActions();

  const {mutate, isLoading} = useMutation(
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
    if (cureOpen && actionType === 'edit') {
      const timer = setTimeout(() => {
        console.log(record)
        formRef.current?.setFieldsValue(record!);
        clearTimeout(timer);
      }, 0);
    }
  }, [open]);

  return (
    <Modal
      open={cureOpen}
      width={"900px"}
      onCancel={onCancel}
      okText="확인"
      okButtonProps={{
        loading: isLoading,
      }}
      onOk={() => mutate()}
      title={actionType === 'add' ? '신규등록' : '지원아동리스트'}
    >
      <TableMain id={record?.id}/>

    </Modal>
  );
};

export default CureModalAddOrEdit;
