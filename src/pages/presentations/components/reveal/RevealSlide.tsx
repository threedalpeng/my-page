import { type ReactNode } from "react";

interface RevealSlideProps {
  children: ReactNode;
}
export default function RevealSlide({ children }: RevealSlideProps) {
  return <div className="slides">{children}</div>;
}
