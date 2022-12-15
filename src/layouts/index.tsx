import { Access, PermissionDenied } from '@/components';
import IconLogout from '@/layouts/components/IconLogout';
import IconSetting from '@/layouts/components/IconSetting';
import MenuItem from '@/layouts/components/MenuItem';
import type { KeepAliveElements } from '@/layouts/components/TabsHeader';
import TabsHeader from '@/layouts/components/TabsHeader';
import { useQueryInitialState } from '@/models';
import { accessKeysMap, accessRoutes, isKeepAliveRoutesSet, settingsMap } from '@/routes';
import { checkAccess, convertUserRoutesToMenus } from '@/utils';
import type { ProTokenType } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useMemo, useRef } from 'react';
import { matchPath, useLocation, useNavigate, useOutlet } from 'react-router-dom';

const token: ProTokenType['layout'] = {
  pageContainer: {
    paddingBlockPageContainerContent: 0,
    paddingInlinePageContainerContent: 0,
  },
};

const useKeepAliveOutlets = () => {
  const { pathname } = useLocation();
  const element = useOutlet();

  const keepAliveElements = useRef<KeepAliveElements>({});

  const currRouteSettingsKey = Object.keys(settingsMap).find((key) => matchPath(key, pathname));
  const isKeepAlive = currRouteSettingsKey ? isKeepAliveRoutesSet.has(currRouteSettingsKey) : false;

  if (isKeepAlive) {
    keepAliveElements.current[currRouteSettingsKey!] = element;
  }

  return (
    <>
      <TabsHeader keepAliveElements={keepAliveElements.current} />
      {Object.entries(keepAliveElements.current).map(([key, element]) => (
        <div key={key} hidden={!matchPath(key, pathname)}>
          {element}
        </div>
      ))}
      {!isKeepAlive && element}
    </>
  );
};

const Layouts: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const element = useKeepAliveOutlets();

  const { data: initialState, isLoading } = useQueryInitialState();

  const accessible = useMemo(() => {
    const currRouteAccessKey = accessRoutes.find((key) => matchPath(key, pathname));

    if (!currRouteAccessKey) return true;

    return checkAccess(accessKeysMap[currRouteAccessKey], new Set(initialState?.userInfo?.permissions));
  }, [pathname, initialState?.userInfo?.permissions]);

  return (
    <ProLayout
      title="RuoYi X Admin"
      location={{ pathname }}
      onMenuHeaderClick={() => navigate('/')}
      menu={{ loading: isLoading }}
      loading={isLoading}
      menuDataRender={() => convertUserRoutesToMenus(initialState?.userRoutes)}
      menuItemRender={MenuItem}
      token={token}
      avatarProps={{
        size: 'small',
        src: initialState?.userInfo?.user?.avatar,
        title: initialState?.userInfo?.user?.nickName,
      }}
      actionsRender={() => [<IconSetting key="IconSetting" />, <IconLogout key="IconLogout" />]}
    >
      {!isLoading && (
        <Access accessible={accessible} fallback={<PermissionDenied />}>
          {element}
        </Access>
      )}
    </ProLayout>
  );
};

export default Layouts;
