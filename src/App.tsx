import { Fragment } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Ships from "./pages/Ships";
import Layout from "./components/Layout";
import Questions from "./pages/Questions";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ships" element={<Ships />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Layout>
  );
}

export default App;
