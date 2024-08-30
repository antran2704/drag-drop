import { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import ViewportDisplay from "./ViewportDisplay";
import ResizeRotateNode from "./ResizeRotateNode";
import ImageNode from "./ImageNode";
import ResizeGroup from "./ResizeGroup";

const nodeTypes = {
  resizeRotate: ResizeRotateNode,
  imageNode: ImageNode,
  resizeGroup: ResizeGroup,
};

const initialNodes = [
  {
    id: "groupLayout",
    position: { x: 0, y: 0 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 300, height: 300 },
    type: "resizeGroup",
  },
];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      colorMode="dark"
      nodes={nodes}
      edges={edges}
      fitView
      zoomOnScroll={false}
      nodesDraggable={false}
      maxZoom={1.5}
      minZoom={1}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      {/* <MiniMap /> */}
      <Controls />
      <Background bgColor="#F6F6F6" />
      <ViewportDisplay />
    </ReactFlow>
  );
}

export default Flow;
