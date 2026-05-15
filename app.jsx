const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   DATA
   ========================================================= */

const OFFERS = [
  {
    num: "01",
    title: "Itinéraire sur mesure",
    text: "Chaque voyage est pensé à partir de qui vous êtes. Vos envies, votre rythme, vos rêves de loin — tout est écouté, rien n'est imposé.",
    more: "Découvrir la méthode",
  },
  {
    num: "02",
    title: "Voyage lent & immersif",
    text: "Prendre le temps de sentir un lieu, d'y revenir le matin, de s'y perdre sans carte. Le voyage lent est celui qui laisse une empreinte.",
    more: "Notre philosophie",
  },
  {
    num: "03",
    title: "Expériences authentiques",
    text: "Rencontres locales, tables cachées, chemins oubliés. Ce qui ne se trouve pas dans les guides, mais dans les conversations.",
    more: "Exemples d'expériences",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "On échange",
    text: "Vous me racontez vos envies, votre rythme, ce qui vous fait vibrer. Je pose des questions, j'écoute entre les lignes.",
    duration: "1h · gratuit",
  },
  {
    num: "02",
    title: "Je compose",
    text: "Je crée un itinéraire sur mesure : lieux, hébergements, expériences. Chaque détail est pensé pour vous.",
    duration: "2 à 4 semaines",
  },
  {
    num: "03",
    title: "Vous partez",
    text: "Vous recevez votre carnet de voyage complet. Il ne vous reste qu'à vivre ; je reste disponible pendant tout le séjour.",
    duration: "pendant tout le voyage",
  },
];

const DESTINATIONS = [
  {
    id: "norvege",
    name: "Norvège",
    mood: "Fjords & silences",
    desc: "Des fjords qui tranchent la lumière du nord, des villages accrochés aux falaises, le silence profond des forêts de bouleaux. Un voyage pour ceux qui cherchent le vertige tranquille des grands espaces.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&q=80",
    best: "Mai — Septembre",
    pace: "Lent · 10-14 jours",
    x: 20.6, y: 14.3,
  },
  {
    id: "islande",
    name: "Islande",
    mood: "Feu & glace",
    desc: "Là où la terre respire encore. Geysers, cascades, plages noires, sources chaudes au crépuscule. Un pays brut qui se vit plus qu'il ne se visite.",
    image: "https://images.unsplash.com/photo-1539693052499-ab9a1708d4e6?w=1200&q=80",
    best: "Juin — Août",
    pace: "Itinérant · 8-12 jours",
    x: 3.5, y: 9.5,
  },
  {
    id: "ecosse",
    name: "Écosse",
    mood: "Lochs & légendes",
    desc: "Les Highlands, les îles Hébrides, la brume qui monte sur les lochs au petit matin. Des châteaux oubliés, des whiskies qui réchauffent, et une mélancolie douce qui s'attarde.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80",
    best: "Mai — Octobre",
    pace: "Contemplatif · 7-10 jours",
    x: 12.9, y: 19.1,
  },
  {
    id: "portugal",
    name: "Portugal",
    mood: "Lumière & océan",
    desc: "Les azulejos de Lisbonne, les vignes du Douro, les plages sauvages de l'Alentejo. Un pays qui se déguste lentement, au rythme des tables en terrasse et des couchers de soleil sur l'Atlantique.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
    best: "Avril — Octobre",
    pace: "Lent · 9-12 jours",
    x: 9.4, y: 40.6,
  },
  {
    id: "grece",
    name: "Grèce",
    mood: "Îles & oliviers",
    desc: "Au-delà des cartes postales : les Cyclades hors saison, les villages de montagne du Péloponnèse, les tavernes de pêcheurs. Le bleu, l'olivier, la lenteur qui s'installe après le deuxième café.",
    image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80",
    best: "Mai — Octobre",
    pace: "Insulaire · 10-15 jours",
    x: 28.8, y: 40.6,
  },
  {
    id: "japon",
    name: "Japon",
    mood: "Silence & ritualité",
    desc: "Les ruelles de Kyoto au petit matin, les onsen de montagne, les auberges familiales. Un voyage où chaque geste a un sens, où la lenteur est un art.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=80",
    best: "Mars-Mai, Oct-Nov",
    pace: "Immersif · 14-18 jours",
    x: 96.5, y: 44.2,
  },
];

const PRICING = [
  {
    name: "La Boussole",
    price: "35€",
    priceSub: "forfait",
    tag: "Regard & conseils",
    desc: "Vous avez déjà votre itinéraire, mais vous voulez partir l'esprit léger. Je pose mon regard sur votre plan.",
    services: ["Relecture de votre itinéraire", "Conseils et ajustements", "Bonnes adresses partagées"],
    highlight: false,
  },
  {
    name: "L'Esquisse",
    price: "50€",
    priceSub: "par jour",
    tag: "4 pers. · 9 j · 2 étapes",
    desc: "Je compose votre voyage de A à Z — transports, hébergements, activités — et vous remets un carnet digital soigné.",
    services: ["Recherche transports", "2–3 hébergements proposés", "Activités & visites", "Carnet digital", "Joignable pendant le voyage"],
    highlight: false,
  },
  {
    name: "L'Épopée",
    price: "65€",
    priceSub: "par jour",
    tag: "4 pers. · 15 j · multi-étapes",
    desc: "Pour les voyages qui s'étirent et se déploient en plusieurs chapitres. J'orchestre chaque étape avec soin.",
    services: ["Recherche transports", "2 hébergements par étape", "Activités & visites", "Carnet digital", "Joignable pendant le voyage"],
    highlight: true,
  },
  {
    name: "Carte Blanche",
    price: "Sur devis",
    priceSub: "",
    tag: "Entièrement personnalisé",
    desc: "Pour les voyages qui n'entrent dans aucune case. Sans contrainte de durée, d'étapes ou de voyageurs.",
    services: [],
    highlight: false,
  },
];

