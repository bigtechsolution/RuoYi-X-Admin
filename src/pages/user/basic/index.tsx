import { BasePageContainer } from '@/components';
import ModalAddOrEdit from '@/pages/user/basic/components/ModalAddOrEdit';
import TableMain from '@/pages/user/basic/components/TableMain';
import type { FC } from 'react';

const PagePost: FC = () => {
  return (
    <BasePageContainer>
      <TableMain />

      <ModalAddOrEdit />
    </BasePageContainer>
  );
};

export default PagePost;
