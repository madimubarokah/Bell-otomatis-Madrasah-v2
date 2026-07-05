export interface ScheduleItem {
  id: string;
  name: string;
  time: string; // HH:MM format
  type: "class" | "break" | "custom";
  period?: number; // e.g. 1 for Pelajaran Ke-1
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
  active: boolean;
  customText?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string; // ISO String
  admin: string;
  action: string;
  details: string;
}

export interface BellSettings {
  volume: number; // 0 to 1
  voiceLang: "siswa_laki_formal" | "siswa_laki_semiformal" | "siswa_perempuan_formal" | "siswa_perempuan_semiformal" | "ar-mixed" | "ar" | "id";
  voiceSpeed: number; // 0.5 to 2
  voicePitch: number; // 0.5 to 2
  chimeType: "airport" | "classic" | "digital" | "none";
  ntpServer: string;
  isAutomaticSync: boolean;
  masterActive: boolean;
  ntpTimezone: "WIB" | "WITA" | "WIT";
}

export interface NTPTimeResponse {
  serverTime: number; // Current server timestamp in ms
  ntpSynced: boolean;
  offset: number; // calculated offset
}
