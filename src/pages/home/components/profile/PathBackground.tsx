import { useMountEffect, useWindowSize } from "@react-hookz/web/esnext";
import { useEffect, useMemo, useRef, useState } from "react";

interface PathBackgroundProps {
  sectionCount: number;
}

export default function PathBackground({ sectionCount }: PathBackgroundProps) {
  const { width, height } = useWindowSize();
  const canvasHeight = useMemo(() => {
    return height * sectionCount;
  }, [height]);
  const centerPositionFromTop = useMemo(() => {
    return height * 0.5;
  }, [height]);
  const curvingPositionFromTop = useMemo(() => {
    return height * 0.8;
  }, [height]);
  const pathPositionFromLeft = useMemo(() => {
    return { leftX: width * 0.2, centerX: width * 0.5, rightX: width * 0.8 };
  }, [width]);
  const radiusOfQuadraticCurve = useMemo(() => {
    return width * 0.1;
  }, [width]);

  const canvasEl = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  useMountEffect(() => {
    const canvas = canvasEl.current;
    const context = canvas!.getContext("2d");
    contextRef.current = context;
    setCtx(contextRef.current!);
  });

  useEffect(() => {
    if (!ctx) return;

    const { leftX, centerX, rightX } = pathPositionFromLeft;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    ctx.fillStyle = "#153f64";
    ctx.fillRect(0, 0, width, canvasHeight);

    ctx.beginPath();
    ctx.moveTo(centerX, height * 0.5);
    ctx.lineTo(centerX, curvingPositionFromTop - radiusOfQuadraticCurve);
    ctx.quadraticCurveTo(
      centerX,
      curvingPositionFromTop,
      centerX + radiusOfQuadraticCurve,
      curvingPositionFromTop
    );
    ctx.lineTo(rightX - radiusOfQuadraticCurve, curvingPositionFromTop);
    ctx.quadraticCurveTo(
      rightX,
      curvingPositionFromTop,
      rightX,
      curvingPositionFromTop + radiusOfQuadraticCurve
    );
    ctx.lineTo(
      rightX,
      1 * height + curvingPositionFromTop - radiusOfQuadraticCurve
    );
    ctx.stroke();
    // for (let i = 1; i < sectionCount; i++) {}
  }, [ctx, width, height]);

  return (
    <canvas
      className="object-fill"
      ref={canvasEl}
      width={width}
      height={canvasHeight}
    ></canvas>
  );
}
