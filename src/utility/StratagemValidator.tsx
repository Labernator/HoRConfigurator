import { ModelType, RenderModel, TacticalPoints } from "../types";
import { countType, getAllKeywords, getFactionSpecifics } from "./Utils";

const strInNumberText = "Gain 1 TP for taking the maximum number of Core models according to your Model Allowance.";
const creamOfCropText = "Gain 1 TP for taking the maximum number of Special models according to your Model Allowance.";

// const hasOneOfEach = (members: Model[]) => members.some((member) => member.type === "Special") && members.some((member) => member.type === "Core");
const hasTrueHeros = (members: RenderModel[]) => members.filter((member) => member.price / (member.amount || 1) >= 100).length;
export const hasArmouryEquipment = (models: RenderModel[]) => models.filter((model) =>
    model.equipment?.weapons?.some((weapon) => weapon.isArmouryItem) ||
    model.equipment?.otherEquipment?.some((equi) => equi.isArmouryItem)
);
const allUnitsSharedKeyword = (roster: RenderModel[], faction: string, alignment?: string) => {
    const factionKeywords = [...getFactionSpecifics(faction).Keywords, alignment];
    const membersWithoutFactionKeywords = roster.map((model) => ({ ...model, keywords: (model.keywords.filter((keyword) => !factionKeywords.some((factionKeyword) => factionKeyword === keyword))) }));
    const firstMember = membersWithoutFactionKeywords.shift() as RenderModel;
    if (firstMember) {
        return firstMember.keywords.reduce((commonKeywords, keyword) => {
            if (membersWithoutFactionKeywords.every((inner) => inner.keywords.some((innerKeyword) => innerKeyword === keyword))) {
                return [...commonKeywords, keyword];
            }
            return commonKeywords;
        }, [] as string[]).length > 0;
    }
    return [];
};

export const getStratagems = (faction: string, roster: RenderModel[], alignment?: string, scenariosPlayed?: number): TacticalPoints[] => {
    let myArr: TacticalPoints[] = [{ name: "Destined For Greatness", amount: scenariosPlayed ? scenariosPlayed + 1 : 1, text: "Gain 1 TP for including a leader. Add +1 for each game this Leader has taken part in until now" }];
    myArr = countType(roster, ModelType.Core) === getFactionSpecifics(faction).ModelAllowance.Core ? [...myArr, { name: "Strength In Numbers", amount: 1, text: strInNumberText }] : [...myArr];
    myArr = countType(roster, ModelType.Special) === getFactionSpecifics(faction).ModelAllowance.Special ? [...myArr, { name: "Cream Of The Crop", amount: 1, text: creamOfCropText }] : [...myArr];
    myArr = allUnitsSharedKeyword(roster, faction, alignment) ? [...myArr, { name: "Bound by Experience", amount: 1, text: "Gain 1 TP if all models in your team share at least one non-faction keyword." }] : [...myArr];
    myArr = hasTrueHeros(roster) ? [...myArr, { name: "Herohammer", amount: hasTrueHeros(roster), text: "Gain 1 TP for each model in your team which cost 100 points or more" }] : [...myArr];
    myArr = getAllKeywords(roster).length > 8 ? [...myArr, { name: "Death And Diversity", amount: 1, text: "Gain 1 TP if your team contains 8 or more different Keywords." }] : [...myArr];
    myArr = hasArmouryEquipment(roster).length === 0 ? [...myArr, { name: "Boots Before Loot", amount: 1, text: "Gain 1 TP if your team does not contain any items from your Opus’ Armoury" }] : [...myArr];
    myArr = hasArmouryEquipment(roster).length >= 5 ? [...myArr, { name: "Shiny Fingz", amount: 1, text: "Gain 1 TP if your team contains 5 or more Armoury items" }] : [...myArr];
    return myArr;
};
