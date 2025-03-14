import { Cinzel } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import { dark } from "@clerk/themes";
import LandingContent from "@/components/landing/LandingContent";

const cinzelSerif = Cinzel({
  subsets: ["latin"],
});

export const metadata = {
  title: "Connect5e",
  description: "Bringing your party together easier and better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${cinzelSerif.className} antialiased`}>
          <div className="h-screen bg-gradient-to-b to-stone-800 from-stone-950 flex flex-col safe-area">
            <header className="sticky-top flex justify-between items-center p-4 gap-4 h-16 bg-red-900">
              <Link className="text-2xl font-bold" href={"/"}>
                Connect5e
              </Link>
              <div className="flex items-center gap-4">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            <main className="container flex-grow mx-auto overflow-y-auto">
              <SignedOut>
                <LandingContent />
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
