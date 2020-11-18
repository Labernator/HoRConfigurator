import React from "react";

export const FileUploader = ({ image, setStateCallback }: { image: JSX.Element; setStateCallback(json: any): void }) => {
    const onChange = () => {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            setStateCallback(JSON.parse(ev.target?.result as string));
        };
        reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
    };
    return <label htmlFor="file-uploader" className="landing-page-columns" style={{ gridArea: "1/1" }}>
        <input id="file-uploader" type="file" accept=".json" style={{ visibility: "hidden" }} onChange={onChange}></input>
        {image}
    </label>;
};
