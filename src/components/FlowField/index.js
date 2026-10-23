import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";

export default function FlowField() {
  const [structured, setStructured] = useState(false);
  const paths = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => {
        const phase = (i / 64) * Math.PI * 2;
        return Array.from({ length: 181 }, (_, j) => {
          const a = (j / 180) * Math.PI * 2;
          const radius = 132 + 53 * Math.cos(phase);
          const warp = structured ? 0 : 18 * Math.sin(a * 3 + phase);
          const x = 270 + (radius + warp) * Math.cos(a);
          const y =
            250 + (radius + warp) * Math.sin(a) * 0.71 + 65 * Math.sin(phase);
          const tiltX = 270 + (x - 270) * 0.92 + (y - 250) * 0.3;
          const tiltY = 250 - (x - 270) * 0.3 + (y - 250) * 0.92;
          return `${j ? "L" : "M"}${tiltX.toFixed(2)},${tiltY.toFixed(2)}`;
        }).join(" ");
      }),
    [structured],
  );
  return (
    <figure className={styles.field}>
      <div className={styles.topline}>
        <span>FIG. 001 — CONTINUOUS EXPLORATION</span>
        <span aria-hidden="true">[ x, y, z ]</span>
      </div>
      <svg
        viewBox="0 0 540 500"
        role="img"
        aria-label={
          structured
            ? "规则环面线条图，表现系统结构"
            : "有机形变的流场线条图，表现生成式探索"
        }
      >
        <defs>
          <pattern
            id="field-grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0H0V30"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".08"
            />
          </pattern>
        </defs>
        <rect width="540" height="500" fill="url(#field-grid)" />
        <circle cx="270" cy="250" r="186" fill="#d4ef78" />
        <g className={styles.orbit}>
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth=".68"
              opacity={0.35 + (i % 8) * 0.075}
            />
          ))}
        </g>
        <path
          d="M270 20V42M270 458V480M26 250H48M492 250H514"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="270" cy="250" r="3" fill="currentColor" />
      </svg>
      <figcaption>
        <span>
          Order meets possibility.<small>生成与结构之间的视觉实验</small>
        </span>
        <button
          type="button"
          aria-pressed={structured}
          onClick={() => setStructured(!structured)}
        >
          {structured ? "Explore flow" : "Find structure"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </figcaption>
    </figure>
  );
}
