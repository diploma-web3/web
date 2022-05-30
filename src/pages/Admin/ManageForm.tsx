import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import styled from 'styled-components';
import { LockOutlined } from '@ant-design/icons';
import { pinFileToIpfs, pinObject } from '../../utils/ipfs';
import { connectMetamask, createNFT } from '../../utils/contract';

const Layout = styled.div`
  padding-top: 0.5rem;
`;

type FormValues = {
  dipId: string;
  name: string;
  studentId: string;
  createdAt: Date;
  ipfsHash: string;
};

const Manage = () => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      const contract = await connectMetamask();

      const { dipId, name, studentId, createdAt, ipfsHash } = values;
      const dip = {
        dipId: parseInt(dipId),
        name,
        studentId,
        createdAt: createdAt.toISOString(),
        ipfsHash
      };
      const res = await pinObject(JSON.stringify(dip));
      const { IpfsHash } = res.data;

      const tokenId = await createNFT(contract, studentId, parseInt(dipId), IpfsHash);
      console.log(tokenId);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Form form={form} layout={'vertical'} onFinish={onFinish}>
        <Form.Item
          label="Số hiệu văn bằng"
          name="dipId"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ tên sinh viên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã sinh viên"
          name="studentId"
          rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày cấp"
          name="createdAt"
          rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="File" name="ipfsHash" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="upload" label="Văn bằng" rules={[{ required: true }]}>
          <Upload
            name="logo"
            beforeUpload={async (file) => {
              try {
                setLoading(true);
                const res = await pinFileToIpfs(file);
                const { IpfsHash } = res.data;
                form.setFields([
                  {
                    name: 'ipfsHash',
                    value: IpfsHash
                  }
                ]);
              } catch (e) {
              } finally {
                setLoading(false);
              }
              return false;
            }}
            disabled={loading}
          >
            <Button disabled={loading}>Click để Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button icon={<LockOutlined />} type="primary" htmlType={'submit'} disabled={loading}>
            Lưu trữ văn bằng
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Manage;
