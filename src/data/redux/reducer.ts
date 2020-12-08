import { RosterModel, Warband } from "../../types";
import { getDetailedModel, isPartialMultiProfileStatLine, isSearchedModel } from "../../utility";
import * as ReduxActions from "./actions";

// tslint:disable-next-line: cyclomatic-complexity
export function stateReducer(state: Warband = { Title: "", Faction: "", Roster: [] }, action: ReduxActions.Actions): Warband {
    switch (action.type) {
        case ReduxActions.SET_FACTION:
            return { ...state, Faction: action.payload };
        case ReduxActions.SET_WARBAND:
            return action.payload;
        case ReduxActions.DECREASE_MODEL_AMOUNT:
            const unitIndex = state.Roster.findIndex((unit) => isSearchedModel(unit, action.payload, state.Faction, state.Alignment));
            const model = state.Roster[unitIndex];
            if (typeof (model) === "string") {
                throw new Error("Cannot reduce the number of models from a single model.");
            } else {
                return { ...state, Roster: [...state.Roster.slice(0, unitIndex), { ...model, amount: (model.amount || 1) - 1 }, ...state.Roster.slice(unitIndex + 1)] };
            }
        case ReduxActions.INCREASE_MODEL_AMOUNT:
            const unitIdx = state.Roster.findIndex((unit) => isSearchedModel(unit, action.payload, state.Faction, state.Alignment));
            const rosterModel = state.Roster[unitIdx];
            if (typeof (rosterModel) === "string") {
                return { ...state, Roster: [...state.Roster.slice(0, unitIdx), { name: rosterModel, amount: 2 }, ...state.Roster.slice(unitIdx + 1)] };
            } else {
                return { ...state, Roster: [...state.Roster.slice(0, unitIdx), { ...rosterModel, amount: (rosterModel.amount || 1) + 1 }, ...state.Roster.slice(unitIdx + 1)] };
            }
        case ReduxActions.REMOVE_UNIT_FROM_ROSTER:
            return { ...state, Roster: state.Roster.filter((unit) => !isSearchedModel(unit, action.payload, state.Faction, state.Alignment)) };
        case ReduxActions.ADD_MODEL_TO_ROSTER:
            if (!state.Roster.find((unit) => typeof (unit) === "string" ? unit === action.payload : unit.name === action.payload)) {
                return { ...state, Roster: [...state.Roster, action.payload] };
            } else {
                const stringIdx = state.Roster.findIndex((unit) => typeof (unit) === "string" && unit === action.payload);
                if (stringIdx !== -1) {
                    return { ...state, Roster: [...state.Roster.slice(0, stringIdx), { name: action.payload, amount: 2 }, ...state.Roster.slice(stringIdx + 1)] };
                } else {
                    const detailedPayloadModel = getDetailedModel(action.payload, state.Faction, state.Alignment);
                    const complexIdx = state.Roster.findIndex((unit) =>
                        typeof (unit) !== "string" &&
                        unit.name === action.payload &&
                        (getDetailedModel(unit, state.Faction, state.Alignment)?.price || 0) / (getDetailedModel(unit, state.Faction, state.Alignment)?.amount || 1) === detailedPayloadModel?.price);
                    const detailedRosterModel = state.Roster[complexIdx] as RosterModel;
                    if (detailedRosterModel) {
                        return { ...state, Roster: [...state.Roster.slice(0, complexIdx), { ...detailedRosterModel, amount: (detailedRosterModel.amount || 1) + 1 }, ...state.Roster.slice(complexIdx + 1)] };
                    } else {
                        return { ...state, Roster: [...state.Roster, action.payload] };
                    }

                }
            }

        case ReduxActions.UPDATE_MODEL_STATS:
            const modelIdx = state.Roster.findIndex((unit) => isSearchedModel(unit, action.payload.model, state.Faction, state.Alignment));
            const modelWithStats = state.Roster[modelIdx];

            if (typeof (modelWithStats) === "string") {
                return { ...state, Roster: [...state.Roster.slice(0, modelIdx), { name: modelWithStats, stats: action.payload.stats }, ...state.Roster.slice(modelIdx + 1)] };
            } else {
                if (isPartialMultiProfileStatLine(modelWithStats.stats) && isPartialMultiProfileStatLine(action.payload.stats)) {
                    const newStats = modelWithStats.stats ? {
                        firstProfile: { ...modelWithStats.stats.firstProfile, ...action.payload.stats.firstProfile },
                        secondProfile: { ...modelWithStats.stats.secondProfile, ...action.payload.stats.secondProfile },
                    } : action.payload.stats;
                    return { ...state, Roster: [...state.Roster.slice(0, modelIdx), { ...modelWithStats, stats: newStats }, ...state.Roster.slice(modelIdx + 1)] };
                } else {
                    return { ...state, Roster: [...state.Roster.slice(0, modelIdx), { ...modelWithStats, stats: action.payload.stats }, ...state.Roster.slice(modelIdx + 1)] };
                }
            }
        case ReduxActions.UPDATE_MODEL_KEYWORDS:
            const modelSlot = state.Roster.findIndex((unit) => isSearchedModel(unit, action.payload.model, state.Faction, state.Alignment));
            const modelWithKeywords = state.Roster[modelSlot];

            if (typeof (modelWithKeywords) === "string") {
                return { ...state, Roster: [...state.Roster.slice(0, modelSlot), { name: modelWithKeywords, keywords: action.payload.keyword }, ...state.Roster.slice(modelSlot + 1)] };
            } else {
                return { ...state, Roster: [...state.Roster.slice(0, modelSlot), { ...modelWithKeywords, keywords: action.payload.keyword }, ...state.Roster.slice(modelSlot + 1)] };
            }
        case ReduxActions.MOVE_UP:
            const modelNr = state.Roster.findIndex((unit) => isSearchedModel(unit, action.payload, state.Faction, state.Alignment));
            const movingUnit = state.Roster[modelNr];
            const switchingUnit = state.Roster[modelNr - 1];
            return { ...state, Roster: [...state.Roster.slice(0, modelNr - 1), movingUnit, switchingUnit, ...state.Roster.slice(modelNr + 1)] };
        case ReduxActions.MOVE_DOWN:
            const modelSlot3 = state.Roster.findIndex((unit) => isSearchedModel(unit, action.payload, state.Faction, state.Alignment));
            const movingModel = state.Roster[modelSlot3];
            const switchingModel = state.Roster[modelSlot3 + 1];
            return { ...state, Roster: [...state.Roster.slice(0, modelSlot3), switchingModel, movingModel, ...state.Roster.slice(modelSlot3 + 2)] };
        default:
            return state;
    }
}
