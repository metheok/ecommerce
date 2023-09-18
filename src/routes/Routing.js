import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import routeConfig from "./routeConfigration";

export default function Routing() {
  return (
    <Routes>
      {routeConfig.map((route, index) => (
        <Route
          key={index + "route"}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
}
