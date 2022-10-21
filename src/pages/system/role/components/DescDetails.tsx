import { useAtomValueAccess, useQueryDict } from '@/models';
import { useAtomValueRoleListActions, useEditRoleDetails, useQueryRoleDetails } from '@/pages/system/role/model';
import type { RowEditableConfig } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Divider, Form, Spin } from 'antd';
import type { FC, Key } from 'react';
import { useState } from 'react';

const DescDetails: FC = () => {
  const [editableKeys, setEditableKeys] = useState<Key[]>([]);

  const [form] = Form.useForm();

  const access = useAtomValueAccess();

  const { data: dDtata } = useQueryDict('sys_normal_disable');

  const actions = useAtomValueRoleListActions();

  const { data, isFetching, refetch } = useQueryRoleDetails(() => {
    setEditableKeys([]);
    form.resetFields();
  });

  const { mutateAsync } = useEditRoleDetails(() => {
    refetch();
    actions?.reload();
  });

  const editable: RowEditableConfig<API.SysRoleVo> | undefined =
    access.canEditSysRole && data
      ? {
          form,
          editableKeys,
          onChange: (keys, editableRows) => {
            setEditableKeys(keys);

            const key = keys[0] as keyof API.SysRoleVo;

            form.setFieldsValue({
              [key]: (editableRows as API.SysRoleVo)[key],
            });
          },
          onSave: async (key, record) => {
            await mutateAsync({
              [key as keyof API.SysRole]: record[key as keyof API.SysRole],
            });
          },
        }
      : undefined;

  return (
    <Spin spinning={isFetching}>
      <ProDescriptions
        column={2}
        columns={[
          { title: '角色编号', dataIndex: 'roleId', key: 'roleId', valueType: 'text', editable: false },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            valueType: 'dateTime',
            editable: false,
            hideInSearch: true,
          },
        ]}
        dataSource={data}
      />

      <Divider />

      <ProDescriptions
        column={2}
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            valueEnum: dDtata?.mapData ?? {},
            valueType: 'radio',
            formItemProps: {
              initialValue: dDtata?.defaultValue,
              required: true,
              rules: [{ required: true, message: '请选择状态' }],
            },
          },
          {
            title: '显示排序',
            dataIndex: 'roleSort',
            key: 'roleSort',
            valueType: 'digit',
            formItemProps: {
              required: true,
              rules: [{ required: true, message: '请输入显示排序' }],
            },
          },
          {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            valueType: 'text',
            formItemProps: {
              required: true,
              rules: [{ required: true, message: '请输入角色名称' }],
            },
          },
          { title: '备注', dataIndex: 'remark', key: 'remark', valueType: 'textarea' },
          {
            title: '权限字符',
            dataIndex: 'roleKey',
            key: 'roleKey',
            valueType: 'text',
            tooltip: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)",
            formItemProps: {
              required: true,
              rules: [{ required: true, message: '请输入权限字符' }],
            },
          },
        ]}
        dataSource={data}
        editable={editable}
      />
    </Spin>
  );
};

export default DescDetails;
