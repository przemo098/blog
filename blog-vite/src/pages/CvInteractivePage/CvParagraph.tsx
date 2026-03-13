interface IProps {
  text: string;
}

export default function CvParagraph(props: IProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider m-0">
        {props.text}
      </h2>
      <div className="mt-1 h-0.5 bg-gradient-to-r from-slate-800 to-transparent rounded" />
    </div>
  );
}
