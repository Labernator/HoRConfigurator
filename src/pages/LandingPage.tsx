import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../css/LandingPage.css";
import { SET_WARBAND } from "../data/redux/actions";
import { CreateWarbandIcon, ImportWarbandIcon, UseSampleIcon } from "../images";

export const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className="landing-page ">
            <div style={{ gridArea: "1/1/1/4", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>HoR Configurator - choose how to continue</div>
            <label htmlFor="file-uploader" className="landing-page-columns" style={{ gridArea: "2/1" }}>
                <input
                    id="file-uploader"
                    type="file"
                    accept=".json"
                    style={{ display: "none" }}
                    onChange={() => {
                        const reader = new FileReader();
                        reader.onload = (ev: ProgressEvent<FileReader>) => {
                            dispatch({ type: SET_WARBAND, payload: JSON.parse(ev.target?.result as string) });
                            history.push("/Builder");
                        };
                        reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                    }}
                />
                <div style={{ gridArea: "1/1" }} className="landing-page-column-header">Load an existing warband from file</div>
                <img style={{ gridArea: "2/1" }} alt="ImportWarband" className="landing-page-column-icon" src={ImportWarbandIcon} />
            </label>
            <div className="landing-page-columns" style={{ gridArea: "2/2" }} onClick={() => history.push("/NewWarband")}>
                <div className="landing-page-column-header">Create a new warband</div>
                <img alt="CreateWarband" className="landing-page-column-icon" src={CreateWarbandIcon} />
            </div>
            <div className="landing-page-columns" style={{ gridArea: "2/3" }} onClick={() => history.push("/SampleWarbands")}>
                <div className="landing-page-column-header">Use a sample warband to start</div>
                <img alt="SampleWarband" className="landing-page-column-icon" src={UseSampleIcon} />
            </div>
        </div >
    );
};
