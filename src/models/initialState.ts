import {sysLoginGetInfo} from '@/services/system/Info';
import {sysLoginGetRouters} from '@/services/system/Routers';
import {convertUserRoutesToMenus, getRouteSettingMap} from '@/utils';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {atom, useAtomValue, useSetAtom} from 'jotai';

const initialStateQueryKey = ['global', 'initialState'];

const atomPermissions = atom<Set<string>>(new Set([]));
export const useSetAtomPermissions = () => useSetAtom(atomPermissions);
export const useAtomValuePermissions = () => useAtomValue(atomPermissions);

const atomKeepAliveRoutes = atom<string[]>([]);
export const useSetAtomKeepAliveRoutes = () => useSetAtom(atomKeepAliveRoutes);
export const useAtomValueKeepAliveRoutes = () => useAtomValue(atomKeepAliveRoutes);

export const useQueryInitialState = () => {
  const setAtomPermissions = useSetAtomPermissions();
  // const setAtomKeepAliveRoutes = useSetAtomKeepAliveRoutes();

  return useQuery(
    initialStateQueryKey,
    async () => {
      const [userInfo] = await Promise.all([sysLoginGetInfo()]);

      setAtomPermissions(new Set(userInfo.permissions));

      // const routeSettingMap = getRouteSettingMap(userRoutes);
      // setAtomKeepAliveRoutes(Object.keys(routeSettingMap).filter((i) => routeSettingMap[i].isKeepAlive));


      return {
        userInfo,
        routeSettingMap: {},
        menus: convertUserRoutesToMenus([
        //   {
        //   "name": "/settings",
        //   "path": "/settings",
        //   "hidden": false,
        //   "component": "Layout",
        //   "alwaysShow": false,
        //   "meta": {"title": "settings", "icon": "ProfileOutlined", "noCache": true, "link": null}
        // },
        {
          "name": "therapist",
          "path": "therapist",
          "hidden": false,
          "redirect": "noRedirect",
          "component": "Layout",
          "alwaysShow": true,
          "meta": {"title": "치료사정보", "icon": "ClothesGloves", "noCache": true, "link": null},
          "children": [
            {
              "name": "basic",
              "path": "basic",
              "hidden": false,
              "alwaysShow": false,
              "meta": {"title": "치료사정보", "icon": "post", "noCache": true, "link": null}
            },
            {
              "name": "cost",
              "path": "cost",
              "hidden": false,
              "alwaysShow": false,
              "meta": {"title": "치료정보", "icon": "cost", "noCache": true, "link": null}
            }
          ]
        },
          {
            "name": "therapist",
            "path": "agency",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {"title": "기관", "icon": "ClothesGloves", "noCache": true, "link": null},
            "children": [
              {
                "name": "basic",
                "path": "basic",
                "hidden": false,
                "alwaysShow": false,
                "meta": {"title": "기관정보", "icon": "post", "noCache": true, "link": null}
              },
              {
                "name": "recruit",
                "path": "recruit",
                "hidden": false,
                "alwaysShow": false,
                "meta": {"title": "모집그룹", "icon": "post", "noCache": true, "link": null}
              }
            ]
          },
          {
          "name": "user",
          "path": "user",
          "hidden": false,
          "redirect": "noRedirect",
          "component": "Layout",
          "alwaysShow": true,
          "meta": {"title": "유저정보", "icon": "ClothesGloves", "noCache": true, "link": null},
          "children": [

            {
              "name": "basic",
              "path": "basic",
              "hidden": false,
              "component": "system/post/index",
              "alwaysShow": false,
              "meta": {"title": "유저기본", "icon": "post", "noCache": true, "link": null}
            }
          ]
        },
          {
            "name": "child",
            "path": "child",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {"title": "아동정보", "icon": "ClothesGloves", "noCache": true, "link": null},
            "children": [

              {
                "name": "basic",
                "path": "basic",
                "hidden": false,
                "component": "child/basic/index",
                "alwaysShow": false,
                "meta": {"title": "모집공고", "icon": "child", "noCache": true, "link": null}
              },

              {
                "name": "meet",
                "path": "meet",
                "hidden": false,
                "component": "child/basic/index",
                "alwaysShow": false,
                "meta": {"title": "미팅정보", "icon": "child", "noCache": true, "link": null}
              }
            ]
          }
        , {
          "name": "/",
          "path": "/",
          "hidden": true,
          "component": "Layout",
          "alwaysShow": false,
          "meta": {"title": "첫페이지", "icon": "", "noCache": true, "link": null}
        }, {
          "name": "System",
          "path": "system",
          "hidden": false,
          "redirect": "noRedirect",
          "component": "Layout",
          "alwaysShow": true,
          "meta": {"title": "유저정보", "icon": "", "noCache": true, "link": null},
          "children": [
            //   {
            //   "name": "User",
            //   "path": "user",
            //   "hidden": false,
            //   "component": "system/user/index",
            //   "alwaysShow": false,
            //   "meta": {"title": "유저기본", "icon": "", "noCache": true, "link": null}
            // }, {
            //   "name": "Role-auth",
            //   "path": "role-auth",
            //   "hidden": true,
            //   "component": "Layout",
            //   "alwaysShow": false,
            //   "meta": {"title": "角色管理-用户授权", "icon": "#", "noCache": true, "link": null}
            // }, {
            //   "name": "Role",
            //   "path": "role",
            //   "hidden": false,
            //   "component": "system/role/index",
            //   "alwaysShow": false,
            //   "meta": {"title": "角色管理", "icon": "", "noCache": true, "link": null}
            // }, {
            //   "name": "Menu",
            //   "path": "menu",
            //   "hidden": false,
            //   "component": "system/menu/index",
            //   "alwaysShow": false,
            //   "meta": {"title": "菜单管理", "icon": "tree-table", "noCache": true, "link": null}
            // }, {
            //   "name": "Dept",
            //   "path": "dept",
            //   "hidden": false,
            //   "component": "system/dept/index",
            //   "alwaysShow": false,
            //   "meta": {"title": "部门管理", "icon": "tree", "noCache": true, "link": null}
            // },
            {
              "name": "Post",
              "path": "post",
              "hidden": false,
              "component": "system/post/index",
              "alwaysShow": false,
              "meta": {"title": "유저관리", "icon": "post", "noCache": true, "link": null}
            }
          ]
        },
        //   {
        //   "name": "Https://github.com/QNAV/RuoYi-X-Plus",
        //   "path": "https://github.com/QNAV/RuoYi-X-Plus",
        //   "hidden": false,
        //   "component": "Layout",
        //   "alwaysShow": false,
        //   "meta": {
        //     "title": "dd",
        //     "icon": "HomeOutlined",
        //     "noCache": true,
        //     "link": "https://github.com/QNAV/RuoYi-X-Plus"
        //   }
        // },
        //   {
        //   "name": "Demo",
        //   "path": "demo",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {"title": "cc", "icon": "BugOutlined", "noCache": true, "link": null},
        //   "children": [{
        //     "name": "Tree",
        //     "path": "tree",
        //     "hidden": false,
        //     "component": "demo/tree/index",
        //     "alwaysShow": false,
        //     "meta": {"title": "www", "icon": "", "noCache": true, "link": null}
        //   }, {
        //     "name": "Demo",
        //     "path": "demo",
        //     "hidden": false,
        //     "component": "demo/demo/index",
        //     "alwaysShow": false,
        //     "meta": {"title": "IHOMET", "icon": "#", "noCache": true, "link": null}
        //   }]
        // }
        ])
      };
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  );
};

export const useRefreshInitialState = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(initialStateQueryKey);
};
