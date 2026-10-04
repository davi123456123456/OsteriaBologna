"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, saveData } from "@/lib/motion";
import { VideoToggle } from "./VideoToggle";

type Props = {
  src: string;
  poster: StaticImageData;
  /** sizes del poster per next/image */
  sizes: string;
  objectPosition?: string;
  /** "contain" per il calice su fondo nero */
  fit?: "cover" | "contain";
  /** deve includere il posizionamento (default "relative") */
  className?: string;
  controlTone?: "light" | "dark";
  controlLabel?: string;
};

/**
 * Video decorativo (§4.5): muto, in loop, src assegnato a 200px dal viewport, play quando è
 * visibile almeno al 25%, pausa quando esce. Sempre con poster; con reduced-motion o risparmio
 * dati resta il solo poster.
 */
export function LazyVideo({
  src,
  poster,
  sizes,
  objectPosition = "50% 50%",
  fit = "cover",
  className = "relative",
  controlTone = "light",
  controlLabel,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion() || saveData()) return;
    const el = box.current;
    const v = video.current;
    if (!el || !v) return;
     
    setEnabled(true);

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !v.getAttribute("src")) {
          v.src = src;
          near.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    const seen = new IntersectionObserver(
      ([entry]) => {
        visible.current = Boolean(entry?.isIntersecting);
        if (visible.current && !userPaused.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [src]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    if (userPaused.current) v.pause();
    else if (visible.current) v.play().catch(() => {});
  };

  const fitCls = fit === "contain" ? "object-contain" : "object-cover";
  return (
    <div ref={box} className={`overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        placeholder="blur"
        className={fitCls}
        style={{ objectPosition }}
      />
      <video
        ref={video}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => setReady(true)}
        className={`absolute inset-0 h-full w-full ${fitCls} transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
        style={{ objectPosition }}
      />
      {enabled ? (
        <VideoToggle
          paused={paused}
          onToggle={toggle}
          tone={controlTone}
          label={controlLabel}
          className="absolute right-0 bottom-0 z-[2] px-12 pb-8"
        />
      ) : null}
    </div>
  );
}
