import { useCallback, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
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
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)" },
    type: "resizeGroup",
  },
];

const initialEdges = [];

function Flow(props) {
  const { disable } = props;

  const { getNode } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function handleNodesChange(changes) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === "remove") {
        const node = getNode(change.id);

        if (node.id !== "groupLayout") {
          return [...acc, change];
        }

        return acc;
      }

      return [...acc, change];
    }, []);

    // apply the changes we kept
    onNodesChange(nextChanges);
  }

  return (
    <ReactFlow
      colorMode="dark"
      nodes={nodes}
      edges={edges}
      fitView
      maxZoom={1.5}
      minZoom={1}
      zoomOnScroll={false}
      nodesDraggable={disable}
      elementsSelectable={disable}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      {/* <MiniMap /> */}
      <Controls showInteractive={false} />
      <Background bgColor="#F6F6F6" />
    </ReactFlow>
  );
}

export default Flow;
