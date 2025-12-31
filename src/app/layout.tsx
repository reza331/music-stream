import 'simplebar-react/dist/simplebar.min.css';
import "@/styles/globals.css";
import Providers from "./providers";
import localFont from "next/font/local";

const mainFont = localFont({
  src: "../assets/fonts/app.ttf",
  variable: "--main-font",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mainFont.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
