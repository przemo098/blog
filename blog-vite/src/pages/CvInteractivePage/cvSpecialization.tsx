import { ISpecialization } from './data';

interface IProps {
  specialization?: ISpecialization;
  position: string;
  shouldDisplay: boolean;
}

export const Specialization = ({
  position,
  specialization,
  shouldDisplay,
}: IProps) => {
  if (!shouldDisplay || !specialization) return <></>;

  return (
    <div style={{ fontSize: '13px' }}>
      <b>{position}:</b> {specialization?.description} <br />
      <i>Stack:</i> {specialization?.techStack} <br />
    </div>
  );
};
