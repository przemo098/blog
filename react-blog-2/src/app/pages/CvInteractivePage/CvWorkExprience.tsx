import React from 'react';
import CvParagraph from './CvParagraph';
import { IWorkUnit } from './data';
import { CvData } from './data';

const Block = (props: IWorkUnit) => {
  return (
    <>
      <b>{props.placeWithDate}</b> {props.jobTitle}
      <br />
      <i>Description:</i> {props.description} <br />
      {/*<i>Tech stack:</i> {props.techStack}*/}
      <br />
    </>
  );
};

export default function CvWorkExprience() {
  return (
    <div>
      <CvParagraph text={'WORK EXPERIENCE'} />
      {CvData.map((x, i) => (
        <Block key={i} {...x}></Block>
      ))}
    </div>
  );
}
