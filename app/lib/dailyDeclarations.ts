export interface DailyDeclaration {
  focus: string;
  declaration: string;
  scripture: string;
}

/** Edit declarations here — one is shown each day, cycling through the list. */
export const DAILY_DECLARATIONS: DailyDeclaration[] = [
  {
    focus: 'Faith',
    declaration:
      'Today I declare that my faith is anchored in Christ alone. I will not be moved by fear or doubt, for the God I serve is faithful. I walk by faith and not by sight, trusting that every promise in His Word is yes and amen.',
    scripture: 'Hebrews 11:1',
  },
  {
    focus: 'Peace',
    declaration:
      'Today I declare the peace of God over my life. No storm, no worry, and no uncertainty will steal the calm that Christ has placed within me. I choose to rest in His presence and let His peace guard my heart and mind.',
    scripture: 'Philippians 4:7',
  },
  {
    focus: 'Strength',
    declaration:
      'Today I declare that the Lord is my strength and my song. When I am weak, He is strong. I will not grow weary in well-doing, for I draw my power from the One who created the heavens and the earth.',
    scripture: 'Isaiah 40:31',
  },
  {
    focus: 'Purpose',
    declaration:
      'Today I declare that I am called, chosen, and set apart for God\'s purpose. My life has meaning in Christ. I will use my gifts, my time, and my voice to glorify Him and serve others with love.',
    scripture: 'Jeremiah 29:11',
  },
  {
    focus: 'Healing',
    declaration:
      'Today I declare that God is my healer. By the stripes of Jesus I am healed — in body, mind, and spirit. I receive His restoring power and trust Him to make all things new in His perfect time.',
    scripture: 'Isaiah 53:5',
  },
  {
    focus: 'Protection',
    declaration:
      'Today I declare that the Lord surrounds me as a shield. No weapon formed against me shall prosper. I dwell in the secret place of the Most High and abide under the shadow of the Almighty.',
    scripture: 'Psalm 91:1',
  },
  {
    focus: 'Gratitude',
    declaration:
      'Today I declare a heart of thanksgiving. I will count my blessings and praise God in every circumstance. His goodness follows me all the days of my life, and I will not take His mercy for granted.',
    scripture: 'Psalm 100:4',
  },
  {
    focus: 'Wisdom',
    declaration:
      'Today I declare that I have the mind of Christ. The Holy Spirit guides my decisions and gives me wisdom beyond my years. I will seek God first in every choice and walk in understanding.',
    scripture: 'James 1:5',
  },
  {
    focus: 'Joy',
    declaration:
      'Today I declare the joy of the Lord as my strength. No circumstance will define my happiness — my joy is found in Christ alone. I will rejoice always, pray continually, and give thanks in all things.',
    scripture: 'Nehemiah 8:10',
  },
  {
    focus: 'Love',
    declaration:
      'Today I declare that the love of God fills me and flows through me. I will love others as Christ has loved me — with patience, kindness, and grace. His love casts out every fear in my heart.',
    scripture: '1 John 4:18',
  },
  {
    focus: 'Victory',
    declaration:
      'Today I declare that I am more than a conqueror through Christ who loves me. Every battle belongs to the Lord, and I walk in the victory He has already won on the cross. I will not be defeated.',
    scripture: 'Romans 8:37',
  },
  {
    focus: 'Provision',
    declaration:
      'Today I declare that my God shall supply all my needs according to His riches in glory. I am not anxious about tomorrow, for my Heavenly Father knows what I need and provides faithfully.',
    scripture: 'Philippians 4:19',
  },
  {
    focus: 'Courage',
    declaration:
      'Today I declare boldness and courage over my life. God has not given me a spirit of fear, but of power, love, and a sound mind. I will step forward in faith, knowing He goes before me.',
    scripture: '2 Timothy 1:7',
  },
  {
    focus: 'Rest',
    declaration:
      'Today I declare rest for my soul in the presence of Jesus. I lay down every burden at His feet and receive the gentle yoke He offers. In Him I find true rest, renewal, and refreshment.',
    scripture: 'Matthew 11:28',
  },
];

export function getDailyDeclaration(date = new Date()): DailyDeclaration {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return DAILY_DECLARATIONS[dayOfYear % DAILY_DECLARATIONS.length];
}

export function formatDailyDate(date = new Date()): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
