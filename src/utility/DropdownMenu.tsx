import FuzzySearch from "fuzzy-search";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/Dropdown.css";

export interface DropdownOptions {
    placeholder: string;
    id: string;
    disabled?: boolean;
    keepSelection?: boolean;
    clearable?: boolean;
}

const DropdownList = ({ list, parentId, showFn, callbackFn }: { list: string[]; parentId: string; showFn(hide: boolean): void; callbackFn(item: string): void }) => {
    const position = document.getElementById(`dropdown-container-${parentId}`)?.getElementsByClassName("dropdown-focus-div")[0].getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 32, left: (position?.left || 0), width: (position?.width || 0) - 4 };

    return (
        ReactDOM.createPortal(
            <div style={cssProperties} className="dropdown-portal">
                {list.length > 0 ? list.map((listItem) =>
                    <div key={`dropdown-list-item-${parentId}-${listItem}`}
                        className="dropdown-list-item"
                        onMouseDown={() => {
                            // dispatch({ type: ADD_MODEL_TO_ROSTER, payload: listItem });
                            callbackFn(listItem);
                            showFn(false);
                        }}
                    >
                        {listItem}
                    </div>
                ) : <div key={`dropdown-list-item-${parentId}-empty-list`} className="dropdown-empty-list">No match found for search string. Please refine your search.</div>}
            </div>,
            document.getElementById(`dropdown-container-${parentId}`) as HTMLElement
        )
    );
};

export const DropdownMenuComponent = ({ originalList, dropdownOptions, callbackFn }: { originalList: string[]; dropdownOptions: DropdownOptions; callbackFn(item: string): void }) => {
    const [showStatsDialog, setShowStatsDialog] = useState<boolean>(false);
    const [filteredList, setFilteredList] = useState<string[]>(originalList);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const searcher = new FuzzySearch(originalList);

    const internalCallbackFn = (listItem: string) => {
        if (!dropdownOptions.keepSelection) {
            setSelectedValue("");
        } else {
            setSelectedValue(listItem);
        }
        callbackFn(listItem);
    };

    return <div id={`dropdown-container-${dropdownOptions.id}`} className="dropdown-container" >
        {showStatsDialog ? <DropdownList list={filteredList} showFn={setShowStatsDialog} parentId={dropdownOptions.id} callbackFn={internalCallbackFn} /> : null}
        <div className={dropdownOptions.disabled ? "dropdown-focus-div disabled-input" : "dropdown-focus-div"}>
            <input className="dropdown-input"
                onFocus={() => setShowStatsDialog(true)}
                onBlur={() => setShowStatsDialog(false)}
                onChange={(event) => { setSelectedValue(event.currentTarget.value); setFilteredList(searcher.search(event.currentTarget.value)); }}
                placeholder={dropdownOptions.placeholder}
                value={selectedValue}
            ></input>
            {dropdownOptions.clearable && selectedValue ? <div className="dropdown-input-clearable" onClick={() => { setSelectedValue(""); setFilteredList(originalList); }}>X</div> : null}
        </div>
    </div>;
};
