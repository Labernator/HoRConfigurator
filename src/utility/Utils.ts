import * as AdeptaSororitasArmySpecific from "../data/armySpecifics/AdeptaSororitas.json";
import * as AdeptusMechanicusArmySpecific from "../data/armySpecifics/AdeptusMechanicus.json";
import * as DarkAngelsArmySpecific from "../data/armySpecifics/DarkAngels.json";
import * as PrimarisArmySpecifics from "../data/armySpecifics/PrimarisSpaceMarines.json";
import * as TauArmySpecifics from "../data/armySpecifics/Tau.json";
import * as EquipmentJson from "../data/Equipment.json";
import * as RulesJson from "../data/Rules.json";
// tslint:disable-next-line: max-line-length
import { ArmySpecificStuff, BasicWeapon, FactionEnum, MetadataModel, MetadataWeapon, MultiProfileRenderWeapon, MultiProfileWeapon, OtherEquipment, Philosophy, RenderModel, RenderWeapon, RosterModel, Rule, SuperBasicWeapon, Warband, WeaponReference } from "../types";
const weapons = EquipmentJson.weapons as MetadataWeapon[];
const otherEquipment = EquipmentJson.otherEquipment as OtherEquipment[];
const rules = RulesJson.rules as Rule[];
const philosophies = RulesJson.Philosophies as Philosophy[];

export const ensureWeaponExists = (input: MetadataWeapon | MultiProfileWeapon | undefined, name: string) => {
    if (input === undefined) {
        throw new TypeError(`${name} needs to be added to metadata`);
    }
    return input;
};

export const getDetailedRoster = (roster: Array<RosterModel | string>, faction: FactionEnum, alignment?: string): RenderModel[] => roster.map((rosterModel) => {
    const modelMetadata = typeof (rosterModel) === "string" ? getModelMetadata(rosterModel, faction) : getModelMetadata(rosterModel.name, faction);
    const harmonizedRosterModel: RosterModel = typeof (rosterModel) === "string" ? { "name": rosterModel } : rosterModel;
    const alignmentPlaceholder = getFactionSpecifics(faction).AlignmentPlaceholder;
    if (!modelMetadata) {
        throw new Error(`Model ${typeof (rosterModel) === "string" ? rosterModel : rosterModel.name} needs to be added to metadata`);
    }
    let remixedModel = remixModel(modelMetadata, harmonizedRosterModel);
    const ruleStrings = harmonizedRosterModel.rules ? [...modelMetadata.rules || [], ...harmonizedRosterModel.rules].filter((keyword, idx, array) => array.indexOf(keyword) === idx) : modelMetadata.rules || [];
    remixedModel = {
        ...remixedModel,
        keywords: remixedModel.keywords.map((keyword) => keyword === alignmentPlaceholder ? alignment || keyword : keyword),
        rules: ruleStrings.map((ruleName) => getRule(ruleName, faction, alignment)),
    };
    const equipment = modelMetadata.equipment;
    remixedModel = {
        ...remixedModel,
        equipment: equipment ? {
            weapons: equipment.weapons?.map((weapon) => getWeaponProfile(weapon, faction)),
            otherEquipment: equipment.otherEquipment?.map(getOtherEquipmentDetails),
        } : undefined,
    };
    let rosterWeapons: RenderWeapon[] = [];
    let otherRosterEquipment: OtherEquipment[] | undefined;
    let replacedWeapons: string[] = [];
    if (harmonizedRosterModel.equipment || remixedModel.equipment?.weapons) {
        if (harmonizedRosterModel.equipment) {
            rosterWeapons = harmonizedRosterModel.equipment.weapons?.map((weapon) => {
                if (typeof (weapon) === "string") {
                    return getWeaponProfile(weapon, faction);
                }
                if (!(isBasicWeapon(weapon) || isMultiProfileRenderWeapon(weapon)) && weapon.replacing) {
                    const replacing = weapon.replacing;
                    // tslint:disable-next-line: prefer-conditional-expression
                    if (typeof (replacing) === "string") {
                        replacedWeapons = [...replacedWeapons, replacing];
                    } else {
                        replacedWeapons = [...replacedWeapons, ...replacing];
                    }
                }
                if (isRenderWeapon(weapon)) {
                    return weapon;
                }
                return getWeaponProfile(weapon, faction);
            }) || [];
            otherRosterEquipment = harmonizedRosterModel.equipment.otherEquipment?.map((equi) => {
                if (typeof (equi) === "string") {
                    return getOtherEquipmentDetails(equi);
                }
                return getOtherEquipmentDetails(equi.name);
            });
            // throw new Error("cant handle weapons brought to the fight yet...");
        }
        remixedModel = {
            ...remixedModel, equipment: {
                weapons: [...remixedModel.equipment?.weapons?.filter((weapon) => replacedWeapons.find((replacedWeapon) => replacedWeapon === weapon.name) === undefined) || [], ...rosterWeapons],
            },
        };
    }
    if (remixedModel.equipment?.otherEquipment || otherRosterEquipment) {
        let otherRemixedEquipment = otherRosterEquipment ? [...remixedModel.equipment?.otherEquipment || [], ...otherRosterEquipment] : remixedModel.equipment?.otherEquipment;
        if (otherRemixedEquipment && alignment) {
            otherRemixedEquipment = otherRemixedEquipment.map((equi) => ({ ...equi, effect: equi.effect.replace(alignmentPlaceholder || "", alignment) }));
        }
        remixedModel = {
            ...remixedModel, equipment: {
                weapons: remixedModel.equipment?.weapons,
                otherEquipment: otherRemixedEquipment,
            },
        };
    }
    remixedModel = {
        ...remixedModel,
        price: getTotalUnitPrice(remixedModel, faction),
    };
    return remixedModel;
});
const getModelMetadata = (name: string, faction: FactionEnum) => getFactionSpecifics(faction).UnitList.find((unit) => unit.name.toLocaleUpperCase() === name.toLocaleUpperCase());
const remixModel = (metaDataModel: MetadataModel, rosterModel: RosterModel): RenderModel => {

    const resultModel: RenderModel = {
        name: rosterModel.name,
        type: rosterModel.type || metaDataModel.type,
        amount: rosterModel.amount,
        // price: metaDataModel.price * (rosterModel.amount || 1),
        price: metaDataModel.price,
        keywords: rosterModel.keywords ? [...metaDataModel.keywords, ...rosterModel.keywords].filter((keyword, idx, array) => array.indexOf(keyword) === idx) : metaDataModel.keywords,
        rules: [],
        stats: Array.isArray(metaDataModel.stats) && Array.isArray(rosterModel.stats) ?
            (rosterModel.stats ? [...metaDataModel.stats, ...rosterModel.stats] : metaDataModel.stats) :
            rosterModel.stats ? { ...metaDataModel.stats, ...rosterModel.stats } : metaDataModel.stats,
    };
    return resultModel;
};

