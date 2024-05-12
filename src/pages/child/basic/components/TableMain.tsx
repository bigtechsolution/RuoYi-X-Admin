import {BaseProTable} from '@/components';
// import { useQueryDictSysNormalDisable } from '@/models';
import ButtonAdd from './ButtonAdd';
import ButtonEdit from './ButtonEdit';
import type {SearchParams} from './ButtonExport';
import ButtonExport from './ButtonExport';
import ButtonRemove from './ButtonRemove';
import {useActionRefMainTable} from '../model';
import {getRecruitList, getTherapistList,} from '@/services/system/System';
import {convertParams} from '@/utils';
import type {ProColumns, ProFormInstance, ProTableProps} from '@ant-design/pro-components';
import {useRef, useState} from 'react';
import CureButtonEdit from "@/pages/therapist/basic/components/CureButtonEdit.tsx";

function formatPhoneNumber(phoneNumber: string): string {
  // 전화번호의 숫자만 추출합니다.
  const digits = phoneNumber.replace(/\D/g, '');

  // 숫자의 길이에 따라 다른 포맷을 적용합니다.
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else {
    // 예외 처리: 포맷에 맞지 않는 경우 원래 숫자를 반환합니다.
    return phoneNumber;
  }
}
function formatDateWithAge(dateString: string): string {
  // 날짜 문자열을 Date 객체로 변환
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}-${month}-${day}`;
}
function formatDateWithYYMM(dateString: string): string {
  // 날짜 문자열을 Date 객체로 변환
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const birthDate = new Date(`${year}-${month}-${day}`);

  // 현재 날짜를 가져오고 포맷
  const currentDate = new Date();
  const formattedDate = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;

  // 년생 개월 수 계산
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();

  // 월 계산이 음수일 경우, 년에서 1을 빼고 월에 12를 더함
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // 날짜와 년생 개월 수를 문자열로 반환
  const ageString = `${years}년 ${months}개월생`;
  return `${formattedDate}, ${ageString}`;
}
const useColumns = (): ProColumns<any>[] => {
  // const { valueEnumSysNormalDisable } = useQueryDictSysNormalDisable();

  return [
    {dataIndex: 'id', key: 'id', title: '키', valueType: 'text', hideInSearch: true},
    {
      dataIndex: 'email', key: 'email', title: '아동명', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {record.child?.name}
          </>
        ) : (
          <>-</>
        ),
    },

    {
      dataIndex: 'sexType', key: 'sexType', title: '성별', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {record.child?.sexType}
          </>
        ) : (
          <>-</>
        ),
    },
    {
      dataIndex: 'birth', key: 'birth', title: '생년월일', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {formatDateWithAge(record.child?.birth)}
          </>
        ) : (
          <>-</>
        ),
    },    {
      dataIndex: 'birth', key: 'birth', title: '부모님', valueType: 'text', render: (_, record) =>
        record.owner ? (
          <>
            {record.owner?.name}
          </>
        ) : (
          <>-</>
        ),
    },       {
      dataIndex: 'birth', key: 'birth', title: '연락처', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {record.owner?.phone}
          </>
        ) : (
          <>-</>
        ),
    },      {
      dataIndex: 'cureType', key: 'cureType', title: '치료타입', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {record.cureType}
          </>
        ) : (
          <>-</>
        ),
    },    {
      dataIndex: 'weekCureCount', key: 'weekCureCount', title: '주치료횟수', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {record.weekCureCount}회
          </>
        ) : (
          <>-</>
        ),
    },        {
      dataIndex: 'applicants', key: 'applicants', title: '지원자수', valueType: 'text', render: (_, record) =>
        record.child ? (
          <>
            {record.applicants?.length}명
          </>
        ) : (
          <>-</>
        ),
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: '상태',
      valueType: 'text',
      render: (status) => {
        // Format the cost as a string with commas
        return status;
      }
    },
    {
      title: 'OPTION',
      valueType: 'option',
      render: (_dom, entity: any) => {
        return (
          <>
            <ButtonEdit record={entity}/>
            <CureButtonEdit record={entity}/>
            <ButtonRemove id={[entity.id]}/>
          </>
        );
      },
    },
  ];
};

const tableAlertOptionRender: ProTableProps<any, 'text'>['tableAlertOptionRender'] = ({selectedRowKeys}) => {
  return <ButtonRemove disabled={selectedRowKeys.length === 0} isBatch id={selectedRowKeys as number[]}/>;
};

const TableMain = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const formRef = useRef<ProFormInstance<any>>();

  const actionRef = useActionRefMainTable();

  const columns = useColumns();

  return (
    <BaseProTable<any, any>
      formRef={formRef}
      actionRef={actionRef}
      rowKey="id"
      request={async (...p) => {
        const params: any = convertParams(...p);
        console.log(params)
        console.log(p)
        const output: any = await getRecruitList({...params});

        return {total: output.data.total, data: output.data.results};
      }}
      columns={columns}
      toolbar={{
        actions: [<ButtonExport key="ButtonExport" searchParams={searchParams}/>, <ButtonAdd key="ButtonAdd"/>],
      }}
      tableAlertOptionRender={tableAlertOptionRender}
    />
  );
};

export default TableMain;
