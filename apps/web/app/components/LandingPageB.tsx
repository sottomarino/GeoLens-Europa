'use client';

import { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

// "Tempo" in tutte le lingue europee
const timeTranslations = [
  { word: 'TEMPO', lang: 'Italiano' },
  { word: 'TIME', lang: 'English' },
  { word: 'ZEIT', lang: 'Deutsch' },
  { word: 'TEMPS', lang: 'Français' },
  { word: 'TIEMPO', lang: 'Español' },
  { word: 'TEMPO', lang: 'Português' },
  { word: 'TIJD', lang: 'Nederlands' },
  { word: 'CZAS', lang: 'Polski' },
  { word: 'TIMP', lang: 'Română' },
  { word: 'ČAS', lang: 'Čeština' },
  { word: 'IDŐ', lang: 'Magyar' },
  { word: 'ΧΡΟΝΟΣ', lang: 'Ελληνικά' },
  { word: 'TID', lang: 'Svenska' },
  { word: 'TID', lang: 'Dansk' },
  { word: 'AIKA', lang: 'Suomi' },
  { word: 'ČAS', lang: 'Slovenčina' },
  { word: 'ВРЕМЕ', lang: 'Български' },
  { word: 'VRIJEME', lang: 'Hrvatski' },
  { word: 'ČAS', lang: 'Slovenščina' },
  { word: 'AEG', lang: 'Eesti' },
  { word: 'LAIKS', lang: 'Latviešu' },
  { word: 'LAIKAS', lang: 'Lietuvių' },
  { word: 'ŻMIEN', lang: 'Malti' },
  { word: 'AM', lang: 'Gaeilge' },
  { word: 'ЧАС', lang: 'Українська' },
  { word: 'TID', lang: 'Norsk' },
  { word: 'TÍMI', lang: 'Íslenska' },
  { word: 'KOHË', lang: 'Shqip' },
  { word: 'ВРЕМЕ', lang: 'Македонски' },
  { word: 'ВРЕМЕ', lang: 'Српски' },
  { word: 'VRIJEME', lang: 'Bosanski' },
  { word: 'VRIJEME', lang: 'Crnogorski' },
  { word: 'ZAMAN', lang: 'Türkçe' },
  { word: 'ВРЕМЯ', lang: 'Русский' },
];

// Traduzioni per tutte le lingue europee
const translations: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  description2: string;
  feature1: string;
  feature2: string;
  feature3: string;
  button: string;
  water: string;
  landslide: string;
  seismic: string;
  minerals: string;
}> = {
  it: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Piattaforma avanzata di analisi geospaziale per la mappatura del rischio ambientale multi-hazard in Europa',
    description2: 'Dati satellitari in tempo reale da NASA e Copernicus per l\'analisi di',
    feature1: 'Dati NASA in tempo reale',
    feature2: 'Visualizzazione 2D/3D',
    feature3: 'Analisi AI integrata',
    button: 'Esplora la Mappa',
    water: 'rischio idrico',
    landslide: 'frane',
    seismic: 'sismi',
    minerals: 'risorse minerarie',
  },
  en: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Advanced geospatial analysis platform for multi-hazard environmental risk mapping in Europe',
    description2: 'Real-time satellite data from NASA and Copernicus for analysis of',
    feature1: 'Real-time NASA data',
    feature2: '2D/3D Visualization',
    feature3: 'Integrated AI Analysis',
    button: 'Explore the Map',
    water: 'water risk',
    landslide: 'landslides',
    seismic: 'earthquakes',
    minerals: 'mineral resources',
  },
  de: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Fortschrittliche Geodatenplattform zur Kartierung von Umweltrisiken in Europa',
    description2: 'Echtzeit-Satellitendaten von NASA und Copernicus zur Analyse von',
    feature1: 'NASA-Echtzeitdaten',
    feature2: '2D/3D-Visualisierung',
    feature3: 'Integrierte KI-Analyse',
    button: 'Karte erkunden',
    water: 'Wasserrisiko',
    landslide: 'Erdrutschen',
    seismic: 'Erdbeben',
    minerals: 'Bodenschätzen',
  },
  fr: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Plateforme avancée d\'analyse géospatiale pour la cartographie des risques environnementaux en Europe',
    description2: 'Données satellitaires en temps réel de la NASA et Copernicus pour l\'analyse de',
    feature1: 'Données NASA en temps réel',
    feature2: 'Visualisation 2D/3D',
    feature3: 'Analyse IA intégrée',
    button: 'Explorer la Carte',
    water: 'risque hydrique',
    landslide: 'glissements de terrain',
    seismic: 'séismes',
    minerals: 'ressources minérales',
  },
  es: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Plataforma avanzada de análisis geoespacial para el mapeo de riesgos ambientales en Europa',
    description2: 'Datos satelitales en tiempo real de NASA y Copernicus para el análisis de',
    feature1: 'Datos NASA en tiempo real',
    feature2: 'Visualización 2D/3D',
    feature3: 'Análisis IA integrado',
    button: 'Explorar el Mapa',
    water: 'riesgo hídrico',
    landslide: 'deslizamientos',
    seismic: 'sismos',
    minerals: 'recursos minerales',
  },
  pt: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Plataforma avançada de análise geoespacial para mapeamento de riscos ambientais na Europa',
    description2: 'Dados de satélite em tempo real da NASA e Copernicus para análise de',
    feature1: 'Dados NASA em tempo real',
    feature2: 'Visualização 2D/3D',
    feature3: 'Análise IA integrada',
    button: 'Explorar o Mapa',
    water: 'risco hídrico',
    landslide: 'deslizamentos',
    seismic: 'sismos',
    minerals: 'recursos minerais',
  },
  nl: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Geavanceerd geospatiaal analyseplatform voor milieurisico-mapping in Europa',
    description2: 'Real-time satellietgegevens van NASA en Copernicus voor analyse van',
    feature1: 'Real-time NASA-gegevens',
    feature2: '2D/3D-visualisatie',
    feature3: 'Geïntegreerde AI-analyse',
    button: 'Verken de Kaart',
    water: 'waterrisico',
    landslide: 'aardverschuivingen',
    seismic: 'aardbevingen',
    minerals: 'minerale bronnen',
  },
  pl: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Zaawansowana platforma analizy geoprzestrzennej do mapowania zagrożeń środowiskowych w Europie',
    description2: 'Dane satelitarne w czasie rzeczywistym z NASA i Copernicus do analizy',
    feature1: 'Dane NASA w czasie rzeczywistym',
    feature2: 'Wizualizacja 2D/3D',
    feature3: 'Zintegrowana analiza AI',
    button: 'Eksploruj Mapę',
    water: 'zagrożenia wodnego',
    landslide: 'osuwisk',
    seismic: 'trzęsień ziemi',
    minerals: 'zasobów mineralnych',
  },
  ro: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Platformă avansată de analiză geospațială pentru cartografierea riscurilor de mediu în Europa',
    description2: 'Date satelitare în timp real de la NASA și Copernicus pentru analiza',
    feature1: 'Date NASA în timp real',
    feature2: 'Vizualizare 2D/3D',
    feature3: 'Analiză AI integrată',
    button: 'Explorează Harta',
    water: 'riscului hidric',
    landslide: 'alunecărilor de teren',
    seismic: 'seismelor',
    minerals: 'resurselor minerale',
  },
  cs: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Pokročilá platforma pro geoprostorovou analýzu environmentálních rizik v Evropě',
    description2: 'Satelitní data v reálném čase z NASA a Copernicus pro analýzu',
    feature1: 'Data NASA v reálném čase',
    feature2: '2D/3D vizualizace',
    feature3: 'Integrovaná AI analýza',
    button: 'Prozkoumat Mapu',
    water: 'vodního rizika',
    landslide: 'sesuvů půdy',
    seismic: 'zemětřesení',
    minerals: 'nerostných zdrojů',
  },
  hu: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Fejlett térinformatikai elemzési platform az európai környezeti kockázatok feltérképezésére',
    description2: 'Valós idejű műholdas adatok a NASA-tól és a Copernicustól az elemzéshez',
    feature1: 'Valós idejű NASA adatok',
    feature2: '2D/3D vizualizáció',
    feature3: 'Integrált AI elemzés',
    button: 'Térkép Felfedezése',
    water: 'vízkockázat',
    landslide: 'földcsuszamlások',
    seismic: 'földrengések',
    minerals: 'ásványi források',
  },
  el: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Προηγμένη πλατφόρμα γεωχωρικής ανάλυσης για χαρτογράφηση περιβαλλοντικών κινδύνων στην Ευρώπη',
    description2: 'Δορυφορικά δεδομένα σε πραγματικό χρόνο από NASA και Copernicus για ανάλυση',
    feature1: 'Δεδομένα NASA σε πραγματικό χρόνο',
    feature2: 'Οπτικοποίηση 2D/3D',
    feature3: 'Ενσωματωμένη ανάλυση AI',
    button: 'Εξερεύνηση Χάρτη',
    water: 'υδάτινου κινδύνου',
    landslide: 'κατολισθήσεων',
    seismic: 'σεισμών',
    minerals: 'ορυκτών πόρων',
  },
  sv: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Avancerad geospatial analysplattform för miljöriskkartläggning i Europa',
    description2: 'Realtidssatellitdata från NASA och Copernicus för analys av',
    feature1: 'NASA-data i realtid',
    feature2: '2D/3D-visualisering',
    feature3: 'Integrerad AI-analys',
    button: 'Utforska Kartan',
    water: 'vattenrisk',
    landslide: 'jordskred',
    seismic: 'jordbävningar',
    minerals: 'mineralresurser',
  },
  da: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Avanceret geospatial analyseplatform til miljørisikokortlægning i Europa',
    description2: 'Realtidssatellitdata fra NASA og Copernicus til analyse af',
    feature1: 'NASA-data i realtid',
    feature2: '2D/3D-visualisering',
    feature3: 'Integreret AI-analyse',
    button: 'Udforsk Kortet',
    water: 'vandrisiko',
    landslide: 'jordskred',
    seismic: 'jordskælv',
    minerals: 'mineralressourcer',
  },
  fi: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Edistynyt paikkatietoanalyysialusta ympäristöriskien kartoittamiseen Euroopassa',
    description2: 'Reaaliaikainen satelliittidata NASA:lta ja Copernicukselta analyysiin',
    feature1: 'NASA:n reaaliaikainen data',
    feature2: '2D/3D-visualisointi',
    feature3: 'Integroitu tekoälyanalyysi',
    button: 'Tutustu Karttaan',
    water: 'vesiriskin',
    landslide: 'maanvyörymien',
    seismic: 'maanjäristysten',
    minerals: 'mineraalivarojen',
  },
  sk: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Pokročilá platforma pre geopriestorovú analýzu environmentálnych rizík v Európe',
    description2: 'Satelitné údaje v reálnom čase z NASA a Copernicus pre analýzu',
    feature1: 'Údaje NASA v reálnom čase',
    feature2: '2D/3D vizualizácia',
    feature3: 'Integrovaná AI analýza',
    button: 'Preskúmať Mapu',
    water: 'vodného rizika',
    landslide: 'zosuvov pôdy',
    seismic: 'zemetrasení',
    minerals: 'nerastných zdrojov',
  },
  bg: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Напреднала геопространствена платформа за картографиране на екологични рискове в Европа',
    description2: 'Сателитни данни в реално време от NASA и Copernicus за анализ на',
    feature1: 'Данни от NASA в реално време',
    feature2: '2D/3D визуализация',
    feature3: 'Интегриран AI анализ',
    button: 'Разгледай Картата',
    water: 'воден риск',
    landslide: 'свлачища',
    seismic: 'земетресения',
    minerals: 'минерални ресурси',
  },
  hr: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Napredna geoprostorna platforma za kartiranje okolišnih rizika u Europi',
    description2: 'Satelitski podaci u stvarnom vremenu iz NASA-e i Copernicusa za analizu',
    feature1: 'NASA podaci u stvarnom vremenu',
    feature2: '2D/3D vizualizacija',
    feature3: 'Integrirana AI analiza',
    button: 'Istraži Kartu',
    water: 'vodnog rizika',
    landslide: 'klizišta',
    seismic: 'potresa',
    minerals: 'mineralnih resursa',
  },
  sl: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Napredna geoprostorska platforma za kartiranje okoljskih tveganj v Evropi',
    description2: 'Satelitski podatki v realnem času iz NASA in Copernicus za analizo',
    feature1: 'NASA podatki v realnem času',
    feature2: '2D/3D vizualizacija',
    feature3: 'Integrirana AI analiza',
    button: 'Razišči Zemljevid',
    water: 'vodnega tveganja',
    landslide: 'plazov',
    seismic: 'potresov',
    minerals: 'mineralnih virov',
  },
  et: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Täiustatud georuumiline analüüsiplatvorm keskkonnariskide kaardistamiseks Euroopas',
    description2: 'Reaalajas satelliidiandmed NASA-lt ja Copernicuselt analüüsiks',
    feature1: 'NASA reaalajas andmed',
    feature2: '2D/3D visualiseerimine',
    feature3: 'Integreeritud AI analüüs',
    button: 'Avasta Kaarti',
    water: 'veeriski',
    landslide: 'maalihet',
    seismic: 'maavärinaid',
    minerals: 'maavarasid',
  },
  lv: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Moderna ģeotelpiskās analīzes platforma vides risku kartēšanai Eiropā',
    description2: 'Reāllaika satelītu dati no NASA un Copernicus analīzei',
    feature1: 'NASA reāllaika dati',
    feature2: '2D/3D vizualizācija',
    feature3: 'Integrēta AI analīze',
    button: 'Izpētīt Karti',
    water: 'ūdens riska',
    landslide: 'nogruvumu',
    seismic: 'zemestrīču',
    minerals: 'minerālu resursu',
  },
  lt: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Pažangi geoerdvinė analizės platforma aplinkos rizikos kartografavimui Europoje',
    description2: 'Realaus laiko palydoviniai duomenys iš NASA ir Copernicus analizei',
    feature1: 'NASA realaus laiko duomenys',
    feature2: '2D/3D vizualizacija',
    feature3: 'Integruota AI analizė',
    button: 'Tyrinėti Žemėlapį',
    water: 'vandens rizikos',
    landslide: 'nuošliaužų',
    seismic: 'žemės drebėjimų',
    minerals: 'mineralinių išteklių',
  },
  mt: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Pjattaforma avvanzata ta\' analiżi ġeospazjali għall-mappatura tar-riskji ambjentali fl-Ewropa',
    description2: 'Dejta tas-satellita f\'ħin reali minn NASA u Copernicus għall-analiżi ta\'',
    feature1: 'Dejta NASA f\'ħin reali',
    feature2: 'Viżwalizzazzjoni 2D/3D',
    feature3: 'Analiżi AI integrata',
    button: 'Esplora l-Mappa',
    water: 'riskju tal-ilma',
    landslide: 'waqgħat tal-art',
    seismic: 'terremoti',
    minerals: 'riżorsi minerali',
  },
  ga: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Ardán anailíse geospásúla chun riosca comhshaoil a mhapáil san Eoraip',
    description2: 'Sonraí satailíte fíor-ama ó NASA agus Copernicus le haghaidh anailíse ar',
    feature1: 'Sonraí NASA fíor-ama',
    feature2: 'Léirshamhlú 2D/3D',
    feature3: 'Anailís AI comhtháite',
    button: 'Déan Iniúchadh ar an Léarscáil',
    water: 'riosca uisce',
    landslide: 'sciorrthaí talún',
    seismic: 'creathanna talún',
    minerals: 'acmhainní mianraí',
  },
  uk: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Передова геопросторова платформа для картографування екологічних ризиків у Європі',
    description2: 'Супутникові дані в реальному часі від NASA та Copernicus для аналізу',
    feature1: 'Дані NASA в реальному часі',
    feature2: '2D/3D візуалізація',
    feature3: 'Інтегрований AI аналіз',
    button: 'Дослідити Карту',
    water: 'водного ризику',
    landslide: 'зсувів',
    seismic: 'землетрусів',
    minerals: 'мінеральних ресурсів',
  },
  no: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Avansert geospatial analyseplattform for miljørisikokartlegging i Europa',
    description2: 'Sanntids satellittdata fra NASA og Copernicus for analyse av',
    feature1: 'NASA-data i sanntid',
    feature2: '2D/3D-visualisering',
    feature3: 'Integrert AI-analyse',
    button: 'Utforsk Kartet',
    water: 'vannrisiko',
    landslide: 'jordskred',
    seismic: 'jordskjelv',
    minerals: 'mineralressurser',
  },
  is: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Háþróaður landupplýsingavettvangur til kortlagningar umhverfisáhættu í Evrópu',
    description2: 'Rauntíma gervihnattagögn frá NASA og Copernicus til greiningar á',
    feature1: 'NASA gögn í rauntíma',
    feature2: '2D/3D sjónræn framsetning',
    feature3: 'Samþætt gervigreindargreining',
    button: 'Skoða Kortið',
    water: 'vatnsáhættu',
    landslide: 'skriðuföllum',
    seismic: 'jarðskjálftum',
    minerals: 'jarðefnaauðlindum',
  },
  sq: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Platformë e avancuar e analizës gjeohapësinore për hartimin e rreziqeve mjedisore në Evropë',
    description2: 'Të dhëna satelitore në kohë reale nga NASA dhe Copernicus për analizën e',
    feature1: 'Të dhëna NASA në kohë reale',
    feature2: 'Vizualizim 2D/3D',
    feature3: 'Analizë AI e integruar',
    button: 'Eksploro Hartën',
    water: 'rrezikut ujor',
    landslide: 'rrëshqitjeve',
    seismic: 'tërmeteve',
    minerals: 'burimeve minerale',
  },
  mk: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Напредна геопросторна платформа за мапирање на еколошки ризици во Европа',
    description2: 'Сателитски податоци во реално време од NASA и Copernicus за анализа на',
    feature1: 'NASA податоци во реално време',
    feature2: '2D/3D визуелизација',
    feature3: 'Интегрирана AI анализа',
    button: 'Истражи ја Картата',
    water: 'воден ризик',
    landslide: 'свлечишта',
    seismic: 'земјотреси',
    minerals: 'минерални ресурси',
  },
  sr: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Напредна геопросторна платформа за мапирање еколошких ризика у Европи',
    description2: 'Сателитски подаци у реалном времену од NASA и Copernicus за анализу',
    feature1: 'NASA подаци у реалном времену',
    feature2: '2D/3D визуелизација',
    feature3: 'Интегрисана AI анализа',
    button: 'Истражи Карту',
    water: 'водног ризика',
    landslide: 'клизишта',
    seismic: 'земљотреса',
    minerals: 'минералних ресурса',
  },
  bs: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Napredna geoprostorna platforma za kartiranje okolišnih rizika u Evropi',
    description2: 'Satelitski podaci u realnom vremenu iz NASA i Copernicus za analizu',
    feature1: 'NASA podaci u realnom vremenu',
    feature2: '2D/3D vizualizacija',
    feature3: 'Integrirana AI analiza',
    button: 'Istraži Kartu',
    water: 'vodnog rizika',
    landslide: 'klizišta',
    seismic: 'potresa',
    minerals: 'mineralnih resursa',
  },
  me: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Napredna geoprostorna platforma za mapiranje ekoloških rizika u Evropi',
    description2: 'Satelitski podaci u realnom vremenu iz NASA i Copernicus za analizu',
    feature1: 'NASA podaci u realnom vremenu',
    feature2: '2D/3D vizualizacija',
    feature3: 'Integrisana AI analiza',
    button: 'Istraži Kartu',
    water: 'vodnog rizika',
    landslide: 'klizišta',
    seismic: 'potresa',
    minerals: 'mineralnih resursa',
  },
  tr: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Avrupa\'da çevresel risk haritalama için gelişmiş coğrafi analiz platformu',
    description2: 'NASA ve Copernicus\'tan gerçek zamanlı uydu verileri ile analiz',
    feature1: 'Gerçek zamanlı NASA verileri',
    feature2: '2D/3D görselleştirme',
    feature3: 'Entegre AI analizi',
    button: 'Haritayı Keşfet',
    water: 'su riski',
    landslide: 'heyelanlar',
    seismic: 'depremler',
    minerals: 'mineral kaynakları',
  },
  ru: {
    title: 'GEOLENS',
    subtitle: 'EUROPA',
    description: 'Передовая геопространственная платформа для картирования экологических рисков в Европе',
    description2: 'Спутниковые данные в реальном времени от NASA и Copernicus для анализа',
    feature1: 'Данные NASA в реальном времени',
    feature2: '2D/3D визуализация',
    feature3: 'Интегрированный AI анализ',
    button: 'Исследовать Карту',
    water: 'водного риска',
    landslide: 'оползней',
    seismic: 'землетрясений',
    minerals: 'минеральных ресурсов',
  },
};

