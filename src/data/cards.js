export const CARD_CATEGORIES = [
  { id: 'all', label: 'All Cards', icon: '✨' },
  { id: 'eat', label: 'What to Eat?', icon: '🍽️' },
  { id: 'date', label: 'Date Quests', icon: '🕯️' },
  { id: 'decide', label: 'Who Decides?', icon: '🎲' },
  { id: 'sparks', label: 'Deep Sparks', icon: '💬' },
  { id: 'coupons', label: 'Love Vouchers', icon: '🎟️' }
];

export const CARDS_DATA = [
  {
    id: 'dinner-roulette',
    category: 'eat',
    categoryLabel: 'What to Eat?',
    themeColor: '#FF6B6B',
    accentColor: '#FFA07A',
    title: 'THE DINNER ROULETTE',
    frontSubtitle: 'End the "I don\'t know, what do you want?" debate',
    tags: [{ label: 'TYPE', value: 'Decider' }, { label: 'EFFORT', value: 'Easy' }, { label: 'VIBE', value: 'Delicious' }],
    frontArt: { emoji: '🍝', quote: '"Best meals are the ones we stop arguing about."' },
    back: {
      heading: 'The 3-Option Elimination Rule',
      badge: 'DECISION PROTOCOL',
      description: 'Follow this exact 2-minute formula to find tonight\'s feast without tears:',
      steps: [
        'Partner A names 3 distinct cuisines (e.g. Thai, Tacos, Pizza).',
        'Partner B immediately eliminates 1 option with zero debate.',
        'Partner A picks the final winner from the remaining 2.',
        'Whoever did not pick the cuisine gets to pick the dessert or drinks!'
      ],
      actionPrompt: 'Lock in tonight\'s meal protocol?',
      actionLabel: 'LOCK IN DINNER PROTOCOL'
    }
  },
  {
    id: 'date-master-toss',
    category: 'decide',
    categoryLabel: 'Who Decides?',
    themeColor: '#4D96FF',
    accentColor: '#6BCB77',
    title: 'THE DATE MASTER TOSS',
    frontSubtitle: 'Who takes total charge of tonight?',
    tags: [{ label: 'ROLE', value: '50/50' }, { label: 'STAKES', value: 'High' }, { label: 'MODE', value: 'Surprise' }],
    frontArt: { emoji: '👑', quote: '"One plans everything. The other just looks hot."' },
    back: {
      heading: 'Tonight\'s Royalty Decree',
      badge: 'CHIEF DATE OFFICER',
      description: 'Flip a coin or rock-paper-scissors right now to crown the Date Master:',
      steps: [
        'The Winner decides: The vibe, the venue, the departure time, and the playlist.',
        'The Other Person’s Only Job: Dress up, show up on time, and compliment the planner unconditionally.',
        'Bonus: Zero "Are you sure?" or "Where are we going?" allowed during transit!'
      ],
      actionPrompt: 'Ready to crown tonight\'s planner?',
      actionLabel: 'APPOINT DATE MASTER'
    }
  },
  {
    id: 'chefs-duet',
    category: 'eat',
    categoryLabel: 'What to Eat?',
    themeColor: '#FF9F45',
    accentColor: '#FEE440',
    title: 'CHEF\'S DUET CHALLENGE',
    frontSubtitle: 'Cook a restaurant-tier dinner together at home',
    tags: [{ label: 'BUDGET', value: '$' }, { label: 'TIME', value: '60 Mins' }, { label: 'VIBE', value: 'Romantic' }],
    frontArt: { emoji: '👩‍🍳', quote: '"Wine in one hand, wooden spoon in the other."' },
    back: {
      heading: 'Kitchen Symphony Mission',
      badge: 'CO-OP COOKING',
      description: 'Pick an Italian pasta or handmade ramen recipe neither of you has mastered:',
      steps: [
        'Put on jazz, lofi, or Italian acoustic guitar in the kitchen.',
        'Split duties: One is Head Sauté & Seasoning, one is Prep Master & Beverage Director.',
        'Every 15 minutes, pause and clink glasses with a mandatory tasting spoonful.',
        'Plate with high-end restaurant garnish before sitting down.'
      ],
      actionPrompt: 'Turn on the stove and uncork the bottle?',
      actionLabel: 'START COOKING QUEST'
    }
  },
  {
    id: 'blanket-fortress',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#9B5DE5',
    accentColor: '#F15BB5',
    title: 'MIDNIGHT BLANKET FORTRESS',
    frontSubtitle: 'Turn your living room into an enchanted sanctuary',
    tags: [{ label: 'COMFORT', value: '10/10' }, { label: 'BUDGET', value: 'Free' }, { label: 'WEATHER', value: 'Indoor' }],
    frontArt: { emoji: '🏰', quote: '"No adults allowed inside the kingdom."' },
    back: {
      heading: 'Architecture & Cinema Night',
      badge: 'COZY SANCTUARY',
      description: 'Dismantle the sofa cushions and build your palace of pillows:',
      steps: [
        'Use all blankets, fairy lights, and heavy pillows to construct the canopy.',
        'Bring the laptop/iPad inside with freshly popped stovetop popcorn.',
        'Rule: Phones stay outside the fortress entrance.',
        'Watch a nostalgic movie from childhood or a movie you both rated 10/10.'
      ],
      actionPrompt: 'Build the kingdom tonight?',
      actionLabel: 'LOCK IN FORTRESS NIGHT'
    }
  },
  {
    id: 'no-destination-drive',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#00F5D4',
    accentColor: '#7B2CBF',
    title: 'THE 2 A.M. NO-DESTINATION DRIVE',
    frontSubtitle: 'Empty highways, windows cracked, favorite songs',
    tags: [{ label: 'VIBE', value: 'Moody' }, { label: 'TIME', value: 'Midnight' }, { label: 'PLAYLIST', value: 'Essential' }],
    frontArt: { emoji: '🚗', quote: '"Wherever the gas tank and good music take us."' },
    back: {
      heading: 'Midnight Escape Mission',
      badge: 'ROAD THERAPY',
      description: 'Hop in the car with warm drinks and let the headlights lead the way:',
      steps: [
        'Rule 1: No GPS allowed for the first 30 minutes. Alternate left/right turns.',
        'Rule 2: Hand over aux cord every song—each pick must have a memory attached.',
        'Mandatory Stop: 24-hour drive-thru for milkshakes or midnight fries.',
        'Park at a scenic lookout or empty rooftop and just talk.'
      ],
      actionPrompt: 'Grab the car keys and go?',
      actionLabel: 'LOCK IN MIDNIGHT DRIVE'
    }
  },
  {
    id: 'candlelight-confessions',
    category: 'sparks',
    categoryLabel: 'Deep Sparks',
    themeColor: '#E63946',
    accentColor: '#F4A261',
    title: 'THE CANDLELIGHT CONFESSIONS',
    frontSubtitle: 'Questions that unlock secrets you haven\'t told yet',
    tags: [{ label: 'DEPTH', value: 'Deep' }, { label: 'INTIMACY', value: '100%' }, { label: 'MOOD', value: 'Candlelit' }],
    frontArt: { emoji: '🍷', quote: '"How well do you actually know my mind?"' },
    back: {
      heading: 'Heart-to-Heart Inquiries',
      badge: 'UNFILTERED INTIMACY',
      description: 'Light three candles, turn down the main lights, and take turns answering:',
      steps: [
        'Round 1: "What is a small, quiet moment with me that you still think about?"',
        'Round 2: "What is one fantasy or dream you haven’t said out loud yet?"',
        'Round 3: "If we had 24 hours anywhere in the world tomorrow, with no budget, where do we wake up?"',
        'Rule: No interruptions, 100% judgment-free zone.'
      ],
      actionPrompt: 'Ready to dive into deep waters?',
      actionLabel: 'UNLOCK CANDLELIGHT CARDS'
    }
  },
  {
    id: 'streaming-breaker',
    category: 'decide',
    categoryLabel: 'Who Decides?',
    themeColor: '#3A86FF',
    accentColor: '#FF006E',
    title: 'STREAMING PARALYSIS BREAKER',
    frontSubtitle: 'Stop scrolling Netflix for 45 minutes without watching anything',
    tags: [{ label: 'SPEED', value: '3 Mins' }, { label: 'STRESS', value: 'Zero' }, { label: 'POPCORN', value: 'Ready' }],
    frontArt: { emoji: '🎬', quote: '"We’re watching something before the food gets cold."' },
    back: {
      heading: 'The 5-Minute Screening Verdict',
      badge: 'CINEMA ARBITRATION',
      description: 'A strict protocol to beat streaming fatigue:',
      steps: [
        'Set a timer for exactly 3 minutes.',
        'Each person must bookmark 2 movies maximum.',
        'Flip a coin: Heads = Partner A’s list, Tails = Partner B’s list.',
        'The other partner picks between the two movies on that winner’s list.',
        'Play pressed within 5 minutes or you have to watch Shrek 2.'
      ],
      actionPrompt: 'Press play before dinner cools down?',
      actionLabel: 'ENFORCE MOVIE LAW'
    }
  },
  {
    id: 'golden-picnic',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#FB5607',
    accentColor: '#FFBE0B',
    title: 'GOLDEN HOUR ROOFTOP PICNIC',
    frontSubtitle: 'Chase the sun with cheese, grapes, and blankets',
    tags: [{ label: 'TIME', value: 'Sunset' }, { label: 'SCENERY', value: '10/10' }, { label: 'CAMERA', value: 'Ready' }],
    frontArt: { emoji: '🌇', quote: '"The sky is showing off just for us tonight."' },
    back: {
      heading: 'Golden Hour Checklist',
      badge: 'OUTDOOR ROMANCE',
      description: 'Grab a tote bag and head out 45 minutes before sunset:',
      steps: [
        'Pack: Crusty baguette, favorite cheese, sparkling cider or wine, and a polaroid/disposable camera.',
        'Location: High rooftop, open park hill, or beach edge facing west.',
        'Take at least one candid photo of each other laughing.',
        'Stay until the very first star appears in twilight.'
      ],
      actionPrompt: 'Catch the twilight glow together?',
      actionLabel: 'LOCK IN SUNSET PICNIC'
    }
  },
  {
    id: 'chore-voucher',
    category: 'coupons',
    categoryLabel: 'Love Vouchers',
    themeColor: '#06D6A0',
    accentColor: '#118AB2',
    title: 'THE "PASS THE DISHES" VOUCHER',
    frontSubtitle: 'One-time instant exemption from household duty',
    tags: [{ label: 'TYPE', value: 'Voucher' }, { label: 'VALIDITY', value: 'Tonight' }, { label: 'POWER', value: 'Supreme' }],
    frontArt: { emoji: '🧼', quote: '"Redeemable once with zero complaints or sighs."' },
    back: {
      heading: 'Official Duty Exemption Pass',
      badge: 'GOLDEN VOUCHER',
      description: 'The holder of this voucher is granted immediate freedom from:',
      steps: [
        'Dishes duty after dinner.',
        'Taking out the trash or recycling in the cold.',
        'Deciding where lost keys are.',
        'The recipient must fulfill the chore promptly with a polite smile.'
      ],
      actionPrompt: 'Claim this voucher for yourself tonight?',
      actionLabel: 'CLAIM CHORE VOUCHER'
    }
  },
  {
    id: 'spa-retreat',
    category: 'coupons',
    categoryLabel: 'Love Vouchers',
    themeColor: '#D90429',
    accentColor: '#EF233C',
    title: 'THE 20-MINUTE SPA RETREAT',
    frontSubtitle: 'Guaranteed soothing shoulder & foot massage',
    tags: [{ label: 'FEELING', value: 'Bliss' }, { label: 'DURATION', value: '20 Mins' }, { label: 'OILS', value: 'Warm' }],
    frontArt: { emoji: '💆', quote: '"Close your eyes, let go of the entire week."' },
    back: {
      heading: 'Private Spa Contract',
      badge: 'RELAXATION GUARANTEE',
      description: 'Turn your bedroom into an aromatherapy oasis:',
      steps: [
        'Warm body lotion or massage oil between hands.',
        'Play calming ambient sound or rain audio.',
        '10 minutes upper back & neck, 10 minutes feet or head massage.',
        'Zero talking about work, emails, or responsibilities allowed.'
      ],
      actionPrompt: 'Redeem tonight\'s relaxation treatment?',
      actionLabel: 'REDEEM MASSAGE PASS'
    }
  },
  {
    id: 'snack-raid',
    category: 'eat',
    categoryLabel: 'What to Eat?',
    themeColor: '#8338EC',
    accentColor: '#3A86FF',
    title: 'THE $10 MART CONVENIENCE RAID',
    frontSubtitle: 'Budget blind grocery scavenger hunt',
    tags: [{ label: 'BUDGET', value: '$10 each' }, { label: 'FUN', value: 'Max' }, { label: 'SPEED', value: '15 Mins' }],
    frontArt: { emoji: '🛒', quote: '"Buy what you think my soul craves right now."' },
    back: {
      heading: 'The Convenience Store Duel',
      badge: 'SNACK SCAVENGER',
      description: 'Go to a supermarket or corner store together with $10 each:',
      steps: [
        'Split up in separate aisles for 10 minutes.',
        'Must buy for your partner: 1 salty snack, 1 sweet treat, 1 weird drink they haven\'t tried.',
        'Meet at the register and pay without showing your bag.',
        'Unbox and rate how well you know each other’s palate.'
      ],
      actionPrompt: 'Take the snack challenge tonight?',
      actionLabel: 'START $10 SNACK RAID'
    }
  },
  {
    id: 'retro-arcade',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#FF006E',
    accentColor: '#FFBE0B',
    title: 'RETRO ARCADE & AIR HOCKEY WAR',
    frontSubtitle: 'Loser buys ice cream, winner earns bragging rights',
    tags: [{ label: 'ENERGY', value: 'Competitive' }, { label: 'VIBE', value: 'Neon' }, { label: 'STAKES', value: 'Dessert' }],
    frontArt: { emoji: '🕹️', quote: '"Love is sweet, but beating you in air hockey is sweeter."' },
    back: {
      heading: 'Championship Match Rules',
      badge: 'FRIENDLY RIVALRY',
      description: 'Find a vintage arcade, bowling alley, or board game cafe:',
      steps: [
        'Best 2 out of 3 in Air Hockey, Mario Kart, or Skee-Ball.',
        'Each round winner gets to assign a silly victory dance to the other.',
        'Overall loser treats the winner to dessert or a boba drink on the way home.',
        'Take a retro photobooth snapshot to immortalize the battle.'
      ],
      actionPrompt: 'Game on tonight?',
      actionLabel: 'LOCK IN ARCADE NIGHT'
    }
  },
  {
    id: 'blindfolded-tasting',
    category: 'eat',
    categoryLabel: 'What to Eat?',
    themeColor: '#D81159',
    accentColor: '#FFBC42',
    title: 'BLINDFOLDED TASTE SENSATION',
    frontSubtitle: 'Feed each other mystery bites in the dark',
    tags: [{ label: 'SENSES', value: 'Heightened' }, { label: 'SURPRISE', value: '10/10' }, { label: 'FUN', value: 'Playful' }],
    frontArt: { emoji: '🍓', quote: '"When sight is gone, flavor is electric."' },
    back: {
      heading: 'Sensory Feasting Protocol',
      badge: 'TASTE EXPERIMENT',
      description: 'Prepare 5 small mystery foods while your partner wears a blindfold:',
      steps: [
        'Options: Strawberries with balsamic, spicy chips, dark chocolate, ripe mango, strange cheese.',
        'Feed one bite at a time and have them guess the ingredient.',
        'Points awarded for correct guesses. Winner gets breakfast in bed!'
      ],
      actionPrompt: 'Blindfold up for dinner?',
      actionLabel: 'START SENSORY TASTING'
    }
  },
  {
    id: 'aux-cord-battle',
    category: 'decide',
    categoryLabel: 'Who Decides?',
    themeColor: '#218380',
    accentColor: '#73D2DE',
    title: 'THE DJ RESIDENCY DUEL',
    frontSubtitle: 'Who controls the music for tonight?',
    tags: [{ label: 'AUDIO', value: 'Loud' }, { label: 'GENRE', value: 'Free' }, { label: 'VIBE', value: 'Groovy' }],
    frontArt: { emoji: '🎧', quote: '"The music sets the whole evening\'s mood."' },
    back: {
      heading: 'The 3-Track DJ Showdown',
      badge: 'PLAYLIST SOVEREIGNTY',
      description: 'Play 3 songs each to determine who holds the speaker rights:',
      steps: [
        'Round 1: Best chill song. Round 2: Best singalong anthem. Round 3: Nostalgia throwback.',
        'Judge fairly—no bias! Winner is certified DJ for the rest of the night.'
      ],
      actionPrompt: 'Crank up the speakers?',
      actionLabel: 'START DJ BATTLE'
    }
  },
  {
    id: 'stargazing-blanket',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#172A3A',
    accentColor: '#004385',
    title: 'MIDNIGHT CONSTELLATION CHASE',
    frontSubtitle: 'Lie on a blanket under an endless sky of stars',
    tags: [{ label: 'SERENITY', value: 'Peaceful' }, { label: 'SPACE', value: 'Infinite' }, { label: 'AIR', value: 'Crisp' }],
    frontArt: { emoji: '🌌', quote: '"Look up. We are right where we belong."' },
    back: {
      heading: 'Night Sky Expedition',
      badge: 'CELESTIAL ROMANCE',
      description: 'Drive away from city glow with a thermos of hot cocoa:',
      steps: [
        'Download a star-mapping app (like Night Sky or SkyView).',
        'Find each other\'s zodiac constellations.',
        'Make a secret wish on the first shooting star or satellite.'
      ],
      actionPrompt: 'Head out into the night?',
      actionLabel: 'LOCK IN STARGAZING'
    }
  },
  {
    id: 'sweet-tooth-crawl',
    category: 'eat',
    categoryLabel: 'What to Eat?',
    themeColor: '#FF70A6',
    accentColor: '#FFD670',
    title: 'DESSERT FIRST (AND SECOND)',
    frontSubtitle: 'Skip dinner entirely and eat only sweets tonight',
    tags: [{ label: 'SUGAR', value: 'High' }, { label: 'RULES', value: 'Broken' }, { label: 'GUILT', value: 'Zero' }],
    frontArt: { emoji: '🍰', quote: '"Life is short. Eat the chocolate first."' },
    back: {
      heading: 'The Sugar Rebellion',
      badge: 'CHEAT NIGHT',
      description: 'Forget adulting. Tonight is dedicated strictly to pastry & ice cream:',
      steps: [
        'Stop 1: Warm churros or fresh bakery croissants.',
        'Stop 2: Gelato or molten lava cake.',
        'Eat on a park bench under string lights.'
      ],
      actionPrompt: 'Break the rules tonight?',
      actionLabel: 'LOCK IN DESSERT CRAWL'
    }
  },
  {
    id: 'who-picks-movie',
    category: 'decide',
    categoryLabel: 'Who Decides?',
    themeColor: '#4F5D75',
    accentColor: '#EF8354',
    title: 'THE POPCORN DICTATOR',
    frontSubtitle: 'Absolute power to pick the movie with zero vetoes',
    tags: [{ label: 'VETO', value: 'None' }, { label: 'POWER', value: '100%' }, { label: 'TIME', value: 'Instant' }],
    frontArt: { emoji: '🍿', quote: '"Sit down, hush, and trust the vision."' },
    back: {
      heading: 'Dictator Decree',
      badge: 'MOVIE AUTHORITY',
      description: 'Draw straws or flip a coin right now:',
      steps: [
        'The Popcorn Dictator chooses the movie within 60 seconds.',
        'Partner must prepare the snacks and cannot check their phone or complain.'
      ],
      actionPrompt: 'Declare the movie dictator?',
      actionLabel: 'APPOINT DICTATOR'
    }
  },
  {
    id: 'future-dreams-map',
    category: 'sparks',
    categoryLabel: 'Deep Sparks',
    themeColor: '#4361EE',
    accentColor: '#4CC9F0',
    title: 'THE 5-YEAR HORIZON MAP',
    frontSubtitle: 'Dream together about where we are heading',
    tags: [{ label: 'VISION', value: 'Together' }, { label: 'DREAMS', value: 'Big' }, { label: 'HEART', value: 'Full' }],
    frontArt: { emoji: '🧭', quote: '"The future is exciting because you are in it."' },
    back: {
      heading: 'Dream Architecture Session',
      badge: 'COUPLE VISION',
      description: 'Grab a notebook and ask each other:',
      steps: [
        'Where is our favorite trip going to be next year?',
        'What does our ideal weekend look like in 5 years?',
        'Write down 3 wild dreams and toast to making them happen.'
      ],
      actionPrompt: 'Map the future together?',
      actionLabel: 'START VISION MAPPING'
    }
  },
  {
    id: 'sleep-in-voucher',
    category: 'coupons',
    categoryLabel: 'Love Vouchers',
    themeColor: '#2EC4B6',
    accentColor: '#E71D36',
    title: 'THE "SLEEP UNTIL NOON" PASS',
    frontSubtitle: 'Guaranteed uninterrupted morning slumber',
    tags: [{ label: 'REST', value: 'Unbroken' }, { label: 'COFFEE', value: 'Delivered' }, { label: 'ALARM', value: 'Off' }],
    frontArt: { emoji: '🛌', quote: '"Do not wake the sleeping beauty."' },
    back: {
      heading: 'Royal Slumber Permit',
      badge: 'SLEEP IMMUNITY',
      description: 'Redeemable on any weekend morning:',
      steps: [
        'No alarms, no noise, curtains drawn tight.',
        'The other partner handles pets, chores, and delivers coffee upon waking.'
      ],
      actionPrompt: 'Claim your sleep-in pass?',
      actionLabel: 'CLAIM SLEEP VOUCHER'
    }
  },
  {
    id: 'flea-market-duel',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#6B705C',
    accentColor: '#DDBEA9',
    title: 'THRIFT STORE TREASURE DUEL',
    frontSubtitle: 'Find the weirdest, coolest antique for $5',
    tags: [{ label: 'VINTAGE', value: 'Retro' }, { label: 'HUNT', value: 'Active' }, { label: 'SMILES', value: 'Guaranteed' }],
    frontArt: { emoji: '🕰️', quote: '"One person\'s nostalgia is tonight\'s treasure."' },
    back: {
      heading: 'The Vintage Scavenger Hunt',
      badge: 'THRIFT QUEST',
      description: 'Visit a local thrift shop or flea market with $5 each:',
      steps: [
        'Find the funniest vinyl record, mug, or vintage trinket.',
        'Best find gets displayed on the living room shelf for one week.'
      ],
      actionPrompt: 'Go treasure hunting?',
      actionLabel: 'START THRIFT DUEL'
    }
  },
  {
    id: 'sunrise-coffee-run',
    category: 'date',
    categoryLabel: 'Date Quests',
    themeColor: '#E07A5F',
    accentColor: '#F4F1DE',
    title: 'DAWN PATROL & WARM PASTRIES',
    frontSubtitle: 'Wake up before the rest of the world',
    tags: [{ label: 'MORNING', value: 'Quiet' }, { label: 'COFFEE', value: 'Hot' }, { label: 'SUN', value: 'Rising' }],
    frontArt: { emoji: '☕', quote: '"The world is quietest when it belongs only to us."' },
    back: {
      heading: 'Morning Magic Mission',
      badge: 'EARLY BIRDS',
      description: 'Set alarm for 20 minutes before sunrise:',
      steps: [
        'Slip into oversized hoodies and grab favorite coffees.',
        'Watch the sunrise while the streets are empty and peaceful.'
      ],
      actionPrompt: 'Catch the dawn tomorrow?',
      actionLabel: 'LOCK IN DAWN RUN'
    }
  },
  {
    id: 'whispered-playlist',
    category: 'sparks',
    categoryLabel: 'Deep Sparks',
    themeColor: '#9D4EDD',
    accentColor: '#E0AAFF',
    title: 'THE SLOW DANCE IN THE KITCHEN',
    frontSubtitle: 'One song, dim lights, no words needed',
    tags: [{ label: 'MAGIC', value: 'Timeless' }, { label: 'TEMPO', value: 'Slow' }, { label: 'TOUCH', value: 'Close' }],
    frontArt: { emoji: '🕯️', quote: '"Sometimes all you need is one slow song."' },
    back: {
      heading: 'Living Room Waltz',
      badge: 'UNSPOKEN ROMANCE',
      description: 'Turn off all screens and put on your song:',
      steps: [
        'Take each other by the hand in the middle of the kitchen.',
        'Sway slowly for the entirety of one track.',
        'No talking—just breathe and hold each other tight.'
      ],
      actionPrompt: 'Slow dance tonight?',
      actionLabel: 'LOCK IN SLOW DANCE'
    }
  }
];
