import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Tabs } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import ManageForm from './ManageForm';
import { Header } from 'antd/es/layout/layout';
import { connectMetamask } from '../../utils/contract';
import ListForm from './ListForm';

const { TabPane } = Tabs;

const ContentLayout = styled.div`
  padding-top: 10rem;
  height: 100rem;
  padding-left: 5rem;
  padding-right: 5rem;
`;

type TabName = 'list' | 'find' | 'manage';

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState<TabName>('list');
  useEffect(() => {
    (async () => {
      await connectMetamask();
    })();
  }, []);

  return (
    <div>
      <Header />
      <ContentLayout>
        <Card>
          <Tabs
            size={'small'}
            activeKey={selectedTab}
            onChange={(tab) => setSelectedTab(tab as TabName)}
          >
            <TabPane key={'list'} tab={<span>Danh sách văn bằng</span>} />
            <TabPane
              key={'manage'}
              tab={
                <span>
                  {' '}
                  <LockOutlined /> Quản lý văn bằng
                </span>
              }
            />
          </Tabs>

          <div>
            {selectedTab === 'list' && <ListForm />}
            {selectedTab === 'manage' && <ManageForm />}
          </div>
        </Card>
      </ContentLayout>
    </div>
  );
};

export default Admin;
