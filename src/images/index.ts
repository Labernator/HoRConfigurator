import { FactionEnum } from "../types";
import AdeptaSororitasPng from "./AdeptaSororitas.png";
import AdeptusMechanicusPng from "./AdeptusMechanicus.png";
import AstraMilitarumPng from "./AstraMilitarum.png";
import CorePng from "./Core.png";
import CreateWarbandPng from "./CreateWarband.png";
import DarkAngelsPng from "./DarkAngels.png";
import DeathwatchPng from "./Deathwatch.png";
import DecreasePng from "./Decrease.png";
import DeletePng from "./Delete.png";
import DownPng from "./down.png";
import ExportPng from "./ExportWarband.png";
import GearPng from "./Gear.png";
import ImportWarbandPng from "./ImportWarband.png";
import IncreasePng from "./Increase.png";
import KeywordsPng from "./Keys.png";
import LeaderPng from "./Leader.png";
import LegendaryPng from "./LegendaryIcon.png";
import OpenEditorPng from "./OpenEditor.png";
import OpenEditorSelectedPng from "./OpenEditorSelected.png";
import RefreshWarbandPng from "./RefreshWarband.png";
import RefreshWarbandDisabledPng from "./RefreshWarbandDisabled.png";
import RulesPng from "./Rules.png";
import SavePdfPng from "./SavePdf.png";
import PrimarisPng from "./SpaceMarines.png";
import SpecialPng from "./Special.png";
import StatsPng from "./Stats.png";
import TauEmpirePng from "./TauEmpire.png";
import UpPng from "./up.png";
import UseSamplePng from "./UseSample.png";

export const UseSampleIcon = UseSamplePng;
export const DarkAngelsCover = DarkAngelsPng;
export const TauEmpireCover = TauEmpirePng;
export const PrimarisCover = PrimarisPng;
export const AdeptusMechanicusCover = AdeptusMechanicusPng;
export const DeathwatchCover = DeathwatchPng;
export const AstraMilitarumCover = AstraMilitarumPng;
export const AdeptaSororitasCover = AdeptaSororitasPng;

export const CreateWarbandIcon = CreateWarbandPng;
export const ImportWarbandIcon = ImportWarbandPng;
export const ExportWarbandIcon = ExportPng;
export const OpenEditorIcon = OpenEditorPng;
export const OpenEditorSelectedIcon = OpenEditorSelectedPng;
export const SavePdfIcon = SavePdfPng;
export const RefreshWarbandIcon = RefreshWarbandPng;
export const RefreshWarbandDisabledIcon = RefreshWarbandDisabledPng;

export const LegendaryIcon = LegendaryPng;

export const getFactionImage = (faction: FactionEnum | string) => {
    switch (faction) {
        case FactionEnum.AdeptaSororitas: return AdeptaSororitasCover;
        case FactionEnum.AdeptusMechanicus: return AdeptusMechanicusCover;
        case FactionEnum.DarkAngels: return DarkAngelsCover;
        case FactionEnum.Deathwatch: return DeathwatchCover;
        case FactionEnum.PrimarisSpaceMarines: return PrimarisCover;
        case FactionEnum.Tau: return TauEmpireCover;
    }
};

export const IncreaseIcon = IncreasePng;
export const DecreaseIcon = DecreasePng;
export const DeleteIcon = DeletePng;
export const StatsIcon = StatsPng;
export const RulesIcon = RulesPng;
export const KeywordsIcon = KeywordsPng;
export const GearIcon = GearPng;
export const UpIcon = UpPng;
export const DownIcon = DownPng;

export const LeaderIcon = LeaderPng;
export const CoreIcon = CorePng;
export const SpecialIcon = SpecialPng;
