import { useInitActionType } from '@/hooks';
import type { ActionType } from '@ant-design/pro-components';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';

const atomMainTableActions = atomWithReset<ActionType | undefined>(undefined);
export const useActionRefMainTable = () => useInitActionType(atomMainTableActions);
export const useAtomValueMainTableActions = () => useAtomValue(atomMainTableActions);

// 新增或编辑弹窗
const atomAddOrEditModal = atomWithReset<{
  open: boolean;
  cureOpen: boolean;
  record?: any;
  // record?: SysPostVo;
  actionType: 'add' | 'edit';
}>({
  open: false,
  cureOpen: false,
  actionType: 'add',
});
export const useShowAddModal = () => {
  const showAddModal = useSetAtom(atomAddOrEditModal);
  return () => showAddModal({ open: true, cureOpen:false, actionType: 'add' });
};
export const useShowEditModal = () => {
  const showEditModal = useSetAtom(atomAddOrEditModal);
  return (record: any) => showEditModal({ open: true,cureOpen:false, actionType: 'edit', record });
};
export const useShowCureEditModal = () => {
  const showEditModal = useSetAtom(atomAddOrEditModal);
  // return (record: any) => showEditModal({ open:false, cureOpen: true, actionType: 'edit', record });
  return (record: any) => {
    console.log('Record:', record);
    showEditModal({ open:false, cureOpen: true, actionType: 'edit', record });
  }
};
export const useHideAddOrEditModal = () => useResetAtom(atomAddOrEditModal);
export const useValueAddOrEditModal = () => useAtomValue(atomAddOrEditModal);
