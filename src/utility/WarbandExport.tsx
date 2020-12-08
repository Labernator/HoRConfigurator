import React from "react";
import { store } from "..";
import { ExportWarbandIcon } from "../images";
export const WarbandExport = () => {

    const saveJsonToFile = () => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const state = store.getState();
        const blob = new Blob([JSON.stringify(state)], { type: "octet/stream" });
        const url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = `${state.Title} - ${state.Faction}.json`;
        anchor.id = "ClickableDownloadAnchor";
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
    };

    return <div id="pdf-generator" className="pdf-generator">
        <img
            src={ExportWarbandIcon}
            style={{ width: "50px", height: "50px", left: "375px" }}
            className="toolbar-icon"
            alt="Save JSON file"
            onClick={saveJsonToFile}
            title="Save warband to JSON"
        />
    </div>;
};
