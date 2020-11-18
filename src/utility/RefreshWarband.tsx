import React, { useState } from "react";
import { OpenEditorIcon, OpenEditorSelectedIcon } from "../images";

export const RefreshWarband = ({ setState }: { setState(json: any): void }) => {
    const [selected, toggleSelected] = useState<boolean>(false);
    return <img
        src={selected ? OpenEditorSelectedIcon : OpenEditorIcon}
        style={{ width: "50px", height: "50px", left: "75px" }}
        className="toolbar-icon"
        alt="Open/Close Editor"
        onClick={() => {
            setState(!selected);
        }}
        title="Open Editor"
    />;
};
