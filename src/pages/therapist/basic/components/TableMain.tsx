import {BaseProTable} from '@/components';
// import { useQueryDictSysNormalDisable } from '@/models';
import ButtonAdd from './ButtonAdd';
import ButtonEdit from './ButtonEdit';
import type {SearchParams} from './ButtonExport';
import ButtonExport from './ButtonExport';
import ButtonRemove from './ButtonRemove';
import {useActionRefMainTable} from '../model';
import {getTherapistList,} from '@/services/system/System';
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

const useColumns = (): ProColumns<any>[] => {
  // const { valueEnumSysNormalDisable } = useQueryDictSysNormalDisable();

  return [
    {dataIndex: 'id', key: 'id', title: '키', valueType: 'text', hideInSearch: true,search:false},
    {dataIndex: 'username', key: 'username', title: '유저아이디', valueType: 'text',search:false},
    {
      dataIndex: 'email', key: 'email', title: '이메일', valueType: 'text',search:false, render: (_, record) =>
        record.user?.email ? (
          <>
            {formatPhoneNumber(record.user?.email)}
          </>
        ) : (
          <>-</>
        ),
    },
    {dataIndex: 'name', key: 'name', title: '이름', valueType: 'text'},
    {dataIndex: 'mainSubject', key: 'mainSubject', title: '주치료과목', valueType: 'text'},
    {
      dataIndex: 'cost',
      key: 'cost',
      title: '치료비',
      search:false,
      valueType: 'text',
      render: (cost) => {
        // Format the cost as a string with commas
        return cost ? cost.toLocaleString() : '-';
      }
    },
    {
      dataIndex: 'cost',
      key: 'exclusiveCost',
      title: '고정치료비',
      search:false,
      valueType: 'text',
      render: (cost) => {
        // Format the cost as a string with commas
        return cost ? cost.toLocaleString() : '-';
      }
    },
    {
      dataIndex: 'careerText',
      key: 'careerText',
      title: '경력',
      search:false,
      valueType: 'text',
      render: (careerText) => {
        // Format the cost as a string with commas
        return careerText;
      }
    },
    {dataIndex: 'sex', key: 'sex', title: '성별', valueType: 'text',search:false,},
    {
      dataIndex: 'idx', key: 'phone', title: '연락처', valueType: 'text',search:false, render: (_, record) =>
        record.phone ? (
          <>
            {formatPhoneNumber(record.phone)}
          </>
        ) : (
          <>-</>
        ),
    },
    {
      dataIndex: 'id', key: 'phone', title: '가능지역', valueType: 'text', search:false,render: (_, record) =>
       record.regions ? (
        <ul>
          {record.regions.map((region :any, index :any) => (
            <li key={index}>{region.largeText} {region.mediumText}</li>
          ))}
        </ul>
      ) : (
          <>-</>
        ),
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: '상태',
      search:false,
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
            {/* <CureButtonEdit record={entity}/> */}
            {/* <ButtonRemove id={[entity.id]}/> */}
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
        const output: any = await getTherapistList({...params});

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
