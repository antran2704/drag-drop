import { NodeResizer } from "@xyflow/react";

import styles from "./style.module.css";
import clsx from "clsx";

export default function ResizeGroup({ data }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center bg-transparent min-w-[400px] min-h-[400px]",
        styles.node
      )}
    >
      <NodeResizer isVisible={true} minWidth={400} minHeight={400} />
      <p>{data?.label}</p>
    </div>
  );
}
