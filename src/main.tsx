import { ProComponentsProvider } from '@/features';
import { routes } from '@/routes';
import '@/styles/nprogress.css';
import '@/styles/tailwind.css';
import { checkToken, redirectToLoginPage } from '@/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import koKr from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Provider } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const bootstrap = () => {
  const basename = import.meta.env.BASE_URL;

  const currBasename = window.location.pathname.replace(basename, '/');
  if (currBasename !== '/login' && !checkToken()) {
    redirectToLoginPage();
    return;
  }

  dayjs.locale('ko-kr');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const router = createBrowserRouter(routes, { basename });

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider locale={koKr}>
            <App>
              <ProComponentsProvider>
                <RouterProvider router={router} />
              </ProComponentsProvider>
            </App>
          </ConfigProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  );
};

bootstrap();
