import React from "react";
import { Rule } from "../types";

export const ArmyRulesHeaderRenderer = ({ armyRules }: { armyRules: Rule[] }) => {
    const renderGlobalRules = () =>
        armyRules.map((rule) =>
            <div key={`rule_${rule?.name}`} className="split-div">
                <div className="split-div-header">{rule?.name}</div>
                <div className="split-div-text">{rule?.effect}</div>
            </div>
        );
    return armyRules && armyRules.length > 0 ? <div className="model-container">
        <div className="container-header">Army wide rules:</div>
        {renderGlobalRules()}
    </div> : null;
};
