import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./store/userContext";
import Homepage from "src/pages/homepage/Homepage";
import Articles from "./pages/articles/Articles";
import Navbar from "./auth/Navbar";
import ArticleEditor from "./pages/articles/ArticlesEditor";
import ArticleView from "./pages/articles/ArticleView";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleView />} />
          <Route path="/articles/edit/:id" element={<ArticleEditor />} />
          <Route path="/articles/create" element={<ArticleEditor />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
