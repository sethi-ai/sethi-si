import { about, quotes, products, photos, contact, socials, companies, writing } from "./data";
import content from "./content.json";
import { Clock, Weather, ThemeToggle, NowPlaying } from "./Live";

const fmt = (d) => (d ? d.slice(8, 10) + "." + d.slice(5, 7) + "." + d.slice(2, 4) : "");

export default function Home() {
  const posts = content.writing.length
    ? content.writing.map((w) => ({ date: w.date.split("-").reverse().join(".").replace(/^(\d\d)\.(\d\d)\.\d\d(\d\d)$/, "$1.$2.$3"), title: w.title, href: `/v2/writing/${w.slug}` }))
    : writing;
  const homePhotos = content.photos.length
    ? content.photos.filter((x) => x.home).concat(content.photos.filter((x) => !x.home)).slice(0, 9).map((x) => [x.src, x.caption])
    : photos.map(([f, c]) => [`/v2/photos/${f}.webp`, c]);
  const qs = content.quotes.length ? content.quotes : quotes;
  return (
    <>
      <header className="nav">
        <div className="nav-row1">
          <a className="nav-name" href="/">Akshay <span>Sethi</span></a>
          <div className="nav-meta"><Clock /><i>·</i><span>Gurgaon, IN</span><i>·</i><Weather /></div>
        </div>
        <nav className="nav-row2">
          <a href="#writing">writing</a>
          <a href="#projects">projects</a>
          <a href="#photos">photos</a>
        </nav>
      </header>

      <main className="wrap narrow">
        <section className="intro">
          <h1 className="hero-heading">
            Hi, I'm <b>Akshay</b> <em>Sethi</em>. I build things that interest me, write when something
            won't leave my head, and take photos of places before they change.
          </h1>
          <img className="hero-photo wide" src="/v2/akshay-hero.webp" alt="Akshay Sethi" />

          <ul className="facts">
            <li>Building <a href="https://dyut.si" target="_blank" rel="noreferrer">Dyut</a>, small AI products for everyday gaps.</li>
            <li>
              Ten years in growth at
              {companies.map((c) => (
                <span key={c.name} className="co"><img src={c.logo} alt="" />{c.name}</span>
              ))}
            </li>
            {about.map((a, i) => <li key={i}>{a}</li>)}
            <li>Current obsession: 3D printing. Next stop: Kasar Devi.</li>
          </ul>

          <NowPlaying />

          <div className="inline-links">
            <a href={`mailto:${contact.email}`}>email</a>
            <a href="https://x.com/Sethi_si" target="_blank" rel="noreferrer">x</a>
            <a href="https://instagram.com/sethi.gram" target="_blank" rel="noreferrer">instagram</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          </div>
        </section>

        <section className="section" id="projects">
          <h2>Projects</h2>
          <div className="plist">
            {products.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="prow">
                {p.logo ? <img className="picon" src={p.logo} alt="" /> : <span className="picon">{p.initials}</span>}
                <div>
                  <p className="pname">{p.name} <span className="badge">{p.badge}</span></p>
                  <p className="pdesc">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <a className="all" href="https://dyut.si" target="_blank" rel="noreferrer">everything on dyut.si →</a>
        </section>

        <section className="section" id="writing">
          <h2>Writing</h2>
          <ul className="wlist">
            {posts.map((w) => (
              <li key={w.title}><span>{w.date}</span><a href={w.href}>{w.title}</a></li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>Quotes I live by</h2>
          <div className="quotes">{qs.map((q) => <p key={q}>"{q}"</p>)}</div>
        </section>

        <section className="section" id="photos">
          <div className="sec-head"><h2>Photos I took and love</h2><a className="all" href="/photos">see all →</a></div>
          <div className="photos">
            {homePhotos.map(([f, c]) => (
              <a key={f} href="/photos" className="photo">
                <img src={f} alt={c} loading="lazy" />
                <span>{c}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Find me</h2>
          <div className="socials">
            {socials.map((x) => (
              <a key={x.name} href={x.href} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24"><path d={x.icon} /></svg>
                <b>{x.name}</b>
                <span>{x.sub}</span>
              </a>
            ))}
          </div>
          <p className="say-hi">Working on something in growth or AI? <a href={`mailto:${contact.email}`}>Email me →</a></p>
        </section>
      </main>

      <footer className="foot narrow">
        <div><a href="#writing">writing</a><a href="#projects">projects</a><a href="/photos">photos</a></div>
        <span>sethi.si</span>
      </footer>
      <ThemeToggle />
    </>
  );
}
