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
import Dashboard from "./pages/Dashboard/Dashboard";
import TopicExplorerPage from "./pages/TopicExplorerPage/TopicExplorerPage";
import TopicDetail from "./pages/TopicDetail/TopicDetail";
import PYQLibrary from "./pages/PYQLibrary/PYQLibrary";
import Lectures from "./pages/Lectures/Lectures";
import StudyMaterial from "./pages/StudyMaterial/StudyMaterial";
import POTD from "./pages/POTD/POTD";
import ProPlans from "./pages/ProPlans/ProPlans";
import MockTests from "./pages/MockTests/MockTests";
import Payment from "./pages/Payment/Payment";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topics" element={<TopicExplorerPage />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/pyq-library" element={<PYQLibrary />} />
          <Route path="/mock-tests" element={<MockTests />} />
          <Route path="/potd" element={<POTD />} />
          <Route path="/pro-plans" element={<ProPlans />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/manual-payment" element={<Payment />} />
          <Route
  path="/topics/number-theory"
  element={<TopicDetail />}
/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
