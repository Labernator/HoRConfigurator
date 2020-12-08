import React from "react";
import { getFactionImage } from "../images";
import { FactionEnum } from "../types";

export const FactionSelection = ({ selectedFaction, setFactionCallback }: { selectedFaction: string | undefined; setFactionCallback(faction: FactionEnum): void }) => {
    const getImageCss = (faction: FactionEnum) =>
        !selectedFaction ?
            "icon-container faction-container" :
            selectedFaction === faction ?
                "icon-container faction-container icon-container-selected" :
                "icon-container faction-container icon-container-disabled";
    const SelectionImages = () =>
        Object.values(FactionEnum).map((faction) =>
            <div key={`${faction}selection`} className={getImageCss(faction)} onClick={() => { setFactionCallback(faction); }}>
                <img alt={`school ${faction}`} className="selection-icon" src={getFactionImage(faction)} />
                <div>{faction}</div>
            </div>
        );
    return <div className="selection-container">
        <div className="selection-header">Choose a faction</div>
        {SelectionImages()}
    </div>;
};
