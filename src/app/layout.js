export const metadata = {
  title: "Highnote Implementation Dashboard",
  description: "Implementation status dashboard for the Highnote PM team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
