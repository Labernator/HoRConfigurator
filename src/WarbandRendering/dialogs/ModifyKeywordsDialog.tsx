import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { UPDATE_MODEL_KEYWORDS } from "../../data/redux/actions";
import { RenderModel, ReplacableString } from "../../types";

export const ModifyKeywordsDialog = ({ model, modelId, hideFn }: { model: RenderModel; modelId: string; hideFn(hide: boolean): void }) => {
    const position = document.getElementById(modelId)?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 25, left: (position?.left || 0) + 25, width: (position?.width || 0) - 75 };
    const [keywords, setKeywords] = useState<string | ReplacableString>("");
    const dispatch = useDispatch();
    const getKeywords = () =>
        <div style={{ display: "inline-grid", gridTemplateColumns: "50% 50%", width: "100%" }}>
            <div style={{ gridColumn: 1, display: "inline-grid" }}>
                <div className="left-floating-div">
                    <div className="stats-text">Add a keyword: </div>
                    <div className="focusable-div">
                        <input
                            className="stats-input-field"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setKeywords(e.currentTarget.value)}>
                        </input>
                    </div>
                </div>
                <div>
                    <div>Which does it replace?</div>
                    {model.keywords.map((word) => <div>{word}</div>)}
                </div>
            </div>


            <button
                className={`dialog-button ${!keywords ? "dialog-button-disabled" : ""}`}
                onClick={() => {
                    if (!keywords) {
                        return undefined;
                    }
                    dispatch({ type: UPDATE_MODEL_KEYWORDS, payload: { model, keywords } });

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
                    <div className="modal-header">{`Change any stats you wish for ${model.name}`}</div>
                    {getKeywords()}
                </div>
            </div>,
            document.getElementById(modelId) as HTMLElement
        )
    );
};
