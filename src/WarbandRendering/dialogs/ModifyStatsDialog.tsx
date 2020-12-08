import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { UPDATE_MODEL_STATS } from "../../data/redux/actions";
import { ModelStats, MultiProfileModelStats, RecursivePartial, RenderModel } from "../../types";
import { isMultiProfileStatLine } from "../../utility";

export const ModifyStatsDialog = ({ model, modelId, hideFn }: { model: RenderModel; modelId: string; hideFn(hide: boolean): void }) => {
    const position = document.getElementById(modelId)?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 25, left: (position?.left || 0) + 25, width: (position?.width || 0) - 75 };
    const [stats, setStats] = useState<Partial<ModelStats>>({});
    const [multiStats, setMultiStats] = useState<RecursivePartial<MultiProfileModelStats>>({});
    const dispatch = useDispatch();
    const isEmptyObject = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;
    const noValuesChangedInDialog = () => isEmptyObject(stats) && isEmptyObject(multiStats);
    // tslint:disable-next-line: cyclomatic-complexity
    const getStats = () => {
        if (!isMultiProfileStatLine(model.stats)) {
            return <div style={{ display: "inline-grid", gridTemplateColumns: "50% 50%", width: "100%" }}>
                <div style={{ gridColumn: 1, display: "inline-grid" }}>
                    <div className="left-floating-div">
                        <div className="stats-text">Movement: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Movement !== undefined ? stats.Movement : model.stats.Movement}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Movement: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10) })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">WeaponSkill: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.WeaponSkill !== undefined ? stats.WeaponSkill : model.stats.WeaponSkill}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, WeaponSkill: e.currentTarget.value })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">BallisticSkill: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.BallisticSkill !== undefined ? stats.BallisticSkill : model.stats.BallisticSkill}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, BallisticSkill: e.currentTarget.value })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Strength: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Strength !== undefined ? stats.Strength : model.stats.Strength}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Strength: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10) })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Toughness: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Toughness !== undefined ? stats.Toughness : model.stats.Toughness}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Toughness: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10) })}>
                            </input>
                        </div>
                    </div>
                </div>
                <div style={{ gridColumn: 2, display: "inline-grid" }}>
                    <div className="left-floating-div">
                        <div className="stats-text">Wounds: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Wounds !== undefined ? stats.Wounds : model.stats.Wounds}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Wounds: e.currentTarget.value })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Attacks: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Attacks !== undefined ? stats.Attacks : model.stats.Attacks}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Attacks: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10) })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Leadership: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Leadership !== undefined ? stats.Leadership : model.stats.Leadership}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Leadership: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10) })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Save: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.Save !== undefined ? stats.Save : model.stats.Save}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, Save: e.currentTarget.value })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">InvulnerableSave: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={stats.InvulnerableSave !== undefined ? stats.InvulnerableSave : model.stats.InvulnerableSave}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setStats({ ...stats, InvulnerableSave: e.currentTarget.value })}>
                            </input>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    dispatch({ type: UPDATE_MODEL_STATS, payload: { model, stats } });
                    hideFn(false);
                }
                }>Save changes</button>
                <button onClick={() => hideFn(false)}>Cancel</button>
            </div>;
        } else {
            return <div style={{ display: "inline-grid", gridTemplateColumns: "50% 50%", width: "100%" }}>
                <div style={{ gridColumn: 1, display: "inline-grid" }}>
                    <div className="left-floating-div"><div style={{ fontWeight: "bold", fontSize: "0.75rem", gridColumn: 2 }}>Primary Profile</div><div style={{ fontWeight: "bold", fontSize: "0.75rem", gridColumn: 3 }}>Secondary Profile</div></div>
                    <div className="left-floating-div">
                        <div className="stats-text">Movement: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Movement !== undefined ? multiStats.firstProfile?.Movement : model.stats.firstProfile.Movement}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        firstProfile: {
                                            ...multiStats.firstProfile,
                                            Movement: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                        <div style={{ gridColumn: 3 }} className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Movement !== undefined ? multiStats.secondProfile?.Movement : model.stats.secondProfile.Movement}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        secondProfile: {
                                            ...multiStats.secondProfile,
                                            Movement: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">WeaponSkill: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.WeaponSkill !== undefined ? multiStats.firstProfile?.WeaponSkill : model.stats.firstProfile.WeaponSkill}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, firstProfile: { ...multiStats.firstProfile, WeaponSkill: e.currentTarget.value } })}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }} >
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.WeaponSkill !== undefined ? multiStats.secondProfile?.WeaponSkill : model.stats.secondProfile.WeaponSkill}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, secondProfile: { ...multiStats.secondProfile, WeaponSkill: e.currentTarget.value } })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">BallisticSkill: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.BallisticSkill !== undefined ? multiStats.firstProfile?.BallisticSkill : model.stats.firstProfile.BallisticSkill}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, firstProfile: { ...multiStats.firstProfile, BallisticSkill: e.currentTarget.value } })}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }} >
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.BallisticSkill !== undefined ? multiStats.secondProfile?.BallisticSkill : model.stats.secondProfile.BallisticSkill}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, secondProfile: { ...multiStats.secondProfile, BallisticSkill: e.currentTarget.value } })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Strength: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Strength !== undefined ? multiStats.firstProfile?.Strength : model.stats.firstProfile.Strength}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        firstProfile: {
                                            ...multiStats.firstProfile,
                                            Strength: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                        <div style={{ gridColumn: 3 }} className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Strength !== undefined ? multiStats.secondProfile?.Strength : model.stats.secondProfile.Strength}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        secondProfile: {
                                            ...multiStats.secondProfile,
                                            Strength: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Toughness: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Toughness !== undefined ? multiStats.firstProfile?.Toughness : model.stats.firstProfile.Toughness}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        firstProfile: {
                                            ...multiStats.firstProfile,
                                            Toughness: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                        <div style={{ gridColumn: 3 }} className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Toughness !== undefined ? multiStats.secondProfile?.Toughness : model.stats.secondProfile.Toughness}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        secondProfile: {
                                            ...multiStats.secondProfile,
                                            Toughness: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                    </div>
                </div>
                <div style={{ gridColumn: 2, display: "inline-grid" }}>
                    <div className="left-floating-div"><div style={{ fontWeight: "bold", fontSize: "0.75rem", gridColumn: 2 }}>Primary Profile</div><div style={{ fontWeight: "bold", fontSize: "0.75rem", gridColumn: 3 }}>Secondary Profile</div></div>
                    <div className="left-floating-div">
                        <div className="stats-text">Wounds: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Wounds !== undefined ? multiStats.firstProfile?.Wounds : model.stats.firstProfile.Wounds}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, firstProfile: { ...multiStats.firstProfile, Wounds: e.currentTarget.value } })}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }} >
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Wounds !== undefined ? multiStats.secondProfile?.Wounds : model.stats.secondProfile.Wounds}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, secondProfile: { ...multiStats.secondProfile, Wounds: e.currentTarget.value } })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Attacks: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Attacks !== undefined ? multiStats.firstProfile?.Attacks : model.stats.firstProfile.Attacks}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        firstProfile: {
                                            ...multiStats.firstProfile,
                                            Attacks: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }} >
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Attacks !== undefined ? multiStats.secondProfile?.Attacks : model.stats.secondProfile.Attacks}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        secondProfile: {
                                            ...multiStats.secondProfile,
                                            Attacks: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Leadership: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Leadership !== undefined ? multiStats.firstProfile?.Leadership : model.stats.firstProfile.Leadership}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        firstProfile: {
                                            ...multiStats.firstProfile,
                                            Leadership: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }}>
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Leadership !== undefined ? multiStats.secondProfile?.Leadership : model.stats.secondProfile.Leadership}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats(
                                    {
                                        ...multiStats,
                                        secondProfile: {
                                            ...multiStats.secondProfile,
                                            Leadership: isNaN(parseInt(e.currentTarget.value, 10)) ? 0 : parseInt(e.currentTarget.value, 10),
                                        },
                                    }
                                )}>
                            </input>

                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">Save: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.Save !== undefined ? multiStats.firstProfile?.Save : model.stats.firstProfile.Save}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, firstProfile: { ...multiStats.firstProfile, Save: e.currentTarget.value } })}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }} >
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.Save !== undefined ? multiStats.secondProfile?.Save : model.stats.secondProfile.Save}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, secondProfile: { ...multiStats.secondProfile, Save: e.currentTarget.value } })}>
                            </input>
                        </div>
                    </div>
                    <div className="left-floating-div">
                        <div className="stats-text">InvulnerableSave: </div>
                        <div className="focusable-div">
                            <input
                                className="stats-input-field"
                                value={multiStats.firstProfile?.InvulnerableSave !== undefined ? multiStats.firstProfile?.InvulnerableSave : model.stats.firstProfile.InvulnerableSave}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, firstProfile: { ...multiStats.firstProfile, InvulnerableSave: e.currentTarget.value } })}>
                            </input>
                        </div>
                        <div className="focusable-div" style={{ gridColumn: 3 }} >
                            <input
                                className="stats-input-field"
                                value={multiStats.secondProfile?.InvulnerableSave !== undefined ? multiStats.secondProfile?.InvulnerableSave : model.stats.secondProfile.InvulnerableSave}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMultiStats({ ...multiStats, secondProfile: { ...multiStats.secondProfile, InvulnerableSave: e.currentTarget.value } })}>
                            </input>
                        </div>
                    </div>
                </div>
                <button
                    className={`dialog-button ${noValuesChangedInDialog() ? "dialog-button-disabled" : ""}`}
                    onClick={() => {
                        if (noValuesChangedInDialog()) {
                            return undefined;
                        }
                        if (isMultiProfileStatLine(model.stats)) {
                            dispatch({ type: UPDATE_MODEL_STATS, payload: { model, stats: multiStats } });
                        } else {
                            dispatch({ type: UPDATE_MODEL_STATS, payload: { model, stats } });
                        }

                        hideFn(false);
                    }}
                    title={`${noValuesChangedInDialog() ? "You did not make any changes that could be submitted" : "Click to submit changes"}`}
                >Save changes</button>
                <button
                    className="dialog-button"
                    onClick={() => hideFn(false)}
                >Cancel</button>
            </div>;
        }
    };

    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div style={cssProperties} className="modal">
                    <div className="modal-header">{`Change any stats you wish for ${model.name}`}</div>
                    {getStats()}
                </div>
            </div>,
            document.getElementById(modelId) as HTMLElement
        )
    );
};
