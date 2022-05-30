import React, { useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { Card, Tabs } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import ListForm from './ListForm';
import FindForm from './FindForm';
import ManageForm from '../Admin/ManageForm';

const { TabPane } = Tabs;

const ContentLayout = styled.div`
  padding-top: 10rem;
  height: 100rem;
  padding-left: 5rem;
  padding-right: 5rem;
`;

type TabName = 'list' | 'find' | 'manage';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<TabName>('list');

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
            <TabPane key={'list'} tab={<span>Tìm kiếm văn bằng</span>} />
            <TabPane key={'find'} tab={<span>Tra cứu văn bằng</span>} />
          </Tabs>

          <div>
            {selectedTab === 'list' && <ListForm />}
            {selectedTab === 'find' && <FindForm />}
          </div>
        </Card>
      </ContentLayout>
    </div>
  );
};

export default Home;