const FAQ_TABS = [
  {
    label: "Questions pratiques",
    faqs: [
      { q: "Comment se passe le premier contact ?", a: "Envoyez-moi quelques mots sur votre projet : la destination, les dates, ce que vous cherchez. Je vous réponds dans les 48 h et nous échangeons plus longuement à partir de là." },
      { q: "Combien de temps à l'avance faut-il réserver ?", a: "Idéalement entre 4 et 8 semaines avant le départ pour un voyage bien pensé. Mais chaque situation est différente — si vous partez dans 2 semaines, contactez-moi quand même." },
      { q: "Comment se passe le paiement ?", a: "Un acompte de 50 % est demandé à la validation du devis. Le solde est réglé à la livraison du carnet de voyage digital." },
      { q: "Puis-je modifier l'itinéraire après ?", a: "Bien sûr. Une ronde de modifications est incluse dans chaque formule. Pour des ajustements plus importants, on en discute ensemble." },
      { q: "Qu'est-ce que le carnet de voyage digital ?", a: "Un document soigné, partageable et lisible sur tous les appareils, qui regroupe tout : transports, hébergements, activités, bonnes adresses et les petits détails qui font la différence." },
    ],
  },
  {
    label: "Travel Planner, c'est quoi ?",
    faqs: [
      { q: "Qu'est-ce qu'un Travel Planner exactement ?", a: "Un Travel Planner est un expert du voyage indépendant qui conçoit des itinéraires sur mesure à partir de vos envies, votre rythme et ce que vous voulez vraiment vivre. Il travaille seul, sans catalogue imposé, et prend le temps de vous connaître avant de construire quoi que ce soit." },
      { q: "Quelle est la différence avec une agence de voyage ?", a: "Une agence propose des séjours prédéfinis issus d'un catalogue. Un Travel Planner, lui, part de zéro : il écoute ce que vous cherchez, ce que vous voulez ressentir, et compose quelque chose qui n'existe nulle part ailleurs. C'est la différence entre un costume sur mesure et du prêt-à-porter." },
      { q: "Est-ce plus cher qu'une agence ?", a: "Pas forcément. Les agences prennent des marges sur chaque prestation réservée. Un Travel Planner facture ses honoraires de conception, mais vous réservez les prestations vous-même au prix réel. Le coût global est souvent similaire, voire inférieur — et le résultat, incomparable." },
      { q: "Pour quel type de voyage ?", a: "Pour n'importe quel voyage où vous voulez que ça vous ressemble vraiment. Un premier voyage en solo, un séjour en famille, un voyage de noces, une aventure hors des sentiers battus — dès que le voyage compte, ça vaut la peine d'être bien pensé." },
      { q: "Ai-je la liberté de choisir ?", a: "Toujours. Le Travel Planner propose, vous disposez. Chaque itinéraire est discuté, ajusté, retravaillé jusqu'à ce qu'il vous corresponde. Vous restez décisionnaire à chaque étape." },
    ],
  },
];

/* =========================================================
   NAVBAR
   ========================================================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "Approche", href: "#approche" },
    { label: "Destinations", href: "#destinations" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "FAQ", href: "#faq" },
    { label: "Sandra", href: "#sandra" },
  ];

  const cls = `navbar ${scrolled ? "navbar--solid" : ""} ${open ? "navbar--menu-open" : ""}`;

  return (
    <nav className={cls}>
      <a href="#" className="navbar-brand" onClick={() => setOpen(false)}>
        <span className="navbar-brand-mark" aria-hidden="true" />
        Jörð <span style={{opacity:.5}}>—</span> <em style={{fontStyle:"italic", fontWeight:300, color:"var(--cream-soft)"}}>by</em>
      </a>

      <button
        className="navbar-burger"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <ul className="navbar-links">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#brief" className="navbar-cta" onClick={() => setOpen(false)}>
        Parler de votre voyage
      </a>
    </nav>
  );
}

/* =========================================================
   REVEAL
   ========================================================= */
