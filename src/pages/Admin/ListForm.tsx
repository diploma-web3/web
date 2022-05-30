import React, { useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { connectMetamask, findManyByIdNum, getUriById, removeNFT } from '../../utils/contract';
import { getIpfsUrl } from '../../utils/ipfs';
import { BigNumber } from 'ethers';

const Layout = styled.div`
  padding-top: 0.5rem;
`;

const UserIcon = styled(UserOutlined)`
  opacity: 0.5;
`;

type FormValues = {
  studentId: string;
};

const ListForm = () => {
  const [form] = Form.useForm<FormValues>();
  const [diplomas, setDiplomas] = useState<any[]>([]);

  const columns = [
    {
      title: 'Số hiệu',
      dataIndex: 'dipId',
      key: 'dipId'
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any, { createdAt }: any) => createdAt
    },
    {
      title: 'Văn bằng',
      dataIndex: 'ipfsHash',
      key: 'ipfsHash',
      render: (text: any, { ipfsHash }: any) => (
        <a href={getIpfsUrl(ipfsHash)} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      )
    },
    {
      title: 'Quản lý',
      render: (text: any, record: any) => (
        <Button
          type="link"
          danger
          onClick={async () => {
            console.log(record);
            const { id, studentId, dipId, ipfsHash } = record;
            const contract = await connectMetamask();
            await removeNFT(contract, BigNumber.from(id), studentId, parseInt(dipId), ipfsHash);
            console.log(id);
          }}
        >
          Xóa
        </Button>
      )
    }
  ];

  const onFinish = async (values: FormValues) => {
    const contract = await connectMetamask();
    const { studentId } = values;
    const ids = await findManyByIdNum(contract, studentId);
    const tokens = await Promise.all(
      ids.map(async (id) => ({
        id: id.toString(),
        uri: await getUriById(id.toString())
      }))
    );
    const dips = await Promise.all(
      tokens.map(async ({ id, uri }) => ({
        id,
        ...(await fetch(uri).then((res) => res.json()))
      }))
    );
    setDiplomas(dips);
  };

  return (
    <Layout>
      <Form form={form} layout={'vertical'} onFinish={onFinish}>
        <Form.Item label="Mã sinh viên" required={true} name={'studentId'}>
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

      <Table columns={columns} dataSource={diplomas} />
    </Layout>
  );
};

export default ListForm;
