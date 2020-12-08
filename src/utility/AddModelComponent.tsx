import React from "react";
import { getFactionSpecifics } from ".";
import { ModelType, RenderModel } from "../types";
import { DropdownMenuComponent } from "./DropdownMenu";
import { countType } from "./Utils";

export const AddModelComponent = ({ roster, faction }: { roster: RenderModel[]; faction: string }) => {
    const disableLeaders = countType(roster, ModelType.Leader) >= getFactionSpecifics(faction).ModelAllowance.Leader;
    const disableSpecial = countType(roster, ModelType.Special) >= getFactionSpecifics(faction).ModelAllowance.Special;
    const disableCore = countType(roster, ModelType.Core) >= getFactionSpecifics(faction).ModelAllowance.Core;

    return <div style={{ height: "64px", paddingTop: "15px" }}>
        <div style={{ paddingLeft: "75px", fontSize: "0.8rem", color: "#343434" }}>Add new models by choosing from the dropdowns below</div>
        <DropdownMenuComponent
            id="leader"
            placeholder={disableLeaders ? "Leaders maxed already" : "Add a new leader model"}
            originalList={getFactionSpecifics(faction).UnitList.filter((model) => model.type === ModelType.Leader).map((model) => model.name)}
            disable={disableLeaders}
        />
        <DropdownMenuComponent
            id="code"
            placeholder={disableCore ? "Core maxed already" : "Add a new core model"}
            originalList={getFactionSpecifics(faction).UnitList.filter((model) => model.type === ModelType.Core).map((model) => model.name)}
            disable={disableCore} />
        <DropdownMenuComponent
            id="special"
            placeholder={disableSpecial ? "Special maxed already" : "Add a new special model"}
            originalList={getFactionSpecifics(faction).UnitList.filter((model) => model.type === ModelType.Special).map((model) => model.name)}
            disable={disableSpecial} />
    </div >;
};
