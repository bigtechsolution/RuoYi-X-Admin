import { Space } from 'antd';
import type { FC, ReactNode } from 'react';

interface BaseTableAlertProps {
  selectedNum: number;
  children?: ReactNode;
  onCleanSelected: () => void;
}

export const BaseTableAlert: FC<BaseTableAlertProps> = ({ selectedNum = 0, children, onCleanSelected }) => {
  return (
    <Space>
      <span>선택된 {selectedNum} 건</span>
      <a onClick={onCleanSelected}>선택 취소</a>
      {children}
    </Space>
  );
};
