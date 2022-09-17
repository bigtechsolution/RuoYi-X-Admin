import { MenuType } from '@/constants';
import type { OptionsParentId } from '@/pages/system/menu/components/ButtonCreate';
import { SysMenuPostList, SysMenuPostRemove } from '@/services/sys/SysMenuService';
import { getParentIds, parseSimpleTreeData, sortByOrderNum } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message, Modal } from 'antd';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

const namespace = 'systemMenu';

const getOptions = (data?: API.SysMenu[]): OptionsParentId[] => {
  const formatOptions = (items: API.SysMenu[]): OptionsParentId[] => {
    return items
      .filter((item) => item.menuType !== MenuType.F)
      .map(({ menuId, menuName, children }) => {
        return { menuId: menuId!, menuName, children: children ? formatOptions(children) : [] };
      });
  };

  return [{ menuId: 0, menuName: '根目录', children: data ? formatOptions(data) : [] }];
};

// 已选中的菜单
const AtomSelectedMenuId = atom<number>({ key: `${namespace}SelectedMenuId`, default: 0 });
export const useResetSelectedMenuId = () => useResetRecoilState(AtomSelectedMenuId);
export const useSelectedMenuIdState = () => useRecoilState(AtomSelectedMenuId);
export const useSelectedMenuIdValue = () => useRecoilValue(AtomSelectedMenuId);

// 新建菜单弹窗
const AtomCreateModalState = atom<boolean>({ key: `${namespace}VisibleCreateModal`, default: false });
export const useHideCreateModal = () => useResetRecoilState(AtomCreateModalState);
export const useShowCreateModal = () => useSetRecoilState(AtomCreateModalState);
export const useCreateModalVisibleValue = () => useRecoilValue(AtomCreateModalState);

// 查询菜单列表
export const queryMenuListKey = [namespace, 'list'];
export const useQueryMenuList = (params: API.SysMenuQueryBo = {}) => {
  return useQuery(queryMenuListKey, async () => {
    const data = await SysMenuPostList(params);

    const treeData: API.SysMenu[] = parseSimpleTreeData(data, {
      id: 'menuId',
      pId: 'parentId',
      rootPId: null,
    });

    return {
      options: getOptions(sortByOrderNum(treeData)),
      treeData: sortByOrderNum(treeData),
      map: data.reduce((map, item) => {
        return { ...map, [item.menuId]: item };
      }, {}),
      parentIds: getParentIds(data as any),
    };
  });
};

// 删除菜单
export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  const resetSelectedMenuId = useResetSelectedMenuId();

  return useMutation(async (menuId: number) => {
    Modal.confirm({
      title: '删除菜单',
      content: '确定删除该菜单吗？',
      onOk: async () => {
        await SysMenuPostRemove({ menuId });

        await queryClient.invalidateQueries(queryMenuListKey);

        resetSelectedMenuId();

        message.success('删除成功');
      },
    });
  });
};
