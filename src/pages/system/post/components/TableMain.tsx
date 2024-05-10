import { BaseProTable } from '@/components';
// import { useQueryDictSysNormalDisable } from '@/models';
import ButtonAdd from '@/pages/system/post/components/ButtonAdd';
import ButtonEdit from '@/pages/system/post/components/ButtonEdit';
import type { SearchParams } from '@/pages/system/post/components/ButtonExport';
import ButtonExport from '@/pages/system/post/components/ButtonExport';
import ButtonRemove from '@/pages/system/post/components/ButtonRemove';
import { useActionRefMainTable } from '@/pages/system/post/model';
import type { SysPostQueryBo, SysPostVo } from '@/services/system/data-contracts';
import {getUserList, } from '@/services/system/System';
import { convertParams } from '@/utils';
import type { ProColumns, ProFormInstance, ProTableProps } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

const useColumns = (): ProColumns<SysPostVo>[] => {
  // const { valueEnumSysNormalDisable } = useQueryDictSysNormalDisable();

  return [
    { dataIndex: 'id', key: 'id', title: '키', valueType: 'text', hideInSearch: true },
    { dataIndex: 'username', key: 'username', title: 'username', valueType: 'text' },
    { dataIndex: 'name', key: 'name', title: '이름', valueType: 'text' },
    { dataIndex: 'email', key: 'email', title: 'email', valueType: 'text' },
    { dataIndex: 'authCount', key: 'authCount', title: '인증횟수', valueType: 'text' },

    // {
    //   title: '오름차순정렬',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   valueType: 'dateTime',
    //   editable: false,
    //   hideInSearch: true,
    //   sorter: true,
    // },
    {
      title: 'OPTION',
      valueType: 'option',
      render: (_dom, entity: any) => {
        return (
          <>
            <ButtonEdit record={entity} />

            <ButtonRemove id={[entity.id]} />
          </>
        );
      },
    },
  ];
};

const tableAlertOptionRender: ProTableProps<SysPostVo, 'text'>['tableAlertOptionRender'] = ({ selectedRowKeys }) => {
  return <ButtonRemove disabled={selectedRowKeys.length === 0} isBatch id={selectedRowKeys as number[]} />;
};

const TableMain = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const formRef = useRef<ProFormInstance<SysPostQueryBo>>();

  const actionRef = useActionRefMainTable();

  const columns = useColumns();

  return (
    <BaseProTable<SysPostVo, SysPostQueryBo>
      formRef={formRef}
      actionRef={actionRef}
      rowKey="id"
      request={async (...p) => {
        const params :any = convertParams(...p);
        console.log(params)
        console.log(p)
        const output :any= await getUserList({...params});

        return {total:output.data.total,data:output.data.results};
      }}
      columns={columns}
      toolbar={{
        actions: [<ButtonExport key="ButtonExport" searchParams={searchParams} />, <ButtonAdd key="ButtonAdd" />],
      }}
      tableAlertOptionRender={tableAlertOptionRender}
    />
  );
};

export default TableMain;
