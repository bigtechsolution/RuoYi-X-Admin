import { Access } from '@/components';
import type { SysPostPageQueryBo, SysPostQueryBo } from '@/services/system/data-contracts';
import {exportUser, sysPostPostExportSkipErrorHandler} from '@/services/system/System';
import { download } from '@/utils';
import { DownloadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { App, Button } from 'antd';
import type { FC } from 'react';

export type SearchParams = Pick<SysPostPageQueryBo, 'postCode' | 'postName' | 'status' | 'pageNum' | 'pageSize'>;

const handleExport = async (searchParams: any) => {
  const { data } = await exportUser({}, {

  });
  console.log(data)

  // try {
  //   const fetched = await onFetchAll();
  //
  //   const tableColumns = columns.filter((column) => column.title);
  //   const excelColumns = tableColumns.map((_column) => _column.title);
  //   const sheetData = [excelColumns];
  //   for (const tableRow of fetched.results) {
  //     const excelRow = [];
  //     for (const tableColumn of tableColumns) {
  //       excelRow.push(_.get(tableRow, tableColumn.dataIndex as any));
  //     }
  //     sheetData.push(excelRow);
  //   }
  //
  //   const book = xlsx.utils.book_new();
  //   const sheet1 = xlsx.utils.aoa_to_sheet(sheetData);
  //   xlsx.utils.book_append_sheet(book, sheet1, 'Sheet1');
  //   xlsx.writeFile(book, `${fileName}.xlsx`);
  // } catch (e) {
  //   console.error(e);
  // } finally {
  //   setIsExporting(false);
  // }
  // await download(data, `post_${new Date().getTime()}.xlsx`);
};

const ButtonExport: FC<{ searchParams: SysPostQueryBo }> = ({ searchParams }) => {
  const { message } = App.useApp();

  const { isLoading, mutate } = useMutation(handleExport, {
    onSuccess: () => {
      message.success('엑셀 다운로드가 완료되었습니다.');
    },
  });

  return (
    <Access accessible>
      <Button type="primary" ghost icon={<DownloadOutlined />} loading={isLoading} onClick={() => mutate(searchParams)}>
        현재 목록 내보내기
      </Button>
    </Access>
  );
};

export default ButtonExport;
