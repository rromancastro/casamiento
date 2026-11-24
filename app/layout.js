import './globals.scss';

export const metadata = {
  title: 'Román & Micaela · Nos casamos',
  description: 'Te esperamos para compartir este día tan especial. 5 de febrero de 2027 · Más Jardín, Juana Koslay.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
