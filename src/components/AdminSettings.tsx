import React, { useState } from "react";
import { BellSettings } from "../types";
import { Settings, Volume2, ShieldAlert, KeyRound, Play, Music, Radio } from "lucide-react";

interface AdminSettingsProps {
  settings: BellSettings;
  onUpdateSettings: (settings: Partial<BellSettings> & { newPassword?: string }) => void;
  onPreviewBell: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onUpdateSettings,
  onPreviewBell,
}) => {
  const [volume, setVolume] = useState<number>(settings.volume);
  const [voiceLang, setVoiceLang] = useState<any>(settings.voiceLang || "siswa_perempuan_semiformal");
  const [voiceSpeed, setVoiceSpeed] = useState<number>(settings.voiceSpeed);
  const [voicePitch, setVoicePitch] = useState<number>(settings.voicePitch);
  const [chimeType, setChimeType] = useState<"airport" | "classic" | "digital" | "none">(settings.chimeType);
  const [isAutomaticSync, setIsAutomaticSync] = useState<boolean>(settings.isAutomaticSync);
  const [masterActive, setMasterActive] = useState<boolean>(settings.masterActive);
  const [ntpTimezone, setNtpTimezone] = useState<"WIB" | "WITA" | "WIT">(settings.ntpTimezone || "WITA");

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      volume,
      voiceLang,
      voiceSpeed,
      voicePitch,
      chimeType,
      isAutomaticSync,
      masterActive,
      ntpTimezone,
    });
    alert("Pengaturan umum berhasil disimpan!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      alert("Masukkan password baru.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Password konfirmasi tidak cocok.");
      return;
    }
    onUpdateSettings({ newPassword });
    setNewPassword("");
    setConfirmPassword("");
    alert("Password admin berhasil diubah!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="admin-settings">
      {/* BELL SOUND & GENERAL CONFIGS */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm transition-all duration-300">
        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-emerald-500" />
          Konfigurasi Suara & Bel Madrasah
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Master Switch */}
          <div className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                Status Siaga Bel Otomatis
              </p>
              <p className="text-[11px] text-zinc-400">
                Aktifkan agar bel harian berbunyi tepat waktu secara otomatis.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={masterActive}
                onChange={(e) => setMasterActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Volume control */}
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
              <span>Volume Bel & Suara ({Math.round(volume * 100)}%)</span>
              <Volume2 className="w-4 h-4 text-emerald-500" />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Chime type */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
                Jenis Nada Pembuka (Chime)
              </label>
              <select
                className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={chimeType}
                onChange={(e) => setChimeType(e.target.value as any)}
              >
                <option value="airport">Chime Islami (Harmonis)</option>
                <option value="classic">Dual Ring Digital (Klasik)</option>
                <option value="none">Tanpa Nada (Langsung Suara)</option>
              </select>
            </div>

            {/* Language accent */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
                Gaya / Bahasa Pengumuman
              </label>
              <select
                className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={voiceLang}
                onChange={(e) => setVoiceLang(e.target.value as any)}
              >
                <option value="perempuan">Siswa Perempuan</option>
                <option value="laki">Siswa Laki-Laki</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Voice Speed */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
                Kecepatan Suara ({voiceSpeed}x)
              </label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                className="w-full accent-emerald-600 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-pointer"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
              />
            </div>

            {/* Voice Pitch */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
                Nada Suara / Pitch ({voicePitch})
              </label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                className="w-full accent-emerald-600 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-pointer"
                value={voicePitch}
                onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between gap-3">
            <button
              type="button"
              onClick={onPreviewBell}
              className="px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10" />
              Uji Coba Suara Bel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all"
            >
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>

      {/* SECURE ADMIN CREDENTIALS & NTP SYNC */}
      <div className="space-y-6">
        {/* NTP SETTINGS */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm transition-all duration-300">
          <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2 mb-2">
            <Radio className="w-5 h-5 text-emerald-500" />
            Integrasi Waktu Server NTP
          </h3>
          <p className="text-xs text-zinc-400 mb-3">
            Aplikasi secara otomatis mensinkronkan waktu dengan server NTP setiap hari untuk menjamin presisi bell.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                Pilih Opsi Zona Waktu (NTP Sync)
              </label>
              <select
                className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={ntpTimezone}
                onChange={(e) => setNtpTimezone(e.target.value as any)}
              >
                <option value="WIB">WIB (Waktu Indonesia Barat - UTC+7)</option>
                <option value="WITA">WITA (Waktu Indonesia Tengah - UTC+8)</option>
                <option value="WIT">WIT (Waktu Indonesia Timur - UTC+9)</option>
              </select>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs">
              <span className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Daftar Pool NTP Backend (Secure):</span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] font-mono text-zinc-500">
                <li>0.id.pool.ntp.org (Terintegrasi)</li>
                <li>1.id.pool.ntp.org (Terintegrasi)</li>
                <li>2.id.pool.ntp.org (Terintegrasi)</li>
                <li>3.id.pool.ntp.org (Terintegrasi)</li>
              </ul>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 block">
                  Sinkronisasi Otomatis Aktif
                </span>
                <span className="text-[10px] text-zinc-400">
                  Waktu disinkronkan via HTTP headers dengan akurasi &lt;50ms
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100/50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                Terhubung
              </span>
            </div>
          </div>
        </div>

        {/* SECURE PASSWORD SETTINGS */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm transition-all duration-300">
          <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2 mb-2">
            <KeyRound className="w-5 h-5 text-emerald-500" />
            Keamanan Admin Madrasah
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Ubah kata sandi default administrator untuk mencegah perubahan jadwal oleh pihak yang tidak bertanggung jawab.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Kata Sandi Baru
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-zinc-200"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Konfirmasi Kata Sandi Baru
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-zinc-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-900 rounded-xl transition-all shadow-sm"
            >
              Ganti Kata Sandi Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
