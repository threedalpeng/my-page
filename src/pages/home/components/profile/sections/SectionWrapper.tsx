import { ReactNode } from "react";
import { forwardRef, LegacyRef } from "react";

interface SectionWrapperProps {
  children: ReactNode;
}

function _SectionWrapper(
  props: SectionWrapperProps,
  ref: LegacyRef<HTMLDivElement> | undefined
) {
  return (
    <div className="absolute top-0 left-0" ref={ref}>
      {props.children}
    </div>
  );
}

const SectionWrapper = forwardRef(_SectionWrapper);
export default SectionWrapper;