const isWeaponReference = (weaponRef: any): weaponRef is WeaponReference => weaponRef.name && typeof (weaponRef.name) === "string" ? weaponRef.amount ? typeof (weaponRef.amount) === "number" ? true : false : true : false;
const isRenderWeapon = (weaponRef: any): weaponRef is RenderWeapon => weaponRef.name && typeof (weaponRef.name) === "string" && (weaponRef.type !== undefined || weaponRef.multiProfiles !== undefined);

export const isMultiProfileWeapon = (weapon: any): weapon is MultiProfileWeapon => weapon && weapon.name && typeof (weapon.name) === "string" && weapon.multiProfiles && typeof (weapon.multiProfiles) === "object";
export const isSuperBasicWeapon = (weapon: any): weapon is SuperBasicWeapon =>
    weapon && weapon.name && typeof (weapon.name) === "string" &&
    weapon.type && typeof (weapon.type) === "string" &&
    weapon.strength && (typeof (weapon.strength) === "string" || typeof (weapon.strength) === "number") &&
    weapon.damage && (typeof (weapon.damage) === "string" || typeof (weapon.damage) === "number") &&
    (typeof (weapon.ap) === "string" || typeof (weapon.ap) === "number");
export const isBasicWeapon = (weapon: any): weapon is BasicWeapon => typeof (weapon.price) === "number" && typeof (weapon.amount) === "number" && isSuperBasicWeapon(weapon);

export const isMultiProfileRenderWeapon = (weapon: any): weapon is MultiProfileRenderWeapon => typeof (weapon.price) === "number" && typeof (weapon.amount) === "number" && isMultiProfileWeapon(weapon);

const getWeaponProfile = (weaponRef: string | WeaponReference, faction: FactionEnum): RenderWeapon => {
    if (typeof weaponRef === "string") {
        const weaponDetails = getWeaponDetails(weaponRef);
        return { ...weaponDetails, price: getWeaponPrice(weaponDetails.name, faction, 1), amount: 1 };
    }
    if (isWeaponReference(weaponRef)) {
        const weaponDetails = getWeaponDetails(weaponRef.name);
        return { ...weaponDetails, price: getWeaponPrice(weaponDetails.name, faction, weaponRef.amount || 1), amount: weaponRef.amount || 1 };
    }

    throw new TypeError("The passed weapon is neither of type string, nor WeaponReference nor RosterWeapon. That should not be...");
};

