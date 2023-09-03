interface IProps {
  text: string;
}

export default function CvParagraph(props: IProps) {
  return (
    <>
      <p style={{marginBottom: 0}}>
        <b>{props.text}</b>
      </p>
      <hr style={{marginTop: 0}} />
    </>
  );
}
