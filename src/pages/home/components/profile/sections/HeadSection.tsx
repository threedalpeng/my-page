import {
  mdiArrowDown,
  mdiArrowUp,
  mdiCursorDefaultClick,
  mdiKeyboardF11,
} from "@mdi/js";
import Icon from "@mdi/react";
import TextBlock from "./TextBlock";

interface HeadSectionProps {
  title: string;
}

export default function HeadSection(props: HeadSectionProps) {
  return (
    <>
      <TextBlock
        top="28"
        left="50"
        align="center"
        baseline="bottom"
        type="display"
      >
        {props.title}
      </TextBlock>

      <TextBlock top="75" left="5" baseline="top" type="small">
        <Icon size="1em" path={mdiKeyboardF11} />
        <br />
        <Icon size="1em" path={mdiCursorDefaultClick} />
        <br />
        <Icon size="1em" path={mdiArrowUp} />
        <Icon size="1em" path={mdiArrowDown} />
      </TextBlock>
      <TextBlock top="75" left="calc(5vw + 2em)" baseline="top" type="small">
        &nbsp;풀스크린
        <br />
        &nbsp;슬라이드
        <br />
        &nbsp;이전/다음으로
      </TextBlock>

      <TextBlock top="35" left="95" align="right" baseline="top">
        소프트웨어학과
        <br />
        김정원
        <br />
      </TextBlock>
    </>
  );
}
