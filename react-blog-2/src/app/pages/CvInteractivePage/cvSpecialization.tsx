import { ISpecialization, IWorkUnit } from './data';
import React from 'react';

interface IProps {
  specialization: ISpecialization;
  position: string;
}

export const Specialization = ({ position, specialization }: IProps) => {
  return (
    <div style={{ fontSize: '13px' }}>
      <b>{position}:</b> {specialization.description} <br />
      <i>Stack:</i> {specialization.techStack} <br />
    </div>
  );
};
