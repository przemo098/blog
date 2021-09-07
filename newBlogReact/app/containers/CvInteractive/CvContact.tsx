import React from 'react';
import CvParagraph from './CvParagraph';
import CvLeftTd from './Components/CvLeftTd';

export default function CvContact() {
  return (
    <div>
      <CvParagraph text={'Contact'} />
      <table>
        <tbody>
          <tr>
            <CvLeftTd>Name Surname:</CvLeftTd>
            <td>Przemysław Kamiński:</td>
          </tr>
          <tr>
            <CvLeftTd>Birth date:</CvLeftTd>
            <td>07.07.1993</td>
          </tr>
          <tr>
            <CvLeftTd>Telephone:</CvLeftTd>
            <td>+48 729 553 162</td>
          </tr>
          <tr>
            <CvLeftTd>E-mail:</CvLeftTd>
            <td>kaminski.przemyslaw@hotmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
