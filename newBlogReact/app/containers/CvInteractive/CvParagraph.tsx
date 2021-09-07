import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  margin-bottom: 0px;
`;
const Separator = styled.hr`
  margin-top: 0px;
`;

interface IProps {
  text: string;
}

export default function(props: IProps) {
  return (
    <>
      <Paragraph>
        <b>{props.text}</b>
      </Paragraph>
      <Separator />
    </>
  );
}
