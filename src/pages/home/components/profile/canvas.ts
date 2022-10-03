import { useMountEffect, useWindowSize } from "@react-hookz/web/esnext";
import { useMemo, useRef, useState, type RefObject } from "react";

export function useCanvasRenderingContext(
  canvasEl: RefObject<HTMLCanvasElement>
) {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  useMountEffect(() => {
    const canvas = canvasEl.current;
    const context = canvas!.getContext("2d");
    contextRef.current = context;
    setCtx(contextRef.current!);
  });
  return ctx;
}

export function useRelativePositionToWindowSize(sectionCount: number) {
  const { width, height } = useWindowSize();
  return useMemo(
    () => ({
      window: {
        width,
        height,
      },
      canvas: {
        width,
        height: height * sectionCount,
      },
      upY: height * 0.1,
      centerY: height * 0.5,
      downY: height * 0.9,
      leftX: width * 0.1,
      centerX: width * 0.5,
      rightX: width * 0.9,
      curve: {
        posY: height * 0.9,
        radius: height * 0.15,
      },
    }),
    [width, height]
  );
}
