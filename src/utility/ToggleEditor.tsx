import React, { useEffect, useState } from "react";
import { OpenEditorIcon, OpenEditorSelectedIcon } from "../images";

export const ToggleEditor = ({ setEditorVisibility }: { setEditorVisibility(json: any): void }) => {
    const [selected, toggleSelected] = useState<boolean>(false);
    useEffect(() => {
        setEditorVisibility(selected);
    }, [selected, setEditorVisibility]);
    return <img
        src={selected ? OpenEditorSelectedIcon : OpenEditorIcon}
        style={{ width: "50px", height: "50px", left: "75px" }}
        className="toolbar-icon"
        alt="Open/Close Editor"
        onClick={() => {
            toggleSelected(!selected);
        }}
        title="Open Editor"
    />;
};
