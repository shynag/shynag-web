import { Manrope } from "next/font/google";
import localFont from "next/font/local";

// export const fontSans = Manrope({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const fontSans = localFont({
  src: "../../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});
