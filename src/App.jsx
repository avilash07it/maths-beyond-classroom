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
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManageLectures from "./pages/ManageLectures/ManageLectures";
import ManageStudyMaterial from "./pages/ManageStudyMaterial/ManageStudyMaterial";
import ManagePYQs from "./pages/ManagePYQs/ManagePYQs";
import ManagePOTD from "./pages/ManagePOTD/ManagePOTD";
import ManagePayments from "./pages/ManagePayments/ManagePayments";
import ManageMockTests from "./pages/ManageMockTests/ManageMockTests";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/topics" element={<ProtectedRoute><TopicExplorerPage /></ProtectedRoute>} />
          <Route path="/lectures" element={<ProtectedRoute><Lectures /></ProtectedRoute>} />
          <Route path="/study-material" element={<ProtectedRoute><StudyMaterial /></ProtectedRoute>} />
          <Route path="/pyq-library" element={<ProtectedRoute><PYQLibrary /></ProtectedRoute>} />
          <Route path="/mock-tests" element={<ProtectedRoute><MockTests /></ProtectedRoute>} />
          <Route path="/potd" element={<ProtectedRoute><POTD /></ProtectedRoute>} />
          <Route path="/pro-plans" element={<ProtectedRoute><ProPlans /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/manual-payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage-lectures" element={<ProtectedRoute adminOnly><ManageLectures /></ProtectedRoute>} />
          <Route path="/admin/manage-study-material" element={<ProtectedRoute adminOnly><ManageStudyMaterial /></ProtectedRoute>} />
          <Route path="/admin/manage-pyqs" element={<ProtectedRoute adminOnly><ManagePYQs /></ProtectedRoute>} />
          <Route path="/admin/manage-potd" element={<ProtectedRoute adminOnly><ManagePOTD /></ProtectedRoute>} />
          <Route path="/admin/manage-payments" element={<ProtectedRoute adminOnly><ManagePayments /></ProtectedRoute>} />
          <Route path="/admin/manage-mock-tests" element={<ProtectedRoute adminOnly><ManageMockTests /></ProtectedRoute>} />
          <Route
  path="/topics/number-theory"
  element={<ProtectedRoute><TopicDetail /></ProtectedRoute>}
/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
