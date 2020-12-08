export enum FactionEnum {
    PrimarisSpaceMarines = "Primaris Space Marines",
    DarkAngels = "Dark Angels",
    Tau = "Tau Empire",
    AdeptusMechanicus = "Adeptus Mechanicus",
    AdeptaSororitas = "Adepta Sororitas",
    Deathwatch = "Deathwatch",
    // AstraMilitarum = "Astra Militarum",
}

export enum ModelType {
    Core = "Core",
    Special = "Special",
    Leader = "Leader",
}

export type RosterWeapon = RenderWeapon;
export type MetadataWeapon = SuperBasicWeapon | MultiProfileWeapon;
export type RenderWeapon = BasicWeapon | MultiProfileRenderWeapon;

export interface Warband {
    Title: string;
    Faction: string;
    ScenariosPlayed?: number;
    Philosophy?: string;
    Alignment?: string;
    Roster: Array<RosterModel | string>;
}

export interface RenderWarband {
    Title: string;
    Faction: string;
    ScenariosPlayed?: number;
    Philosophy?: string;
    Alignment?: string;
    Roster: RenderModel[];
    RosterPrice: number;
    Stratagems: TacticalPoints[];
}

export interface ModelStats {
    Movement: number;
    WeaponSkill: string;
    BallisticSkill: string;
    Strength: number;
    Attacks: number;
    Toughness: number;
    Wounds: string | number;
    Leadership: number;
    Save: string;
    InvulnerableSave: string;
}

export interface MultiProfileModelStats {
    firstProfile: ModelStats;
    secondProfile: ModelStats;
}

export interface WeaponReference {
    name: string;
    amount: number;
}
export interface RosterWeaponReference extends WeaponReference {
    replacing: string | string[];
}
// Rule interface
export interface Rule {
    name: string;
    effect: string;
    price?: number;
    alignmentParameter?: boolean;
}

export interface Denizens {
    NightMarket: Enemy[];
}
export interface Enemy {
    name: string;
    amount?: number;
    kind?: string;
    price?: number;
    type: string;
    stats: ModelStats;
    rules?: Rule[];
    keywords: string[];
    equipment: any;
}

export interface OtherEquipment {
    name: string;
    effect: string;
    price?: number;
    isArmouryItem?: boolean;
}

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface ModelAllowance {
    Core: number;
    Special: number;
    Leader: number;
}
export interface TacticalPoints {
    name: string;
    amount: number;
    text: string;
}
export interface Philosophy {
    name: string;
    tp: number;
    text: string;
}

export interface PageMap {
    id: string;
    page: number;
}

export interface UnifiedModel {
    name: string;
    type?: string;
}

export interface RosterModel extends UnifiedModel {
    stats?: Partial<ModelStats> | RecursivePartial<MultiProfileModelStats>;
    amount?: number;
    equipment?: RosterEquipment;
    rules?: string[];
    keywords?: Array<string | ReplacableString>;
}
export interface RosterEquipment {
    weapons?: Array<RosterWeaponReference | RenderWeapon | string>;
    otherEquipment?: Array<OtherEquipment | string>;
}
export interface MetadataModel extends UnifiedModel {
    price: number;
    type: string;
    stats: ModelStats | MultiProfileModelStats;
    keywords: string[];
    rules?: string[];
    equipment?: MetadataModelEquipment;
}
export interface MetadataModelEquipment {
    weapons?: Array<string | WeaponReference>;
    otherEquipment?: string[];
}

export interface RenderModel extends UnifiedModel {
    type: string;
    price: number;
    amount?: number;
    stats: ModelStats | MultiProfileModelStats;
    rules: Rule[];
    keywords: string[];
    equipment?: RenderEquipment;
}

export interface RenderEquipment {
    weapons?: RenderWeapon[];
    otherEquipment?: OtherEquipment[];
}

export interface MultiProfileRenderWeapon extends MultiProfileWeapon {
    price: number;
    amount: number;
}
export interface MultiProfileWeapon {
    name: string;
    multiProfiles: Array<MultiProfileWeapon | SuperBasicWeapon>;
    rule?: string | Array<string | Rule>;
    isLegendary?: boolean;
    isArmouryItem?: boolean;
}
export interface BasicWeapon extends SuperBasicWeapon {
    price: number;
    amount: number;
    isLegendary?: boolean;
}
export interface LegendaryWeapon extends SuperBasicWeapon {
    isLegendary: boolean;
}
export interface SuperBasicWeapon {
    name: string;
    type: string;
    strength: string | number;
    damage: string | number;
    ap: string | number;
    range?: number;
    rule?: string | Array<string | Rule>;
    isArmouryItem?: boolean;
    isLegendary?: boolean;
}

export interface ArmySpecificStuff {
    ArmyRules?: Rule[];
    Alignments?: Rule[];
    AlignmentPlaceholder?: string;
    Keywords: string[];
    ModelAllowance: {
        Core: number;
        Special: number;
        Leader: number;
    };
    Philosophies: Philosophy[];
    WeaponPriceList: Array<{
        name: string;
        price: number;
    }>;
    UnitList: MetadataModel[];
}

export type ActionTypes =
    | "select-option"
    | "deselect-option"
    | "remove-value"
    | "pop-value"
    | "set-value"
    | "clear"
    | "create-option";

export interface ActionMeta {
    action: ActionTypes;
}

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface ReplacableString {
    name: string;
    replacing: string;
}
