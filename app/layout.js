import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Infoblox | Lead-to-Opportunity Transformation | PwC",
  description:
    "A proposal to simplify the revenue lifecycle across Salesforce and Marketo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>{children}</body>
    </html>
  );
}
