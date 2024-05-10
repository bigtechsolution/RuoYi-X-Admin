import { BasePageContainer } from '@/components';
import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import type { FC } from 'react';

const PageHome: FC = () => {
  return (
    <BasePageContainer>
      <Result icon={<SmileOutlined />} title="Hi，어드민!" />
    </BasePageContainer>
  );
};

export default PageHome;
