import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../css/NewWarbandPage.css";
import { SET_WARBAND } from "../data/redux/actions";
import { FactionEnum, Warband } from "../types";
import { getFactionSpecifics } from "../utility";
import { AlignmentSelection } from "../warbandCreation/AlignmentSelector";
import { FactionSelection } from "../warbandCreation/FactionSelector";
import { PhilosophySelection } from "../warbandCreation/PhilosophySelector";

export const NewWarbandCreationPage = () => {
    const [state, setState] = useState<Warband | undefined>(undefined);
    const [warbandName, setWarbandName] = useState<string>("");
    const history = useHistory();
    const dispatch = useDispatch();
    const alignments = state?.Faction && getFactionSpecifics(state.Faction).Alignments;
    const setFaction = (faction: FactionEnum) => {
        setState(state ? { ...state, Faction: faction } : { Title: "", Faction: faction, Roster: [] });
    };
    const setPhilosophy = (philosophy: string) => {
        setState(state ? { ...state, Philosophy: philosophy } : { Title: "", Faction: "", Philosophy: philosophy, Roster: [] });
    };
    const setAlignment = (alignment: string) => {
        setState(state ? { ...state, Alignment: alignment } : { Title: "", Faction: "", Alignment: alignment, Roster: [] });
    };
    return <div>
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>Create a new Warband from scratch</div>

        <FactionSelection selectedFaction={state?.Faction} setFactionCallback={setFaction} />
        {state && state.Faction ? <PhilosophySelection faction={state.Faction} selectedPhilosophy={state.Philosophy} setPhilosophyCallback={setPhilosophy} /> : null}
        {state && state.Faction && alignments ? <AlignmentSelection faction={state.Faction} selectedAlignment={state.Alignment} setAlignmentCallback={setAlignment} /> : null}
        <div className="focusable">
            <input
                className="input-field"
                id="NameInput"
                placeholder="Enter the warband name here"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setWarbandName(e.currentTarget.value);
                    setState(state ? { ...state, Title: e.currentTarget.value } : { Title: e.currentTarget.value, Faction: "", Roster: [] });
                }}
                value={warbandName} />
        </div>
        <button
            className="continue-button"
            onClick={() => {
                dispatch({ type: SET_WARBAND, payload: state });
                history.push("/Builder");
            }}>
            Continue
        </button>
    </div>;
};
