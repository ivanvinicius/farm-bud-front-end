import React from 'react';
import ReactModal, { Props } from 'react-modal';

import reactModalCustomStyle from './reactModalCustomStyle';

const Modal: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <ReactModal style={reactModalCustomStyle} {...rest}>
      {children}
    </ReactModal>
  );
};

export default Modal;
