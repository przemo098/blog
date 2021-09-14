import React from 'react';
import CvParagraph from './CvParagraph';
import { IWorkUnit, CvData } from './data';
import { ICvInterActiveFilters } from './index';

function Block(props: IWorkUnit & ICvInterActiveFilters) {
  // if(props.showBe && props.)

  return (
    <>
      <b>{props.placeWithDate}</b> {props.jobTitle}
      <br />
      <i>Description:</i> {props.description} <br />
      <i>Tech stack:</i> {props.techStack}
      <br />
    </>
  );
}

export default function(props: ICvInterActiveFilters) {
  return (
    <div>
      <CvParagraph text="WORK EXPERIENCE" />
      {CvData.map(x => (
        <Block {...x} {...props} />
      ))}
    </div>
  );
}
