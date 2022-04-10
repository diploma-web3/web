import React from 'react';
import { Button, Form } from 'antd';
import styled from 'styled-components';
import { LockOutlined } from '@ant-design/icons';

const Layout = styled.div`
  padding-top: 0.5rem;
`;

type FormValues = {
  dipId: string;
};

const Manage = () => {
  const [form] = Form.useForm<FormValues>();

  return (
    <Layout>
      <Form form={form} layout={'vertical'}>
        <div style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button icon={<LockOutlined />} type="primary" htmlType={'submit'}>
              Xác thực để tiếp tục
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Layout>
  );
};

export default Manage;
