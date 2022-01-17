import React from 'react';
import CvParagraph from './CvParagraph';
import { CvData, IWorkUnit } from './data';
import { Specialization } from './cvSpecialization';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types';
import { ICvFilterState } from './slice-CV';

const Block = (props: IWorkUnit) => {
  const cvFilters = useSelector((state: RootState) => state.cvFilters);

  return (
    <>
      <b>{props.placeWithDate}</b> {props.jobTitle}
      <br />
      <i>Description:</i> {props.description} <br />
      <Specialization
        specialization={props.frontend}
        position="FE"
        shouldDisplay={cvFilters.isFeSelected}
      />
      <Specialization
        specialization={props.backend}
        position="BE"
        shouldDisplay={cvFilters.isBeSelected}
      />
      <Specialization
        specialization={props.devops}
        position="DevOps"
        shouldDisplay={cvFilters.isDevOpsSelected}
      />
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
