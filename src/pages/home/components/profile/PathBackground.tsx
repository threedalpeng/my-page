import { useRafEffect } from "@react-hookz/web/esnext";
import { useEffect, useRef } from "react";
import useSpring from "react-use/lib/useSpring";
import {
  useCanvasRenderingContext,
  useRelativePositionToWindowSize,
} from "./canvas";

interface PathBackgroundProps {
  sectionCount: number;
  currentSection: number;
}

export default function PathBackground({
  sectionCount,
  currentSection,
}: PathBackgroundProps) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvasRenderingContext(canvasEl);
  const offCanvasEl = useRef<HTMLCanvasElement>(null);
  const offCtx = useCanvasRenderingContext(offCanvasEl);

  const { canvas, window, leftX, rightX, centerX, centerY, curve } =
    useRelativePositionToWindowSize(sectionCount);

  const tweened = useSpring(currentSection, 10, 10);

  useEffect(() => {
    if (!offCtx) return;

    offCtx.strokeStyle = "#fff";
    offCtx.lineWidth = curve.radius * 0.3;
    offCtx.lineCap = "round";

    offCtx.fillStyle = "#153f64";
    offCtx.fillRect(0, 0, canvas.width, canvas.height);

    offCtx.fillStyle = "#fff";
    offCtx.beginPath();
    offCtx.ellipse(
      centerX,
      centerY,
      curve.radius * 0.3,
      curve.radius * 0.3,
      0,
      0,
      Math.PI * 2
    );
    offCtx.fill();
    offCtx.beginPath();
    offCtx.ellipse(
      centerX,
      centerY,
      curve.radius * 0.7,
      curve.radius * 0.7,
      0,
      0,
      Math.PI * 2
    );
    offCtx.stroke();

    offCtx.beginPath();
    offCtx.moveTo(centerX, window.height * 0.5);
    offCtx.lineTo(centerX, curve.posY - curve.radius);
    let currentX = centerX;
    const changePathToRight = (offsetY: number) => {
      offCtx!.quadraticCurveTo(
        currentX,
        offsetY + curve.posY,
        currentX + curve.radius,
        offsetY + curve.posY
      );
      currentX = rightX;
      offCtx!.lineTo(rightX - curve.radius, offsetY + curve.posY);
      offCtx!.quadraticCurveTo(
        rightX,
        offsetY + curve.posY,
        rightX,
        offsetY + curve.posY + curve.radius
      );
      offCtx!.lineTo(
        rightX,
        offsetY + window.height + curve.posY - curve.radius
      );
    };
    const changePathToLeft = (offsetY: number) => {
      offCtx!.quadraticCurveTo(
        currentX,
        offsetY + curve.posY,
        currentX - curve.radius,
        offsetY + curve.posY
      );
      currentX = leftX;
      offCtx!.lineTo(leftX + curve.radius, offsetY + curve.posY);
      offCtx!.quadraticCurveTo(
        leftX,
        offsetY + curve.posY,
        leftX,
        offsetY + curve.posY + curve.radius
      );
      offCtx!.lineTo(
        leftX,
        offsetY + window.height + curve.posY - curve.radius
      );
    };
    for (let i = 0; i < sectionCount - 1; i++) {
      if (i % 2) {
        changePathToLeft(i * window.height);
      } else {
        changePathToRight(i * window.height);
      }
    }
    offCtx.stroke();

    offCtx.beginPath();
    const ARROW_SIZE = 100;
    offCtx.lineJoin = "round";
    offCtx.moveTo(
      rightX - ARROW_SIZE,
      (sectionCount - 1) * window.height +
        curve.posY -
        curve.radius -
        ARROW_SIZE
    );
    offCtx.lineTo(
      rightX,
      (sectionCount - 1) * window.height + curve.posY - curve.radius
    );
    offCtx.lineTo(
      rightX + ARROW_SIZE,
      (sectionCount - 1) * window.height +
        curve.posY -
        curve.radius -
        ARROW_SIZE
    );
    offCtx.stroke();
  }, [offCtx, window]);

  useRafEffect(() => {
    if (!ctx || !offCtx) return;
    const cropImage = offCtx.getImageData(
      0,
      window.height * tweened,
      canvas.width,
      window.height
    );
    ctx.putImageData(cropImage, 0, 0);
  }, [ctx, offCtx, window, tweened]);

  return (
    <>
      <canvas
        className="object-fill"
        ref={canvasEl}
        width={window.width}
        height={canvas.height}
      ></canvas>
      <canvas
        className="invisible"
        ref={offCanvasEl}
        width={window.width}
        height={canvas.height}
      ></canvas>
    </>
  );
}
