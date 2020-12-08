import React from "react";
import "../css/Toolbar.css";
import { FileUploader, PdfGenerator } from "../utility";
import { AllowanceComponent } from "./AllowanceComponent";
import { ToggleEditor } from "./ToggleEditor";
import { WarbandExport } from "./WarbandExport";

export const Toolbar = ({ setEditorVisibility }: { setEditorVisibility(visible: any): void }) => <div className="toolbar-container">
    <ToggleEditor setEditorVisibility={setEditorVisibility} />
    <PdfGenerator />
    <FileUploader />
    <WarbandExport />
    <AllowanceComponent />
</div >;
