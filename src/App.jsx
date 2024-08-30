import { ReactFlowProvider } from "@xyflow/react";
import Flow from "./components/Flow";

import Note from "./components/Note";
import ViewportDisplay from "./components/ViewportDisplay";
import { useCallback, useState } from "react";

function App() {
  const [isEnable, setIsEnable] = useState(true);

  const onEnable = useCallback(() => {
    setIsEnable(!isEnable);
  }, [isEnable]);

  return (
    <ReactFlowProvider>
      <div className="w-full h-screen flex p-10 gap-10">
        <div className="w-[800px] h-[800px] rounded-2xl overflow-hidden">
          <Flow disable={isEnable} />
        </div>
        <div className="flex flex-col gap-2">
          <Note />
          <ViewportDisplay disable={isEnable} onDisable={onEnable} />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
