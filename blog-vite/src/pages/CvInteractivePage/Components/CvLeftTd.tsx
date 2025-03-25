interface CvLeftTdProps {
  children: React.ReactNode;
}

export default function CvLeftTd({ children }: CvLeftTdProps) {
  return (
    <td className="font-semibold pr-4">{children}</td>
  );
}
