import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App(props) {
    
  
    return (
      <>
          <Router>
            <Routes>
              <Route path="/" element={<Join />} />
              <Route path="/chat" element={<Chat />} />

            </Routes>
          </Router>
      </>
    );
  }
  
  export default App;
  