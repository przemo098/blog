interface IProps {
  text: string;
}

export default function CvParagraph(props: IProps) {
  return (
    <>
      <p className="mb-0">
        <b>{props.text}</b>
      </p>
      <hr className="mt-0" />
    </>
  );
}
