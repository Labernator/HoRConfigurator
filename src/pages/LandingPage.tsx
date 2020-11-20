import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as AdeptaSororitas from "../data/samples/AdeptaSororitas.json";
import * as AdeptusMechanicus from "../data/samples/AdeptusMechanicus.json";
import * as DarkAngelsJson from "../data/samples/DarkAngels.json";
import * as PrimarisJson from "../data/samples/PrimarisBois.json";
import * as TauJson from "../data/samples/TauEmpire.json";
import { AdeptaSororitasCover, AdeptusMechanicusCover, DarkAngelsCover, DeathwatchCover, ImportWarbandIcon, PrimarisCover, TauEmpireCover } from "../images";
import { Warband } from "../types";
import { FileUploader } from "../utility";

export const LandingPage = () => {
    const [state, setState] = useState<Warband | undefined>(undefined);
    const [pathname, setPathName] = useState<string>("");
    const setStateAndPath = (stateFromCallback: Warband) => {
        setState(stateFromCallback);
        setPathName("/Warband");
    };
    return (
        <div className="landing-page-container">
            <div style={{ fontSize: "26px", fontWeight: "bold", position: "absolute", top: 20, left: "150px" }}>Click here to load your warband roster from file</div>
            <FileUploader image={
                <img style={{ width: "50px", height: "50px", left: "75px", top: 5 }} alt="OpenWarband" className="toolbar-icon" src={ImportWarbandIcon} title="Open any warband from file" />
            } setStateCallback={setStateAndPath} />
            <div style={{ fontSize: "26px", fontWeight: "bold", float: "left", padding: "10px" }}>Alternatively choose a sample warband from below to view its roster:</div>
            <div style={{ float: "left" }}>
                {state ? <Redirect to={{ pathname, state }} push /> : undefined}
                <img
                    alt="Dark Angels"
                    className="landing-page-icon"
                    src={DarkAngelsCover}
                    onClick={() => {
                        setState((DarkAngelsJson as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                <img
                    alt="Tau Empire"
                    className="landing-page-icon"
                    src={TauEmpireCover}
                    onClick={() => {
                        setState((TauJson as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                <img
                    alt="Primaris"
                    className="landing-page-icon"
                    src={PrimarisCover}
                    onClick={() => {
                        setState((PrimarisJson as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                <img
                    alt="Adeptus Mechanicus"
                    className="landing-page-icon"
                    src={AdeptusMechanicusCover}
                    onClick={() => {
                        setState((AdeptusMechanicus as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                <img
                    alt="Deathwatch"
                    className="landing-page-icon"
                    src={DeathwatchCover}
                    onClick={() => {
                        setState((AdeptusMechanicus as any).default as Warband);
                        setPathName("/Warband");
                    }} />
                {/* <img
                    alt="Astra Militarum"
                    className="landing-page-icon"
                    src={AstraMilitarumCover}
                    onClick={() => {
                        setState((AdeptusMechanicus as any).default as Warband);
                        setPathName("/Warband");
                    }} /> */}
                <img
                    alt="Adepta Sororitas"
                    className="landing-page-icon"
                    src={AdeptaSororitasCover}
                    onClick={() => {
                        setState((AdeptaSororitas as any).default as Warband);
                        setPathName("/Warband");
                    }} />
            </div>

        </div >
    );
};
