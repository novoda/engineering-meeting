import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import EngineeringMeeting from "./engineering-meeting/engineering-meeting"
import Landing from "./landing"
import "./styles/index.css"

ReactDOM.render(
   <BrowserRouter>
      <Routes>
         <Route path="/engineering-meeting" element={<Landing />} />
         <Route path="/randomiser" element={<EngineeringMeeting />} />
      </Routes>
   </BrowserRouter>,
   document.getElementById("root")
)
