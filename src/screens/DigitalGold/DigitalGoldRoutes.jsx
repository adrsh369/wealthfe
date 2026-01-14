import React from "react";
import { Route, Routes } from "react-router-dom";

import DigitalGoldDashboard from "./DigitalGoldDashboard/DigitalGold"

const DigitalGold = () => {
  return (
    <Routes>
      <Route path="/" element={<DigitalGoldDashboard />} />

    </Routes>
  );
};

export default DigitalGold;