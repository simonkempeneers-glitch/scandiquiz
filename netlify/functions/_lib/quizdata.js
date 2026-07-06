// Volledige vragenbank van de Scandinavië-quiz.
// Let op: dit bestand wordt NIET naar de deelnemers-client gestuurd (alleen server-side
// gebruikt door de functions), zodat antwoorden niet vooraf zichtbaar zijn.

export const ROUNDS = [
  {
    key: "norway",
    name: "Norvège",
    emoji: "🇳🇴",
    accent: "norway",
    questions: [
      {
        prompt: `Qui est le colonel Nils Olav ?`,
        options: [
          `Un ours polaire décoré pour bravoure`,
          `Un manchot royal devenu mascotte militaire`,
          `Le plus jeune colonel norvégien de l'histoire`,
          `Un personnage d'un conte traditionnel`,
        ],
        correctIndex: 1,
        funFact: `Nils Olav est un manchot royal vivant au zoo d'Édimbourg, adopté par la Garde royale norvégienne. Il a été promu au rang de colonel.`,
      },
      {
        prompt: `Pourquoi certaines personnes en Norvège choisissent-elles des séances de cinéma avec la salle éclairée ?`,
        options: [
          `Pour pouvoir tricoter pendant le film`,
          `Pour mieux apprécier les sous-titres`,
          `Parce que le film fait partie d'un cours scolaire`,
          `Pour éviter que les acteurs « disparaissent » dans le noir`,
        ],
        correctIndex: 0,
        funFact: `Ces séances, appelées strikkekino, permettent de tricoter ou coudre pendant le film. C'est une tradition très populaire chez les adultes et les enfants.`,
      },
      {
        prompt: `Qu'est-ce que le « brunost » ?`,
        options: [
          `Un pain aux épices traditionnel`,
          `Un chocolat local fabriqué avec du lait de renne`,
          `Un fromage brun caramélisé`,
          `Une confiture au lait norvégienne`,
        ],
        correctIndex: 2,
        funFact: `Le brunost est un fromage doux, fabriqué en faisant bouillir le lactosérum pour caraméliser le sucre. Il est typique de la Norvège.`,
      },
      {
        prompt: `Pourquoi la Norvège offre-t-elle chaque année un sapin de Noël à Londres ?`,
        options: [
          `Pour célébrer un traité commercial`,
          `En remerciement pour l'aide britannique pendant la Seconde Guerre mondiale`,
          `Pour lancer la saison touristique`,
          `Pour une compétition annuelle entre capitales`,
        ],
        correctIndex: 1,
        funFact: `Ce cadeau symbolique est offert chaque année depuis 1947.`,
      },
      {
        prompt: `Quelle est la particularité du village norvégien « Hell » ?`,
        options: [
          `Il compte plus de rennes que d'habitants`,
          `Il se trouve dans un cratère`,
          `Son nom signifie « enfer » et il gèle chaque hiver`,
          `On y parle une langue unique`,
        ],
        correctIndex: 2,
        funFact: `Le village est célèbre pour l'expression anglaise humoristique « Hell freezes over » (« l'enfer gèle »), car il gèle littéralement en hiver.`,
      },
      {
        prompt: `Qu'est-ce que la « slow TV » en Norvège ?`,
        options: [
          `Une chaîne qui diffuse uniquement des documentaires scientifiques`,
          `Des émissions montrant des activités en temps réel pendant des heures`,
          `Un service public destiné aux personnes âgées`,
          `Une approche pédagogique pour l'apprentissage des langues`,
        ],
        correctIndex: 1,
        funFact: `Exemples célèbres : un trajet en train de 7 heures, un feu de cheminée ou un voyage en bateau de plusieurs jours, filmés en temps réel.`,
      },
      {
        prompt: `Qu'est-ce que la « Svalbard Global Seed Vault » ?`,
        options: [
          `Une base militaire secrète`,
          `Un musée de la faune arctique`,
          `Une réserve mondiale de semences pour préserver la biodiversité`,
          `Un programme d'éducation environnementale`,
        ],
        correctIndex: 2,
        funFact: `Cette « banque de graines » protège la diversité des plantes pour les générations futures.`,
      },
      {
        prompt: `Pourquoi les lycéens norvégiens portent-ils des pantalons colorés en mai ?`,
        options: [
          `Pour célébrer un festival de danse`,
          `Pour identifier les équipes durant des jeux sportifs`,
          `Pour la tradition du « Russ », liée à la fin du lycée`,
          `Pour soutenir les clubs locaux`,
        ],
        correctIndex: 2,
        funFact: `Le Russ est une tradition de fêtes et défis pendant plusieurs semaines avant la fin du lycée. Chaque couleur de pantalon représente une filière scolaire différente.`,
      },
      {
        prompt: `Vrai ou faux : la Norvège possède l'un des taux les plus élevés de voitures électriques au monde grâce à des incitations financières fortes.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Les Norvégiens bénéficient d'exonérations fiscales, de parkings gratuits et de péages gratuits, ce qui rend les voitures électriques très populaires.`,
      },
      {
        prompt: `Quels sont les noms des deux langues écrites officielles de la Norvège ?`,
        options: [
          `Bokmål et Nynorsk`,
          `Sami et Kven`,
          `Riksmål et Landsmål`,
          `Norvégien et Danois`,
        ],
        correctIndex: 0,
        funFact: `Bokmål et Nynorsk représentent deux traditions linguistiques distinctes préservées dans le pays.`,
      },
      {
        prompt: `Pourquoi certains villages norvégiens installent-ils de grands miroirs dans les montagnes ?`,
        options: [
          `Pour dissuader les ours`,
          `Pour faire briller des œuvres d'art`,
          `Pour réfléchir la lumière du soleil vers les vallées sombres en hiver`,
          `Pour guider les drones de secours`,
        ],
        correctIndex: 2,
        funFact: `Exemple célèbre : Rjukan, qui reçoit très peu de lumière directe en hiver.`,
      },
      {
        prompt: `Qu'est-ce que l'ostehøvel ?`,
        options: [
          `Un coupe-lait`,
          `Une râpe à fromage rotative`,
          `Une tranchette à fromage`,
          `Un couteau à double lame`,
        ],
        correctIndex: 2,
        funFact: `Inventée par le menuisier Thor Bjørklund en 1925, la tranchette à fromage (ostehøvel) est devenue célèbre dans le monde entier. Le métier de menuisier était alors très valorisé.`,
      },
      {
        prompt: `Que signifie « Jotunheimen » ?`,
        options: [
          `Le royaume des géants`,
          `La demeure des esprits du vent`,
          `La terre des mille sommets`,
          `Le pays du soleil caché`,
        ],
        correctIndex: 0,
        funFact: `Le nom vient de la mythologie nordique et signifie littéralement « la maison des géants ».`,
      },
      {
        prompt: `Quelle est cette célèbre prison norvégienne ouverte sur un îlot où les détenus cultivent et soignent des animaux ?`,
        options: [`Halden`, `Bastøy`, `Ringerike`, `Vardø`],
        correctIndex: 1,
        funFact: `Bastøy est une prison écologique où les détenus vivent en semi-liberté et ont un taux de récidive très faible.`,
      },
      {
        prompt: `Quelle créature fantastique est très présente dans le folklore norvégien ?`,
        options: [`Le centaure`, `Le troll`, `La sirène`, `Le dragon chinois`],
        correctIndex: 1,
        funFact: `Les trolls sont souvent décrits comme grands et maladroits, vivant dans les montagnes ou les forêts.`,
      },
      {
        prompt: `Quelle célèbre région française doit son nom aux Vikings ?`,
        options: [`Bretagne`, `Normandie`, `Alsace`, `Picardie`],
        correctIndex: 1,
        funFact: `Les Vikings s'y sont installés au IXe siècle et ont laissé une forte influence culturelle et linguistique.`,
      },
      {
        prompt: `Vrai ou faux : les Vikings valorisaient particulièrement le métier de timonier et de charpentier.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Le timonier et le charpentier étaient des métiers essentiels pour construire des navires et assurer les expéditions.`,
      },
      {
        prompt: `Qu'est-ce qu'un drakkar ?`,
        options: [
          `Un type de casque viking`,
          `Un bateau viking long et rapide`,
          `Une épée viking`,
          `Une maison viking traditionnelle`,
        ],
        correctIndex: 1,
        funFact: `Le drakkar était un navire long et rapide utilisé pour le commerce et les raids. Le charpentier y jouait un rôle central, d'où l'importance de ce métier.`,
      },
    ],
  },
  {
    key: "sweden",
    name: "Suède",
    emoji: "🇸🇪",
    accent: "sweden",
    questions: [
      {
        prompt: `Qu'est-ce que le « fika » ?`,
        options: [
          `Un plat traditionnel à base de hareng`,
          `Une pause café rituelle, toujours partagée`,
          `Une danse folklorique du Nord`,
          `Un jour férié national`,
        ],
        correctIndex: 1,
        funFact: `Le fika est une pause café-pâtisserie sacrée en Suède, prise avec des collègues ou des proches. Beaucoup d'entreprises ont une salle dédiée au fika.`,
      },
      {
        prompt: `Qu'est-ce que le « Systembolaget » ?`,
        options: [
          `Une chaîne de magasins de meubles`,
          `Le monopole d'État sur la vente d'alcool fort`,
          `Un système de tri des déchets`,
          `Une compagnie ferroviaire nationale`,
        ],
        correctIndex: 1,
        funFact: `Seul Systembolaget peut vendre des boissons de plus de 3,5 % d'alcool à emporter. L'objectif est de limiter les effets nocifs de l'alcool.`,
      },
      {
        prompt: `Qu'est-ce que l'« Allemansrätten » ?`,
        options: [
          `Le droit de vote à 16 ans`,
          `Le droit d'accès à la nature, même privée, pour se promener ou camper`,
          `Le droit de pêcher sans permis`,
          `Le droit de couper du bois en forêt publique`,
        ],
        correctIndex: 1,
        funFact: `Ce « droit de tous » permet à quiconque de se promener, cueillir des baies ou camper une nuit sur un terrain privé, tant qu'on respecte les lieux.`,
      },
      {
        prompt: `Qu'est-ce que le « surströmming » ?`,
        options: [
          `Un dessert à la cannelle`,
          `Du hareng fermenté à l'odeur redoutée`,
          `Un ragoût de renne`,
          `Une soupe de poisson fumé`,
        ],
        correctIndex: 1,
        funFact: `Ce hareng fermenté en boîte est si odorant qu'il est souvent ouvert et mangé en extérieur. Certaines compagnies aériennes l'ont même interdit en cabine.`,
      },
      {
        prompt: `Pourquoi Sainte-Lucie est-elle fêtée chaque 13 décembre en Suède ?`,
        options: [
          `Pour célébrer la fin des récoltes`,
          `En l'honneur d'une sainte qui se serait arraché les yeux pour repousser un prétendant`,
          `Pour marquer le solstice d'hiver viking`,
          `En mémoire d'une reine suédoise`,
        ],
        correctIndex: 1,
        funFact: `Malgré cette origine sombre, la fête est aujourd'hui joyeuse : enfants en robes blanches et couronnes de bougies défilent en chantant.`,
      },
      {
        prompt: `Que fête-t-on lors d'une « kräftskiva » ?`,
        options: [
          `La récolte du blé`,
          `Le début de l'été avec des écrevisses, chapeaux pointus et chansons à boire`,
          `La Saint-Valentin suédoise`,
          `Le nouvel an lapon`,
        ],
        correctIndex: 1,
        funFact: `Cette fête estivale rassemble familles et amis autour d'écrevisses, sous des lanternes en papier en forme de lune, avec beaucoup d'aquavit.`,
      },
      {
        prompt: `Quel groupe suédois a remporté l'Eurovision 1974 avec « Waterloo » ?`,
        options: [`Roxette`, `Ace of Base`, `ABBA`, `Europe`],
        correctIndex: 2,
        funFact: `Ce succès a lancé la carrière mondiale d'ABBA et fait de la Suède l'un des pays les plus titrés de l'Eurovision.`,
      },
      {
        prompt: `Pourquoi existe-t-il un prix Nobel ?`,
        options: [
          `Un roi suédois voulait récompenser les artistes`,
          `Alfred Nobel, inventeur de la dynamite, a voulu racheter son image après sa mort`,
          `Un concours entre universités scandinaves`,
          `Une tradition héritée des Vikings`,
        ],
        correctIndex: 1,
        funFact: `Nobel aurait été bouleversé de lire sa propre nécrologie (publiée par erreur), le présentant comme un « marchand de mort ». Il a alors légué sa fortune pour créer le prix.`,
      },
      {
        prompt: `D'où viennent les noms des meubles IKEA (comme « Billy » ou « Klippan ») ?`,
        options: [
          `Des prénoms des employés du siège`,
          `De noms de lieux et de mots suédois, selon un système précis par catégorie`,
          `D'un générateur aléatoire`,
          `Des noms de designers célèbres`,
        ],
        correctIndex: 1,
        funFact: `Le fondateur Ingvar Kamprad, dyslexique, a instauré ce système : les canapés portent des noms de lieux suédois, les tapis des noms danois, etc.`,
      },
      {
        prompt: `Vrai ou faux : le jeu vidéo Minecraft a été créé par un développeur suédois.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Markus Persson, alias « Notch », a créé Minecraft, l'un des jeux les plus vendus au monde.`,
      },
      {
        prompt: `Qu'est-ce que la « döstädning » ?`,
        options: [
          `Un grand nettoyage de printemps`,
          `Le « nettoyage de la mort », qui consiste à trier ses affaires avant de mourir`,
          `Une tradition de purification avant un mariage`,
          `Un rituel funéraire viking`,
        ],
        correctIndex: 1,
        funFact: `Ce concept, popularisé par un livre suédois à succès, invite à désencombrer sa vie pour ne pas laisser ce fardeau à ses proches.`,
      },
      {
        prompt: `Qui a créé le personnage de Fifi Brindacier (Pippi Långstrump) ?`,
        options: [`Selma Lagerlöf`, `Astrid Lindgren`, `Tove Jansson`, `Henning Mankell`],
        correctIndex: 1,
        funFact: `Cette petite fille rousse, indépendante et extraordinairement forte, est un symbole culturel suédois traduit dans plus de 100 langues.`,
      },
      {
        prompt: `Que s'est-il passé lors du voyage inaugural du navire de guerre Vasa en 1628 ?`,
        options: [
          `Il a traversé l'Atlantique avec succès`,
          `Il a coulé dans le port de Stockholm après moins d'un kilomètre`,
          `Il a découvert une nouvelle île`,
          `Il a été capturé par des pirates`,
        ],
        correctIndex: 1,
        funFact: `Trop instable, le Vasa a chaviré presque immédiatement. Renfloué en 1961, il est aujourd'hui exposé quasi intact dans un musée à Stockholm.`,
      },
      {
        prompt: `Qu'est-ce que l'Icehotel, près de Jukkasjärvi ?`,
        options: [
          `Un hôtel flottant sur un lac gelé`,
          `Un hôtel entièrement reconstruit chaque hiver en glace et en neige`,
          `Un ancien palais royal transformé en musée`,
          `Un train-hôtel qui traverse la Laponie`,
        ],
        correctIndex: 1,
        funFact: `Chambres, lits et même le bar sont sculptés dans la glace. L'hôtel fond au printemps et renaît chaque année.`,
      },
      {
        prompt: `Vrai ou faux : dans les années 1970, la Corée du Nord a commandé environ 1 000 Volvo à la Suède et ne les a jamais entièrement payées.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Une partie de cette dette, contractée en 1974, n'a été réglée qu'en 2023, près de 50 ans plus tard.`,
      },
      {
        prompt: `Que signifie le mot « lagom » ?`,
        options: [
          `Le bonheur simple`,
          `Ni trop, ni trop peu : juste ce qu'il faut`,
          `La solidarité entre voisins`,
          `Le calme après la tempête`,
        ],
        correctIndex: 1,
        funFact: `« Lagom » résume une philosophie suédoise de modération, appliquée à la nourriture, au travail ou à la décoration intérieure.`,
      },
    ],
  },
  {
    key: "denmark",
    name: "Danemark",
    emoji: "🇩🇰",
    accent: "denmark",
    questions: [
      {
        prompt: `Que signifie le mot danois « hygge » ?`,
        options: [
          `Un plat traditionnel à base de porc`,
          `Une ambiance chaleureuse et réconfortante, entre amis ou en solo`,
          `Une fête du solstice d'été`,
          `Un vêtement traditionnel`,
        ],
        correctIndex: 1,
        funFact: `Bougies, plaids et boissons chaudes font partie du « hygge », un art de vivre danois exporté dans le monde entier.`,
      },
      {
        prompt: `D'où vient le nom LEGO ?`,
        options: [
          `Du nom de son inventeur, Leo Gordon`,
          `De la contraction de « leg godt », qui signifie « joue bien » en danois`,
          `D'un mot latin signifiant « je construis »`,
          `D'une ville danoise`,
        ],
        correctIndex: 1,
        funFact: `LEGO a été fondé en 1949 par Ole Kirk Christiansen dans la ville de Billund, où se trouve toujours le siège de l'entreprise.`,
      },
      {
        prompt: `Qu'est-ce que la statue de la Petite Sirène à Copenhague a en commun avec de nombreux vandales au fil des décennies ?`,
        options: [
          `Elle a souvent été repeinte en rose`,
          `Elle a été décapitée et endommagée à plusieurs reprises`,
          `Elle a été volée puis retrouvée en Norvège`,
          `Elle a été remplacée par une réplique en plastique`,
        ],
        correctIndex: 1,
        funFact: `Inspirée du conte de Hans Christian Andersen, cette statue a subi plusieurs actes de vandalisme depuis son inauguration en 1913, dont deux décapitations.`,
      },
      {
        prompt: `Pourquoi le drapeau danois, le Dannebrog, est-il célèbre ?`,
        options: [
          `C'est le plus grand drapeau du monde`,
          `C'est le plus vieux drapeau national encore utilisé, selon la légende tombé du ciel en 1219`,
          `C'est le seul drapeau sans couleur rouge`,
          `Il a été dessiné par un roi suédois`,
        ],
        correctIndex: 1,
        funFact: `La légende raconte qu'il serait tombé du ciel pendant une bataille en Estonie pour donner courage aux troupes danoises.`,
      },
      {
        prompt: `Vrai ou faux : au Danemark, il y a plus de vélos que de voitures par habitant.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Seulement 4 Danois sur 10 possèdent une voiture, contre 9 sur 10 qui possèdent un vélo. À Copenhague, on pédale collectivement l'équivalent de 35 tours du monde chaque jour.`,
      },
      {
        prompt: `Que doivent faire les parents danois s'ils veulent donner à leur enfant un prénom qui ne figure pas sur la liste officielle ?`,
        options: [
          `Payer une taxe supplémentaire`,
          `Demander une autorisation spéciale`,
          `Attendre les 18 ans de l'enfant pour changer le prénom`,
          `C'est tout simplement interdit`,
        ],
        correctIndex: 1,
        funFact: `Environ 7 000 prénoms sont pré-approuvés au Danemark. Pour tout autre choix, il faut une autorisation officielle.`,
      },
      {
        prompt: `Vrai ou faux : au Danemark, il est légal de brûler le drapeau danois, mais illégal de brûler un drapeau étranger.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Cette particularité juridique surprend souvent les visiteurs, habitués à l'inverse dans la plupart des pays.`,
      },
      {
        prompt: `Qu'est-ce que le « smørrebrød » ?`,
        options: [
          `Une pâtisserie à la cannelle`,
          `Une tartine ouverte généreusement garnie`,
          `Une soupe de poisson`,
          `Un pain sans gluten traditionnel`,
        ],
        correctIndex: 1,
        funFact: `Ce plat emblématique se compose d'une tranche de pain de seigle recouverte de garnitures comme le hareng, les crevettes ou le fromage.`,
      },
      {
        prompt: `Quel parc d'attractions de Copenhague, ouvert en 1843, aurait inspiré Walt Disney ?`,
        options: [`Bakken`, `Tivoli Gardens`, `Legoland`, `Djurs Sommerland`],
        correctIndex: 1,
        funFact: `Walt Disney aurait visité Tivoli avant de concevoir Disneyland, séduit par son atmosphère féerique et ses jardins soignés.`,
      },
      {
        prompt: `Qui a écrit « La Petite Sirène » et « La Petite Fille aux allumettes » ?`,
        options: [`Hans Christian Andersen`, `Karen Blixen`, `Søren Kierkegaard`, `Peter Høeg`],
        correctIndex: 0,
        funFact: `Andersen est l'un des conteurs les plus traduits au monde ; ses contes ont profondément marqué l'imaginaire danois.`,
      },
      {
        prompt: `Qu'est-ce que Christiania, à Copenhague ?`,
        options: [
          `Un quartier d'affaires ultramoderne`,
          `Une « ville libre » autogérée depuis 1971, avec ses propres règles`,
          `Un ancien palais royal`,
          `Un village de pêcheurs traditionnel`,
        ],
        correctIndex: 1,
        funFact: `Installée dans une ancienne caserne militaire, cette communauté autogérée est devenue une attraction touristique à part entière.`,
      },
      {
        prompt: `Le Groenland et les îles Féroé font partie de quel ensemble politique ?`,
        options: [
          `Ils sont indépendants depuis 1950`,
          `Ils font partie du Royaume du Danemark, avec une large autonomie`,
          `Ils appartiennent à la Norvège`,
          `Ils sont sous tutelle de l'Union européenne`,
        ],
        correctIndex: 1,
        funFact: `Ces territoires disposent de leur propre gouvernement et parlement, mais restent rattachés à la couronne danoise pour la défense et les affaires étrangères.`,
      },
      {
        prompt: `Qu'ont en commun la technologie Bluetooth et le roi viking Harald à la Dent Bleue (Harald Blåtand) ?`,
        options: [
          `Rien, c'est une coïncidence`,
          `Le logo Bluetooth combine les runes de ses initiales, et le nom lui rend hommage`,
          `Il aurait inventé un système de communication par pierres runiques`,
          `Bluetooth porte le nom de son royaume`,
        ],
        correctIndex: 1,
        funFact: `Harald Blåtand a unifié le Danemark et une partie de la Norvège au Xe siècle, tout comme Bluetooth unifie différents appareils. Le logo est la fusion de ses initiales en runes.`,
      },
      {
        prompt: `Que fait-on traditionnellement lors du « Fastelavn » en février ?`,
        options: [
          `On allume des bougies dans chaque fenêtre`,
          `On frappe un tonneau décoré d'un chat jusqu'à ce qu'il se brise`,
          `On saute par-dessus un feu de joie`,
          `On offre des œufs peints aux voisins`,
        ],
        correctIndex: 1,
        funFact: `À l'origine, un vrai chat était enfermé dans le tonneau ; aujourd'hui, seule une image de chat orne le tonneau, rempli de bonbons.`,
      },
      {
        prompt: `Vrai ou faux : le Danemark figure très régulièrement parmi les pays les plus heureux du monde selon le World Happiness Report.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Les Danois ont même un mot pour la satisfaction au travail : « arbejdsglæde », littéralement « la joie du travail ».`,
      },
    ],
  },
  {
    key: "bonus",
    name: "Bonus Scandinavie",
    emoji: "🌌",
    accent: "bonus",
    questions: [
      {
        prompt: `Qu'ont en commun les drapeaux de la Norvège, de la Suède, du Danemark et de la Finlande ?`,
        options: [
          `Ils ont tous trois couleurs`,
          `Ils portent tous une croix scandinave décentrée vers la hampe`,
          `Ils ont tous une étoile centrale`,
          `Ils utilisent tous le bleu et le blanc`,
        ],
        correctIndex: 1,
        funFact: `Cette croix asymétrique, inspirée du Dannebrog danois, est devenue le symbole commun de toute la région nordique.`,
      },
      {
        prompt: `Qu'est-ce que le « soleil de minuit » ?`,
        options: [
          `Un festival d'été scandinave`,
          `Un phénomène où le soleil ne se couche pas pendant plusieurs semaines en été, au nord du cercle polaire`,
          `Une légende viking sur la fin du monde`,
          `Une fête religieuse célébrée à minuit`,
        ],
        correctIndex: 1,
        funFact: `Dans le grand nord scandinave, le soleil reste visible 24h/24 pendant une partie de l'été, et à l'inverse, disparaît presque totalement en hiver.`,
      },
      {
        prompt: `Qui sont les Samis ?`,
        options: [
          `Une tribu viking disparue`,
          `Le peuple autochtone du nord de la Scandinavie, notamment éleveurs de rennes`,
          `Les habitants des îles Féroé`,
          `Une communauté religieuse minoritaire`,
        ],
        correctIndex: 1,
        funFact: `Les Samis vivent traditionnellement dans le nord de la Norvège, de la Suède, de la Finlande et de la Russie, une région appelée Sápmi.`,
      },
      {
        prompt: `Qu'est-ce que la « loi de Jante » (Janteloven) ?`,
        options: [
          `Une loi sur la protection de la nature`,
          `Un code social informel qui décourage de se croire supérieur aux autres`,
          `Une réglementation sur l'alcool`,
          `Une loi médiévale toujours en vigueur`,
        ],
        correctIndex: 1,
        funFact: `Inventée par l'écrivain Aksel Sandemose en 1933, cette « loi » non écrite résume un trait culturel scandinave : l'humilité collective avant la réussite individuelle.`,
      },
      {
        prompt: `Lequel de ces pays ne fait PAS partie de la Scandinavie au sens strict, bien qu'il soit un pays nordique ?`,
        options: [`Norvège`, `Suède`, `Finlande`, `Danemark`],
        correctIndex: 2,
        funFact: `Au sens strict, la Scandinavie ne compte que trois pays : la Norvège, la Suède et le Danemark, liés par leurs langues nord-germaniques proches. La Finlande (langue finno-ougrienne) et l'Islande font partie des « pays nordiques » (Norden), un ensemble plus large, mais pas de la Scandinavie à proprement parler.`,
      },
      {
        prompt: `Qu'appelle-t-on le « modèle nordique » ?`,
        options: [
          `Un style de décoration minimaliste`,
          `Un système économique et social combinant impôts élevés et forte protection sociale`,
          `Une méthode d'enseignement scolaire`,
          `Un régime alimentaire à base de poisson`,
        ],
        correctIndex: 1,
        funFact: `Ce modèle, partagé par la Norvège, la Suède et le Danemark, associe économie de marché, État providence généreux et fort taux d'emploi.`,
      },
      {
        prompt: `Vrai ou faux : les Vikings ne portaient pas de casques à cornes, contrairement à l'image populaire.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Aucune preuve archéologique ne confirme l'existence de casques à cornes vikings. Cette image vient d'opéras et de costumes du XIXe siècle.`,
      },
      {
        prompt: `Qu'est-ce que l'aurore boréale ?`,
        options: [
          `Un feu d'artifice traditionnel scandinave`,
          `Un phénomène lumineux naturel visible dans le ciel nordique, causé par des particules solaires`,
          `Une légende sur la naissance du monde`,
          `Le nom d'une fête d'hiver`,
        ],
        correctIndex: 1,
        funFact: `Les aurores boréales sont particulièrement visibles en Laponie, en Islande et dans le nord de la Norvège, surtout entre septembre et mars.`,
      },
      {
        prompt: `Quel meuble suédois mondialement connu porte le nom d'un archipel et non d'une ville ?`,
        options: [`Billy`, `Klippan`, `Malm`, `Poäng`],
        correctIndex: 3,
        funFact: `Le système de nommage IKEA suit des règles précises par catégorie de produit (canapés, tapis, fauteuils...), un vrai casse-tête scandinave.`,
      },
      {
        prompt: `Vrai ou faux : la Norvège, la Suède et le Danemark partagent une intelligibilité linguistique partielle, permettant à leurs habitants de se comprendre approximativement à l'oral.`,
        options: [`Vrai`, `Faux`],
        correctIndex: 0,
        funFact: `Le norvégien, le suédois et le danois sont si proches que beaucoup de Scandinaves peuvent suivre une conversation dans une langue voisine sans l'avoir apprise.`,
      },
    ],
  },
];

