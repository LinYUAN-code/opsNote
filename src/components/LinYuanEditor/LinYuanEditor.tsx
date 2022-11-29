import React, { useEffect, useRef, useState } from "react";
import "./LinYuanEditor.less";
import { getCaretPosition, setCaretPosition } from "./utils/utils";

function convertValue(key: string) {
  const mp: Record<string, any> = {};
  mp["Enter"] = "\n";
  if (mp[key]) return mp[key];
  return key;
}
function useHandleInput(): [
  string,
  (e: any) => void,
  string,
  (e: any) => void,
  () => void
] {
  const input = document.getElementById("inputArea");
  const [posValue, setPosValue] = useState("0");
  const handlePosChange = (e: any) => {
    setPosValue(e.target.value);
  };

  const [textValue, setTextValue] = useState("请输入内容");
  const handleKeyDown = (e: any) => {
    console.log("handleKeyDown", e);
    e.preventDefault();
    // input!.innerHTML = input?.innerHTML + "<h1>fuck</h1>";
    // setTextValue(textValue + convertValue(e.key));
    // setCaret();
    console.log(window.getSelection());
    console.log(getCaretPosition(input));
    setCaretPosition(input, posValue);
  };
  const mySetCaret = () => {
    setCaretPosition(input, posValue);
  };
  return [textValue, handleKeyDown, posValue, handlePosChange, mySetCaret];
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
    // console.log("onMouseDown", e);
  };
  const handleBtnClick = (e: any) => {
    const input = document.getElementById("inputArea");
    input!.innerHTML = input?.innerHTML + "<h1>fuck</h1>";
  };
  const [textValue, handleKeyDown, posValue, handlePosChange, mySetCaret] =
    useHandleInput();

  return (
    <div className="lin-yuan-editor-container">
      <div className="header">
        header
        <input type="text" value={posValue} onChange={handlePosChange} />
        <button onClick={mySetCaret}>setCaret</button>
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
