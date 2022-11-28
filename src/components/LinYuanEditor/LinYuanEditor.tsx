import React, { useEffect, useRef, useState } from "react";
import "./LinYuanEditor.less";

function convertValue(key: string) {
  const mp: Record<string, any> = {};
  mp["Enter"] = "\n";
  if (mp[key]) return mp[key];
  return key;
}
function useHandleInput(): [string, (e: any) => void] {
  const [textValue, setTextValue] = useState("请输入内容");
  const handleKeyDown = (e: any) => {
    console.log("handleKeyDown", e);
    e.preventDefault();
    const input = document.getElementById("inputArea");
    input!.innerHTML = input?.innerHTML + "<h1>fuck</h1>";
    // setTextValue(textValue + convertValue(e.key));
  };
  return [textValue, handleKeyDown];
}

export default function LinYuanEditor() {
  const [isFocus, setIsFocus] = useState(false);
  const isFocusRef = useRef(false);
  const handleFocus = (e: any) => {
    console.log("focus");
    setIsFocus(true);
    isFocusRef.current = true;
  };
  const handleBlur = (e: any) => {
    console.log("blur");
    setIsFocus(false);
    isFocusRef.current = false;
  };
  const handleMouseDown = (e: any) => {
    console.log("onMouseDown", e);
  };
  const handleBtnClick = () => {
    const input = document.getElementById("inputArea");
    input!.innerHTML = input?.innerHTML + "<h1>fuck</h1>";
  };
  const [textValue, handleKeyDown] = useHandleInput();
  return (
    <div className="lin-yuan-editor-container">
      <div className="header">
        header
        <button onClick={handleBtnClick}>ok</button>
      </div>
      <div
        tabIndex={0}
        suppressContentEditableWarning
        contentEditable
        className={`editor-main ${isFocus ? "focus" : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      >
        <pre id="inputArea">
          <h1>sad213213</h1>
          <h2>213123</h2>
          <div>
            <span>21321</span>
            <em>21312312</em>
          </div>
        </pre>
      </div>
    </div>
  );
}
