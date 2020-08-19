import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import { useToast, IToastMessage } from '../../../hooks/toast';

import { Container } from './styles';

interface IToastProps {
  message: IToastMessage;
  style: object;
}

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiX size={18} />
      </button>
    </Container>
  );
};

export default Toast;
