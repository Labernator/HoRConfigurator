import React from "react";
import { getFactionSpecifics } from ".";
import { store } from "..";
import { CoreIcon, LeaderIcon, SpecialIcon } from "../images";
import { ModelType, RenderModel } from "../types";
import { countType, getDetailedRoster } from "./Utils";

export const AllowanceComponent = () => {
    const state = store.getState();
    const detailedRoster = getDetailedRoster(state.Roster, state.Faction, state.Alignment).filter((unit) => unit !== undefined) as RenderModel[];
    return <div style={{ height: "64px", float: "right" }}>
        <div style={{ float: "left", padding: 10 }}>
            <img
                src={LeaderIcon}
                style={{ height: 20, width: 40 }}
                // className="toolbar-icon"
                alt="Open/Close Editor"
                title="Leader category"
            />
            <div style={{ textAlign: "center" }}>{`${countType(detailedRoster, ModelType.Leader)} / ${getFactionSpecifics(state.Faction).ModelAllowance.Leader}`}</div>
        </div>
        <div style={{ float: "left", padding: 10 }}>
            <img
                src={CoreIcon}
                style={{ height: 20, width: 40 }}
                // className="toolbar-icon"
                alt="Open/Close Editor"
                title="Core category"
            />
            <div style={{ textAlign: "center" }} >{`${countType(detailedRoster, ModelType.Core)} / ${getFactionSpecifics(state.Faction).ModelAllowance.Core}`}</div>
        </div>
        <div style={{ float: "left", padding: 10 }}>
            <img
                src={SpecialIcon}
                style={{ height: 20, width: 40 }}
                // className="toolbar-icon"
                alt="Open/Close Editor"
                title="Special category"
            />
            <div style={{ textAlign: "center" }}>{`${countType(detailedRoster, ModelType.Special)} / ${getFactionSpecifics(state.Faction).ModelAllowance.Special}`}</div>
        </div>
    </div>;
};
