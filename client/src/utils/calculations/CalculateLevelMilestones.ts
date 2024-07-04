interface PropType {
  totalScore: number;
}

export default function CalculateLevelMilestones({ totalScore }: PropType) {
  const allMastery =
    "Novice,Novice,Fast Learner,Average Typist,Typing Explorer,Letter Alchemist,Letter Learner,Keyboard Voyager,Keymancer,Glyph Guardian,Text Phenom,Quicksilver Quoter,Syntax Sleuth,Chirographer,Digit Dancer,Epistle Expert,Tap Titan,Key Forger,Letter Courier,Alphabet Maven,Phrase Pharaoh,Key Kinetic,Lexicon Leader,Typing Tornado,Verbiage Virtuoso,Keyboard Architect,Word Whirlwind,Typo Terminator,Stroke Savant,Letter Luminance,Speed Sorcerer,Text Technician,Type Tactician,Syntax Samurai,Chiro Genius,Key Craftsman,Phrase Prodigy,Tap Tactician,Text Trailblazer,Wordsmith Wizard,Script Shogun,Keyboard Maestro,Keykeeper,Glyph Guru,Speed Scribe,Text Tactician,Tap Tempest,Type Tycoon,Keyboard Knight,Word Warrior,Letter Luminary,Typing Titan,Typing Novice,Keyboard Cadet,Word Wizard,Speed Seeker,Precision Pioneer,Typing Enthusiast,Keymaster,Syntax Savant,Wordsmith,Text Titan,Typing Trailblazer,Precision Prodigy,Word Whiz,Keyboard Commander,Syntax Specialist,Letter Legend,Typing Tactician,Speedster,Key Virtuoso,Word Wonder,Typing Guru,Keyboard Conqueror,Typing Maestro,Letter Leader,Word Weaver,Keyboard King/Queen,Syntax Sensei,Typing Champion,Precision Perfectionist,Word Warlord,Typing Mastermind,Key Crusader,Typing Aficionado,Text Tornado,Letter Lord/Lady,Typing Virtuoso,Key Keeper,Word Wizardry,Typing Dynamo,Keyboard Hero,Textmaster,Typing Sage,Key Connoisseur,Word Artisan,Typing Overlord,Typing Tadpole,Keyboard Koala,Letter Lynx,Speedy Sloth,Glyph Giraffe,Script Salamander,Text Tiger,Quicksilver Quokka,Syntax Seahorse,Typing Tamarin,Chiro Cheetah,Digit Dolphin,Epistle Eagle,Tap Tapir,Font Fox,Code Chameleon,Manuscript Meerkat,Phrase Panther,Key Kestrel,Lexicon Llama,Typing Tortoise,Verbiage Viper,Keyboard Kangaroo,Word Wombat,Typo Toucan,Stroke Stingray,Letter Lemur,Speedy Sparrow,Text Tarsier,Type Tarantula,Syntax Sphinx,Chiro Caracal,Key Kookaburra,Phrase Platypus,Tap Tamarin,Text Tamarin,Script Scorpion,Manuscript Manatee,Key Kiwi,Glyph Gorilla,Speedy Sable,Type Typhoon,Keyboard Kraken,Letter Liger,Typing T-Rex,Speed Serpent,Typing Thumb,Keyboard Knuckle,Letter Little Finger,Speedy Index,Glyph Grip,Script Snapper,Text Tapper,Quicksilver Quint,Typing Thumbprint,Verbiage Vertex,Keyboard Knuckle Joint,Word Wrist,Typo Tendon,Stroke Stylus,Letter Ligament,Speedy Synapse,Text Thumbpad,Type Tendril,Syntax Swiper,Chiro Chiral,Key Knuckle Bone,Phrase Palm,Tap Tip,Text Trace,Word Whorl,Script Spine,Manuscript Minutiae,Key Knuckle Ridge,Glyph Groove,Speedy Span,Text Touchpad,Tap Tickle,Keyboard Knuckle Fold,Letter Loop,Typing Thumbtip,Speedy Swirl,Typing Thumbkin,Keyboard Knucklehead,Letter Littler,Speedy Snappy,Glyph Grappler,Script Slapper,Text Twiddler,Quicksilver Quirky,Syntax Squeezer,Typing Tickler,Chiro Chomper,Digit Doodler,Epistle Pinky,Tap Tappy,Font Fiddler,Code Clapper,Manuscript Muncher,Phrase Pincher,Key Knuckle Noodle,Lexicon Wiggler,Typing Thumby,Verbiage Velcro,Keyboard Kooky,Word Wiggly,Typo Tickle,Stroke Snicker,Letter Loop-de-Loop,Speedy Squiggly,Text Tippy-Tap,Type Tinkerer,Syntax Snapple,Chiro Chunky,Key Knuckle Knock,Phrase Poke,Tap Tinker,Text Twinkle,Word Wobble,Script Scribbler,Manuscript Mingle,Key Knuckle Knocky,Glyph Giggle,Speedy Skipper,Text Tap-Tap,Tap Twister,Type Tick-Tock,Keyboard Knick-Knack,Word Whimsy,Letter Lollipop,Typing Tippy,Speedy Snuggle,Keyboard Kinesis,Typing Triumph,Keyboard Mastery,Typing Tempo,Fingers of Fire,Key Command,Typing Tenacity,Keyboard Kudos,Typing Touch,Dexterity Dynamics,Speedy Strokes,Typing Talent,Keyboard Kinetics,Typing Technique,Key Control,Keyboard Craft,Typing Precision,Key Commando,Typing Tycoon,Keyboard Cadence,Key Maestro,Keyboard Virtuoso,Key Champion,Keyboard Conquest, Key Whisperer,Keyboard Wizardry, Typing Tsunami,Typing Thunder,Keyboard Conductor,Key Maverick,Typing Typhoon,Keyboard Legend,Typing Tsar,Keyboard Guru,Typing Terminator,Key Sensei,Typing Tsunami,Keyboard Commando,Keystroke Harmony,Keyboard Elegance,Digital Finesse,Keycraft Precision,Typewriter Mastery,Finger Choreography,Key Ensemble,Keyboard Precision,Digital Symphony,Keycraft Prowess,Typewriter Virtuosity,Finger Dexterity,Key Performance,Keyboard Dynamics,Digital Artisan,Typewriter Symphony,Finger Symphony,Keycraft Brilliance,Keyboard Agility,Digital Grace,Typewriter Flourish,Finger Precision,Keycraft Artistry,Digital Prowess,Typewriter Elegance,Finger Flourish,Keycraft Elegance,Keyboard Dexterity,Digital Mastery,Typewriter Precision,Finger Virtuosity,Keycraft Finesse,Keyboard Virtuosity,Digital Flourish,Typewriter Agility,Finger Mastery,Keyboard Performance,Typewriter Dynamics,Finger Artistry,Keycraft Agility,Digital Virtuosity,Typewriter Harmony,Keycraft Symphony,Keyboard Brilliance,Digital Elegance,Swift Strokes,Rapid Keycraft,Lightning Fingers,Velocity Typist,Turbo Typing,Speedy Key Mastery,Blitz Typing,Rapid Keystrokes,Flash Typist,Quickfire Keys,Accelerated Typing,Rapid Key Performance,Turbocharged Typing,Swift Keystrokes,Blitz Keycraft,Rapid Typing Mastery,Speed Demon Typist,Lightning Keycraft,Swift Typing Surge,Turbocharged Key Mastery,Rapid Typing Dynamo,Speedy Key Whiz,Blitz Typing Wizardry,Quickfire Key Dynamo,Accelerated Key Mastery,Rapid Typing Prodigy,Lightning Key Wizardry,Swift Typing Ace,Turbo Typing Maestro,Rapid Key Dynamo,Speed Demon Key Whiz,Blitz Typing Virtuoso,Quickfire Key Virtuosity,Accelerated Typing Ace,Rapid Keystroke Maestro,Speedy Typing Wizard,Turbocharged Key Virtuosity,Rapid Typing Wizard,Lightning Keystroke Ace,Swift Typing Prodigy,Blitz Keycraft Maestro,Quickfire Typing Whiz,Accelerated Key Virtuosity,Rapid Typing Virtuoso,Speed Demon Typing Maestro,Lightning Keycraft Dynamo,Swift Keystroke Whiz,Turbocharged Typing Wizard,Rapid Key Virtuoso,Speedy Typing Dynamo,Sonic Typist,Warp-Speed Keycraft,Hypersonic Typing,Meteoric Mastery,Velocity Virtuoso,Quantum Quickness,Hyperdrive Keycraft,Warp-Finger Wizard,Supersonic Strokes,Rapidity Maestro,Warp Typing Wizardry,Meteoric Key Mastery,Hyperaccelerated Typist,Sonic Speed Sentry,Warpstorm Typing Titan,Hypervelocity Virtuoso,Meteoric Key Whiz,Quantum Key Mastery,Warp-Finger Maestro,Supersonic Key Surge,Hyperdrive Typing Titan,Sonic Keycraft Sentinel,Warp-Speed Typist,Hypersonic Virtuoso,Hyperdrive Key Whiz,Warp-Finger Dynamo,Supersonic Typing Titan,Rapidity Wizardry,Warpstorm Typing Sentinel,Hypervelocity Maestro,Sonic Keycraft Whiz,Meteoric Typing Dynamo,Quantum Key Sentry,Warp-Finger Virtuoso,Supersonic Speed Sentry,Hyperdrive Mastery,Sonic Key Wizardry,Meteoric Typing Maestro,Hypersonic Key Whiz,Sonic Typing Sentinel,Quantum Key Surge,Warp-Finger Titan,Pterodactyl Prowess,T-Rex Typist,Velociraptor Velocity,Triceratops Typing Triumph,Stegosaurus Speed,Brachiosaurus Blitz,Tyrannosaurus Texting,Dino-Key Dynamics,Jurassic Jetstream,Mesozoic Mastery,Raptor Rapids,Diplodocus Dexterity,Archaeopteryx Agility,Dino-Dactyl Dispatch,Cretaceous Celerity,Dino Keystroke Carnage,Plesiosaur Precision,Ankylosaurus Acceleration,Spinosaurus Swift Strokes,Velociraptor Virtuoso,Pterodactyl Precision,Brontosaurus Blitz,Stegosaurus Speed Surge,Tyrannosaurus Text Tremor,Dino-Key Dynamo,Falcon Fingers,Eagle Eyes Typing,Swift Sparrow Strokes,Robin's Rapidity,Hawkish Keystrokes,Nightingale Nimbleness,Owl's Optimal Typing,Pecking Precision,Parrot's Proficiency,Flamingo Finesse,Albatross Agility,Dove's Dexterity,Crane's Craft,Hummingbird Harmony,Pelican Precision,Crow's Celerity,Seagull's Speed,Swan's Swiftness,Toucan Tempo,Pigeon's Prowess,Kingfisher Keystrokes,Cardinal's Cadence,Woodpecker's Wrangling,Eagle-eyed Efficiency,Sparrow's Speed,Falcon's Finesse,Swift Swallow Strokes,Hawk's Hasty Hands,Owl's Optimal Output,Parrot's Precision,Flamingo's Flutter,Albatross's Adeptness,Dove's Dispatch,Crane's Celerity,Hummingbird's Hustle,Pelican's Pace,Crow's Craftiness,Seagull's Swiftness,Swan's Sleekness,Toucan's Tact,Pigeon's Proficiency,Kingfisher's Keenness,Cardinal's Control,Woodpecker's Workmanship,Sparrow's Swiftness,Purring Pixels,Tabby Typing Talents,Feline Fingers,Paw-some Keystrokes,Whiskered Writing,Kitty Key Mastery,Nimble Nibbles,Pixelated Paws,Catty Commands,Pawprint Precision,Miniature Meows,Compact Clicks,Kitty Keystrokes,Pixel Purrfection,Petite Paws Precision,Bitty Bit Bites,Tabby Taps,Tiny Typing Triumphs,Compact Cat Commands,Lilliputian Letters,Mewling Macros,Itty-Bitty Inputs,Pocket-sized Purrers,Diminutive Digits,Mini Meow Mastery,Micro Mousing,Lilliputian Layouts,Paw-sized Precision,Compact Clickity Cats,Petite Paw Prints,Meowing Micros,Itty-Bitty Bits,Teeny Typing Tigers,Diminutive Data Dabs,Paw-some Pixels,Pocket-sized Paw Prints,Micro Meow Mastery,Pint-sized Paws,Tiny Typing Talents,Mini Mew Macros,Compact Clickers,Finned Fingers,Guppy Keystrokes,Typing Trout,Cod Commands,Salmon Swiftness,Tuna Typing Talent,Sardine Speed,Carp Clicks,Goldfish Glide,Mackerel Mastery,Flounder Fingers,Angelfish Agility,Barracuda Bites,Swordfish Speed,Haddock Haste,Jellyfish Jetstream,Clownfish Clicks,Eel Efficiency,Dolphin Dexterity,Seahorse Strokes,Starfish Speed,Octopus Output,Shrimp Swiftness,Crab Commands,Lobster Letters,Marlin Mastery,Snapper Speed,Catfish Clicks,Sharky Stroke,Trout Typing Triumph,Tentacle Typing,Coral Keystrokes,Seaweed Script,Jelly Jabs,Crab Clicks,Squid Scribbles,Starfish Strokes,Dolphin Dispatch,Seashell Scripts,Turtle Typing,Seahorse Scrolls,Clam Commands,Ray Rhythms,Whale Words,Penguin Patter,Otter Output,Seal Scribbles,Manatee Manuscripts,Sea Urchin Scrolls,Squid Strokes,Turtle Texts,Dolphin Diction,Starfish Scribbles,Crab Calligraphy,Jellyfish Jargon,Coral Cursive,Ray Rescripts,Lobster Lexicon,Penguin Paragraphs,Seahorse Script,Otter Oratory,Seal Syntax,Eel Epistles,Sea Urchin Scribe,Squid Sonnets,Turtle Tidings,Dolphin Dialogue,Seashell Sonatas,Starfish Script,Crab Chronicles,Octopus Opuses,Jellyfish Jottings,Coral Chronicles,Ray Reports,Lobster Lyrics,Chimp Clicks,Baboon Bites,Monkey Maneuvers,Gorilla Grasps,Primate Precision,Ape Agility,Chimpanzee Commands,Macaque Mastery,Gibbon Glide,Orangutan Output,Bonobo Browsing,Tamarin Typing,Langur Letters,Capuchin Clicks,Mandrill Mastery,Squirrel Monkey Speed,Lemur Lines,Spider Monkey Strokes,Marmoset Messaging,Rhesus Rhythms,Dragon Dexterity,Unicorn Typing Tales,Phoenix Press,Griffin Grasp,Mermaid Maneuvers,Centaur Commands,Werewolf Words,Fairy Fingers,Hydra Handiwork,Goblin Glide,Basilisk Bites,Minotaur Mastery,Sphinx Scripts,Chimera Clicks,Yeti Yarns,Troll Typing,Kraken Keystrokes,Harpy Handiwork,Pegasus Patter,Vampire Velocity,Wraith Wrangling,Banshee Bites,Cyclops Commands,Siren Scripts,Ogre Output,Nymph Nibbles,Monumental Manuscripts,Marvelous Scripting,Spectacular Scribbles,Majestic Mastery,Iconic Inputs,Legendary Letters,Grandeur Glyphs,Wonderous Wordsmithing,Astonishing Annotations,Magnificent Manuscripts,Legendary Logs,Epic Entries,Iconic Impressions,Monumental Messages,Phenomenal Phrasing,Splendid Scripts,Marvelous Manuscripts,Legendary Lettering,Iconic Inscriptions,Epic Epistles,Explorer's Entries,Trailblazing Texts,Adventurous Annotations,Journeyman Jottings,Explorer's Epistles,Voyager's Verbiage,Adventurer's Accounts,Expeditionary Entries,Trekker's Texts,Pathfinder's Pages,Wanderer's Words,Discoverer's Dispatches,Nomad's Notes,Wayfarer's Writings,Roamer's Records,Pioneer's Papers,Seeker's Scripts,Voyager's Vocabulary,Adventurer's Archives,Expeditionary Epistles,Knightly Keystrokes,Castle Scripts,Courtly Calligraphy,Royal Reports,Medieval Manuscripts,Kingdom Keys,Dragon's Dispatches,Noble Notations,Scribe's Scrolls,Chivalrous Characters,Jousting Jottings,Court Chronicles,Heraldic Handiwork,Armor Annotations,Dungeon Documents,Crowned Calligraphy,Tapestry Texts,Chainmail Messages,Kingly Keystrokes,Lady's Letters,Arcane Artistry,Sorcerer's Scribbles,Mystic Manuscripts,Enchanter's Entries,Mage's Musings,Wizardly Wordsmithing,Warlock's Writings,Spellcaster Scripts,Necromancer's Notations,Dark Magic Dispatches,Summoner's Scrolls,Witch's Writings,Conjurer's Chronicles,Enigma Entries,Magician's Manifestos,Venomous Vocabulary,Toxic Typing,Lethal Letters,Deadly Diction,Poisonous Phrasing,Hazardous Handiwork,Venom Vocab,Toxic Texts,Lethal Linguistics,Deadly Dispatches,Poisonous Prose,Venomous Verbiage,Hazardous Key Strokes,Deadly Documents,Lethal Lines,Poisonous Pages,Toxic Typewriter,Venomous Verses,Deadly Dictation,Hazardous Handwriting,Djinn Dynamics,Leprechaun Letters,Gargoyle Grasp,Imp Inputs,Buccaneer's Blitz,Swashbuckling Strokes,Pirate's Precision,Cutlass Clicks,Jolly Roger Typing,Shipshape Scripts,Treasure Trove Typing,Plundering Precision,Corsair Commands,Rum Runner's Rapidity,Skull and Crossbones Scripts,Pillaging Prowess,Sushi Scrolls,Maki Manuscripts,Nigiri Notations,Sashimi Scripts,Temaki Texts,Wasabi Wordsmithing,Soy Sauce Scribbles,Rice Roll Records,Fishy Fonts,Seaweed Scripting,Salmon Strokes,Tuna Typing,Roe Reports,Nori Notations,Ginger Glyphs,Sushi Sketches,Bento Box Broadcasting,Chopstick Calligraphy,Miso Manuscripts,Soy Sauce Scripting,Burger Bytes,Pizza Prints,Fries Fingers,,Candy Keystrokes,Chip Characters,Donut Dispatches,Popcorn Patter,Chocolate Clicks,Ice Cream Inputs,Nacho Notations,Cookie Commands,Cake Calligraphy,Hot Dog Handiwork,Candy Crunches,Snack Scripts,Soda Scribes,Petal Press,Blossom Bytes,Floral Fingers,Lily Letters,Rose Typing,Tulip Texts,Orchid Outputs,Sunflower Scripts,Peony Pages,Hyacinth Handiwork,Marigold Manuscripts,Violet Vocabulary,Poppy Printing,Snapdragon Strokes,Daffodil Documents,Carnation Calligraphy,Iris Input,Azalea Annotations,Jasmine Journals,Lavender Letters,Magnolia Manuscripts,Zinnia Zones,Daisy Diary,Lotus Log,Daisy Documents,Dandelion Dispatches,Pansy Pages,Hibiscus Handiwork,Lily Log,Burger Buttons,Pizza Patter,Fries Fonts,Cupcake Calligraphy,Cookie Chronicles,Pastry Pages,Doughnut Dispatches,Tart Texts,Brownie Bites,Muffin Manuscripts,Eclair Entries,Macaron Musings,Pudding Papers,Pie Postings,Truffle Texts,Croissant Chronicles,Cheesecake Calligraphy,Scone Scribbles,Cannoli Chronicles,Éclair Entries,Ahoy! Typing,Blackbeard's Bites,Captain's Commands,Pirate's Parley,Davy Jones' Dexterity,Scallywag Speed,Marauder's Mastery,Privateer's Precision,Lightning Letters,Thunder Typing,Stormy Scripts,Raindrop Rapidity,Cloudy Clicks,Sunny Strokes,Blizzard Bites,Hailstorm Handiwork,Tornado Typing,Rainbow Rapids,Frosty Fingers,Gale Force Grasp,Hurricane Haste,Drizzle Dynamics,Snowflake Scripts,Misty Mastery,Foggy Fingers,Cyclone Commands,Sunny Skies Speed,Thunderstorm Typing,Gritty Typing,Tenacious Texts,Grinding Glyphs,Determined Documents,Hustle Handiwork,Grueling Graphemes,Resilient Reports,Tough Texting,Persistent Papers,Tireless Typing,Slogging Scripts,Driven Documents,Diligent Drafting,Relentless Records,Enduring Entries,Steadfast Scripts,Perseverance Pages,Rigorous Records,Hardworking Handwriting,Indomitable Inputs,Speed Sultan,Glyph Grandmaster,Script Sovereign,Quicksilver Quasar,Syntax Supreme,Titan Transcriptions,Deity Dictations,Celestial Scripts,Eldritch Entries,Divine Dispatches,Cosmic Calligraphy,Sovereign Scribbles,Supreme Scripts,Almighty Annotations,Behemoth's Briefs,Leviathan's Letters,Kraken Chronicles,Chimera Chronicles,Basilisk's Scrolls,Griffin's Glyphs,Phoenix Papers,Hydra's Handiwork,Yeti's Yarns,Cerberus Chronicles,Roc's Reports,Gorgon's Gazette,Unicorn's Utterances,Minotaur's Manuscripts,Wyvern's Words,Centaur Chronicles,Ogre's Opus,Harpy's Handiwork,Cosmic Chronicles,Galactic Glyphs,Stellar Strokes,Nebula Notations,Astral Annotations,Interstellar Insights,Lunar Letters,Solar Scribbles,Comet Calligraphy,Supernova Scripts,Black Hole Briefs,Planetary Papers,Asteroid Alphabets,Space Odyssey Outputs,Milky Way Manuscripts,Constellation Chronicles,Astral Alphabets,Omnipotent Output,Mythic Manuscripts,Immortal Inscriptions,Archangelic Accounts,Demonic Documents,Angelic Annotations,Primordial Papers,Eternal Epistles,Godly Glyphs,Infernal Index,Warrior's Wordsmithing,Sword Key Strokes,Glory Glyphs,Warlord's Words,Valor Vocabulary,Conquest Calligraphy,Seraphic Scribblings,Dragon Dictation,Wyrm Writing,Serpent Scripts,Firebreather's Files,Draconic Dispatches,Scaley Scribbles,Roar Records,Winged Wordsmithing,Fanged Fonts,Dragonfire Documents,Talon Texts,Claws & Characters,Dragon's Dictum,Inferno Inscriptions,Mighty Manuscripts,Draconian Dispatches,Mythical Manuscripts,Dragonlore Letters,Wyvern Words,Ancient Archives,Typing Tyrant,Chiro Champion,Digit Deity,Epistle Emperor,Font Pharaoh,Code Colossus,Manuscript Monarch,Phrase Phoenix,Key Kingpin,Lexicon Legend,Typing Thunderlord,Verbiage Victor,Keyboard Kaiser,Word Warlock,Typo Titan,Letter Lord,Speed Sentinel,Text Templar,Type Tyrant,Chiro Conqueror,Phrase Patriarch,Tap Tyrant,Text Transcendent,Script Sage,Manuscript Mastermind,Key King,Speed Supreme,Text Titaness,Tap Titanus,Type Tyrantus,Speed Sovereign,Typing Expert ,Typing Master,Typing Grandmaster";

  let mastery = "Novice";

  // Define milestones directly
  const totalMilestonePerLv = [
    { score: 0, scorePerLvl: 500 },
    { score: 10000, scorePerLvl: 1000 },
    { score: 50000, scorePerLvl: 2000 },
    { score: 100000, scorePerLvl: 3000 },
    { score: 500000, scorePerLvl: 4000 },
    { score: 600000, scorePerLvl: 5000 },
    { score: 700000, scorePerLvl: 10000 },
    { score: 800000, scorePerLvl: 15000 },
    { score: 9000000, scorePerLvl: 20000 },
    { score: 10000000, scorePerLvl: 40000 },
    { score: 50000000, scorePerLvl: 50000 },
    { score: 75000000, scorePerLvl: 60000 },
    { score: 100000000, scorePerLvl: 70000 },
  ];

  let level = 0;
  let milestone = 0;
  let remainingScore = totalScore;
  const levelCap = 99999;

  for (
    let i = totalMilestonePerLv.length - 1;
    i >= 0 && remainingScore >= 0 && level < levelCap;
    i--
  ) {
    const { score, scorePerLvl } = totalMilestonePerLv[i];

    if (remainingScore >= score) {
      const levelsToAdd = Math.min(
        levelCap - level,
        Math.floor((remainingScore - score) / scorePerLvl) + 1,
      );
      level += levelsToAdd;

      milestone =
        scorePerLvl - (remainingScore - (levelsToAdd - 1) * scorePerLvl);
      remainingScore -= levelsToAdd * scorePerLvl;
      if (level >= levelCap) {
        milestone = 0;
        break;
      }
    }
  }

  mastery = allMastery.split(",")[Math.ceil(level / 100)].trim();

  return { level, milestone, mastery };
}