export const getFactionSpecifics = (faction: FactionEnum): ArmySpecificStuff => {
    switch (faction) {
        case FactionEnum.AdeptaSororitas: return AdeptaSororitasArmySpecific.AdeptaSororitas;
        case FactionEnum.AdeptusMechanicus: return AdeptusMechanicusArmySpecific.AdeptusMechanicus;
        case FactionEnum.DarkAngels: return DarkAngelsArmySpecific.DarkAngels;
        case FactionEnum.PrimarisSpaceMarines: return PrimarisArmySpecifics.PrimarisSpaceMarines;
        case FactionEnum.Tau: return TauArmySpecifics.Tau;
        // case FactionEnum.Deathwatch: return ArmySpecifics.Deathwatch;
        default: return { "Keywords": [], "Philosophies": [], "AlignmentPlaceholder": "", "ModelAllowance": { "Core": 0, "Special": 0, "Leader": 0 }, "WeaponPriceList": [], "UnitList": [] };
    }
};

export const getWeaponDetails = (name: string) => ensureWeaponExists(weapons.find((weapon) => weapon.name.toLocaleUpperCase() === name.toLocaleUpperCase()), name);
export const getWeaponPrice = (weaponName: string, faction: FactionEnum, amount: number) => (getFactionSpecifics(faction).WeaponPriceList.find((weapon) => weapon.name.toLocaleUpperCase() === weaponName.toLocaleUpperCase())?.price || 0) * amount;

export const getOtherEquipmentDetails = (name: string) => otherEquipment.find((equi) => equi.name.toLocaleUpperCase() === name.toLocaleUpperCase()) as OtherEquipment;

export const getTotalUnitPrice = (model: RenderModel, faction: FactionEnum) => {
    let totalPrice = model.price || getFactionSpecifics(faction).UnitList.find((unit) => unit.name.toLocaleUpperCase() === model.name.toLocaleUpperCase())?.price || 0;
    totalPrice += model.equipment?.weapons?.reduce((a, weapon) => a + (weapon.price || (weapon.isLegendary ? 20 : 0)), 0) || 0;
    totalPrice += model.equipment?.otherEquipment?.reduce((a, equipment) => a + (equipment.price || 0), 0) || 0;
    totalPrice += model.rules.reduce((a, rule) => a + (rule.price || 0), 0) || 0;
    return totalPrice * (model.amount || 1);
};

export const getRosterPrice = (models: RenderModel[]) => models.reduce((totalCost, model) => totalCost + model.price, 0);
export const getArmyRules = (faction: FactionEnum, alignment?: string) => {
    const factionSpecifics = getFactionSpecifics(faction);
    const factionRules = factionSpecifics.ArmyRules || [];
    const alignmentRule = factionSpecifics.Alignments?.find((align) => align.name === alignment);
    return alignmentRule ? [...factionRules, alignmentRule] : factionRules;
};
export const getRule = (ruleName: string, faction: FactionEnum, alignment?: string): Rule => {
    let actualRule = rules.find((rule) => rule.name.toLocaleUpperCase() === ruleName.toLocaleUpperCase());
    if (!actualRule) {
        throw new Error(`Rule ${ruleName} needs to be added to metadata`);
    }
    return actualRule.alignmentParameter && alignment ? actualRule = { ...actualRule, effect: actualRule.effect.replace(getFactionSpecifics(faction).AlignmentPlaceholder || "", alignment) } : actualRule;
};

export const getAllKeywords = (models: RenderModel[]) => models.reduce((keywords: string[], model) => [...keywords, ...model.keywords], []).filter((item, idx, array) => array.indexOf(item) === idx).sort();
export const getPhilosophy = (name: string, faction: FactionEnum) => {
    let phil = philosophies.find((philosophy) => philosophy.name.toLocaleUpperCase() === name?.toLocaleUpperCase());
    if (!phil) {
        phil = getFactionSpecifics(faction).Philosophies.find((philosophy) => philosophy.name.toLocaleUpperCase() === name?.toLocaleUpperCase());
        if (!phil) {
            throw new Error(`Philosophy ${name} needs to be added to metadata`);
        }
    }
    return phil;
};

export const isWarband = (json: any): json is Warband => {
    const titleExistsAndIsString = json.Title && typeof json.Title === "string";
    const factionExistsAndIsString = json.Faction && typeof json.Faction === "string";
    const scenarioExistsAndIsNumber = json.ScenariosPlayed && typeof json.ScenariosPlayed === "number";
    return titleExistsAndIsString && factionExistsAndIsString && scenarioExistsAndIsNumber;
    // Philosophy?: string;
    // Alignment?: string;
    // Roster: Model[];
    // ArmyRules?: string[];
};
