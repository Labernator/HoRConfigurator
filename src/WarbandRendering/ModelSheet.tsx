import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "..";
import { DECREASE_MODEL_AMOUNT, INCREASE_MODEL_AMOUNT, MOVE_DOWN, MOVE_UP, REMOVE_UNIT_FROM_ROSTER } from "../data/redux/actions";
import { DecreaseIcon, DeleteIcon, DownIcon, GearIcon, IncreaseIcon, KeywordsIcon, RulesIcon, StatsIcon, UpIcon } from "../images";
import { RenderModel } from "../types";
import { isSearchedModel } from "../utility";
import { ModifyKeywordsDialog } from "./dialogs/ModifyKeywordsDialog";
import { ModifyStatsDialog } from "./dialogs/ModifyStatsDialog";
import { ModelEquipmentRenderer } from "./ModelEquipment";
import { ModelHeaderRenderer } from "./ModelHeaderRenderer";
import { ModelKeywordRenderer } from "./ModelKeywords";
import { ModelRulesRenderer } from "./ModelRules";
import { ModelStatsRenderer } from "./ModelStats";

interface WarbandContext {
    renderSidebar: boolean;
    canAddModel: boolean;
    canRemoveModel: boolean;
}

export const ModelSheetRenderer = ({ model, context }: { model: RenderModel; context: WarbandContext }) => {
    const [showStatsDialog, setShowStatsDialog] = useState<boolean>(false);
    const [showKeywordssDialog, setShowKeywordsDialog] = useState<boolean>(false);
    const dispatch = useDispatch();
    const modelId = `modelsheet-${model.name}-${model.price}${context.renderSidebar ? "-withSidebar" : ""}`;
    const state = store.getState();
    const idx = state.Roster.findIndex((rosterModel) => isSearchedModel(rosterModel, model, state.Faction, state.Alignment));
    const renderModelContainer = () =>
        <div id={modelId} className={`model-container ${context.renderSidebar ? "width-for-sidebar" : ""}`}>
            <ModelHeaderRenderer model={model} />
            <ModelStatsRenderer name={model.name} stats={model.stats} />
            {model.equipment ? <ModelEquipmentRenderer equipment={model.equipment} faction={state.Faction} name={`${model.name}-${model.price}`} /> : undefined}
            <ModelRulesRenderer rules={model.rules} />
            <ModelKeywordRenderer keywords={model.keywords} />
        </div>;
    const renderSidebarContainer = () =>
        context.renderSidebar ?

            <div className="model-sidebar">
                {showStatsDialog ? <ModifyStatsDialog model={model} modelId={modelId} hideFn={setShowStatsDialog} /> : null}
                {showKeywordssDialog ? <ModifyKeywordsDialog model={model} modelId={modelId} hideFn={setShowKeywordsDialog} /> : null}
                <div
                    key={`${model.name}deleteicon`}
                    className="model-sidebar-icon"
                    onClick={() => dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: model })}
                >
                    <img
                        alt="delete"
                        src={DeleteIcon}
                        style={{ width: "100%" }}
                        title={`Remove ${model.name} from roster`} />
                </div>
                <div
                    key={`${model.name}statsicon`}
                    className="model-sidebar-icon"
                    onClick={() => setShowStatsDialog(true)}
                >
                    <img
                        alt="modifyStats"
                        src={StatsIcon}
                        style={{ width: "100%" }}
                        title="Modify model characteristics"
                    />
                </div>
                <div
                    key={`${model.name}addicon`}
                    className={context.canAddModel ? "model-sidebar-icon" : "model-sidebar-icon disable-icon"}
                    onClick={() => dispatch({ type: INCREASE_MODEL_AMOUNT, payload: model })}
                >
                    <img
                        alt="increase"
                        src={IncreaseIcon}
                        style={{ width: "100%" }}
                        title={context.canRemoveModel ? "Click to increase the number of models" : "You have reached the maximum allowance"}
                    />
                </div>
                <div
                    key={`${model.name}decreaseicon`}
                    className={context.canRemoveModel ? "model-sidebar-icon" : "model-sidebar-icon disable-icon"}
                    onClick={() => dispatch({ type: DECREASE_MODEL_AMOUNT, payload: model })}
                >
                    <img
                        alt="decrease"
                        src={DecreaseIcon}
                        style={{ width: "100%" }}
                        title={context.canRemoveModel ? "Click to decrease the number of models" : "Use the remove button above to delete this model from the roster instead"}
                    />
                </div>
                <div
                    key={`${model.name}upicon`}
                    className={idx > 0 ? "model-sidebar-icon" : "model-sidebar-icon disable-icon"}
                    onClick={() => dispatch({ type: MOVE_UP, payload: model })}
                    title={idx > 0 ? "Move model up one slot in the roster" : "This model is already at the first slot of the roster"}
                >
                    <img alt="up" src={UpIcon} style={{ width: "100%" }} />
                </div>
                <div
                    key={`${model.name}downicon`}
                    className={idx < state.Roster.length - 1 ? "model-sidebar-icon" : "model-sidebar-icon disable-icon"}
                    onClick={() => dispatch({ type: MOVE_DOWN, payload: model })}
                    title={idx < state.Roster.length - 1 ? "Move model down one slot in the roster" : "This model is already at the last slot of the roster"}
                >
                    <img alt="down" src={DownIcon} style={{ width: "100%" }} />
                </div>

                <div
                    key={`${model.name}gearicon`}
                    className="model-sidebar-icon"
                    onClick={() => alert("TODO: Equipment modification dialog")}
                >
                    <img alt="delete" src={GearIcon} style={{ width: "100%" }} />
                </div>
                <div
                    key={`${model.name}rulesicon`}
                    className="model-sidebar-icon"
                    onClick={() => alert("TODO: Rules modification dialog")}
                >
                    <img alt="delete" src={RulesIcon} style={{ width: "100%" }} />
                </div>
                <div
                    key={`${model.name}keywordsicon`}
                    className="model-sidebar-icon"
                    onClick={() => alert("TODO: Keywords modification dialog")}
                // onClick={() => setShowKeywordsDialog(true)}
                >
                    <img alt="delete" src={KeywordsIcon} style={{ width: "100%" }} />
                </div>
            </div> :
            null;

    return <div className={` ${context.renderSidebar ? "model-container-with-sidebar" : ""}`}>
        {renderModelContainer()}
        {renderSidebarContainer()}
    </div>;
};
