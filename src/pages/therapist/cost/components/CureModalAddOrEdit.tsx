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

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    const selectedRegion = koreaRegions.find(region => region.code === value);
    if (selectedRegion) {
      setCountyOptions(selectedRegion.children);
    } else {
      setCountyOptions([]);
    }
  };
  const handleCityChange2 = (value: string) => {
    setSelectedCity2(value);
    const selectedRegion2 = koreaRegions.find(region => region.code === value);
    if (selectedRegion2) {
      setCountyOptions2(selectedRegion2.children);
    } else {
      setCountyOptions2([]);
    }
  };
  const handleCountyChange = (value: string[]) => {
    setSelectedCounties(value);
  };
  const handleCountyChange2 = (value: string[]) => {
    setSelectedCounties2(value);
  };

  const {cureOpen, actionType, record} = useValueAddOrEditModal();
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
  const valueEnumSysNormalDisable = new Map([
    ["남", {text: "남"}],
    ["여", {text: "여"}]
  ]);
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
    console.log(cureOpen)
    if (cureOpen && actionType === 'edit') {
      const timer = setTimeout(() => {
        formRef.current?.setFieldsValue(record!);
        clearTimeout(timer);
      }, 0);
    }
  }, [open]);

  return (
    <Modal
      open={cureOpen}
      onCancel={onCancel}
      okText="확인"
      okButtonProps={{
        loading: isLoading,
      }}
      onOk={() => mutate()}
      title={actionType === 'add' ? '신규등록' : '수정하기'}
    >
      <ProForm<any> submitter={false} formRef={formRef}  onFinish={(values) => {
        console.log('Form values:', values);
        return null;
      }}>

        <ProFormSelect name="mainSubject" label="주치료과목" valueEnum={cureTypeValueEnum} rules={[{required: true}]}/>
        <ProFormSelect name="subSubject" label="부치료과목" valueEnum={cureTypeValueEnum}/>
        <ProFormText name="cost" label="희망치료비"/>
        <ProFormText name="careerText" label="경력" placeholder="00년 00개월"/>


        <ProFormSelect
          name="largeCode1"
          label="시 선택"
          options={koreaRegions.map(region => ({label: region.label, value: region.code}))}
          onChange={handleCityChange}
          placeholder="시를 선택하세요"
          fieldProps={{showSearch: true,value:selectedCity}}
        />
        <ProFormSelect
          name="mediumCode1"
          label="군 선택"
          mode="multiple"
          options={countyOptions.map(county => ({label: county.name, value: county.code}))}
          onChange={handleCountyChange}
          placeholder="먼저 시를 선택하세요"
          fieldProps={{
            showSearch: true,
            maxTagCount: 3,
            value:selectedCounties
          }}
          disabled={!selectedCity}
        />
        <ProFormSelect
          name="largeCode2"
          label="시 선택"
          options={koreaRegions.map(region => ({label: region.label, value: region.code}))}
          onChange={handleCityChange2}
          placeholder="시를 선택하세요"
          fieldProps={{showSearch: true,value:selectedCity2}}
        />
        <ProFormSelect
          name="mediumCode2"
          label="군 선택"
          mode="multiple"
          options={countyOptions.map(county => ({label: county.name, value: county.code}))}
          onChange={handleCountyChange2}
          placeholder="먼저 시를 선택하세요"
          fieldProps={{
            showSearch: true,
            maxTagCount: 3,
            value:selectedCounties2
          }}
          disabled={!selectedCity}
        />
        <ProFormDigit name="cost" label="일반치료비용"  rules={[{required: true}]}/>
        <ProFormDigit name="exclusiveCost" label="전속치료비용"  rules={[{required: true}]}/>
        <ProFormSelect name="bank" label="은행" valueEnum={banksEnum}/>
        <ProFormText name="accountHolder" label="예금주" />
        <ProFormText name="accountNumber" label="계좌번호" />

      </ProForm>
    </Modal>
  );
};

export default CureModalAddOrEdit;
