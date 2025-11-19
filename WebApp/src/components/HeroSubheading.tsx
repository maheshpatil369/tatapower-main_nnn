import { Typewriter } from "react-simple-typewriter";
import localFont from "next/font/local";
const ClashDisplay = localFont({
  src: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2",
});

export default function HeroSubheading() {
  return (
    <p className={`text-muted-foreground text-light ${ClashDisplay.className}`}>
      {"A space to record your tasks, progress, and reflections."}
    </p>
  );
}
