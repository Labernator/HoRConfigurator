import React from "react";
import { getFactionSpecifics } from "../utility";

export const AlignmentSelection = ({ faction, selectedAlignment, setAlignmentCallback }: { faction: string; selectedAlignment: string | undefined; setAlignmentCallback(alignment: string): void }) => {
    const alignments = getFactionSpecifics(faction).Alignments;
    const getIconCss = (alignment: string) =>
        !selectedAlignment ?
            "icon-container philosophy-container" :
            selectedAlignment === alignment ?
                "icon-container philosophy-container icon-container-selected" :
                "icon-container philosophy-container icon-container-disabled";
    const SelectionIcons = () =>
        alignments?.map((alignment) =>
            <div key={`${alignment.name}selection`} className={getIconCss(alignment.name)} onClick={() => { setAlignmentCallback(alignment.name); }}>
                {alignment.name}
            </div>
        );
    return <div className="selection-container">
        <div className="selection-header">{`Select a ${getFactionSpecifics(faction).AlignmentPlaceholder?.replace("<", "").replace(">", "").toLocaleLowerCase()}`}</div>
        {SelectionIcons()}
    </div>;
};
