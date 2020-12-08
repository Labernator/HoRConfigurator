import React from "react";
import { FactionEnum } from "../types";
import { getPossiblePhilosophies } from "../utility";

export const PhilosophySelection = ({ faction, selectedPhilosophy, setPhilosophyCallback }: { faction: string; selectedPhilosophy: string | undefined; setPhilosophyCallback(philosophy: string): void }) => {
    const getIconCss = (philosophy: string) =>
        !selectedPhilosophy ?
            "icon-container philosophy-container" :
            selectedPhilosophy === philosophy ?
                "icon-container philosophy-container icon-container-selected" :
                "icon-container philosophy-container icon-container-disabled";
    const SelectionIcons = () =>
        Object.values(getPossiblePhilosophies(faction as FactionEnum).map((phil) =>
            <div key={`${phil.name}selection`} className={getIconCss(phil.name)} onClick={() => { setPhilosophyCallback(phil.name); }}>
                {phil.name}
            </div>
        ));
    return <div className="selection-container">
        <div className="selection-header">Choose a philosophy</div>
        {SelectionIcons()}
    </div>;
};
