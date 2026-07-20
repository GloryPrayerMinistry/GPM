export interface Prayer {
  id: string;
  title: string;
  category: string;
  description: string;
  scripture: string;
  text: string;
  isPinned?: boolean;
  sortOrder?: number;
  createdAt?: string;
}

/** Pinned admin prayers first, then the rest by sort order and title. */
export function sortPrayers<T extends Prayer>(prayers: T[]): T[] {
  return [...prayers].sort((a, b) => {
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    if (bPinned !== aPinned) return bPinned - aPinned;

    const sortDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    if (sortDiff !== 0) return sortDiff;

    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return a.title.localeCompare(b.title);
  });
}

export function partitionPrayers<T extends Prayer>(prayers: T[]) {
  const sorted = sortPrayers(prayers);
  return {
    pinned: sorted.filter((p) => p.isPinned),
    regular: sorted.filter((p) => !p.isPinned),
  };
}

export const PRAYER_CATEGORIES = [
  { id: 'all', label: 'All Prayers' },
  { id: 'morning', label: 'Morning' },
  { id: 'night', label: 'Night' },
  { id: 'healing', label: 'Healing' },
  { id: 'protection', label: 'Protection' },
  { id: 'strength', label: 'Strength' },
  { id: 'peace', label: 'Peace' },
  { id: 'family', label: 'Family' },
  { id: 'children', label: 'Children' },
  { id: 'breakthrough', label: 'Breakthrough' },
  { id: 'guidance', label: 'Guidance' },
  { id: 'forgiveness', label: 'Forgiveness' },
  { id: 'gratitude', label: 'Gratitude' },
  { id: 'difficult-times', label: 'Difficult Times' },
  { id: 'before-work', label: 'Before Work' },
  { id: 'before-travel', label: 'Before Travel' },
  { id: 'financial', label: 'Financial' },
  { id: 'marriage', label: 'Marriage' },
  { id: 'church', label: 'Church' },
  { id: 'nation', label: 'Nation' },
  { id: 'salvation', label: 'Salvation' },
] as const;

