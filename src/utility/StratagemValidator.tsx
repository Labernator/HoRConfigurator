import { FactionEnum, RenderModel, RenderWarband, TacticalPoints } from "../types";
import { getAllKeywords, getFactionSpecifics } from "./Utils";

const strInNumberText = "Gain 1 TP for taking the maximum number of Core models according to your Model Allowance.";
const creamOfCropText = "Gain 1 TP for taking the maximum number of Special models according to your Model Allowance.";
const countSpecial = (members: RenderModel[]) => members.filter((member) => member.type === "Special").reduce((acc, member) => acc + (member.amount ? member.amount : 1), 0);
const countCore = (members: RenderModel[]) => members.filter((member) => member.type === "Special").reduce((acc, member) => acc + (member.amount ? member.amount : 1), 0);
// const hasOneOfEach = (members: Model[]) => members.some((member) => member.type === "Special") && members.some((member) => member.type === "Core");
const hasTrueHeros = (members: RenderModel[], warband: RenderWarband) => members.filter((member) => member.price / (member.amount || 1) >= 100).length;
export const hasArmouryEquipment = (models: RenderModel[]) => models.filter((model) =>
    model.equipment?.weapons?.some((weapon) => weapon.isArmouryItem) ||
    model.equipment?.otherEquipment?.some((equi) => equi.isArmouryItem)
);
const allUnitsSharedKeyword = (warband: RenderWarband) => {
    const factionKeywords = [...getFactionSpecifics(warband.Faction as FactionEnum).Keywords, warband.Alignment];
    const membersWithoutFactionKeywords = warband.Roster.map((model) => ({ ...model, keywords: (model.keywords.filter((keyword) => !factionKeywords.some((factionKeyword) => factionKeyword === keyword))) }));
    const firstMember = membersWithoutFactionKeywords.shift() as RenderModel;
    return firstMember.keywords.reduce((commonKeywords, keyword) => {
        if (membersWithoutFactionKeywords.every((inner) => inner.keywords.some((innerKeyword) => innerKeyword === keyword))) {
            return [...commonKeywords, keyword];
        }
        return commonKeywords;
    }, [] as string[]).length > 0;

};

export const getStratagems = (warband: RenderWarband): TacticalPoints[] => {
    let myArr: TacticalPoints[] = [{ name: "Destined For Greatness", amount: warband.ScenariosPlayed ? warband.ScenariosPlayed + 1 : 1, text: "Gain 1 TP for including a leader. Add +1 for each game this Leader has taken part in until now" }];
    myArr = countCore(warband.Roster) === getFactionSpecifics(warband.Faction as FactionEnum).ModelAllowance.Core ? [...myArr, { name: "Strength In Numbers", amount: 1, text: strInNumberText }] : [...myArr];
    myArr = countSpecial(warband.Roster) === getFactionSpecifics(warband.Faction as FactionEnum).ModelAllowance.Special ? [...myArr, { name: "Cream Of The Crop", amount: 1, text: creamOfCropText }] : [...myArr];
    myArr = allUnitsSharedKeyword(warband) ? [...myArr, { name: "Bound by Experience", amount: 1, text: "Gain 1 TP if all models in your team share at least one non-faction keyword." }] : [...myArr];
    myArr = hasTrueHeros(warband.Roster, warband) ? [...myArr, { name: "Herohammer", amount: hasTrueHeros(warband.Roster, warband), text: "Gain 1 TP for each model in your team which cost 100 points or more" }] : [...myArr];
    myArr = getAllKeywords(warband.Roster).length > 8 ? [...myArr, { name: "Death And Diversity", amount: 1, text: "Gain 1 TP if your team contains 8 or more different Keywords." }] : [...myArr];
    myArr = hasArmouryEquipment(warband.Roster).length === 0 ? [...myArr, { name: "Boots Before Loot", amount: 1, text: "Gain 1 TP if your team does not contain any items from your Opus’ Armoury" }] : [...myArr];
    myArr = hasArmouryEquipment(warband.Roster).length >= 5 ? [...myArr, { name: "Shiny Fingz", amount: 1, text: "Gain 1 TP if your team contains 5 or more Armoury items" }] : [...myArr];
    return myArr;
};
