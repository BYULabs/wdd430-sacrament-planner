import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      {
        name: 'Youth Choir',
        topic: 'I Know That My Redeemer Lives',
        type: 'musical-number',
      },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: [
      'Ward temple night: May 10',
      'Primary activity on Thursday at 6:30 PM',
    ],
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Taylor',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Johnson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      {
        name: 'Bear Testimony',
        topic: 'Fast and Testimony Meeting',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 301, title: 'I Am a Child of God' },
    closingPrayer: 'Sister Martinez',
    announcements: [
      'Mother’s Day brunch following second hour',
      'FYS registration open',
    ],
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Bishop Smith',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Adams',
    wardBusiness: [
      { description: 'Release and sustaining of Elders Quorum counselor' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      {
        name: 'Brother Clark',
        topic: 'Preparing for Temple Worship',
        type: 'speaker',
      },
      {
        name: 'String Duet',
        topic: 'Be Still, My Soul',
        type: 'musical-number',
      },
      {
        name: 'Sister Evans',
        topic: 'Finding Peace in Christ',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Brother White',
    announcements: [
      'High Council speaker next week',
      'Youth temple trip signup on board',
    ],
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'President Miller',
    conducting: 'Brother High Council',
    openingHymn: { number: 227, title: 'There Is Inspiration On High' },
    openingPrayer: 'Sister Robinson',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      {
        name: 'Elder Young',
        topic: 'Covenant Path and Discipleship',
        type: 'speaker',
      },
      {
        name: 'Brother High Council',
        topic: 'Ministering with Purpose',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 209, title: 'Hark, All Ye Nations!' },
    closingPrayer: 'Sister Green',
    announcements: ['Stake Conference schedule for next month posted in foyer'],
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 223, title: 'Have I Done Any Good?' },
    openingPrayer: 'Brother Nelson',
    wardBusiness: [
      { description: 'Thank you to outgoing Youth Conference committee' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 195, title: 'How Great the Wisdom and the Love' },
    speakers: [
      {
        name: 'Sister Baker',
        topic: 'Living the Gospel Joyfully',
        type: 'speaker',
      },
      {
        name: 'Brother Carter',
        topic: 'Strengthening Families through Prayer',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 166, title: 'Abide with Me!' },
    closingPrayer: 'Sister Hall',
    announcements: [
      'Ward picnic scheduled for June 6th at 5:00 PM',
      'Elders Quorum service project Saturday morning',
    ],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
