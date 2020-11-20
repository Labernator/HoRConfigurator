import React from "react";
import { FactionEnum, TacticalPoints } from "../types";
import { getPhilosophy } from "../utility";

export const ArmyTacticalPointsRenderer = ({ stratagems, philosophy, faction }: { stratagems: TacticalPoints[]; philosophy: string | undefined; faction: FactionEnum }) => {
    const tacticalPoints = stratagems.reduce((acc, stata) => acc + stata.amount, philosophy ? getPhilosophy(philosophy, faction)?.tp || 0 : 0);
    const renderCheckboxes = () => {
        let checkboxes: JSX.Element[] = [];
        for (let i = 0; i < tacticalPoints; i++) {
            checkboxes = [...checkboxes, <div key={`tactical-checkboxes-${i}`} style={{ width: "10px", height: "10px", border: "1px solid", float: "right", marginRight: "8px", marginTop: "2px", background: "white" }} />];
        }
        return checkboxes;
    };
    return <div className="quick-ref-enemies-container army-keywords-container">
        <div className="container-header">
            {`Tactical Points (${tacticalPoints})`}
            {renderCheckboxes()}
        </div>
        {philosophy ? <div className="split-div">
            <div className="split-div-header" style={{ paddingRight: "5px" }}>{`${philosophy} (${getPhilosophy(philosophy, faction)?.tp}) [Philosophy]`}</div>
            <div className="split-div-text">{getPhilosophy(philosophy, faction)?.text}</div>
        </div> : undefined}
        {stratagems.map((stratagem) => <div key={`stratagem_${stratagem?.name}`} className="split-div">
            <div className="split-div-header">{`${stratagem.name} (${stratagem.amount})`}</div><div className="split-div-text">{stratagem.text}</div></div>)}
    </div>;
};
