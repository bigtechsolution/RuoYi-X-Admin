import { ProComponentsProvider } from '@/features/ProComponentsProvider';
import { Element } from '@/routes';
import { checkIsLoginPage, checkToken } from '@/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './global.less';

const render = () => {
  const hasToken = checkToken();
  const isLoginPage = checkIsLoginPage();

  if (!hasToken && !isLoginPage) {
    window.location.replace(`${LOGIN_PATH_NAME}?redirect=${window.location.pathname}`);
    return;
  }

  const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider>
              <ProComponentsProvider>
                <Element />
              </ProComponentsProvider>
            </ConfigProvider>
            <ReactQueryDevtools position="bottom-right" />
          </QueryClientProvider>
        </RecoilRoot>
      </BrowserRouter>
    </StrictMode>,
  );
};

render();
