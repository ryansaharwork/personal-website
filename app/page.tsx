import type { Viewport } from "next";
import { ConsoleHome } from "@/components/home/ConsoleHome";

// Matches --color-intro-top, the top of the homepage background.
export const viewport: Viewport = {
  themeColor: "#14100d",
};

export default function HomePage() {
  return <ConsoleHome />;
}
