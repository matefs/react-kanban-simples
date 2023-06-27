import React from 'react';
import { Form, Input, Button } from 'antd';

const NewCardForm = ({ handleFormSubmit, columnTitle }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleFormSubmit(values, columnTitle);
    form.resetFields();
  };

  return (
    <Form
      className="new-card-form"
      onFinish={onFinish}
      style={{ marginTop: '4%', cursor:'pointer'}}
      initialValues={{ card: '' }}
      form={form}
    >
      <Form.Item name="cardTitle">
        <Input name="card" placeholder="Digite o título do card" maxLength={65}/>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Adicionar Card
      </Button>
    </Form>
  );
};

export default NewCardForm;

