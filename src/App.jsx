import { ReactFlowProvider } from "@xyflow/react";
import Flow from "./components/Flow";

import Note from "./components/Note";

function App() {
  return (
    <ReactFlowProvider>
      <div className="w-full h-screen flex p-10 gap-10">
        <div className="w-[800px] h-[800px] rounded-2xl overflow-hidden">
          <Flow />
        </div>
        <Note />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
