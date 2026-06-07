import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeatureStrip from "./components/FeatureStrip/FeatureStrip";
import TopicExplorer from "./components/TopicExplorer/TopicExplorer";
import PracticeSection from "./components/PracticeSection/PracticeSection";
import StatsBar from "./components/StatsBar/StatsBar";
import TestSeriesBanner from "./components/TestSeriesBanner/TestSeriesBanner";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <TopicExplorer />
      <PracticeSection />
      <StatsBar />
      <TestSeriesBanner />
      <Footer />
    </div>
  );
}

export default App;