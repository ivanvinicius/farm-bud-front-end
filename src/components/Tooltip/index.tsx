import React from 'react';

import { Container } from './styles';

interface ITooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ children, title, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
