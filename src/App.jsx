import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeatureStrip from "./components/FeatureStrip/FeatureStrip";
import TopicExplorer from "./components/TopicExplorer/TopicExplorer";
import PracticeSection from "./components/PracticeSection/PracticeSection";
import StatsBar from "./components/StatsBar/StatsBar";
import TestSeriesBanner from "./components/TestSeriesBanner/TestSeriesBanner";
import Footer from "./components/Footer/Footer";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureStrip />
      <TopicExplorer />
      <PracticeSection />
      <StatsBar />
      <TestSeriesBanner />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;