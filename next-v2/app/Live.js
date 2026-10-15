"use client";
import { useEffect, useState } from "react";

export function Clock() {
  const [t, setT] = useState("—");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase());
    tick(); const id = setInterval(tick, 60000); return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

export function Weather() {
  const [w, setW] = useState("—");
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=28.4595&longitude=77.0266&current_weather=true")
      .then((r) => r.json()).then((d) => setW("☁ " + Math.round(d.current_weather.temperature) + "°C")).catch(() => {});
  }, []);
  return <span>{w}</span>;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return (
    <button className="theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
      {dark ? "☀" : "☾"}
    </button>
  );
}

export function NowPlaying() {
  const url = "https://open.spotify.com/track/0ny1jaCM7x9NO9RqJBclms";
  const [d, setD] = useState(null);
  useEffect(() => {
    fetch("https://open.spotify.com/oembed?url=" + url).then((r) => r.json()).then(setD).catch(() => {});
  }, []);
  return (
    <a className="playing" href={url} target="_blank" rel="noreferrer">
      {d?.thumbnail_url ? <img src={d.thumbnail_url} alt="" /> : <span className="ph" />}
      <span><i>Listening to</i>{d?.title || "a song on Spotify"}</span>
    </a>
  );
}
