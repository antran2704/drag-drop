import { NodeResizer, useUpdateNodeInternals } from "@xyflow/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { drag } from "d3-drag";
import { select } from "d3-selection";

import styles from "./style.module.css";

export default function ImageNode({ id, data }) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        className={clsx(
          "flex items-center justify-center bg-transparent border-none",
          styles.node
        )}
      >
        <NodeResizer isVisible={true} />
        <div
          ref={rotateControlRef}
          style={{
            display: "block",
          }}
          className={`nodrag ${styles.rotateHandle}`}
        />

        <img src={data?.label} alt="door" />
      </div>
    </>
  );
}
