import { useReactFlow, useStoreApi } from "@xyflow/react";
import { useCallback } from "react";
import { v4 as uuidV4 } from "uuid";

export default function ViewportDisplay() {
  const { addNodes, getNodes } = useReactFlow();
  const store = useStoreApi();

  const onClick = useCallback(() => {
    // Get the basic info about the viewport
    const {
      height,
      width,
      transform: [transformX, transformY, zoomLevel],
    } = store.getState();

    const zoomMultiplier = 1 / zoomLevel;

    // Figure out the center of the current viewport
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;

    // Add offsets for the height/width of the new node
    // (Assuming that you don't have to calculate this as well
    const nodeWidthOffset = 100 / 2;
    const nodeHeightOffset = 100 / 2;

    // Standard addition of node with desired x and y
    // copy and pasted from the React Flow examples
    const id = uuidV4();
    const newNode = {
      id,
      // position: {
      //   x: centerX - nodeWidthOffset + Math.random() * 100,
      //   y: centerY - nodeHeightOffset + Math.random() * 100,
      // },
      position: {
        x: centerX - nodeWidthOffset + Math.random() * 100,
        y: centerY - nodeHeightOffset + Math.random() * 100,
      },
      data: {
        label: store.getState().nodes.length + 1,
        test: "test",
      },
      type: "resizeRotate",
      parentId: "groupLayout",
      extent: "parent",
    };
    addNodes(newNode);
  }, [addNodes, store]);

  return (
    <button
      className="absolute right-5 top-5 py-2 px-5 border rounded-md bg-blue-300 z-50"
      onClick={onClick}
    >
      Nhứk cái đầu
    </button>
  );
}
