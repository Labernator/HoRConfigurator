import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CodeEditorContainer } from "../CodeMirror";
import "../css/BuilderPage.css";
import { PageMap, RenderModel, Warband } from "../types";
import { getDetailedRoster, getRosterPrice, getStratagems } from "../utility";
import { AddModelComponent } from "../utility/AddModelComponent";
import { ErrorMessageRenderer } from "../utility/ErrorMessages";
import { Toolbar } from "../utility/Toolbar";
import { WarbandRenderer } from "../WarbandRendering/WarbandRenderer";

const Builder = (props: Warband) => {
    const [modelMap, setModelMap] = useState<PageMap[]>([]);
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
    const warbandState = { Title: props.Title, Faction: props.Faction, Alignment: props.Alignment, Philosophy: props.Philosophy, ScenariosPlayed: props.ScenariosPlayed, Roster: props.Roster };
    const roster = getDetailedRoster(warbandState.Roster, warbandState.Faction, warbandState.Alignment).filter((member) => member !== undefined) as RenderModel[];

    const renderState = { ...warbandState, RosterPrice: getRosterPrice(roster), Roster: roster, Stratagems: getStratagems(warbandState.Faction, roster, warbandState.Alignment, warbandState.ScenariosPlayed) };
    const filterRosterToPage = (page: number): RenderModel[] => roster.filter((member) => modelMap.find((entry) => entry.id === `modelsheet-${member.name}-${member.price}` && entry.page === page));
    const getPageCountFromMap = () => modelMap.map((model) => model.page).filter((page, idx, arr) => arr.indexOf(page) === idx).length;
    const renderPages = () => {
        let pages: JSX.Element[] = [];
        for (let i = 1; i <= getPageCountFromMap(); i++) {
            pages = [
                ...pages,
                <WarbandRenderer
                    key={`warband-pdf-rendering-page${i}`}
                    state={{ ...renderState, Roster: filterRosterToPage(i) }}
                    page={{ nr: i, total: getPageCountFromMap() }}
                    isPdfSection={true}
                />,
            ];
        }
        return pages;
    };
    return <div>
        <Toolbar setEditorVisibility={setEditorVisibility} />
        <AddModelComponent roster={roster} faction={warbandState.Faction} />
        <ErrorMessageRenderer />
        {modelMap.length ? <div>{renderPages()}</div > : undefined}
        <WarbandRenderer state={renderState} page={{ nr: 1, total: 1 }} hide={editorVisible} />
        <CodeEditorContainer code={warbandState} visible={editorVisible} />
    </div >;
};

const mapStateToProps = (state: Warband) => state;

export const BuilderPage = connect(mapStateToProps)(Builder);
