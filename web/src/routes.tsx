import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes} from "react-router-dom";
import Landing from "./pages/landing";
import TeacherForm from "./pages/TeacherForm";
import TeacherList from "./pages/TeacherList";

function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Landing />} />
        <Route path="/study" element={<TeacherList />} />
        <Route path="/give-classes" element={<TeacherForm />} />
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Routes;