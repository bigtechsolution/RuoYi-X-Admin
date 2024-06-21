import {BaseProTable} from '@/components';
// import { useQueryDictSysNormalDisable } from '@/models';
import ButtonAdd from './ButtonAdd';
import ButtonEdit from './ButtonEdit';
import type {SearchParams} from './ButtonExport';
import ButtonExport from './ButtonExport';
import ButtonRemove from './ButtonRemove';
import {useActionRefMainTable} from '../model';
import {getCompanyGroupList, getTherapistList, getTherapyList,} from '@/services/system/System';
import {convertParams} from '@/utils';
import type {ProColumns, ProFormInstance, ProTableProps} from '@ant-design/pro-components';
import {useRef, useState} from 'react';
import CureButtonEdit from "./CureButtonEdit.tsx";

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
function formatDateTime(input) {
  // Ensure the input is a string and has the correct length
  if (typeof input !== 'string' || input.length !== 12) {
    return 'Invalid input';
  }

  // Extract parts using substring method
  const year = input.substring(0, 4);
  const month = input.substring(4, 6);
  const day = input.substring(6, 8);
  const hour = input.substring(8, 10);
  const minute = input.substring(10, 12);

  // Build and return the formatted string
  return `${year}-${month}-${day}:${hour}:${minute}분`;
}

const useColumns = (): ProColumns<any>[] => {
  // const { valueEnumSysNormalDisable } = useQueryDictSysNormalDisable();

  return [
    {dataIndex: 'id', key: 'id', title: '키', valueType: 'text', hideInSearch: true},
    // {
    //   dataIndex: 'name', key: 'name', title: '치료사', valueType: 'text',search:false, render: (_, record) =>
    //     record.therapist ? (
    //       <>
    //         {record.therapist.name}
    //       </>
    //     ) : (
    //       <>-</>
    //     ),
    // },
    // {
    //   dataIndex: 'child', key: 'child', title: '아동명', valueType: 'text', search:false,render: (_, record) =>
    //     record.child ? (
    //       <>
    //         {record.child.name}
    //       </>
    //     ) : (
    //       <>-</>
    //     ),
    // },
    {dataIndex: 'title', key: 'title', title: '제목', valueType: 'text'},
    {
      dataIndex: 'baseAddress', key: 'baseAddress', title: '주소', valueType: 'text', search: false, render: (_,record) => {
        // Format the cost as a string with commas
        console.log(record)
        return record.baseAddress? record.baseAddress.address+" "+record.detailAddress :"";
      }
    },
    {
      dataIndex: 'type',
      key: 'type',
      title: '타입',
      valueType: 'text',
      render: (text) => {
        // Format the cost as a string with commas
        return text;
      }
    },
    {
      dataIndex: 'tags',
      key: 'tags',
      title: '타입',
      valueType: 'text',
      render: (_, record) =>
        record.tags ? (
          <ul>
            {record.tags?.map((region: any, index: any) => (
              <li key={index}>{region?.name}</li>
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

const TableMain =  () => {
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
        const output: any = await getCompanyGroupList({...params});

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
