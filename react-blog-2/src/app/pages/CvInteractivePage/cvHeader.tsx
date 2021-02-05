import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.h1`
  margin-bottom: 0px;
`;

export default function CvHeader() {
  return (
    <Wrapper>
      <div className="cv-header">
        <Header>Curriculum Vitae</Header>
      </div>
    </Wrapper>
  );
}
