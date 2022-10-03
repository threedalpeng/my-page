import TextBlock from "./TextBlock";

// interface HeadSectionProps {
//   title: string;
// }

export default function LeftSection(props: any) {
  return (
    <>
      <TextBlock top="10" left="80" type="title" align="right">
        하하하
      </TextBlock>
      <TextBlock top="80" left="5">
        <br />
      </TextBlock>
    </>
  );
}
