import React from "react";

export const ArmyKeywordsRenderer = ({ keywords }: { keywords: string[] }) => {
    const renderKeywords = () => keywords.join(", ");
    return <div className="model-container army-keywords-container">
        <div className="container-header">{`Keywords (${keywords.length})`}</div>
        <div className="keywords-text">{renderKeywords()}</div>
    </div>;
};
