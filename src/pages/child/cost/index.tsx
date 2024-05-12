import { BasePageContainer } from '@/components';
import ModalAddOrEdit from './components/ModalAddOrEdit';
import CureModalAddOrEdit from './components/CureModalAddOrEdit';

import TableMain from './components/TableMain';
import type { FC } from 'react';

const PageTherapistBasic: FC = () => {
  return (
    <BasePageContainer>
      <TableMain />
      <ModalAddOrEdit />
      <CureModalAddOrEdit />
    </BasePageContainer>
  );
};

export default PageTherapistBasic;
