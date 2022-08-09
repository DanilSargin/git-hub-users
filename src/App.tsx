import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearcherPage from "./pages/searcherPage/SearcherPage";
import UserPage from "./pages/userPage/UserPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<SearcherPage/>}/>
              <Route path={'/user/:userName'} element={<UserPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
