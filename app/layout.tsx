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
          <div className="safe-area flex h-screen flex-col bg-gradient-to-b from-stone-950 to-stone-800">
            <header className="sticky-top flex h-16 items-center justify-between gap-4 bg-red-900 p-4">
              <Link className="text-2xl font-bold" href={"/"}>
                Connect5e
              </Link>
              <div className="flex items-center gap-4">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            <main className="container mx-auto flex-grow overflow-y-auto">
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
