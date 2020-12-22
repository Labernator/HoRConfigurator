import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { store } from "../..";
import { UPDATE_MODEL_RULES } from "../../data/redux/actions";
import { DeleteIcon } from "../../images";
import { FactionEnum, RenderModel, RenderWeapon } from "../../types";
import { getFactionSpecifics, getWeaponProfile, isBasicWeapon } from "../../utility";
import { DropdownMenuComponent } from "../../utility/DropdownMenu";
import { ModelEquipmentRenderer } from "../ModelEquipment";

export const ModifyEquipmentDialog = ({ model, modelId, modifiedGear, hideFn }: { model: RenderModel; modelId: string; modifiedGear: string[] | undefined; hideFn(hide: boolean): void }) => {
    const position = document.getElementById(modelId)?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 25, left: (position?.left || 0) + 25, width: (position?.width || 0) - 75 };
    const [gear, setGear] = useState<string[]>(modifiedGear || []);
    const dispatch = useDispatch();
    const state = store.getState();
    const detailedWeapons = getFactionSpecifics(state.Faction).WeaponPriceList.map((weapon) => getWeaponProfile(weapon.name, state.Faction as FactionEnum));
    const meleeWeapons = detailedWeapons.filter((weapon) => isBasicWeapon(weapon) ? weapon.type === "Melee" : false) as RenderWeapon[];
    const addGear = (listItem: string) => {
        setGear([...gear, listItem]);
    };
    const removeGear = (listItem: string) => {
        setGear(gear.filter((rule) => rule !== listItem));
    };
    const renderGearTable = (renderWeapon: RenderWeapon[]) =>
        <table className="rules-modification-table">
            <colgroup>
                <col style={{ width: "50px" }} />
            </colgroup>
            <tbody>
                {renderWeapon.map((weapon) =>
                    [<tr key={`${weapon.name} (${weapon.price || "0"} RP)-nameprice`}>
                        <th>Rule</th>
                        <td>
                            <div style={{ float: "left" }}>{`${weapon.name} (${weapon.price || "0"} RP)`}</div>
                            <img
                                className="remove-rule-icon"
                                alt={`delete-rule-${weapon.name}`}
                                src={DeleteIcon}
                                onClick={() => removeGear(weapon.name)}
                            />
                        </td>
                    </tr>,
                    <tr key={`${weapon.name} (${weapon.price || "0"} RP)-effect`}>
                        <th>Effect</th>
                        <td>{weapon.amount}</td>
                    </tr>])}
            </tbody>
        </table>;


    const getGear = () => {
        const detailedGear = gear ? gear.map((weapon) => getWeaponProfile(weapon, state.Faction as FactionEnum)).filter((x) => x !== undefined) as RenderWeapon[] : undefined;
        return <div style={{ fontSize: "1rem" }}>

            {(detailedGear && detailedGear.length > 0) || (modifiedGear && modifiedGear.length > 0) ? <div style={{ float: "left", clear: "both", fontWeight: "bold", marginTop: "15px" }}>Additionally defined rules for this model</div> : null}
            {detailedGear ? <ModelEquipmentRenderer equipment={{ weapons: detailedGear }} faction={state.Faction} name={`${modelId}`} /> : null}
            <DropdownMenuComponent
                dropdownOptions={{
                    id: "rules-modification-dropdown",
                    placeholder: "Select a new melee weapon",
                }}
                originalList={meleeWeapons.map((weapon) => weapon?.name || "")}
                callbackFn={addGear} />
            <button
                style={{ clear: "both" }}
                className={`dialog-button ${!gear ? "dialog-button-disabled" : ""}`}
                onClick={() => {
                    if (!gear) {
                        return undefined;
                    }
                    dispatch({ type: UPDATE_MODEL_RULES, payload: { model, rules: gear } });
                    hideFn(false);
                }}
                title={`${!gear ? "You did not make any changes that could be submitted" : "Click to submit changes"}`}
            >Save changes</button>
            <button
                className="dialog-button"
                onClick={() => hideFn(false)}
            >Cancel</button>
        </div>;
    };

    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div style={cssProperties} className="modal">
                    <div className="modal-header">{`You can modify equipment for ${model.name}`}</div>
                    {getGear()}
                </div>
            </div>,
            document.getElementById(modelId) as HTMLElement
        )
    );
};
