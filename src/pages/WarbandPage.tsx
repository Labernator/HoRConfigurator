import React, { useEffect, useState } from "react";
import { CodeEditorContainer } from "../CodeMirror";
import { FactionEnum, PageMap, RenderModel, Warband } from "../types";
import { getDetailedRoster, getRosterPrice, getStratagems } from "../utility";
import { Toolbar } from "../utility/Toolbar";
import { WarbandRenderer } from "../WarbandRendering/WarbandRenderer";

export const WarbandPage = (path: any) => {
    const [modelMap, setModelMap] = useState<PageMap[]>([]);
    const [state, setState] = useState<Warband>(path.location.state as Warband);
    const [editorVisible, setEditorVisibility] = useState<boolean>(false);
    useEffect(() => {
        setModelMap((map) => [
            ...map,
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) => el.getBoundingClientRect().height + el.getBoundingClientRect().top < 1122).map((element) => ({ "id": element.id, "page": 1 })),
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) =>
                el.getBoundingClientRect().height + el.getBoundingClientRect().top >= 1122 &&
                el.getBoundingClientRect().height + el.getBoundingClientRect().top < 2144
            ).map((element) => ({ "id": element.id, "page": 2 })),
            ...Array.from(document.querySelectorAll(".model-container")).filter((el) =>
                el.getBoundingClientRect().height + el.getBoundingClientRect().top >= 2144).map((element) => ({ "id": element.id, "page": 3 })),
        ]);
    }, []);

    const faction = state.Faction as FactionEnum;
    const roster = getDetailedRoster(state.Roster, faction, state.Alignment);
    const filterRosterToPage = (page: number): RenderModel[] => roster.filter((member) => modelMap.find((entry) => entry.id === `modelsheet-${member.name}-${member.price}` && entry.page === page));
    const getPageCountFromMap = () => modelMap.map((model) => model.page).filter((page, idx, arr) => arr.indexOf(page) === idx).length;
    const renderPages = () => {
        let pages: JSX.Element[] = [];
        for (let i = 1; i <= getPageCountFromMap(); i++) {
            pages = [
                ...pages,
                <WarbandRenderer
                    key={`warband-pdf-rendering-page${i}`}
                    state={{ ...state, Roster: filterRosterToPage(i) }}
                    page={{ nr: i, total: getPageCountFromMap() }}
                    rosterPrice={getRosterPrice(roster)}
                    stratagems={getStratagems({ ...state, Roster: roster })}
                />,
            ];
        }
        return pages;
    };
    return <div>
        <Toolbar state={state} setState={setState} setEditorVisibility={setEditorVisibility} />
        {modelMap.length ? <div>{renderPages()}</div > : undefined}
        <WarbandRenderer state={{ ...state, Roster: roster }} page={{ nr: 1, total: 1 }} rosterPrice={getRosterPrice(roster)} stratagems={getStratagems({ ...state, Roster: roster })} fullRender={true} hide={editorVisible} />
        <CodeEditorContainer code={state} visible={editorVisible} onSave={setState} />
    </div >;
};
