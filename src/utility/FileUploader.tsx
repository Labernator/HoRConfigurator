import React from "react";
import { store } from "..";
import { SET_WARBAND } from "../data/redux/actions";
import { ImportWarbandIcon } from "../images";

export const FileUploader = () => {
    const onChange = () => {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => store.dispatch({ type: SET_WARBAND, payload: JSON.parse(ev.target?.result as string) });
        reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
    };
    return <label htmlFor="file-uploader" style={{ fontSize: "26px", fontWeight: "bold" }} >
        <input id="file-uploader" type="file" accept=".json" style={{ display: "none" }} onChange={onChange}></input>
        <img style={{ width: "50px", height: "50px", left: "225px" }} alt="OpenWarband" className="toolbar-icon" src={ImportWarbandIcon} title="Open another warband from file" />
    </label>;
};
