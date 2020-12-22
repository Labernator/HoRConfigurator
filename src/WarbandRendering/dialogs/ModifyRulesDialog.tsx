import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { UPDATE_MODEL_RULES } from "../../data/redux/actions";
import * as RulesJson from "../../data/Rules.json";
import { DeleteIcon } from "../../images";
import { RenderModel, Rule } from "../../types";
import { getPureRule } from "../../utility";
import { DropdownMenuComponent } from "../../utility/DropdownMenu";

export const ModifyRulesDialog = ({ model, modelId, modifiedRules, hideFn }: { model: RenderModel; modelId: string; modifiedRules: string[] | undefined; hideFn(hide: boolean): void }) => {
    const position = document.getElementById(modelId)?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 25, left: (position?.left || 0) + 25, width: (position?.width || 0) - 75 };
    const [rules, setRules] = useState<string[]>(modifiedRules || []);
    const dispatch = useDispatch();
    const addRule = (listItem: string) => {
        setRules([...rules, listItem]);
    };
    const removeRule = (listItem: string) => {
        setRules(rules.filter((rule) => rule !== listItem));
    };
    const renderRulesTable = (renderRules: Rule[]) =>
        <table className="rules-modification-table">
            <colgroup>
                <col style={{ width: "50px" }} />
            </colgroup>
            <tbody>
                {renderRules.map((currentRule) =>
                    [<tr key={`${currentRule.name} (${currentRule.price || "0"} RP)-nameprice`}>
                        <th>Rule</th>
                        <td>
                            <div style={{ float: "left" }}>{`${currentRule.name} (${currentRule.price || "0"} RP)`}</div>
                            <img
                                className="remove-rule-icon"
                                alt={`delete-rule-${currentRule.name}`}
                                src={DeleteIcon}
                                onClick={() => removeRule(currentRule.name)}
                            />
                        </td>
                    </tr>,
                    <tr key={`${currentRule.name} (${currentRule.price || "0"} RP)-effect`}>
                        <th>Effect</th>
                        <td>{currentRule.effect}</td>
                    </tr>])}
            </tbody>
        </table>;
    const getRules = () => {
        const detailedRules = rules ? rules.map(getPureRule).filter((x) => x !== undefined) as Rule[] : undefined;
        return <div style={{ fontSize: "1rem" }}>

            {(detailedRules && detailedRules.length > 0) || (modifiedRules && modifiedRules.length > 0) ? <div style={{ float: "left", clear: "both", fontWeight: "bold", marginTop: "15px" }}>Additionally defined rules for this model</div> : null}
            {detailedRules ? renderRulesTable(detailedRules) : null}
            <DropdownMenuComponent
                dropdownOptions={{
                    id: "rules-modification-dropdown",
                    placeholder: "Select a new rule",
                }}
                originalList={RulesJson.rules.map((armyRule) => armyRule.name).filter((rule) => !modifiedRules?.find((mod) => mod === rule) && !detailedRules?.find((mod) => mod.name === rule))}
                callbackFn={addRule} />
            <button
                style={{ clear: "both" }}
                className={`dialog-button ${!rules ? "dialog-button-disabled" : ""}`}
                onClick={() => {
                    if (!rules) {
                        return undefined;
                    }
                    dispatch({ type: UPDATE_MODEL_RULES, payload: { model, rules } });
                    hideFn(false);
                }}
                title={`${!rules ? "You did not make any changes that could be submitted" : "Click to submit changes"}`}
            >Save changes</button>
            <button
                className="dialog-button"
                onClick={() => hideFn(false)}
            >Cancel</button>
        </div>;
    };

    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div style={cssProperties} className="modal">
                    <div className="modal-header">{`You can add additional rules for ${model.name}`}</div>
                    {getRules()}
                </div>
            </div>,
            document.getElementById(modelId) as HTMLElement
        )
    );
};
