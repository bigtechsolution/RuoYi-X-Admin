import { Result } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotExist: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="잘못된페이지."
      extra={
        <Link to="/" reloadDocument>
          돌아가기
        </Link>
      }
    />
  );
};
