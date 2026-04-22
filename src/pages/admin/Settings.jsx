import React from 'react';
import { Settings as SettingsIcon, Database, Trash2, AlertTriangle, RefreshCcw } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

const Settings = () => {
    const { isResetting, handleHardReset } = useSettings();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-charcoal dark:text-white tracking-tight flex items-center gap-3">
                    <SettingsIcon className="text-bronze" size={32} />
                    System Settings
                </h1>
                <p className="text-charcoal/40 dark:text-white/40 text-sm font-medium tracking-wide">
                    Manage system configurations and data maintenance.
                </p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Settings Placeholder */}
                <div className="bg-white dark:bg-charcoal/50 backdrop-blur-xl border border-charcoal/5 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm transition-all duration-500 hover:shadow-xl group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-bronze/10 rounded-2xl flex items-center justify-center text-bronze">
                            <Database size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-charcoal dark:text-white">Database Info</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-charcoal/5 dark:border-white/5">
                            <span className="text-sm text-charcoal/60 dark:text-white/60">Database Status</span>
                            <span className="text-sm font-bold text-green-500 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Connected
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-charcoal/5 dark:border-white/5">
                            <span className="text-sm text-charcoal/60 dark:text-white/60">Last Backup</span>
                            <span className="text-sm font-bold text-charcoal/80 dark:text-white/80">Never</span>
                        </div>
                    </div>
                </div>

                {/* Maintenance / Danger Zone */}
                <div className="bg-white dark:bg-charcoal/50 backdrop-blur-xl border border-charcoal/5 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm transition-all duration-500 hover:shadow-xl border-red-500/10 hover:border-red-500/20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                            <AlertTriangle size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-charcoal dark:text-white">Danger Zone</h2>
                    </div>
                    
                    <p className="text-sm text-charcoal/60 dark:text-white/60 mb-8 leading-relaxed">
                        The following actions are irreversible. Please proceed with extreme caution.
                    </p>

                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-1">Hard Reset Data</h3>
                                    <p className="text-xs text-charcoal/40 dark:text-white/40">Clear all villa catalog and booking information from the database.</p>
                                </div>
                                <button
                                    onClick={handleHardReset}
                                    disabled={isResetting}
                                    className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 hover:shadow-red-500/40 active:scale-[0.98]"
                                >
                                    {isResetting ? (
                                        <RefreshCcw size={20} className="animate-spin" />
                                    ) : (
                                        <Trash2 size={20} />
                                    )}
                                    {isResetting ? 'Processing...' : 'Perform Hard Reset'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
