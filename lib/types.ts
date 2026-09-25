export type MeetingType = 'testimony' | 'regular' | 'stake' | 'general';

export interface Hymn {
  number: number;
  title: string;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string; // ISO date string: 'YYYY-MM-DD'
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

// Raw meeting form input, keyed by field name, so a failed submission can be
// re-rendered with what the user typed.
export interface MeetingFormValues {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  openingPrayer: string;
  closingPrayer: string;
  openingHymnNumber: string;
  openingHymnTitle: string;
  sacramentHymnNumber: string;
  sacramentHymnTitle: string;
  closingHymnNumber: string;
  closingHymnTitle: string;
  speakers: SpeakerItem[];
  announcements: string;
  wardBusiness: string;
  stakeBusiness: boolean;
}

export type MeetingField = keyof MeetingFormValues;
