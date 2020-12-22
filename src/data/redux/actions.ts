import { ModelStats, MultiProfileModelStats, RecursivePartial, RenderModel, ReplacableString, Warband } from "../../types";

export const SET_FACTION = "SET_FACTION";
export const SET_WARBAND = "SET_WARBAND";
export const DECREASE_MODEL_AMOUNT = "DECREASE_MODEL_AMOUNT";
export const INCREASE_MODEL_AMOUNT = "INCREASE_MODEL_AMOUNT";
export const REMOVE_UNIT_FROM_ROSTER = "REMOVE_UNIT_FROM_ROSTER";
export const ADD_MODEL_TO_ROSTER = "ADD_MODEL_TO_ROSTER";
export const UPDATE_MODEL_STATS = "UPDATE_MODEL_STATS";
export const UPDATE_MODEL_KEYWORDS = "UPDATE_MODEL_KEYWORDS";
export const UPDATE_MODEL_RULES = "UPDATE_MODEL_RULES";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

interface SetFaction {
    type: typeof SET_FACTION;
    payload: string;
}

interface SetWarband {
    type: typeof SET_WARBAND;
    payload: Warband;
}

interface DecreaseModelAmount {
    type: typeof DECREASE_MODEL_AMOUNT;
    payload: RenderModel;
}

interface IncreaseModelAmount {
    type: typeof INCREASE_MODEL_AMOUNT;
    payload: RenderModel;
}

interface RemoveUnitFromRoster {
    type: typeof REMOVE_UNIT_FROM_ROSTER;
    payload: RenderModel;
}

interface MoveUp {
    type: typeof MOVE_UP;
    payload: RenderModel;
}

interface MoveDown {
    type: typeof MOVE_DOWN;
    payload: RenderModel;
}

interface AddModelToRoster {
    type: typeof ADD_MODEL_TO_ROSTER;
    payload: string;
}

interface UpdateUnitStats {
    type: typeof UPDATE_MODEL_STATS;
    payload: {
        model: RenderModel;
        stats: Partial<ModelStats> | RecursivePartial<MultiProfileModelStats>;
    };
}
interface UpdateModelKeywords {
    type: typeof UPDATE_MODEL_KEYWORDS;
    payload: {
        model: RenderModel;
        keywords: Array<string | ReplacableString>;
    };
}

interface UpdateModelRules {
    type: typeof UPDATE_MODEL_RULES;
    payload: {
        model: RenderModel;
        rules: Array<string>;
    };
}

export type Actions = AddModelToRoster | SetFaction | SetWarband | DecreaseModelAmount | IncreaseModelAmount | RemoveUnitFromRoster | UpdateUnitStats | UpdateModelKeywords | UpdateModelRules | MoveUp | MoveDown;
