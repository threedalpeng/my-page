import { useKeyboardEvent, useThrottledEffect } from "@react-hookz/web/esnext";
import { createRef, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useMouseWheel } from "react-use";
import PathBackground from "./PathBackground";
import "./profile.css";
import HeadSection from "./sections/HeadSection";
import LeftSection from "./sections/LeftSection";
import SectionWrapper from "./sections/SectionWrapper";

const sections = [
  () => <HeadSection title="My Life Map"></HeadSection>,
  () => <LeftSection></LeftSection>,
  () => <h1 className="absolute text-white left-[300px] top-[300px]">Bye!</h1>,
  () => (
    <h1 className="absolute text-white left-[300px] top-[300px]">See you!</h1>
  ),
].map((section) => ({
  element: section,
  ref: createRef<HTMLDivElement>(),
}));

export default function Profile() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const nodeRef = sections[currentSectionIndex].ref;

  const mouseWheel = useMouseWheel();
  const recentMouseWheel = useRef(mouseWheel);

  useThrottledEffect(
    () => {
      const delta = mouseWheel - recentMouseWheel.current;
      recentMouseWheel.current = mouseWheel;
      if (delta > 0) {
        setCurrentSectionIndex((index) => {
          return ++index >= sections.length ? sections.length - 1 : index;
        });
      } else if (delta < 0) {
        setCurrentSectionIndex((index) => {
          return --index < 0 ? 0 : index;
        });
      }
    },
    [mouseWheel],
    50
  );

  useKeyboardEvent(
    (e) => {
      return ["Down", "ArrowDown", "Up", "ArrowUp"].includes(e.key);
    },
    (e) => {
      switch (e.key) {
        case "Down":
        case "ArrowDown":
          setCurrentSectionIndex((index) => {
            return ++index >= sections.length ? sections.length - 1 : index;
          });
          break;
        case "Up":
        case "ArrowUp":
          setCurrentSectionIndex((index) => {
            return --index < 0 ? 0 : index;
          });
          break;
      }
    }
  );

  return (
    <div
      className="w-full h-full m-0 p-0 text-white"
      onClick={() =>
        setCurrentSectionIndex((index) => {
          return ++index >= sections.length ? 0 : index;
        })
      }
    >
      <PathBackground
        key="ProfilePath"
        sectionCount={sections.length}
        currentSection={currentSectionIndex}
      ></PathBackground>
      <SwitchTransition>
        <CSSTransition
          key={currentSectionIndex}
          nodeRef={nodeRef}
          addEndListener={(done) => {
            nodeRef.current?.addEventListener("transitionend", done, false);
          }}
          classNames="slid"
        >
          <SectionWrapper ref={nodeRef}>
            {sections[currentSectionIndex].element()}
          </SectionWrapper>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
