import React from "react";
import { useDispatch } from "react-redux";
import { getFactionSpecifics } from ".";
import { ADD_MODEL_TO_ROSTER } from "../data/redux/actions";
import { ModelType, RenderModel } from "../types";
import { DropdownMenuComponent } from "./DropdownMenu";
import { countType } from "./Utils";

export const AddModelComponent = ({ roster, faction }: { roster: RenderModel[]; faction: string }) => {
    const disableLeaders = countType(roster, ModelType.Leader) >= getFactionSpecifics(faction).ModelAllowance.Leader;
    const disableSpecial = countType(roster, ModelType.Special) >= getFactionSpecifics(faction).ModelAllowance.Special;
    const disableCore = countType(roster, ModelType.Core) >= getFactionSpecifics(faction).ModelAllowance.Core;

    const dispatch = useDispatch();

    return <div className="add-model-container">
        <div style={{ fontSize: "0.8rem", color: "#343434" }}>Add new models by choosing from the dropdowns below</div>
        <DropdownMenuComponent
            dropdownOptions={{
                id: "leader",
                placeholder: disableLeaders ? "Leaders maxed already" : "Add a new leader model",
                disabled: disableLeaders,
            }}
            originalList={getFactionSpecifics(faction).UnitList.filter((model) => model.type === ModelType.Leader).map((model) => model.name)}
            callbackFn={(listItem) => dispatch({ type: ADD_MODEL_TO_ROSTER, payload: listItem })}
        />
        <DropdownMenuComponent
            dropdownOptions={{
                id: "core",
                placeholder: disableCore ? "Core maxed already" : "Add a new core model",
                disabled: disableCore,
            }}
            originalList={getFactionSpecifics(faction).UnitList.filter((model) => model.type === ModelType.Core).map((model) => model.name)}
            callbackFn={(listItem) => dispatch({ type: ADD_MODEL_TO_ROSTER, payload: listItem })}
        />
        <DropdownMenuComponent
            dropdownOptions={{
                id: "special",
                placeholder: disableSpecial ? "Special maxed already" : "Add a new special model",
                disabled: disableSpecial,
            }}
            originalList={getFactionSpecifics(faction).UnitList.filter((model) => model.type === ModelType.Special).map((model) => model.name)}
            callbackFn={(listItem) => dispatch({ type: ADD_MODEL_TO_ROSTER, payload: listItem })}
        />
    </div >;
};
