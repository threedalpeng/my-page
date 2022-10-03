import type { CSSProperties, ReactNode } from "react";

interface TextBlockProps {
  children?: ReactNode;
  top?: string;
  left?: string;
  align?: "left" | "center" | "right";
  baseline?: "top" | "center" | "bottom";
  type?: "display" | "title" | "subtitle" | "content" | "small";
}

export default function TextBlock(props: TextBlockProps = {}) {
  let {
    top = "50vw",
    left = "50vh",
    align = "left",
    baseline = "center",
    type = "content",
  } = props;

  const style: CSSProperties = {
    top,
    left,
  };
  if (!isNaN(Number(top))) {
    style.top = top + "vh";
  }
  if (!isNaN(Number(left))) {
    style.left = left + "vw";
  }

  let translateX = "0";
  style.textAlign = "left";
  switch (align) {
    case "center":
      translateX = "-50%";
      style.textAlign = "center";
      break;
    case "right":
      translateX = "-100%";
      style.textAlign = "right";
      break;
  }

  let translateY = "-50%";
  switch (baseline) {
    case "top":
      translateY = "0";
      break;
    case "bottom":
      translateY = "-100%";
      break;
  }
  style.transform = `translate(${translateX}, ${translateY})`;

  style.fontSize = "5vmin";
  style.fontWeight = "100";
  style.lineHeight = "1em";
  switch (type) {
    case "display":
      style.fontSize = "15vmin";
      style.fontWeight = "600";
      style.lineHeight = "1em";
      break;
    case "title":
      style.fontSize = "10vmin";
      style.fontWeight = "450";
      style.lineHeight = "1em";
      break;
    case "subtitle":
      style.fontSize = "8vmin";
      style.fontWeight = "300";
      style.lineHeight = "1em";
      break;
    case "small":
      style.fontSize = "4vmin";
      style.fontWeight = "50";
      style.lineHeight = "1em";
      break;
  }

  return (
    <span className="absolute m-0 p-0 b-0 whitespace-nowrap" style={style}>
      {props.children}
    </span>
  );
}
