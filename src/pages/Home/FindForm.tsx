import React from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { FileSearchOutlined, QrcodeOutlined } from '@ant-design/icons';

const Layout = styled.div`
  padding-top: 0.5rem;
`;

const InputIcon = styled(FileSearchOutlined)`
  opacity: 0.5;
`;

type FormValues = {
  dipId: string;
};

const FindForm = () => {
  const [form] = Form.useForm<FormValues>();

  return (
    <Layout>
      <Form form={form} layout={'vertical'}>
        <Form.Item label="Số hiệu văn bằng" required={true} name={'dipId'}>
          <Input prefix={<InputIcon />} placeholder="Nhập số hiệu văn bằng" />
        </Form.Item>
        <Form.Item>
          <Button icon={<QrcodeOutlined />}>Quét mã QR</Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button type="primary" htmlType={'submit'}>
              Tra cứu
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Layout>
  );
};

export default FindForm;
