import React from "react";
import { LegendaryIcon } from "../images";
import { BasicWeapon, FactionEnum, LegendaryWeapon, MultiProfileWeapon, OtherEquipment, RenderEquipment, RenderWeapon, Rule, SuperBasicWeapon } from "../types";
import { getWeaponPrice, isBasicWeapon, isLegendaryWeapon, isMultiProfileRenderWeapon, isMultiProfileWeapon } from "../utility/Utils";

export const ModelEquipmentRenderer = ({ equipment, faction, name }: { equipment: RenderEquipment; faction: string; name: string }) => {
    const weaponPriceString = (weapon: RenderWeapon | LegendaryWeapon) =>
        isLegendaryWeapon(weapon) ?
            "(20)" :
            getWeaponPrice(weapon.name, faction as FactionEnum, weapon.amount || 1) ?
                `(${getWeaponPrice(weapon.name, faction as FactionEnum, weapon.amount || 1)})` :
                "";
    const otherEquipmentPriceString = (otherEquipment: OtherEquipment) => otherEquipment.price ? `(${otherEquipment.price})` : "";
    const weaponRuleRender = (weapon: BasicWeapon | SuperBasicWeapon) => {
        if (typeof (weapon.rule) === "string" || weapon.rule === undefined) {
            return <td key={`${name}-${weapon.name}-rule`}>{weapon.rule}</td>;
        } else {
            return <td key={`${name}-${weapon.name}-rules`}>{weapon.rule.map((rule) =>
                typeof (rule) === "string" ?
                    <div key={`${name}-${weapon.name}-rules-${rule}`}>{rule}</div> :
                    <div key={`${name}-${weapon.name}-rules-${rule.name}`}><div style={{ float: "left", paddingRight: 3, fontWeight: "bold" }}>{rule.name}</div><div> - {rule.effect}</div></div>)}
            </td>;
        }
    };
    const weaponNameRender = (weapon: BasicWeapon | SuperBasicWeapon) => {
        if (weapon.isLegendary) {
            return <td key={`${name}-${weapon.name}-name`}><div>{weapon.name}</div><div><img style={{ height: "20px", padding: "2px" }} alt="LegendaryIcon" src={LegendaryIcon} /></div> </td>;
        } else {
            return <td key={`${name}-${weapon.name}-name`}>{weapon.name} </td>;
        }
    };
    const renderWeaponStats = (weapon: BasicWeapon | SuperBasicWeapon) =>
        [weaponNameRender(weapon),
        <td key={`${name}-${weapon.name}-type`}>{weapon.type}</td>,
        <td key={`${name}-${weapon.name}-range`}>{weapon.range}</td>,
        <td key={`${name}-${weapon.name}-strength`}>{weapon.strength}</td>,
        <td key={`${name}-${weapon.name}-ap`}>{weapon.ap}</td>,
        <td key={`${name}-${weapon.name}-damage`}>{weapon.damage}</td>,
        weaponRuleRender(weapon)];
    const renderMultiProfileHeader = (keyName: string, weaponName: string, weaponRule?: string | Array<string | Rule>) =>
        <tr key={`weapon-table-row-${keyName}`}>
            <td>{weaponName}</td>
            {weaponRule ? <td colSpan={6}>{`${weaponRule}`}</td> : undefined}
        </tr>;
    const renderWeapon = (weapon: RenderWeapon | SuperBasicWeapon | MultiProfileWeapon, cnt: number) => {
        let arr: JSX.Element[] = [];
        const weaponName = cnt === 1 ? ` - ${weapon.name}` : cnt === 2 ? ` -  - ${weapon.name}` : weapon.name;
        const amountString = (isBasicWeapon(weapon) || isMultiProfileRenderWeapon(weapon)) && weapon.amount > 1 && cnt === 0 ? `${weapon.amount}x` : "";
        const headerString = (isBasicWeapon(weapon) || isMultiProfileRenderWeapon(weapon) || isLegendaryWeapon(weapon)) ? `${amountString} ${weaponName} ${weaponPriceString(weapon)}` : weaponName;
        if (isMultiProfileWeapon(weapon) || isMultiProfileRenderWeapon(weapon)) {
            arr = [
                ...arr,
                renderMultiProfileHeader(`weapon-table-row-${weapon.name}-${cnt}`, headerString, weapon.rule),

            ];
            if (weapon.multiProfiles) {
                const multiProfiles = weapon.multiProfiles;
                arr = arr.concat(...multiProfiles.map((profile) => renderWeapon(profile, cnt + 1)));
            }
        } else {
            arr = [
                <tr key={`weapon-table-row-${weapon.name}-${cnt}`}>
                    {renderWeaponStats({ ...weapon, name: headerString })}
                </tr>];
        }
        return arr;
    };

    const renderOtherEquipment = () => equipment.otherEquipment?.map((otherEquipment) =>
        <tr key={`weapon-table-row-${otherEquipment.name}`}>
            <td>{`${otherEquipment.name} ${otherEquipmentPriceString(otherEquipment)}`}</td>
            <td>{otherEquipment.effect}</td>
        </tr>);
    return <div>
        <table className="model-table">
            <colgroup>
                <col style={{ width: "100px" }} />
                <col style={{ width: "45px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "20px" }} />
                <col style={{ width: "180px" }} />
            </colgroup>
            <thead>
                <tr>
                    <th>Weapons</th>
                    <th>Type</th>
                    <th>Rng</th>
                    <th>Str</th>
                    <th>AP</th>
                    <th>Dmg</th>
                    <th>Rule</th>
                </tr>
            </thead>
            <tbody>
                {equipment.weapons?.map((weapon) => renderWeapon(weapon, 0))}
            </tbody>
        </table>
        {equipment.otherEquipment ? <table className="model-table">
            <colgroup>
                <col style={{ width: "100px" }} />
                <col style={{ width: "307px" }} />
            </colgroup>
            <thead>
                <tr>
                    <th>Equipment</th>
                    <th>Effect</th>
                </tr>
            </thead>
            <tbody>
                {renderOtherEquipment()}
            </tbody>
        </table> : undefined}
    </div>;
};
