import React, { useMemo, ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface IActionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: 'create' | 'update' | 'delete' | 'detail';
}

const ActionButton: React.FC<IActionButton> = ({ actionType, ...rest }) => {
  const buttonDescription = useMemo(
    () => ({
      create: 'Cadastrar',
      update: 'Atualizar',
      delete: 'Excluir',
      detail: 'Visualizar',
    }),
    [],
  );

  return (
    <Container type="button" {...rest}>
      {buttonDescription[actionType]}
    </Container>
  );
};

export default ActionButton;
