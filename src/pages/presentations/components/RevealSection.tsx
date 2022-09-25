import { type ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
}
export default function RevealSection({ children }: RevealSectionProps) {
  return <section>{children}</section>;
}
