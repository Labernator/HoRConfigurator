import React from "react";
import { Rule } from "../types";

export const ModelRulesRenderer = ({ rules }: { rules: Rule[] | undefined }) => {
    const renderRules = () => rules?.map((rule) =>
        <tr key={`rule_${rule.name}`}>
            <td>{rule.price ? `${rule.name} (${rule.price})` : rule.name}</td>
            <td>{rule.effect}</td>
        </tr>);
    return rules && rules.length > 0 ? <table className="model-table">
        <colgroup>
            <col style={{ width: "100px" }} />
            <col style={{ width: "305px" }} />
        </colgroup>
        <thead>
            <tr>
                <th>Rule</th>
                <th>Effect</th>
            </tr>
        </thead>

        <tbody>
            {renderRules()}
        </tbody>
    </table> : null;
};
