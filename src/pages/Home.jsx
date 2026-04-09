import HeroSection from "../components/HeroSection";
import DifficultySelector from "../components/DifficultySelector";

export default function Home() {
  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      <HeroSection />
      <DifficultySelector />
    </div>
  );
}