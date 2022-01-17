import React from 'react';
import CvParagraph from './CvParagraph';
import { IWorkUnit } from './data';
import { CvData } from './data';
import { Specialization } from './cvSpecialization';

const Block = (props: IWorkUnit) => {
  return (
    <>
      <b>{props.placeWithDate}</b> {props.jobTitle}
      <br />
      <i>Description:</i> {props.description} <br />
      <Specialization specialization={props.frontend} position="FE" />
      <Specialization specialization={props.backend} position="BE" />
      <Specialization specialization={props.devops} position="DevOps" />
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
