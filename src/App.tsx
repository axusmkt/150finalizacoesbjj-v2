import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Upsell = lazy(() => import("./pages/Upsell"));
const Downsell = lazy(() => import("./pages/Downsell"));

const Loading = () => <div className="min-h-screen bg-[#0B0B0B]" />;

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upsell" element={<Upsell />} />
          <Route path="/downsell" element={<Downsell />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