const languages = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'mt', name: 'Malti', flag: '🇲🇹' },
  { code: 'ga', name: 'Gaeilge', flag: '🇮🇪' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'is', name: 'Íslenska', flag: '🇮🇸' },
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
  { code: 'me', name: 'Crnogorski', flag: '🇲🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export default function LandingPageB({ onEnter }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [timeIndex, setTimeIndex] = useState(0);
  const [isTimeChanging, setIsTimeChanging] = useState(false);

  const t = translations[currentLang];
  const currentTime = timeTranslations[timeIndex];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Rotazione automatica della parola "tempo"
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTimeChanging(true);
      setTimeout(() => {
        setTimeIndex((prev) => (prev + 1) % timeTranslations.length);
        setIsTimeChanging(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);


  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.5)' }}
      >
        <source
          src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Language Selector - Top Right - Minimal Style */}
      <div className="absolute top-6 right-6 z-60">
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-1 px-3 py-1 text-white/70 hover:text-white transition-all"
          >
            <span className="text-xs font-light tracking-wide">{currentLanguage.name}</span>
            <svg
              className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isLangMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 max-h-80 overflow-y-auto bg-black border border-white">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm font-light tracking-wide transition-all ${
                    currentLang === lang.code
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Logo / Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.3em] mb-4 text-white">
            GEOLENS
          </h1>
          <div className="h-px w-32 mx-auto bg-white/70" />
        </div>

        {/* Subtitle - Rotating "Time" in European languages */}
        <div className="mb-6">
          <h2
            className={`text-2xl md:text-4xl font-light tracking-wide text-white transition-all duration-300 ${
              isTimeChanging ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
            }`}
          >
            {currentTime.word}
          </h2>
          <p
            className={`text-xs text-white/50 font-light tracking-widest mt-1 transition-all duration-300 ${
              isTimeChanging ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentTime.lang}
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed font-light text-white">
          {t.description}
        </p>

        <p className="text-base md:text-lg max-w-2xl mx-auto mb-12 text-white/80 font-light">
          {t.description2} {t.water}, {t.landslide}, {t.seismic} e {t.minerals}
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base">
          <div className="flex items-center gap-2 border border-white/50 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white">{t.feature1}</span>
          </div>
          <div className="flex items-center gap-2 border border-white/50 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white">{t.feature2}</span>
          </div>
          <div className="flex items-center gap-2 border border-white/50 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white">{t.feature3}</span>
          </div>
        </div>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className="group relative px-12 py-4 text-lg font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 bg-white text-black rounded-full hover:bg-black hover:text-white border-2 border-white"
        >
          <span className="flex items-center gap-3">
            {t.button}
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Beta Notice */}
        <p className="mt-6 text-white/50 text-xs font-light tracking-wide uppercase">
          Beta Version — Under Development
        </p>

      </div>

      {/* Footer - UnityLoop */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <a
          href="https://www.unityloop.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors text-sm font-light tracking-wider"
        >
          unityloop.ai
        </a>
        <p className="text-white/50 text-xs font-light tracking-wide mt-1">
          Artificial Intelligence Laboratory
        </p>
      </div>
    </div>
  );
}
