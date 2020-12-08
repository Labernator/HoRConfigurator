// tslint:disable: no-var-requires

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/mbo.css";
import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useDispatch } from "react-redux";
import { SET_WARBAND } from "./data/redux/actions";
import { RefreshWarbandDisabledIcon, RefreshWarbandIcon } from "./images";
import { Warband } from "./types";
import { isWarband } from "./utility";

declare global {
    interface Window { jsonLint: any; }
}

require("codemirror/addon/lint/json-lint.js");
require("codemirror/addon/lint/lint.js");
require("codemirror/addon/lint/lint.css");

export const CodeEditorContainer = ({ code, visible }: { code: Warband; visible: boolean }) => {
    const [codeEditorState, setCodeEditorState] = useState(JSON.stringify(code, null, 2));
    const [isViable, setViable] = useState<boolean>(isWarband(code));
    const [isDirty, setDirty] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setCodeEditorState(JSON.stringify(code, null, 2));
    }, [code]);

    const refreshRendering = () => {
        dispatch({ type: SET_WARBAND, payload: JSON.parse(codeEditorState) });
        setDirty(false);
    };

    return (
        visible ? <div className="code-mirror-container">
            <img
                src={isDirty && isViable ? RefreshWarbandIcon : RefreshWarbandDisabledIcon}
                style={{ float: "right", cursor: isDirty ? "pointer" : "auto" }}
                className="toolbar-icon"
                alt="Refresh Warband"
                onClick={() => isDirty && isViable ? refreshRendering() : (() => undefined)()}
                title={`${isDirty ? "Refresh warband" : "Make a change in the Editor. Afterwards you can trigger the refresh by clicking here"}`}
            />
            <div className="code-mirror-title">Warband JSON Editor</div>
            <CodeMirror
                className="code-mirror-editor"
                value={codeEditorState}
                options={{
                    theme: "mbo",
                    viewportMargin: Infinity,
                    mode: {
                        name: "javascript",
                        json: true,
                        statementIndent: 2,
                    },
                    // mode: "application/json",
                    gutters: ["CodeMirror-lint-markers"],
                    lineNumbers: true,
                    // lineWrapping: true,
                    indentWithTabs: false,
                    tabSize: 2,
                    lint: {
                        onUpdateLinting: (annotationsNotSorted: any[], annotations: any[], codeMirror: any) => {
                            annotationsNotSorted.length > 0 ? setViable(false) : setViable(() => {
                                let isWarbandBool = false;
                                try {
                                    isWarbandBool = isWarband(JSON.parse(codeEditorState));
                                } catch (e) {
                                    // tslint:disable-next-line: no-console
                                    console.log(e);
                                } finally {
                                    // tslint:disable-next-line: no-unsafe-finally
                                    return isWarbandBool;
                                }
                            }
                            );
                        },
                    },
                }}
                autoCursor={false}
                onBeforeChange={(_editor: any, _data: any, value: string) => {
                    setCodeEditorState(value);
                }}
                onChange={(editor: any, data: any, value: any) => {
                    if (data.removed?.toString().length !== 0 && data.text?.toString().length === 0) {
                        editor.setCursor({ ...editor.getCursor(), ch: data.from.ch, line: data.from.line });
                    } else if (data.text.toString().length !== (data.removed || "").toString().length) {
                        editor.setCursor({ ...editor.getCursor(), ch: data.text.toString().length - (data.removed || "").toString().length + data.to.ch, line: data.to.line });
                    } else {
                        editor.setCursor({ ...editor.getCursor(), ch: data.to.ch + 1, line: data.to.line });
                    }
                    setDirty(true);
                }}
            />
        </div> : null
    );
};
