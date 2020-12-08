import FuzzySearch from "fuzzy-search";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import "../css/Dropdown.css";
import { ADD_MODEL_TO_ROSTER } from "../data/redux/actions";

const DropdownList = ({ list, parentId, showFn }: { list: string[]; parentId: string; showFn(hide: boolean): void }) => {
    const position = document.getElementById(`dropdown-container-${parentId}`)?.getElementsByClassName("focus-div")[0].getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 32, left: (position?.left || 0), width: (position?.width || 0) - 4 };

    const dispatch = useDispatch();

    return (
        ReactDOM.createPortal(
            <div style={cssProperties} className="dropdown-portal">
                {list.map((listItem) =>
                    <div key={`dropdown-list-item-${parentId}-${listItem}`}
                        className="dropdown-list-item"
                        onMouseDown={() => {
                            dispatch({ type: ADD_MODEL_TO_ROSTER, payload: listItem });
                            showFn(false);
                        }}
                    >
                        {listItem}
                    </div>
                )}
            </div>,
            document.getElementById(`dropdown-container-${parentId}`) as HTMLElement
        )
    );
};

export const DropdownMenuComponent = ({ originalList, placeholder, id, disable }: { originalList: string[]; placeholder: string; id: string; disable: boolean }) => {
    const [showStatsDialog, setShowStatsDialog] = useState<boolean>(false);
    const [filteredList, setFilteredList] = useState<string[]>(originalList);
    const searcher = new FuzzySearch(originalList);

    return <div id={`dropdown-container-${id}`} className="dropdown-container" >
        {showStatsDialog ? <DropdownList list={filteredList} showFn={setShowStatsDialog} parentId={id} /> : null}
        <div className={disable ? "focus-div disabled-input" : "focus-div"}>
            <input className="dropdown-input"
                onFocus={() => setShowStatsDialog(true)}
                onBlur={() => setShowStatsDialog(false)}
                onChange={(event) => setFilteredList(searcher.search(event.currentTarget.value))}
                placeholder={placeholder}
            ></input>
        </div>
    </div>;
};
