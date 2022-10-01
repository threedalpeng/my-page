import {
  useDebouncedEffect,
  useKeyboardEvent,
  useThrottledEffect,
  useThrottledState,
} from "@react-hookz/web/esnext";
import { createRef, useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {
  useDebounce,
  useMouseWheel,
  useThrottle,
  useThrottleFn,
} from "react-use";
import PathBackground from "./PathBackground";
import "./sample.css";
import SectionWrapper from "./sections/SectionWrapper";
const components = [
  () => (
    <div className="w-screen h-screen flex flex-col items-center">
      <h1 className="pt-[25vh] m-0 text-white">My Life Map</h1>
    </div>
  ),
  () => (
    <h1 className="absolute text-white left-[300px] top-[300px]">Thank you!</h1>
  ),
  () => <h1 className="absolute text-white left-[300px] top-[300px]">Bye!</h1>,
  () => (
    <h1 className="absolute text-white left-[300px] top-[300px]">See you!</h1>
  ),
].map((component) => ({
  element: component,
  ref: createRef<HTMLDivElement>(),
}));
export default function Profile() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const nodeRef = components[sectionIndex].ref;

  const mouseWheel = useMouseWheel();
  const recentMouseWheel = useRef(mouseWheel);

  useThrottledEffect(
    () => {
      const delta = mouseWheel - recentMouseWheel.current;
      recentMouseWheel.current = mouseWheel;
      if (delta > 0) {
        setSectionIndex((index) => {
          return ++index >= components.length ? components.length - 1 : index;
        });
      } else if (delta < 0) {
        setSectionIndex((index) => {
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
          setSectionIndex((index) => {
            return ++index >= components.length ? components.length - 1 : index;
          });
          break;
        case "Up":
        case "ArrowUp":
          setSectionIndex((index) => {
            return --index < 0 ? 0 : index;
          });
          break;
      }
    }
  );

  return (
    <div
      className="w-full h-full m-0 p-0"
      onClick={() =>
        setSectionIndex((index) => {
          return ++index >= components.length ? 0 : index;
        })
      }
    >
      <PathBackground
        key="ProfilePath"
        sectionCount={components.length}
        currentSection={sectionIndex}
      ></PathBackground>
      <SwitchTransition>
        <CSSTransition
          key={sectionIndex}
          nodeRef={nodeRef}
          addEndListener={(done) => {
            nodeRef.current?.addEventListener("transitionend", done, false);
          }}
          classNames="slid"
        >
          <SectionWrapper ref={nodeRef}>
            {components[sectionIndex].element()}{" "}
            <span className="text-white">{sectionIndex}</span>
          </SectionWrapper>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
