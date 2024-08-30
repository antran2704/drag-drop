import { useReactFlow, useStoreApi } from "@xyflow/react";
import { useCallback } from "react";
import { v4 as uuidV4 } from "uuid";

import mainDoorImage from "@assets/main_door.png";
import sideDoorImage from "@assets/side_door.png";

const Note = () => {
  const { addNodes } = useReactFlow();
  const store = useStoreApi();

  const onClick = useCallback((type) => {
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
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      data: {
        label: type === "main" ? mainDoorImage : sideDoorImage,
      },
      style: { padding: 0 },
      type: "imageNode",
      parentId: "groupLayout",
      extent: "parent",
    };
    addNodes(newNode);
  }, [addNodes, store]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl">Ghi chú</h2>

      <ul className="flex items-center gap-5">
        <li className="flex items-center text-sm text-[#81BC99] gap-2">
          <span className="block w-5 h-5 bg-[#81BC99] rounded-md"></span>
          Available
        </li>
        <li className="flex items-center text-sm text-[#FF66DD] gap-2">
          <span className="block w-5 h-5 bg-[#FF66DD] rounded-md"></span>
          Join us
        </li>
        <li className="flex items-center text-sm text-[#A6A6B0] gap-2">
          <span className="block w-5 h-5 bg-[#A6A6B0] rounded-md"></span>
          Occupied
        </li>
      </ul>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <img src={mainDoorImage} className="w-[100px] h-10" alt="" />
          <p className="text-base text-[#115FA4] font-semibold">Cửa chính</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={sideDoorImage} className="w-10 h-8" alt="" />
          <p className="text-base text-[#115FA4] font-semibold">Cửa chính</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button onClick={() => onClick("main")} className="py-2 px-5 border rounded-md bg-blue-300">
          Thêm cửa chính
        </button>
        <button onClick={() => onClick("side")} className="py-2 px-5 border rounded-md bg-blue-300">
          Thêm cửa phụ
        </button>
      </div>
    </div>
  );
};

export default Note;
