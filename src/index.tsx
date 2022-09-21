import ReactDOM from "react-dom"
import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import EngineeringMeeting from "./engineering-meeting/engineering-meeting"
import Landing from "./landing"
import "./styles/index.css"

ReactDOM.render(
   <HashRouter>
      <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/randomiser" element={<EngineeringMeeting />} />
      </Routes>
   </HashRouter>,
   document.getElementById("root")
)
