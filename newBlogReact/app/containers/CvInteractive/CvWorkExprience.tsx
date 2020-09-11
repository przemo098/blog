import React from 'react';
import CvParagraph from './CvParagraph';

interface IBlockProps {
  placeWithDate: string,
  jobTitle: string,
}

const Block = (props: IBlockProps) => {
  return <>
    <b>{props.placeWithDate}</b> {props.jobTitle}
  </>;
};


export default function() {
  return <div>
    <CvParagraph text={'WORK EXPERIENCE'}/>
    <Block placeWithDate={'Danske Bank (11.2019 – today)'} jobTitle={'Consultant'}></Block>
  </div>;
}
