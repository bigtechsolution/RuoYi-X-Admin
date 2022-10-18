import { CDictId, CDictName, CDictType, CEnableDisableStatus, CRemark, TCreateTime, TCreateTimeRange } from '@/columns';
import { BaseProTable, WarpTableOption } from '@/components';
import { useRowClick } from '@/hooks';
import ButtonAdd from '@/pages/system/dict/components/ButtonAdd';
import ButtonDetails from '@/pages/system/dict/components/ButtonDetails';
import ButtonEdit from '@/pages/system/dict/components/ButtonEdit';
import ButtonExport from '@/pages/system/dict/components/ButtonExport';
import ButtonRefresh from '@/pages/system/dict/components/ButtonRefresh';
import ButtonRemove from '@/pages/system/dict/components/ButtonRemove';
import { useMainTableActionRef } from '@/pages/system/dict/model';
import { SysDictTypePostList } from '@/services/sys/SysDictTypeService';
import { convertParams } from '@/utils';
import type { ProTableProps } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useState } from 'react';

const rowKey = 'dictId';

const tableAlertOptionRender: ProTableProps<API.SysDictTypeVo, 'text'>['tableAlertOptionRender'] = ({
  selectedRows,
}) => {
  return (
    <ButtonRemove
      disabled={selectedRows.length === 0}
      isBatch
      dictId={selectedRows.map((i) => i.dictId).join(',') as unknown as number}
      dictName={selectedRows.map((i) => i.dictName).join(',')}
    />
  );
};

const TableMain: FC = () => {
  const { rowSelection, onClick } = useRowClick<API.SysDictTypeVo>(rowKey);

  const actionRef = useMainTableActionRef();

  const [searchParams, setSearchParams] = useState<API.SysDictTypeQueryBo>({});

  return (
    <BaseProTable<API.SysDictTypeVo>
      rowKey={rowKey}
      actionRef={actionRef}
      columns={[
        CDictId,
        CDictName,
        CDictType,
        CEnableDisableStatus,
        CRemark,
        TCreateTime,
        TCreateTimeRange,
        {
          title: '操作',
          valueType: 'option',
          render: (dom, entity: API.SysDictTypeVo) => {
            return (
              <WarpTableOption>
                <ButtonDetails dictType={entity.dictType} />
                <ButtonEdit record={entity} />
                <ButtonRemove dictId={entity.dictId} dictName={entity.dictName} />
              </WarpTableOption>
            );
          },
        },
      ]}
      tableAlertOptionRender={tableAlertOptionRender}
      rowSelection={rowSelection}
      onRow={(record) => {
        return {
          onClick: () => {
            onClick(record);
          },
        };
      }}
      request={async (...p) => {
        const params = convertParams(...p);
        setSearchParams(params as API.SysDictTypeQueryBo);
        return await SysDictTypePostList(params);
      }}
      toolbar={{
        actions: [
          <ButtonRefresh key="ButtonRefresh" />,
          <ButtonExport key="ButtonExport" searchParams={searchParams} />,
          <ButtonAdd key="ButtonAdd" />,
        ],
      }}
    />
  );
};

export default TableMain;
