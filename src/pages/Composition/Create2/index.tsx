import React, { useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Header from '../../../components/Header';
import NumericInput from '../../../components/NumericInput';

import { ListItem, Info, InputArea, Quantity, Content } from './styles';
import Button from '../../../components/Button';

const CreateComposition2: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { items, others } = useLocation().state as any;

  const handleSubmit = useCallback(
    (data: any) => {
      console.log(others);
      console.log(data);
    },
    [others],
  );

  return (
    <div>
      <Header
        urlBack="/create-composition-step-1"
        headerTitle="Finalizar Cadastro de Composição"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Content>
          {items.map((item: any) => (
            <ListItem key={item.id}>
              <Info>
                <strong>{item.product_name}</strong>
                <p>{item.formatted_price}</p>
              </Info>

              <Quantity>
                <InputArea>
                  <NumericInput
                    name={String(item.product_id)}
                    placeholder="0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    allowDecimals
                    decimalsLimit={2}
                  />
                </InputArea>
                <p>{`${item.measure_name}(s) em 1 hectere`}</p>
              </Quantity>
            </ListItem>
          ))}
          <Button type="submit">Cadastrar</Button>
        </Content>
      </Form>
    </div>
  );
};

export default CreateComposition2;
