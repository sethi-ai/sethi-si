import { about, quotes, products, photos, contact } from "./data";
import { Clock, Weather, ThemeToggle } from "./Live";

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="nav-row1">
          <a className="nav-name" href="/">Akshay <span>Sethi</span></a>
          <div className="nav-meta"><Clock /><i>·</i><span>Gurgaon, IN</span><i>·</i><Weather /></div>
        </div>
        <nav className="nav-row2">
          <a href="#building">building</a>
          <a href="#photos">photos</a>
          <a href="#contact">say hi</a>
        </nav>
      </header>

      <main className="wrap">
        <section className="hero">
          <div>
            <h1 className="hero-heading">
              Hi, I'm <b>Akshay</b> <em>Sethi</em>. I build things that interest me, write when something
              won't leave my head, and take photos of places before they change.
            </h1>
            <p className="founder">
              Founder, <a href="https://dyut.si" target="_blank" rel="noreferrer">Dyut</a> — small AI products for everyday gaps.
            </p>
            <p className="lbl">A few things about me</p>
            <ul className="about">{about.map((a, i) => <li key={i}>{a}</li>)}</ul>
            <div className="convos">
              <div><span className="pulse" /> <span className="faint">Current obsession:</span> 3D printing</div>
              <div><span className="emo">✈</span> <span className="faint">Next destination:</span> Kasar Devi</div>
            </div>
          </div>
          <div className="hero-right">
            <img className="hero-photo" src="/new/akshay-hero.webp" alt="Akshay Sethi" />
            <p className="lbl">Quotes I live by</p>
            <div className="quotes">{quotes.map((q) => <p key={q}>"{q}"</p>)}</div>
          </div>
        </section>

        <section className="section" id="building">
          <div className="sec-head">
            <p className="lbl">Things I'm building</p>
            <a className="all" href="https://dyut.si" target="_blank" rel="noreferrer">everything on dyut.si →</a>
          </div>
          <div className="grid">
            {products.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className={"card" + (p.featured ? " featured" : "")}>
                {p.logo ? <img className="icon" src={p.logo} alt="" /> : <span className="icon">{p.initials}</span>}
                <div>
                  <p className="card-name">{p.name} <span className="badge">{p.badge}</span></p>
                  <p className="card-desc">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="photos">
          <div className="sec-head">
            <p className="lbl">Photos I took and love</p>
            <a className="all" href="/photos">see all →</a>
          </div>
          <div className="photos">
            {photos.map(([f, c]) => (
              <a key={f} href="/photos" className="photo">
                <img src={`/new/photos/${f}.webp`} alt={c} loading="lazy" />
                <span>{c}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <p className="lbl">Work with me</p>
          <p className="work-line">I help early-stage teams with go-to-market and AI adoption. If that's you, let's talk.</p>
          <div className="ctas">
            <a className="btn primary" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="btn" href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="socials">
            <a href="https://instagram.com/sethi.gram" target="_blank" rel="noreferrer">@sethi.gram <span>life</span></a>
            <a href="https://instagram.com/sethi.ai" target="_blank" rel="noreferrer">@sethi.ai <span>AI</span></a>
            <a href="https://threads.net/@sethi.gram" target="_blank" rel="noreferrer">Threads <span>@sethi.gram</span></a>
            <a href="https://open.spotify.com/playlist/11BYNAVd6M1Qg0UYpLKbSR" target="_blank" rel="noreferrer">My playlist <span>Spotify</span></a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div><a href="/photos">photos</a><a href={contact.linkedin}>linkedin</a><a href="https://dyut.si">dyut.si</a></div>
        <span>sethi.si</span>
      </footer>
      <ThemeToggle />
    </>
  );
}
