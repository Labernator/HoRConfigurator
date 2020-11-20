import React from "react";
import { FactionEnum, RenderWarband, TacticalPoints } from "../types";
import { getAllKeywords, getArmyRules } from "../utility";
import { ArmyKeywordsRenderer } from "./ArmyKeywords";
import { ArmyRulesHeaderRenderer } from "./ArmyRules";
import { ArmyTacticalPointsRenderer } from "./ArmyTacticalPoints";
import { ModelSheetRenderer } from "./ModelSheet";

export const WarbandRenderer = (
    { state, page, rosterPrice, stratagems, fullRender, hide }: { state: RenderWarband; page: { nr: number; total: number }; rosterPrice: number; stratagems: TacticalPoints[]; fullRender?: boolean; hide?: boolean }) => {
    const faction = state.Faction as FactionEnum;
    return <div id={`roster-sheet-container${page.nr}`} className={`${fullRender ? "a4-container" : "pdf-container"} ${hide ? "hide-container" : ""}`} style={{ float: "left", marginTop: 0, paddingTop: 0 }}>
        <div className="roster-sheet-title">{`${state.Title} - ${state.Faction} (${rosterPrice} pts)`}</div>
        {page.nr === 1 ?
            <div>
                <ArmyRulesHeaderRenderer armyRules={getArmyRules(faction, state.Alignment)} />
                <ArmyKeywordsRenderer keywords={getAllKeywords(state.Roster)} />
                <ArmyTacticalPointsRenderer stratagems={stratagems} philosophy={state.Philosophy} faction={faction} />
            </div> :
            undefined}
        {state.Roster.map((member) => <ModelSheetRenderer
            key={`modelsheet-${member.name}-${member.price}`}
            model={member}
            faction={state.Faction as FactionEnum}
        />)}
        <div className="roster-sheet-footer">{`${page.nr} / ${page.total}`}</div>
    </div >;
};
