import { ReactNode } from "react";
import { forwardRef, type LegacyRef } from "react";

interface SectionWrapperProps {
  children: ReactNode;
}

function _SectionWrapper(
  props: SectionWrapperProps,
  ref: LegacyRef<HTMLDivElement> | undefined
) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen" ref={ref}>
      {props.children}
    </div>
  );
}

const SectionWrapper = forwardRef(_SectionWrapper);
export default SectionWrapper;
