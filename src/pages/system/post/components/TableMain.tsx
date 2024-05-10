import { BaseProTable } from '@/components';
import { useQueryDictSysNormalDisable } from '@/models';
import ButtonAdd from '@/pages/system/post/components/ButtonAdd';
import ButtonEdit from '@/pages/system/post/components/ButtonEdit';
import type { SearchParams } from '@/pages/system/post/components/ButtonExport';
import ButtonExport from '@/pages/system/post/components/ButtonExport';
import ButtonRemove from '@/pages/system/post/components/ButtonRemove';
import { useActionRefMainTable } from '@/pages/system/post/model';
import type { SysPostQueryBo, SysPostVo } from '@/services/system/data-contracts';
import {getUserList, sysPostPostList} from '@/services/system/System';
import { convertParams } from '@/utils';
import type { ProColumns, ProFormInstance, ProTableProps } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

const useColumns = (): ProColumns<SysPostVo>[] => {
  const { valueEnumSysNormalDisable } = useQueryDictSysNormalDisable();

  return [
    { dataIndex: 'postId', key: 'postId', title: '아이디', valueType: 'text', hideInSearch: true },
    { dataIndex: 'postCode', key: 'postCode', title: '코드', valueType: 'text' },
    { dataIndex: 'postName', key: 'postName', title: '이름', valueType: 'text' },
    { title: '딕셔너리', dataIndex: 'status', key: 'status', valueType: 'select', valueEnum: valueEnumSysNormalDisable },
    { title: '리마크', dataIndex: 'remark', key: 'remark', valueType: 'textarea', hideInSearch: true },
    {
      title: '오름차순정렬',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      editable: false,
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'OPTION',
      valueType: 'option',
      render: (_dom, entity: SysPostVo) => {
        return (
          <>
            <ButtonEdit record={entity} />

            <ButtonRemove postId={[entity.postId]} />
          </>
        );
      },
    },
  ];
};

const tableAlertOptionRender: ProTableProps<SysPostVo, 'text'>['tableAlertOptionRender'] = ({ selectedRowKeys }) => {
  return <ButtonRemove disabled={selectedRowKeys.length === 0} isBatch postId={selectedRowKeys as number[]} />;
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
      rowKey="postId"
      request={async (...p) => {
        console.log(p)
        const params :any = convertParams(...p);
        console.log(params)

        // const output= await getUserList({start:params.pageNum,limit:params.pageSize});
        const output   = await sysPostPostList(params);
        console.log(output)
        return output;
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