export const TOTAL_QUESTIONS = ROUNDS.reduce((sum, r) => sum + r.questions.length, 0);

// Snelheids-score: 1000 punten bij een direct antwoord, geleidelijk dalend naar
// een bodem van 500 punten na 20 seconden. Fout antwoord = 0 punten.
export function computePoints(elapsedMs) {
  const seconds = elapsedMs / 1000;
  const points = Math.round(1000 - Math.min(seconds, 20) * 25);
  return Math.max(500, points);
}

export function getQuestion(roundIndex, questionIndex) {
  const round = ROUNDS[roundIndex];
  if (!round) return null;
  return round.questions[questionIndex] || null;
}

export function sanitizeForHost(state) {
  const round = ROUNDS[state.roundIndex];
  const question = round ? round.questions[state.questionIndex] : null;
  const qid = question ? `${state.roundIndex}-${state.questionIndex}` : null;

  const participants = Object.entries(state.participants)
    .map(([id, p]) => ({
      id,
      name: p.name,
      score: p.score,
      hasAnsweredCurrent: qid ? !!p.answers[qid] : false,
    }))
    .sort((a, b) => b.score - a.score);

  return {
    phase: state.phase,
    roundIndex: state.roundIndex,
    roundName: round ? round.name : null,
    roundEmoji: round ? round.emoji : null,
    roundAccent: round ? round.accent : null,
    totalRounds: ROUNDS.length,
    questionIndex: state.questionIndex,
    totalInRound: round ? round.questions.length : 0,
    question: question
      ? {
          prompt: question.prompt,
          options: question.options,
          correctIndex: question.correctIndex,
          funFact: question.funFact,
        }
      : null,
    revealed: state.revealed,
    participants,
    answeredCount: qid ? participants.filter((p) => p.hasAnsweredCurrent).length : 0,
    totalParticipants: participants.length,
  };
}
