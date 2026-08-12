"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { IMAGE_QUALITY } from "@/lib/image";

type LazyImageProps = Omit<ImageProps, "loading"> & {
  rootMargin?: string;
};

/** Loads image only when near the viewport */
export default function LazyImage({
  rootMargin = "300px",
  className,
  alt,
  ...props
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className="w-full">
      {visible ? (
        <Image
          {...props}
          alt={alt}
          loading="lazy"
          quality={props.quality ?? IMAGE_QUALITY}
          className={className}
        />
      ) : (
        <div
          className={`w-full bg-[#1a1a18] animate-pulse ${className ?? ""}`}
          style={{ aspectRatio: props.height && props.width ? `${props.width}/${props.height}` : "4/3" }}
          aria-hidden
        />
      )}
    </div>
  );
}
