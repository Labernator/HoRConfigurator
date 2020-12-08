import React from "react";
import { FactionEnum, ModelType, RenderWarband } from "../types";
import { countType, getAllKeywords, getArmyRules, getFactionSpecifics } from "../utility";
import { ArmyKeywordsRenderer } from "./ArmyKeywords";
import { ArmyRulesHeaderRenderer } from "./ArmyRules";
import { ArmyTacticalPointsRenderer } from "./ArmyTacticalPoints";
import { ModelSheetRenderer } from "./ModelSheet";

export const WarbandRenderer = ({ state, page, isPdfSection, hide }: { state: RenderWarband; page: { nr: number; total: number }; isPdfSection?: boolean; hide?: boolean }) => {
    const faction = state.Faction as FactionEnum;
    const canAddModel = (type: string) => {
        const allowance = getFactionSpecifics(faction).ModelAllowance;
        switch (type) {
            case ModelType.Leader: return countType(state.Roster, ModelType.Leader) < allowance.Leader;
            case ModelType.Core: return countType(state.Roster, ModelType.Core) < allowance.Core;
            case ModelType.Special: return countType(state.Roster, ModelType.Special) < allowance.Special;
        }
        return false;
    };
    const canRemoveModel = (amount: number | undefined) => {
        const cnt = amount || 1;
        return cnt > 1;
    };
    return <div id={`roster-sheet-container${page.nr}`} className={`${isPdfSection ? "pdf-container" : "a4-container"} ${hide ? "hide-container" : ""}`} style={{ float: "left", marginTop: 10, paddingTop: 0 }}>
        <div className="roster-sheet-title">{`${state.Title} - ${state.Faction} (${state.RosterPrice} pts)`}</div>
        {page.nr === 1 ?
            <div>
                <ArmyRulesHeaderRenderer armyRules={getArmyRules(faction, state.Alignment)} />
                <ArmyKeywordsRenderer keywords={getAllKeywords(state.Roster)} />
                <ArmyTacticalPointsRenderer stratagems={state.Stratagems} philosophy={state.Philosophy} faction={faction} />
            </div> :
            undefined}
        {state.Roster.map((member) => <ModelSheetRenderer
            key={`modelsheet-${member.name}-${member.price}`}
            model={member}
            context={{ renderSidebar: !isPdfSection, canAddModel: canAddModel(member.type), canRemoveModel: canRemoveModel(member.amount) }}
        />)}
        <div className="roster-sheet-footer">{`${page.nr} / ${page.total}`}</div>
    </div >;
};
