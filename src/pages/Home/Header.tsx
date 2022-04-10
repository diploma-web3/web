import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  z-index: 999;
`;

const TitleLayout = styled.div`
  text-align: center;
`;

const LogoLayout = styled.div`
  position: absolute;
  left: 7rem;
`;

const Title1 = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Title2 = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const Title3 = styled.h3`
  margin: 0;
`;

const Header = () => {
  return (
    <Layout>
      <LogoLayout>
        Logo
      </LogoLayout>
      <TitleLayout>
        <Title1>
          BAN CƠ YẾU CHÍNH PHỦ
        </Title1>
        <Title2>
          HỌC VIỆN KỸ THUẬT MẬT MÃ
        </Title2>
        <Title3>
          TRANG QUẢN LÝ VĂN BẰNG
        </Title3>
      </TitleLayout>
    </Layout>
  );
};

export default Header;