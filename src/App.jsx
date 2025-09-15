import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import ROUTES from "./utils/routes";

export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <Routes>
          {ROUTES.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {children &&
                children.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))}
            </Route>
          ))}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
            <Route path="/film/add" element={<AddFilmPage />} />
          </Route>
        </Routes> */}
        <Routes>
          {ROUTES.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {children &&
                children.map((child, idx) =>
                  child.index ? (
                    <Route key={`index-${idx}`} index element={child.element} />
                  ) : (
                    <Route key={child.path} path={child.path} element={child.element} />
                  )
                )}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