/** Default prayer library — imported by db seed when the Prayer table is empty. */
export const PRAYERS: Prayer[] = [
  {
    id: 'morning',
    title: 'Morning Prayer',
    category: 'morning',
    description: 'Begin your day by inviting God\'s presence, guidance, and peace.',
    scripture: 'Psalm 5:3',
    text: 'Heavenly Father, as I begin this new day, I thank You for the gift of life and the breath in my lungs. Cover me with Your grace and lead me in Your truth. Help me to walk in wisdom, speak with kindness, and serve others with a willing heart. Guard my thoughts, my words, and my steps. Let Your light shine through me in every place I go. I surrender this day to You, trusting that You are with me from sunrise to sunset. In Jesus\' name, Amen.',
  },
  {
    id: 'night',
    title: 'Night Prayer',
    category: 'night',
    description: 'A gentle prayer to rest in God\'s care at the end of the day.',
    scripture: 'Psalm 4:8',
    text: 'Lord, as this day comes to a close, I place every burden into Your hands. Forgive me where I have fallen short, and help me to release every worry that weighs upon my heart. Thank You for Your faithfulness today — for every blessing seen and unseen. Watch over my loved ones through the night. Grant me peaceful rest and renew my spirit. I trust You to hold tomorrow, for You never sleep nor slumber. In Jesus\' name, Amen.',
  },
  {
    id: 'healing',
    title: 'Prayer for Healing',
    category: 'healing',
    description: 'A prayer for physical, emotional, and spiritual healing.',
    scripture: 'Jeremiah 30:17',
    text: 'Heavenly Father, I come before You in faith, asking for Your healing touch. Restore strength to my body, peace to my mind, and wholeness to my spirit. You are the God who heals — mending what is broken and making all things new. Where there is pain, bring comfort. Where there is fear, bring courage. Where there is weakness, bring Your power. I trust that You hear my cry and that Your love covers every wound. In Jesus\' name, Amen.',
  },
  {
    id: 'protection',
    title: 'Prayer for Protection',
    category: 'protection',
    description: 'Seek God\'s covering and safety over yourself and your loved ones.',
    scripture: 'Psalm 91:11',
    text: 'Almighty God, I ask for Your divine protection over my life and the lives of those I love. Surround us with Your angels and shield us from harm, danger, and every scheme of the enemy. Cover our coming and going, our home and our path. When fear tries to take hold, remind us that You are our refuge and fortress. We rest in the safety of Your presence, knowing that nothing can separate us from Your love. In Jesus\' name, Amen.',
  },
  {
    id: 'strength',
    title: 'Prayer for Strength',
    category: 'strength',
    description: 'Ask God for courage and endurance when you feel weary.',
    scripture: 'Isaiah 40:31',
    text: 'Lord, when I am weary and my strength is fading, be my source of power. Renew my spirit and lift me up on wings like eagles. Help me not to rely on my own understanding, but to draw strength from You alone. When the road is long and the burden feels heavy, remind me that Your grace is sufficient. Fill me with courage to keep going, faith to keep believing, and hope to keep pressing forward. In Jesus\' name, Amen.',
  },
  {
    id: 'peace',
    title: 'Prayer for Peace',
    category: 'peace',
    description: 'Find calm and rest for your soul in the presence of God.',
    scripture: 'Philippians 4:7',
    text: 'Prince of Peace, quiet the storms within my heart and mind. Where there is anxiety, bring Your stillness. Where there is unrest, bring Your calm. Help me to fix my eyes on You rather than on my circumstances. Let Your peace — which surpasses all understanding — guard my heart and my thoughts. Teach me to breathe deeply in Your presence and to trust that You are in control. I receive Your peace now. In Jesus\' name, Amen.',
  },
  {
    id: 'family',
    title: 'Prayer for Family',
    category: 'family',
    description: 'Lift up your household and ask God to bless your home with unity and love.',
    scripture: 'Joshua 24:15',
    text: 'Heavenly Father, I bring my family before You today. Bind us together in love, unity, and mutual respect. Protect our home from division and fill it with Your presence. Help us to forgive quickly, speak gently, and support one another through every season. Bless each member with health, wisdom, and a heart that seeks You. May our household serve as a light to others, reflecting Your grace and faithfulness. In Jesus\' name, Amen.',
  },
  {
    id: 'children',
    title: 'Prayer for Children',
    category: 'children',
    description: 'Pray for the protection, growth, and godly future of children.',
    scripture: 'Proverbs 22:6',
    text: 'Lord, I lift up the children in my life and in this world to You. Protect their innocence, guard their hearts, and guide their steps. Give them wise and loving influences, and help them to grow in knowledge of Your Word. Shield them from harm and surround them with people who will nurture their faith. Bless them with confidence, compassion, and a deep sense of being loved — by us and by You. In Jesus\' name, Amen.',
  },
  {
    id: 'breakthrough',
    title: 'Prayer for Breakthrough',
    category: 'breakthrough',
    description: 'Ask God to open doors and bring victory in areas of stagnation.',
    scripture: 'Isaiah 43:19',
    text: 'God of breakthrough, I stand in faith believing that You are able to do immeasurably more than I can ask or imagine. Where I have faced closed doors, open a new way. Where I have experienced delay, bring divine acceleration. Remove every obstacle that is not of You and break every chain that holds me back. I declare that Your timing is perfect and Your plans are good. I trust You for the breakthrough I need. In Jesus\' name, Amen.',
  },
  {
    id: 'guidance',
    title: 'Prayer for Guidance',
    category: 'guidance',
    description: 'Seek God\'s direction for decisions big and small.',
    scripture: 'Proverbs 3:5–6',
    text: 'Father, I acknowledge that I cannot see the full picture, but You can. Guide my steps and make my path clear. When I am uncertain, give me wisdom. When I am confused, bring clarity. Help me to trust in You with all my heart and not lean on my own understanding. Align my desires with Your will and close doors that are not meant for me. I will follow where You lead, knowing You hold my future. In Jesus\' name, Amen.',
  },
  {
    id: 'forgiveness',
    title: 'Prayer for Forgiveness',
    category: 'forgiveness',
    description: 'Confess, receive mercy, and extend forgiveness to others.',
    scripture: '1 John 1:9',
    text: 'Merciful Father, I come before You with a humble heart. Forgive me for the times I have fallen short — in thought, word, and deed. Wash me clean and renew a right spirit within me. Help me also to forgive those who have hurt me, just as You have forgiven me. Release me from bitterness and fill the empty places with Your love. Teach me to walk in freedom, grace, and reconciliation. In Jesus\' name, Amen.',
  },
  {
    id: 'gratitude',
    title: 'Prayer for Gratitude',
    category: 'gratitude',
    description: 'Give thanks to God for His goodness and daily blessings.',
    scripture: '1 Thessalonians 5:18',
    text: 'Lord, thank You for Your countless blessings — those I notice and those I take for granted. Thank You for life, breath, shelter, and the people You have placed in my path. Even in difficult seasons, You have been faithful. Open my eyes to see Your goodness in the ordinary moments of each day. Cultivate in me a heart of gratitude that overflows into generosity, joy, and praise. All honour and glory belong to You. In Jesus\' name, Amen.',
  },
  {
    id: 'difficult-times',
    title: 'Prayer During Difficult Times',
    category: 'difficult-times',
    description: 'Find comfort and hope when life feels overwhelming.',
    scripture: 'Psalm 34:18',
    text: 'Lord, this season is hard, and I need You more than ever. You are close to the brokenhearted and You save those who are crushed in spirit. Hold me when I feel like I cannot go on. Remind me that this trial is not the end of my story. Give me strength for today and hope for tomorrow. Surround me with people who will encourage me and point me back to You. I trust that You will carry me through. In Jesus\' name, Amen.',
  },
  {
    id: 'before-work',
    title: 'Prayer Before Work',
    category: 'before-work',
    description: 'Dedicate your labour and workplace to God\'s purpose.',
    scripture: 'Colossians 3:23',
    text: 'Father, as I begin my work today, I dedicate my efforts to You. Help me to work with excellence, integrity, and a spirit of service. Grant me focus, creativity, and patience in every task. Bless my interactions with colleagues and clients, that I may reflect Your character. Protect me from discouragement and help me to find purpose in what I do. May my work bring honour to Your name and blessing to others. In Jesus\' name, Amen.',
  },
  {
    id: 'before-travel',
    title: 'Prayer Before Travel',
    category: 'before-travel',
    description: 'Ask for God\'s protection and peace before a journey.',
    scripture: 'Psalm 121:8',
    text: 'Lord, I commit this journey into Your hands. Watch over me as I travel — on the road, in the air, and at every destination. Protect me from accidents, delays, and harm. Grant me safe passage and a peaceful spirit throughout the trip. Help me to be a light to those I meet along the way. Bring me home safely and reunite me with those I love. I trust You to go before me and behind me. In Jesus\' name, Amen.',
  },
  {
    id: 'financial',
    title: 'Prayer for Financial Provision',
    category: 'financial',
    description: 'Trust God as provider for your needs and financial wisdom.',
    scripture: 'Philippians 4:19',
    text: 'Heavenly Provider, You know every need I have before I even speak it. I ask for Your provision and wisdom in managing what You have entrusted to me. Open doors of opportunity and bless the work of my hands. Help me to be a faithful steward — generous, disciplined, and free from the love of money. Supply what is lacking and give me peace that does not depend on my bank account. I trust You as my source. In Jesus\' name, Amen.',
  },
  {
    id: 'marriage',
    title: 'Prayer for Marriage',
    category: 'marriage',
    description: 'Pray for love, unity, and strength in your marriage covenant.',
    scripture: 'Ecclesiastes 4:12',
    text: 'Lord, I lift up my marriage before You. Strengthen the bond between us and deepen our love with each passing day. Help us to communicate with honesty and grace, to forgive quickly, and to serve one another selflessly. Protect our union from division and draw us closer to You and to each other. When challenges come, remind us that a cord of three strands is not easily broken. Bless our home with Your presence. In Jesus\' name, Amen.',
  },
  {
    id: 'church',
    title: 'Prayer for the Church',
    category: 'church',
    description: 'Intercede for the body of Christ to grow in unity and mission.',
    scripture: 'Ephesians 4:3',
    text: 'Father, I pray for Your Church around the world. Unite believers in love, truth, and purpose. Raise up faithful leaders who will shepherd Your people with wisdom and integrity. Empower every member to use their gifts for the building up of the body. Protect the Church from division, complacency, and false teaching. Let us be a beacon of hope in a broken world — proclaiming the Gospel and serving those in need. In Jesus\' name, Amen.',
  },
  {
    id: 'nation',
    title: 'Prayer for the Nation',
    category: 'nation',
    description: 'Pray for leaders, peace, and righteousness in the land.',
    scripture: '1 Timothy 2:1–2',
    text: 'Lord of all nations, I lift up my country before You. Grant wisdom to those in authority and guide their decisions toward justice and peace. Heal divisions among people and replace hatred with understanding. Protect the vulnerable and uphold righteousness in our land. Raise up voices of truth and compassion. Revive hearts to seek You and turn from wickedness. May Your kingdom come and Your will be done in our nation. In Jesus\' name, Amen.',
  },
  {
    id: 'salvation',
    title: 'Prayer for Salvation',
    category: 'salvation',
    description: 'Pray for the lost to come to know Jesus Christ as Lord and Saviour.',
    scripture: 'Romans 10:13',
    text: 'Lord Jesus, I pray for those who do not yet know You as their Saviour. Open their eyes to the truth of Your love and the gift of salvation through Your death and resurrection. Soften hardened hearts and remove every veil that keeps them from seeing Your glory. Send labourers into the harvest and give believers boldness to share the Gospel. Draw the lost to Yourself, that many would call upon Your name and be saved. In Jesus\' name, Amen.',
  },
];
