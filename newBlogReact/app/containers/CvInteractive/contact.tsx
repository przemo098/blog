import React from 'react';
import styled from 'styled-components';
import CvParagraph from './CvParagraph';

const LeftTd = styled.td`
  font-weight: bold;
`;


export default function CvContact() {
  return <div>
    <CvParagraph text={'Contact'}/>
    <table>
      <tbody>
      <tr>
        <LeftTd>Name Surname:</LeftTd>
        <td>Przemysław Kamiński:</td>
      </tr>
      <tr>
        <LeftTd>Birth date:</LeftTd>
        <td>07.07.1993</td>
      </tr>
      <tr>
        <LeftTd>Telephone:</LeftTd>
        <td>+48 729 553 162</td>
      </tr>
      <tr>
        <LeftTd>E-mail:</LeftTd>
        <td>kaminski.przemyslaw@hotmail.com</td>
      </tr>
      </tbody>
    </table>
  </div>;
}
