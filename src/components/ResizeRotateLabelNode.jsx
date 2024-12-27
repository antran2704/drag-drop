import { useEffect, useState, useRef, Fragment } from "react";
import { useUpdateNodeInternals, NodeResizer } from "@xyflow/react";

import styles from "./style.module.css";
import clsx from "clsx";

export default function ResizeRotateLabelNode({ id, data }) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(data.label);

  const onChange = (e) => {
    const newValue = e.target.value;
    setNewValue(newValue);
    
  };

  const onEdit = () => {
    setIsEdit(!isEdit);
  }
  
  const onSave = () => {
    data.label = newValue;
    updateNodeInternals(id);
    onEdit();
  }

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-center bg-transparent",
        )}
      >

        {isEdit && (
          <div className="flex flex-col items-center">
            <input value={newValue} onChange={onChange} />
            <button onClick={onSave} className="text-xs bg-blue-400 px-3 py-1 mt-2 rounded-md">Save</button>
          </div>
        )}

        {!isEdit && (
          <div className="flex items-center gap-5">
            <p>{data?.label}</p>
            <button onClick={onEdit} className="text-xs">Edit</button>
          </div>
        )}
      </div>
    </>
  );
}
