import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_WARBAND } from "../data/redux/actions";
import * as AdeptaSororitas from "../data/samples/AdeptaSororitas.json";
import * as AdeptusMechanicus from "../data/samples/AdeptusMechanicus.json";
import * as DarkAngelsJson from "../data/samples/DarkAngels.json";
import * as PrimarisJson from "../data/samples/PrimarisBois.json";
import * as TauJson from "../data/samples/TauEmpire.json";
import { AdeptaSororitasCover, AdeptusMechanicusCover, DarkAngelsCover, DeathwatchCover, PrimarisCover, TauEmpireCover } from "../images";
import { Warband } from "../types";

export const SampleWarbandsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className="landing-page-container">
            <div style={{ fontSize: "26px", fontWeight: "bold", float: "left", padding: "10px" }}>Choose a sample warband</div>
            <div style={{ float: "left", clear: "both" }}>
                <img
                    alt="Dark Angels"
                    className="landing-page-icon"
                    src={DarkAngelsCover}
                    onClick={() => {
                        dispatch({ type: SET_WARBAND, payload: (DarkAngelsJson as any).default as Warband });
                        history.push("/Builder");
                    }}
                />
                <img
                    alt="Tau Empire"
                    className="landing-page-icon"
                    src={TauEmpireCover}
                    onClick={() => {
                        dispatch({ type: SET_WARBAND, payload: (TauJson as any).default as Warband });
                        history.push("/Builder");
                    }}
                />
                <img
                    alt="Primaris"
                    className="landing-page-icon"
                    src={PrimarisCover}
                    onClick={() => {
                        dispatch({ type: SET_WARBAND, payload: (PrimarisJson as any).default as Warband });
                        history.push("/Builder");
                    }}
                />
                <img
                    alt="Adeptus Mechanicus"
                    className="landing-page-icon"
                    src={AdeptusMechanicusCover}
                    onClick={() => {
                        dispatch({ type: SET_WARBAND, payload: (AdeptusMechanicus as any).default as Warband });
                        history.push("/Builder");
                    }} />
                <img
                    alt="Deathwatch"
                    className="landing-page-icon"
                    src={DeathwatchCover}
                    onClick={() => {
                        dispatch({ type: SET_WARBAND, payload: (AdeptusMechanicus as any).default as Warband });
                        history.push("/Builder");
                    }} />
                {/* <img
                    alt="Astra Militarum"
                    className="landing-page-icon"
                    src={AstraMilitarumCover}
                    onClick={() => {
                        setState((AstraMilitarum as any).default as Warband);
                        setPathName("/Warband");
                    }} /> */}
                <img
                    alt="Adepta Sororitas"
                    className="landing-page-icon"
                    src={AdeptaSororitasCover}
                    onClick={() => {
                        dispatch({ type: SET_WARBAND, payload: (AdeptaSororitas as any).default as Warband });
                        history.push("/Builder");
                    }} />
            </div>

        </div >
    );
};