function Reveal({ children, tag: Tag = "div", className = "", delay = 0, threshold = 0.12, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className} ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   HERO
   ========================================================= */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
          alt=""
        />
      </div>

      <div className="hero-inner hero-inner--centered">
        <div>
          <span className="hero-kicker">Travel planner sensible</span>
          <h1 className="hero-title">
            Jörð <em>— by</em>
            <small>Sandra · Voyages sur mesure</small>
          </h1>
          <p className="hero-lead">
            Là où la terre murmure,<br />
            le voyage commence.
          </p>
          <div className="hero-cta">
            <a href="#brief" className="btn btn-primary btn-arrow">Commencer le brief</a>
            <a href="#approche" className="btn btn-ghost">Découvrir l'approche</a>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-text">défiler</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}

/* =========================================================
   TRUST STRIP
   ========================================================= */
function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Chiffres clés">
      <div className="trust-inner">
        <div className="trust-item">
          <div className="trust-num">120<small>+</small></div>
          <div className="trust-label">Voyages composés</div>
        </div>
        <div className="trust-item">
          <div className="trust-num">6</div>
          <div className="trust-label">Terres de prédilection</div>
        </div>
        <div className="trust-item">
          <div className="trust-num">48<small>h</small></div>
          <div className="trust-label">Réponse garantie</div>
        </div>
        <div className="trust-item">
          <div className="trust-num">4,9<small>/5</small></div>
          <div className="trust-label">Retours voyageurs</div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   OFFERS
   ========================================================= */
function Offers() {
  return (
    <section id="approche" className="section">
      <div className="section-inner">
        <Reveal className="offers-head">
          <div>
            <span className="section-tag">L'approche</span>
            <h2 className="section-heading">Trois façons de<br /><em>voyager autrement</em></h2>
            <p className="section-intro">
              Pas de catalogue, pas de séjour clé en main. Juste une rencontre, votre histoire,
              et un itinéraire qui n'existe que pour vous.
            </p>
          </div>
          <a href="#brief" className="link-underline">Commencer</a>
        </Reveal>

        <div className="offers-grid">
          {OFFERS.map((o, i) => (
            <Reveal key={o.num} tag="article" className="card" delay={i * 0.12}>
              <div className="card-head">
                <span className="card-num">{o.num}</span>
                <div className="card-rule" />
              </div>
              <h3 className="card-title">{o.title}</h3>
              <p className="card-text">{o.text}</p>
              <span className="card-more">{o.more} →</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider-line" />
      <span className="divider-dot" />
      <span className="divider-line" />
    </div>
  );
}

/* =========================================================
   PROCESS
   ========================================================= */
function Process() {
  return (
    <section className="section">
      <div className="section-inner">
        <Reveal className="process-head">
          <span className="section-tag">Comment ça marche</span>
          <h2 className="section-heading">Trois étapes vers<br /><em>votre prochain voyage</em></h2>
          <p className="section-intro">
            Un processus lent et attentif, pour que le voyage soit pensé
            avant même d'avoir commencé.
          </p>
        </Reveal>

        <div className="process-steps">
          <div className="process-line" aria-hidden="true" />
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.num} className="process-step" delay={i * 0.18}>
              <div className="process-dot"><span>{s.num}</span></div>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-text">{s.text}</p>
              <span className="process-duration">{s.duration}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */
function About() {
  return (
    <section id="sandra" className="section">
      <div className="section-inner">
        <div className="about-grid about-grid--single">
          <Reveal className="about-body" delay={0.15}>
            <span className="section-tag">Qui je suis</span>
            <blockquote>
              <p>
                Je m'appelle Sandra. J'ai grandi entre les cartes dépliées sur la table
                et les récits de voyages lus à voix haute.
              </p>
              <p>
                Avant de créer Jörð, j'ai beaucoup voyagé — souvent seule, toujours
                lentement. J'ai appris que les plus beaux itinéraires ne sont pas ceux
                qui cochent des lieux, mais ceux qui laissent <em>le temps de s'arrêter,
                d'écouter, de se laisser surprendre</em>.
              </p>
              <p>
                Aujourd'hui, je compose des voyages comme on écrit des lettres :
                avec attention, avec sincérité, en pensant à la personne qui les recevra.
              </p>
            </blockquote>

            <div className="about-sig">
              <div className="about-sig-line" />
              <span className="about-sig-name">Sandra</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESTINATIONS (carte interactive + grille)
   ========================================================= */
function Destinations() {
  const [view, setView] = useState("map"); // "map" | "grid"
  const [active, setActive] = useState("norvege");

  const current = useMemo(
    () => DESTINATIONS.find(d => d.id === active) || DESTINATIONS[0],
    [active]
  );

  return (
    <section id="destinations" className="section dest">
      <div className="section-inner">
        <Reveal className="dest-head">
          <div>
            <span className="section-tag">Inspirations</span>
            <h2 className="section-heading">Quelques terres<br /><em>qui nous appellent</em></h2>
            <p className="section-intro">
              Six pays où je reviens souvent — non par habitude, mais parce qu'ils ont
              chacun quelque chose d'intime à offrir. Explorez la carte.
            </p>
          </div>
          <div className="dest-switch">
            <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>Carte</button>
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Galerie</button>
          </div>
        </Reveal>

        {view === "map" && (
          <Reveal>
            <div className="dest-map-wrap">
              <DestMapSVG active={active} onSelect={setActive} />
              <div className="dest-panel">
                {DESTINATIONS.slice(0, 3).map(d => (
                  <button
                    key={d.id}
                    className={`dest-chip ${active === d.id ? "active" : ""}`}
                    onClick={() => setActive(d.id)}
                  >
                    <span className="dest-chip-name">{d.name}</span>
                    <span className="dest-chip-mood">{d.mood}</span>
                  </button>
                ))}
              </div>
              <div className="dest-panel" style={{borderTop:"1px solid var(--border)"}}>
                {DESTINATIONS.slice(3).map(d => (
                  <button
                    key={d.id}
                    className={`dest-chip ${active === d.id ? "active" : ""}`}
                    onClick={() => setActive(d.id)}
                  >
                    <span className="dest-chip-name">{d.name}</span>
                    <span className="dest-chip-mood">{d.mood}</span>
                  </button>
                ))}
              </div>
            </div>

            <DestDetail d={current} />
          </Reveal>
        )}

        {view === "grid" && (
          <div className="dest-grid-view">
            {DESTINATIONS.map((d, i) => (
              <Reveal
                key={d.id}
                tag="figure"
                className="dest-card"
                delay={i * 0.08}
                onClick={() => { setActive(d.id); setView("map"); }}
              >
                <img src={d.image} alt={d.name} loading="lazy" />
                <figcaption className="dest-card-caption">
                  <span className="dest-card-name">{d.name}</span>
                  <span className="dest-card-mood">{d.mood}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DestDetail({ d }) {
  return (
    <div className="dest-detail" key={d.id}>
      <div className="dest-detail-img">
        <img src={d.image} alt={d.name} />
      </div>
      <div className="dest-detail-body">
        <span className="dest-detail-mood">{d.mood}</span>
        <h3 className="dest-detail-name">{d.name}</h3>
        <p className="dest-detail-text">{d.desc}</p>
        <div className="dest-detail-meta">
          <div className="dest-meta-item">
            <b>Saison idéale</b>
            <span>{d.best}</span>
          </div>
          <div className="dest-meta-item">
            <b>Rythme suggéré</b>
            <span>{d.pace}</span>
          </div>
        </div>
        <a href="#brief" className="link-underline" style={{marginTop:"1rem"}}>
          Composer ce voyage
        </a>
      </div>
    </div>
  );
}

/* Custom cursor — restored from original Jörð */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let animId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => ring.classList.add('cursor-ring--hover');
    const onLeave = () => ring.classList.remove('cursor-ring--hover');

    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMove);

    const bindInteractives = () => {
      const els = document.querySelectorAll('a, button, .card, .dest-card, .pricing-card, .brief-option, .faq-item, input, textarea');
      els.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      return els;
    };
    let interactives = bindInteractives();
    const mo = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      interactives = bindInteractives();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      mo.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

/* Boussole — carte constellation stylisée.
   Square 100×100 viewBox + square container → preserveAspectRatio="none"
   streches 1:1, so SVG coords == container % and lines meet pins exactly. */
function DestMapSVG({ active, onSelect }) {
  const [hover, setHover] = useState(null);
  const activeD = DESTINATIONS.find(d => d.id === active);

  const CX = 50, CY = 50;

  // SVG angle convention: 0° = East, 90° = South, 270° = North.
  const POSITIONS = {
    islande:  { angle: 220, r: 40 },  // NW
    norvege:  { angle: 280, r: 38 },  // N, slightly E
    ecosse:   { angle: 200, r: 32 },  // W
    portugal: { angle: 140, r: 38 },  // SW
    grece:    { angle:  55, r: 34 },  // SE
    japon:    { angle: 355, r: 44 },  // E (Far East)
  };

  const toXY = ({ angle, r }) => {
    const rad = (angle * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  };

  const points = DESTINATIONS.map(d => ({ ...d, ...toXY(POSITIONS[d.id]) }));

  const RINGS = [16, 28, 40, 46];
  const CARDINAL_TICKS = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className={`dest-map ${activeD ? "has-active" : ""}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {/* Concentric rings */}
        {RINGS.map(r => (
          <circle key={r} cx={CX} cy={CY} r={r}
            className={`graticule ${r === 46 ? "graticule--outer" : ""}`} />
        ))}

        {/* Cardinal crosshairs — thin, subtle */}
        <line x1="6"  y1={CY} x2="94"  y2={CY} className="graticule graticule--axis" />
        <line x1={CX} y1="6"  x2={CX}  y2="94" className="graticule graticule--axis" />

        {/* Tick marks on outer ring at each 45° */}
        {CARDINAL_TICKS.map(a => {
          const rad = (a * Math.PI) / 180;
          const inner = 44, outer = 47.5;
          return (
            <line key={a}
              x1={CX + inner * Math.cos(rad)} y1={CY + inner * Math.sin(rad)}
              x2={CX + outer * Math.cos(rad)} y2={CY + outer * Math.sin(rad)}
              className="graticule graticule--tick" />
          );
        })}

        {/* Route rays */}
        {points.map(p => {
          const cls = [
            "route",
            p.id === active ? "route-active" : "",
            p.id === hover && p.id !== active ? "route-hover" : "",
          ].filter(Boolean).join(" ");
          return (
            <line key={`ray-${p.id}`}
              x1={CX} y1={CY} x2={p.x} y2={p.y}
              className={cls} />
          );
        })}

        {/* Compass rose centre */}
        <g className="compass-rose">
          <path
            d={`M ${CX} ${CY - 9} L ${CX + 1.4} ${CY - 1.4} L ${CX + 9} ${CY} L ${CX + 1.4} ${CY + 1.4} L ${CX} ${CY + 9} L ${CX - 1.4} ${CY + 1.4} L ${CX - 9} ${CY} L ${CX - 1.4} ${CY - 1.4} Z`}
            className="compass-star" />
          <circle cx={CX} cy={CY} r="4.2" className="compass-ring" />
          <circle cx={CX} cy={CY} r="0.9"  className="compass-dot" />
          <text x={CX}      y={CY - 11}   className="compass-label compass-label--n">N</text>
          <text x={CX}      y={CY + 13.5} className="compass-label">S</text>
          <text x={CX + 11} y={CY + 1}    className="compass-label">E</text>
          <text x={CX - 11} y={CY + 1}    className="compass-label">O</text>
        </g>
      </svg>

      {/* Pins — absolute % positions match SVG coords 1:1 */}
      {points.map(p => {
        const isActive = p.id === active;
        return (
          <button
            key={p.id}
            type="button"
            className={`dest-map-pin ${isActive ? "active" : ""}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={() => onSelect(p.id)}
            onMouseEnter={() => setHover(p.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(p.id)}
            onBlur={() => setHover(null)}
            aria-label={`${p.name} — ${p.mood}`}
            aria-pressed={isActive}
          >
            <span className="pin-pulse" aria-hidden="true" />
            <span className="pin-dot" aria-hidden="true" />
            <span className="pin-label">{p.name}</span>
          </button>
        );
      })}

      <span className="dest-map-legend">Terres de prédilection</span>
      <span className="dest-map-hint" aria-hidden="true">
        {activeD ? activeD.name : "Sélectionnez une escale"}
      </span>
    </div>
  );
}

/* =========================================================
   PRICING
   ========================================================= */
function Pricing() {
  return (
    <section id="tarifs" className="section">
      <div className="section-inner">
        <Reveal className="pricing-head">
          <div>
            <span className="section-tag">Tarifs</span>
            <h2 className="section-heading">Choisir sa<br /><em>formule de voyage</em></h2>
            <p className="section-intro">
              Quatre formules, une seule exigence : que vous repartiez avec un voyage
              qui vous ressemble vraiment.
            </p>
          </div>
          <a href="#brief" className="link-underline">Demander un devis</a>
        </Reveal>

        <div className="pricing-grid">
          {PRICING.map((f, i) => (
            <Reveal
              key={f.name}
              tag="article"
              className={`pricing-card ${f.highlight ? "pricing-card--highlight" : ""}`}
              delay={i * 0.1}
            >
              <div>
                <h3 className="pricing-name">{f.name}</h3>
                <div className="pricing-price">
                  {f.price} {f.priceSub && <small>/ {f.priceSub}</small>}
                </div>
              </div>
              <span className="pricing-tag">{f.tag}</span>
              <p className="pricing-desc">{f.desc}</p>
              {f.services.length > 0 && (
                <ul className="pricing-services">
                  {f.services.map(s => <li key={s}>{s}</li>)}
                </ul>
              )}
              <a href="#brief" className="btn btn-ghost pricing-cta">Je vous écoute</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BRIEF — Smart multi-step form
   ========================================================= */
function Brief() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    destination: "",
    travelers: "",
    duration: "",
    season: "",
    pace: "",
    budget: "",
    firstName: "",
    email: "",
    message: "",
  });

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const steps = [
    {
      key: "destination",
      q: "Où votre envie de voyage vous mène-t-elle ?",
      hint: "Un pays, une région, ou simplement une sensation.",
      render: () => (
        <>
          <div className="brief-options">
            {["Norvège", "Islande", "Écosse", "Portugal", "Grèce", "Japon"].map(d => (
              <button
                key={d}
                className={`brief-option ${data.destination === d ? "selected" : ""}`}
                onClick={() => update("destination", d)}
              >
                <span className="brief-option-label">{d}</span>
              </button>
            ))}
          </div>
          <label className="brief-field-label">Autre destination</label>
          <input
            className="brief-input"
            placeholder="Ou écrivez une région, un pays, une idée…"
            value={data.destination && !["Norvège","Islande","Écosse","Portugal","Grèce","Japon"].includes(data.destination) ? data.destination : ""}
            onChange={e => update("destination", e.target.value)}
          />
        </>
      ),
      valid: () => data.destination.trim().length > 0,
    },
    {
      key: "travelers-duration",
      q: "Vous êtes combien, et combien de temps ?",
      hint: "Pour me faire une première idée du cadre.",
      render: () => (
        <>
          <label className="brief-field-label">Voyageurs</label>
          <div className="brief-options" style={{gridTemplateColumns:"repeat(4, 1fr)"}}>
            {["Solo", "2 pers.", "3-4 pers.", "Plus"].map(v => (
              <button
                key={v}
                className={`brief-option ${data.travelers === v ? "selected" : ""}`}
                onClick={() => update("travelers", v)}
              >
                <span className="brief-option-label" style={{fontSize:"1rem"}}>{v}</span>
              </button>
            ))}
          </div>
          <label className="brief-field-label" style={{marginTop:"1.5rem"}}>Durée envisagée</label>
          <div className="brief-options" style={{gridTemplateColumns:"repeat(4, 1fr)"}}>
            {["≤ 7 jours", "8–12 jours", "13–18 jours", "Plus long"].map(v => (
              <button
                key={v}
                className={`brief-option ${data.duration === v ? "selected" : ""}`}
                onClick={() => update("duration", v)}
              >
                <span className="brief-option-label" style={{fontSize:"1rem"}}>{v}</span>
              </button>
            ))}
          </div>
        </>
      ),
      valid: () => data.travelers && data.duration,
    },
    {
      key: "season-pace",
      q: "Quel rythme, quelle saison ?",
      hint: "La couleur du voyage — intime ou vibrant, frais ou lumineux.",
      render: () => (
        <>
          <label className="brief-field-label">Rythme</label>
          <div className="brief-options" style={{gridTemplateColumns:"repeat(3, 1fr)"}}>
            {[
              {v:"Contemplatif", s:"Peu d'étapes, on s'attarde"},
              {v:"Équilibré", s:"Un bon mélange"},
              {v:"Itinérant", s:"On bouge, on découvre"},
            ].map(o => (
              <button
                key={o.v}
                className={`brief-option ${data.pace === o.v ? "selected" : ""}`}
                onClick={() => update("pace", o.v)}
              >
                <span className="brief-option-label">{o.v}</span>
                <span className="brief-option-sub">{o.s}</span>
              </button>
            ))}
          </div>

          <label className="brief-field-label" style={{marginTop:"1.5rem"}}>Période envisagée</label>
          <div className="brief-options" style={{gridTemplateColumns:"repeat(4, 1fr)"}}>
            {["Printemps", "Été", "Automne", "Hiver"].map(v => (
              <button
                key={v}
                className={`brief-option ${data.season === v ? "selected" : ""}`}
                onClick={() => update("season", v)}
              >
                <span className="brief-option-label" style={{fontSize:"1rem"}}>{v}</span>
              </button>
            ))}
          </div>
        </>
      ),
      valid: () => data.pace && data.season,
    },
    {
      key: "budget",
      q: "Une idée du budget global ?",
      hint: "Cela m'aide à calibrer les hébergements et les expériences.",
      render: () => (
        <div className="brief-options" style={{gridTemplateColumns:"repeat(2, 1fr)"}}>
          {[
            {v:"< 2 000 € / pers.", s:"Simple et pensé"},
            {v:"2 000 – 4 000 €", s:"Confortable"},
            {v:"4 000 – 7 000 €", s:"Belle gamme"},
            {v:"> 7 000 €", s:"Sans limite"},
          ].map(o => (
            <button
              key={o.v}
              className={`brief-option ${data.budget === o.v ? "selected" : ""}`}
              onClick={() => update("budget", o.v)}
            >
              <span className="brief-option-label">{o.v}</span>
              <span className="brief-option-sub">{o.s}</span>
            </button>
          ))}
        </div>
      ),
      valid: () => data.budget,
    },
    {
      key: "message",
      q: "Parlez-moi de ce qui vous fait rêver.",
      hint: "En quelques lignes : ce que vous voulez ressentir, ce que vous fuyez, les inspirations qui vous traversent.",
      render: () => (
        <>
          <div className="brief-row">
            <div>
              <label className="brief-field-label">Prénom</label>
              <input
                className="brief-input"
                placeholder="Votre prénom"
                value={data.firstName}
                onChange={e => update("firstName", e.target.value)}
                style={{marginBottom:0}}
              />
            </div>
            <div>
              <label className="brief-field-label">Email</label>
              <input
                className="brief-input"
                type="email"
                placeholder="votre@email.com"
                value={data.email}
                onChange={e => update("email", e.target.value)}
                style={{marginBottom:0}}
              />
            </div>
          </div>
          <label className="brief-field-label">Votre message</label>
          <textarea
            className="brief-input"
            placeholder="Racontez-moi ce qui vous attire, ce que vous cherchez, ce que vous voulez vivre…"
            value={data.message}
            onChange={e => update("message", e.target.value)}
          />
        </>
      ),
      valid: () => data.firstName && data.email && /@/.test(data.email) && data.message.trim().length > 10,
    },
  ];

  const totalSteps = steps.length;
  const isDone = step >= totalSteps;
  const current = steps[step];

  const submit = () => {
    // Build mailto with all data
    const body = [
      `Prénom : ${data.firstName}`,
      `Email : ${data.email}`,
      ``,
      `Destination souhaitée : ${data.destination}`,
      `Voyageurs : ${data.travelers}`,
      `Durée : ${data.duration}`,
      `Saison : ${data.season}`,
      `Rythme : ${data.pace}`,
      `Budget : ${data.budget}`,
      ``,
      `Message :`,
      data.message,
    ].join("\n");

    const url = `mailto:sandra@jord-by.com?subject=${encodeURIComponent("Mon prochain voyage — " + data.destination)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setStep(totalSteps);
  };

  return (
    <section id="brief" className="brief">
      <div className="brief-inner">
        <Reveal className="brief-intro">
          <span className="section-tag">Premier échange</span>
          <h2 className="section-heading" style={{margin:"0 auto 1rem"}}>Composons ensemble<br /><em>votre voyage</em></h2>
          <p className="section-intro" style={{margin:"0 auto"}}>
            Quelques questions pour poser les premières pierres. Aucune obligation —
            juste un point de départ pour notre conversation.
          </p>
        </Reveal>

        <Reveal className="brief-card">
          {!isDone && (
            <div className="brief-progress" aria-hidden="true">
              {steps.map((s, i) => (
                <React.Fragment key={s.key}>
                  <div className={`brief-step-indicator ${step === i ? "active" : step > i ? "done" : ""}`}>
                    <span className="brief-step-num">{step > i ? "✓" : String(i+1).padStart(2,"0")}</span>
                    <span>Étape {i+1}</span>
                  </div>
                  {i < steps.length - 1 && <div className="brief-step-sep" />}
                </React.Fragment>
              ))}
            </div>
          )}

          {!isDone && (
            <div className="brief-step" key={step}>
              <h3 className="brief-q">{current.q}</h3>
              <p className="brief-hint">{current.hint}</p>
              {current.render()}

              <div className="brief-nav">
                <button
                  className="brief-back"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  Retour
                </button>
                {step < totalSteps - 1 ? (
                  <button
                    className="brief-submit"
                    onClick={() => setStep(step + 1)}
                    disabled={!current.valid()}
                  >
                    Continuer
                  </button>
                ) : (
                  <button
                    className="brief-submit"
                    onClick={submit}
                    disabled={!current.valid()}
                  >
                    Envoyer à Sandra
                  </button>
                )}
              </div>
            </div>
          )}

          {isDone && (
            <div className="brief-summary">
              <div className="brief-summary-icon">✓</div>
              <h3>Merci, <em>{data.firstName}</em>.</h3>
              <p>
                Votre message vient de s'envoyer. Je vous réponds personnellement
                sous 48 h, depuis une table en bois, avec un café et vos envies
                sous les yeux.
              </p>
              <div className="brief-recap">
                <div className="brief-recap-item"><b>Destination</b><span>{data.destination}</span></div>
                <div className="brief-recap-item"><b>Voyageurs</b><span>{data.travelers}</span></div>
                <div className="brief-recap-item"><b>Durée</b><span>{data.duration}</span></div>
                <div className="brief-recap-item"><b>Saison</b><span>{data.season}</span></div>
                <div className="brief-recap-item"><b>Rythme</b><span>{data.pace}</span></div>
                <div className="brief-recap-item"><b>Budget</b><span>{data.budget}</span></div>
              </div>
              <button className="btn btn-ghost" onClick={() => { setStep(0); setData({destination:"",travelers:"",duration:"",season:"",pace:"",budget:"",firstName:"",email:"",message:""}); }}>
                Recommencer
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
   ========================================================= */
function FAQ() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section">
      <div className="section-inner">
        <Reveal className="faq-head">
          <span className="section-tag">Questions fréquentes</span>
          <h2 className="section-heading">Ce que vous voulez<br /><em>savoir avant de partir</em></h2>
        </Reveal>

        <Reveal className="faq-tabs">
          {FAQ_TABS.map((t, i) => (
            <button
              key={t.label}
              className={`faq-tab ${tab === i ? "active" : ""}`}
              onClick={() => { setTab(i); setOpen(null); }}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        <div className="faq-list">
          {FAQ_TABS[tab].faqs.map((item, i) => (
            <Reveal
              key={`${tab}-${i}`}
              className={`faq-item ${open === i ? "open" : ""}`}
              delay={i * 0.06}
            >
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon">{open === i ? "−" : "+"}</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
   ========================================================= */
function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <Reveal>
          <span className="section-tag">Contact</span>
          <h2 className="section-heading" style={{margin:"0 auto 1.5rem"}}>Parlons de votre voyage</h2>
          <p className="contact-text">
            Chaque voyage commence par une conversation. Racontez-moi ce que
            vous cherchez, ce qui vous attire, ce que vous voulez ressentir
            — et on construit ensemble un itinéraire qui vous ressemble.
          </p>
          <div className="contact-actions">
            <a href="#brief" className="btn btn-primary btn-arrow">Commencer le brief</a>
            <a href="mailto:sandra@jord-by.com" className="btn btn-ghost">Écrire directement</a>
          </div>

          <div className="contact-channels">
            <a href="mailto:sandra@jord-by.com" className="contact-channel">
              <span className="contact-channel-label">Email</span>
              <span className="contact-channel-value">sandra@jord-by.com</span>
            </a>
            <a href="https://instagram.com/jord.by" target="_blank" rel="noopener noreferrer" className="contact-channel">
              <span className="contact-channel-label">Instagram</span>
              <span className="contact-channel-value">@jord.by</span>
            </a>
            <div className="contact-channel">
              <span className="contact-channel-label">Réponse</span>
              <span className="contact-channel-value">Sous 48 h</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <span className="footer-brand">
            <span className="navbar-brand-mark" aria-hidden="true" />
            Jörð — <em style={{fontStyle:"italic", color:"var(--cream-soft)"}}>by</em>
          </span>
          <p className="footer-tagline">
            Travel planner sensible. Voyages sur mesure, lents et immersifs,
            composés par Sandra.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explorer</h4>
          <ul>
            <li><a href="#approche">Approche</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#tarifs">Tarifs</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:sandra@jord-by.com">Email</a></li>
            <li><a href="#brief">Brief de voyage</a></li>
            <li><a href="https://instagram.com/jord.by" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Légal</h4>
          <ul>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">CGV</a></li>
            <li><a href="#">Confidentialité</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 · Jörð — by</span>
        <span>Composé avec attention, en France</span>
      </div>
    </footer>
  );
}

/* =========================================================
   INTRO — surface d'eau (WebGL2 shader, wave equation on float texture)
   ========================================================= */
function Intro() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setGone(true); return; }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });

    const fadeOnly = () => {
      const tF = setTimeout(() => setFading(true), 3500);
      const tG = setTimeout(() => { setGone(true); document.body.style.overflow = prev; }, 4800);
      return () => { clearTimeout(tF); clearTimeout(tG); document.body.style.overflow = prev; };
    };

    if (!gl ||
        !gl.getExtension("EXT_color_buffer_float") ||
        !gl.getExtension("OES_texture_float_linear")) {
      return fadeOnly();
    }

    // Match simulation aspect to viewport so ripples stay circular.
    const SIM_LONG = 360;
    let SIM_W, SIM_H;
    {
      const a = window.innerWidth / window.innerHeight;
      if (a >= 1) { SIM_W = SIM_LONG; SIM_H = Math.max(180, Math.round(SIM_LONG / a)); }
      else        { SIM_H = SIM_LONG; SIM_W = Math.max(180, Math.round(SIM_LONG * a)); }
    }

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const link = (vs, fs) => {
      const p = gl.createProgram();
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      return p;
    };

    const VS = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

    // Wave equation: new = (sum_4_neighbors / 2) - prev, stored in (R, G) = (current, previous).
    const FS_SIM = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_texel;
uniform float u_damping;
out vec4 outColor;
void main() {
  vec2 c = texture(u_state, v_uv).rg;
  float l = texture(u_state, v_uv - vec2(u_texel.x, 0.0)).r;
  float r = texture(u_state, v_uv + vec2(u_texel.x, 0.0)).r;
  float t = texture(u_state, v_uv - vec2(0.0, u_texel.y)).r;
  float b = texture(u_state, v_uv + vec2(0.0, u_texel.y)).r;
  float h = (l + r + t + b) * 0.5 - c.g;
  outColor = vec4(h * u_damping, c.r, 0.0, 1.0);
}`;

    // Inject a localized impulse into the current height field.
    const FS_DROP = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_center;
uniform float u_radius;
uniform float u_force;
out vec4 outColor;
void main() {
  vec2 c = texture(u_state, v_uv).rg;
  float d = distance(v_uv, u_center);
  float force = 0.0;
  if (d < u_radius) {
    float w = cos((d / u_radius) * 1.5707963);
    force = w * w * u_force;
  }
  outColor = vec4(c.r + force, c.g, 0.0, 1.0);
}`;

    // Visualization: build a normal from the gradient and render water highlights with
    // premultiplied alpha. Flat regions stay transparent so the dark background shows through.
    const FS_RENDER = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_texel;
out vec4 outColor;
void main() {
  float c = texture(u_state, v_uv).r;
  float l = texture(u_state, v_uv - vec2(u_texel.x, 0.0)).r;
  float r = texture(u_state, v_uv + vec2(u_texel.x, 0.0)).r;
  float t = texture(u_state, v_uv - vec2(0.0, u_texel.y)).r;
  float b = texture(u_state, v_uv + vec2(0.0, u_texel.y)).r;
  float dx = (r - l) * 0.5;
  float dy = (b - t) * 0.5;

  vec3 N = normalize(vec3(-dx * 36.0, -dy * 36.0, 1.0));
  vec3 L = normalize(vec3(-0.45, -0.40, 0.78));
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float NdotL = max(0.0, dot(N, L));
  float NdotH = max(0.0, dot(N, H));
  float NdotV = max(0.0, dot(N, V));

  float slope = length(vec2(dx, dy));
  float activity = clamp(abs(c) * 0.45 + slope * 9.0, 0.0, 1.0);

  vec3 cream   = vec3(0.95, 0.91, 0.83);
  vec3 gold    = vec3(0.86, 0.71, 0.49);
  vec3 sparkle = vec3(1.00, 0.96, 0.85);
  vec3 fres    = vec3(0.50, 0.62, 0.80);

  vec3 col = vec3(0.0);
  col += cream   * NdotL * 0.55;
  col += sparkle * pow(NdotH, 90.0) * 1.7;
  col += gold    * max(0.0, c) * 0.55;
  col += pow(1.0 - NdotV, 3.5) * fres * 0.18;

  float alpha = smoothstep(0.0, 1.0, activity * 1.1);
  outColor = vec4(col * alpha, alpha);
}`;

    const progSim    = link(VS, FS_SIM);
    const progDrop   = link(VS, FS_DROP);
    const progRender = link(VS, FS_RENDER);

    const aposSim    = gl.getAttribLocation(progSim,    "a_pos");
    const aposDrop   = gl.getAttribLocation(progDrop,   "a_pos");
    const aposRender = gl.getAttribLocation(progRender, "a_pos");

    const uSim = {
      state:   gl.getUniformLocation(progSim, "u_state"),
      texel:   gl.getUniformLocation(progSim, "u_texel"),
      damping: gl.getUniformLocation(progSim, "u_damping"),
    };
    const uDrop = {
      state:  gl.getUniformLocation(progDrop, "u_state"),
      center: gl.getUniformLocation(progDrop, "u_center"),
      radius: gl.getUniformLocation(progDrop, "u_radius"),
      force:  gl.getUniformLocation(progDrop, "u_force"),
    };
    const uRender = {
      state: gl.getUniformLocation(progRender, "u_state"),
      texel: gl.getUniformLocation(progRender, "u_texel"),
    };

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]), gl.STATIC_DRAW);

    function setQuad(loc) {
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    }

    function makeStateTex() {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, SIM_W, SIM_H, 0, gl.RG, gl.FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    }
    function makeFB(tex) {
      const f = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return f;
    }

    const texs = [makeStateTex(), makeStateTex()];
    const fbs  = [makeFB(texs[0]), makeFB(texs[1])];
    let curr = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    const pending = [];
    function queueDrop(x, y, force, radius) {
      pending.push({ x, y: 1.0 - y, force, radius });
    }

    let raf = 0, running = true;
    function step() {
      while (pending.length) {
        const d = pending.shift();
        const next = 1 - curr;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbs[next]);
        gl.viewport(0, 0, SIM_W, SIM_H);
        gl.useProgram(progDrop);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texs[curr]);
        gl.uniform1i(uDrop.state, 0);
        gl.uniform2f(uDrop.center, d.x, d.y);
        gl.uniform1f(uDrop.radius, d.radius);
        gl.uniform1f(uDrop.force, d.force);
        setQuad(aposDrop);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        curr = next;
      }

      gl.useProgram(progSim);
      gl.uniform1i(uSim.state, 0);
      gl.uniform2f(uSim.texel, 1 / SIM_W, 1 / SIM_H);
      gl.uniform1f(uSim.damping, 0.988);
      setQuad(aposSim);
      for (let s = 0; s < 2; s++) {
        const next = 1 - curr;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbs[next]);
        gl.viewport(0, 0, SIM_W, SIM_H);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texs[curr]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        curr = next;
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(progRender);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texs[curr]);
      gl.uniform1i(uRender.state, 0);
      gl.uniform2f(uRender.texel, 1 / SIM_W, 1 / SIM_H);
      setQuad(aposRender);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (running) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    const dropPlan = [
      { t: 500,  x: 0.5,  y: 0.5,  force: 0.85, radius: 0.045 },
      { t: 950,  x: 0.43, y: 0.46, force: 0.22, radius: 0.024 },
      { t: 1200, x: 0.57, y: 0.54, force: 0.20, radius: 0.024 },
      { t: 1700, x: 0.5,  y: 0.5,  force: 0.12, radius: 0.018 },
    ];
    const dropTimers = dropPlan.map(d =>
      setTimeout(() => queueDrop(d.x, d.y, d.force, d.radius), d.t)
    );

    const tFade = setTimeout(() => setFading(true), 3000);
    const tGone = setTimeout(() => {
      setGone(true);
      document.body.style.overflow = prev;
    }, 4000);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(tFade);
      clearTimeout(tGone);
      dropTimers.forEach(clearTimeout);
      window.removeEventListener("resize", resize);
      document.body.style.overflow = prev;
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`intro ${fading ? "intro--out" : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className="intro-canvas" />
      <span className="intro-falling-drop" />
      <span className="intro-flash" />
      <div className="intro-vignette" />
      <div className="intro-center">
        <span className="intro-wordmark">
          <span className="intro-mark">Jörð</span>
          <span className="intro-sub">by</span>
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */
function App() {
  return (
    <>
      <Intro />
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Offers />
        <Divider />
        <Process />
        <Divider />
        <About />
        <Divider />
        <Destinations />
        <Divider />
        <Pricing />
        <Divider />
        <Brief />
        <Divider />
        <FAQ />
        <Divider />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
