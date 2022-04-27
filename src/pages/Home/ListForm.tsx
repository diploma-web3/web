import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

const Layout = styled.div`
  padding-top: 0.5rem;
`;

const UserIcon = styled(UserOutlined)`
  opacity: 0.5;
`

type FormValues = {
  icNum: string;
};

const ListForm = () => {
  const [form] = Form.useForm<FormValues>();

  return (
    <Layout>
      <Form form={form} layout={'vertical'}>
        <Form.Item label="Mã sinh viên" required={true} name={'icNum'}>
          <Input prefix={<UserIcon />} placeholder="Nhập mã sinh viên" />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button type="primary" htmlType={'submit'}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Layout>
  );
};

export default ListForm;
