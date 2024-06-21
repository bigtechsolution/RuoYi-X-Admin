import {BaseProTable} from '@/components';
// import { useQueryDictSysNormalDisable } from '@/models';
import ButtonAdd from './ButtonAdd';
import ButtonEdit from './ButtonEdit';
import type {SearchParams} from './ButtonExport';
import ButtonExport from './ButtonExport';
import ButtonRemove from './ButtonRemove';
import {useActionRefMainTable} from '../model';
import {getAgencyList, getTherapistList,} from '@/services/system/System';
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
    {dataIndex: 'id', key: 'id', title: '키', valueType: 'text', hideInSearch: true, search: false},
    {dataIndex: 'name', key: 'name', title: '이름', valueType: 'text'},
    {dataIndex: 'doroAddress', key: 'doroAddress', title: '주소', valueType: 'text'},
    {
      dataIndex: 'detailInfo',
      key: 'detailInfo',
      title: '치료타입',
      valueType: 'text',
      search: false,
      render: (_, record) =>
        record.detailInfo?.cureType ? (
          <ul>
            {record.detailInfo?.cureType.map((region: any, index: any) => (
              <li key={index}>{region}</li>
            ))}
          </ul>
        ) : (
          <>-</>
        ),
    },


    {
      dataIndex: 'detailInfo', key: 'detailInfo', title: '바우처', valueType: 'text', search: false, render: (_, record) =>
        record.voucher ? (
          <ul>
            {record.voucher.map((region: any, index: any) => (
              <li key={index}>{region.name}</li>
            ))}
          </ul>
        ) : (
          <>-</>
        ),
    },
    {
      dataIndex: 'workDayTime',
      key: 'workDayTime',
      title: '업무시간',
      search: false,
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
        const output: any = await getAgencyList({...params, start: params.pageNum, limit: params.pageSize});

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
