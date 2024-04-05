import { Metadata } from "next";
// import "./globals.css";
// import { Inter } from "next/font/google";
import { cn } from "../lib/utils";
import Sidenavbar from "@/components/Sidebar";

// const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        {/* Slide bar*/}
        {/*<p className="border" >Slidebar</p>*/}
        <Sidenavbar />
        {/*main page */}
        <div className="p-8 w-full">{children}</div>
        
      </body>
    </html>
  );
}
