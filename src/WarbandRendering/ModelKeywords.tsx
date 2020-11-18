import React from "react";

export const ModelKeywordRenderer = ({ keywords }: { keywords: string[] | undefined }) => keywords ? <div className="keywords-container">
    <div style={{ fontWeight: "bold", float: "left" }}>Keywords</div>
    <div style={{ paddingLeft: "192px" }}>{keywords.join(", ")}</div>
</div> : null;
