import React from 'react';
import CvParagraph from './CvParagraph';
import CvLeftTd from "./Components/CvLeftTd";


export default function CvEducation() {
  return <div>
    <CvParagraph text={'EDUCATION'}/>
    <table>
      <tbody>
      <tr>
        <CvLeftTd>02.2012 – 10.2017</CvLeftTd>
        <td>Wroclaw University of Technology</td>
      </tr>
      <tr>
        <td/>
        <td>BSc. Teleinformatics + MSc. Informatics (internet engineering)</td>
      </tr>
      </tbody>
    </table>
  </div>;
}
