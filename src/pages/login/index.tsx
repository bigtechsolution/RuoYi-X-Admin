import { useRefreshInitialState } from '@/models';
import Actions from '@/pages/login/components/Actions';
import FormLoginByPhone from '@/pages/login/components/FormLoginByPhone';
import FormLoginByPwd from '@/pages/login/components/FormLoginByPwd';
import type { SmsLoginBo, UserNameLoginBo } from '@/services/system/data-contracts';
import { sysLoginPostLogin } from '@/services/system/Login';
import { sysLoginPostSmsLogin } from '@/services/system/SmsLogin';
import { setToken, StorageType } from '@/utils';
import { LoginFormPage, ProFormCheckbox } from '@ant-design/pro-components';
import { App, Tabs } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface FormData extends UserNameLoginBo, SmsLoginBo {
  autoLogin: boolean;
}

enum LoginType {
  MOBILE = 'MOBILE',
  USERNAME = 'USERNAME',
}

const PageLogin: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.USERNAME);

  const refreshInitialState = useRefreshInitialState();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // const { data: getCaptchaImageRes, run: getCaptchaImage } = useRequest(() => captchaGetGetCode({ secure: false }));

  const handleLoginSuccess = async (autoLogin: boolean, token: string) => {
    setToken(autoLogin ? StorageType.LOCAL_STORAGE : StorageType.SESSION_STORAGE, `Bearer ${token}`);

    await refreshInitialState();

    navigate(searchParams.get('redirect') ?? '/');
  };

  const loginBySms = async (autoLogin: boolean, data: SmsLoginBo) => {
    const { token } = await sysLoginPostSmsLogin(data);

    await handleLoginSuccess(autoLogin, token);
  };

  const { message } = App.useApp();

  const loginByUsername = async (autoLogin: boolean, data: UserNameLoginBo) => {


    const payload = await sysLoginPostLogin({ ...data,  }, { secure: false });
    console.log(payload)
    await handleLoginSuccess(autoLogin, payload.accessToken);
  };

  const submit = async (e: FormData) => {
    try {
      const { autoLogin, ...formData } = e;

      if (loginType === LoginType.MOBILE) {
        await loginBySms(autoLogin, formData);
        return;
      }

      if (loginType === LoginType.USERNAME) {
        await loginByUsername(autoLogin, formData);
        return;
      }
    } catch (error) {
      if (loginType === LoginType.USERNAME) {
      }
    }
  };

  useEffect(() => {
    if (searchParams.get('msg')) {
      message.error(searchParams.get('msg'));
    }
  }, []);

  return (
    <div className="h-[100vh]">
      <LoginFormPage<FormData>
        // backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="아이홈티 Admin"
        subTitle="아이홈티"
        actions={<Actions />}
        onFinish={submit}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={[
            {
              label: '로그인',
              key: LoginType.USERNAME,
            },
            // {
            //   label: '手机号登录',
            //   key: LoginType.MOBILE,
            // },
          ]}
        />

        {loginType === LoginType.USERNAME && (
          <FormLoginByPwd />
        )}

        {loginType === LoginType.MOBILE && <FormLoginByPhone />}

        <ProFormCheckbox name="autoLogin">자동로그인</ProFormCheckbox>
      </LoginFormPage>
    </div>
  );
};

export default PageLogin;
