import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/moon.css";
import { useEffect, useRef, type ReactNode } from "react";
import { useMountEffect, useUnmountEffect } from "@react-hookz/web/esnext";

interface RevealDeckProps {
  children: ReactNode;
}

export default function RevealDeck({ children }: RevealDeckProps) {
  let deck = useRef<Reveal.Api | null>(null);
  let deckEl = useRef<HTMLDivElement>(null);
  let isComponentMounted = useRef(false);
  let isDeckInitialized = useRef(false);
  useEffect(() => {
    isComponentMounted.current = true;
    if (!deck.current) {
      deck.current = new Reveal(deckEl.current);
      deck.current.initialize({ embedded: true }).then(() => {
        isDeckInitialized.current = true;
        if (!isComponentMounted.current) {
          deck.current?.destroy();
          deck.current = null;
        }
      });
    }
  }, [deckEl]);
  useUnmountEffect(() => {
    if (isDeckInitialized.current) {
      deck.current?.destroy();
      deck.current = null;
    }
    isComponentMounted.current = false;
  });
  return (
    <div className="reveal" ref={deckEl}>
      {children}
    </div>
  );
}
