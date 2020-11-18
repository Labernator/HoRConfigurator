import React from "react";
import { RenderModel } from "../types";

export const ModelHeaderRenderer = ({ model }: { model: RenderModel }) => {
    const amountString = model.amount ? `${model.amount}x ` : "";
    return <div className="container-header">
        <div style={{ float: "left", width: "75%" }}> {`${amountString} ${model.name} (${model.price})`}</div>
        <div style={{ float: "right", width: "calc(25% - 30px)", paddingRight: "15px", textAlign: "right" }}>{`${model.type}`}</div>
    </div>;
};
