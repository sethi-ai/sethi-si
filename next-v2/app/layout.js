import "./globals.css";

export const metadata = {
  title: "Akshay Sethi",
  description: "Akshay Sethi — founder of Dyut, builder, writer, amateur photographer. Gurgaon.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Akshay Sethi",
    description: "Founder of Dyut. I build small AI products, write, and take photos.",
    url: "https://sethi.si",
    images: ["https://sethi.si/og-profile.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
