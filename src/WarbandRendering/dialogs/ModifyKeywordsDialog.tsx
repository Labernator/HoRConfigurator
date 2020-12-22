import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { store } from "../..";
import { UPDATE_MODEL_KEYWORDS } from "../../data/redux/actions";
import { RenderModel } from "../../types";
import { getFactionSpecifics } from "../../utility";

export const ModifyKeywordsDialog = ({ model, modelId, hideFn }: { model: RenderModel; modelId: string; hideFn(hide: boolean): void }) => {
    const position = document.getElementById(modelId)?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 25, left: (position?.left || 0) + 25, width: (position?.width || 0) - 75 };
    const [keywords, setKeywords] = useState<string>("");
    const [selectedReplace, setSelectedReplace] = useState<string>("");
    const dispatch = useDispatch();
    const state = store.getState();
    const getKeywords = () =>
        <div style={{ fontSize: "1rem" }}>
            <div className="keyword-dialog-text">Add a new keyword: </div>
            <div className="focusable-div keyword-input-div">
                <input
                    className="stats-input-field"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setKeywords(e.currentTarget.value)}>
                </input>
            </div>
            <details style={{ clear: "both" }}>
                <summary className="keyword-dialog-summary">Replace an existing keyword</summary>
                {model.keywords.filter((key) => key !== state.Alignment && !getFactionSpecifics(state.Faction).Keywords.find((word) => word === key)).map((word) =>
                    <div
                        className="checkbox-container"
                        key={`checkbox-container-${word}`}
                        onClick={() => setSelectedReplace(word)}>
                        <div className={selectedReplace === word ? "checkbox selected-checkbox" : "checkbox"} />
                        <div>{word}</div>
                    </div>)}
            </details>

            <button
                className={`dialog-button ${!keywords ? "dialog-button-disabled" : ""}`}
                onClick={() => {
                    if (!keywords) {
                        return undefined;
                    }
                    if (!selectedReplace) {
                        dispatch({ type: UPDATE_MODEL_KEYWORDS, payload: { model, keywords: [keywords] } });
                    } else {
                        const replacingKeyword = [{ name: keywords, replacing: selectedReplace }];
                        dispatch({ type: UPDATE_MODEL_KEYWORDS, payload: { model, keywords: replacingKeyword } });
                    }

                    hideFn(false);
                }}
                title={`${!keywords ? "You did not make any changes that could be submitted" : "Click to submit changes"}`}
            >Save changes</button>
            <button
                className="dialog-button"
                onClick={() => hideFn(false)}
            >Cancel</button>
        </div>;

    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div style={cssProperties} className="modal">
                    <div className="modal-header">{`You can add additional keywords for ${model.name}`}</div>
                    {getKeywords()}
                </div>
            </div>,
            document.getElementById(modelId) as HTMLElement
        )
    );
};
