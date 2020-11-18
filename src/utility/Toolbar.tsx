import React from "react";
import { ImportWarbandIcon } from "../images";
import { Warband } from "../types";
import { FileUploader, PdfGenerator } from "../utility";
import { ToggleEditor } from "./ToggleEditor";

export const Toolbar = ({ state, setState, setEditorVisibility }: { state: Warband; setState(json: any): void; setEditorVisibility(visible: any): void }) => <div>
    <ToggleEditor setEditorVisibility={setEditorVisibility} />
    <PdfGenerator title={state.Title} />
    <FileUploader image={
        <img style={{ width: "50px", height: "50px", left: "225px" }} alt="OpenWarband" className="toolbar-icon" src={ImportWarbandIcon} title="Open another warband from file" />
    } setStateCallback={setState} />
</div >;
