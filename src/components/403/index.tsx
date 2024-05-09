import { Result } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const PermissionDenied: FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="죄송합니다. 이 페이지에 액세스할 수 있는 권한이 없습니다."
      extra={
        <Link to="/" reloadDocument>
           돌아가기
        </Link>
      }
    />
  );
};
