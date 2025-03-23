import "./globals.css"

export const metadata = {
  title: "Intellect Assault",
  description: "Generate a quiz shooter game from your notes",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

