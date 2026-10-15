import content from "../../content.json";

export const dynamicParams = false;
export function generateStaticParams() {
  return content.writing.length ? content.writing.map((w) => ({ slug: w.slug })) : [{ slug: "coming-soon" }];
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = content.writing.find((w) => w.slug === slug);
  return { title: post ? `${post.title} — Akshay Sethi` : "Writing — Akshay Sethi", description: post?.excerpt };
}

function Text({ parts }) {
  return parts.map((p, i) => {
    let el = p.t;
    if (p.b) el = <strong>{el}</strong>;
    if (p.i) el = <em>{el}</em>;
    if (p.href) el = <a href={p.href} target="_blank" rel="noreferrer">{el}</a>;
    return <span key={i}>{el}</span>;
  });
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = content.writing.find((w) => w.slug === slug);
  return (
    <main className="wrap narrow post">
      <a className="back" href="/v2">← Akshay Sethi</a>
      {post ? (
        <article>
          <p className="post-meta">{post.date}{post.tag ? ` · ${post.tag}` : ""}</p>
          <h1>{post.title}</h1>
          {post.body.map((b, i) => {
            if (b.type === "image") return <figure key={i}><img src={b.src} alt="" /><figcaption><Text parts={b.caption} /></figcaption></figure>;
            if (b.type === "divider") return <hr key={i} />;
            const T = { heading_1: "h2", heading_2: "h2", heading_3: "h3", quote: "blockquote", bulleted_list_item: "li", numbered_list_item: "li" }[b.type] || "p";
            return <T key={i}><Text parts={b.text} /></T>;
          })}
        </article>
      ) : (
        <p>Writing is on its way.</p>
      )}
    </main>
  );
}
