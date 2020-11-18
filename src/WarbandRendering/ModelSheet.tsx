import React from "react";
import { FactionEnum, ModelStats, RenderModel } from "../types";
import { ModelEquipmentRenderer } from "./ModelEquipment";
import { ModelHeaderRenderer } from "./ModelHeaderRenderer";
import { ModelKeywordRenderer } from "./ModelKeywords";
import { ModelRulesRenderer } from "./ModelRules";
import { ModelStatsRenderer } from "./ModelStats";

export const ModelSheetRenderer = ({ model, faction }: { model: RenderModel; faction: FactionEnum }) =>
    <div id={`modelsheet-${model.name}-${model.price}`} className="quick-ref-enemies-container model-container">
        <ModelHeaderRenderer model={model} />
        <ModelStatsRenderer name={model.name} stats={model.stats as ModelStats} />
        {model.equipment ? <ModelEquipmentRenderer equipment={model.equipment} faction={faction} name={`${model.name}-${model.price}`} /> : undefined}
        <ModelRulesRenderer rules={model.rules} />
        <ModelKeywordRenderer keywords={model.keywords} />
    </div>;
