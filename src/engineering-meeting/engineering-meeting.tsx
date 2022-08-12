import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BuildingBlock } from "./building-block"
import {} from "./extensions"
import { MeetingRandomiser } from "./meeting-randomiser"
import { ScreenshotTaker } from "./screenshot-taker"
import EngineeringMeetingSketch from "./sketch/sketch"
import SketchProvider from "./sketch/sketch-provider"
import "./styles/engineering-meeting.css"

export default function EngineeringMeeting() {
   const randomiser = MeetingRandomiser.create()
   const initialMeeting = randomiser.randomise()
   const screenshotTaker = new ScreenshotTaker()
   const [blocks, setBlocks] = useState<BuildingBlock[]>(initialMeeting.blocks)
   const [name, setName] = useState<string>(initialMeeting.name)
   const [duration, setDuration] = useState<string>(initialMeeting.duration)
   const [date, setDate] = useState<string>(initialMeeting.generatedDate)

   async function randomise() {
      const meeting = randomiser.randomise()
      setName(meeting.name)
      setBlocks(meeting.blocks)
      setDuration(meeting.duration)
      setDate(meeting.generatedDate)
   }

   async function structureToClipboard() {
      const copying = toast.info("Copying to clipboard...")
      screenshotTaker.takeScreenshot().then((screenshot) =>
         screenshot.toClipboard({
            onSuccess: () => {
               toast.dismiss(copying)
               toast.success("Meeting copied to clipboard", { autoClose: 1000 })
            },
            onFailure: () => {
               toast.dismiss(copying)
               toast.error("Failed copying to clipboard. Your browser blocked it.", { autoClose: 1000 })
            },
         })
      )
   }

   return (
      <SketchProvider.Provider value={blocks}>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <a href="https://github.com/novoda/engineering-meeting">
            <img className="logo" src={`${process.env.PUBLIC_URL}/images/novoda.png`} alt="Novoda" exclude-from-screenshot="yes" />
         </a>
         <div id="meeting" className="engineeringMeeting">
            <div className="sketch-view">
               <div onClick={structureToClipboard}>
                  <img className="click" src={`${process.env.PUBLIC_URL}/images/click-here-to-copy.png`} alt="Copy" exclude-from-screenshot="yes" />
                  <EngineeringMeetingSketch />
               </div>
               <b><span id="date-generated">{date}</span></b>
               <button className="randomiseButton" onClick={randomise} exclude-from-screenshot="yes">
                  <b>Randomise</b>
               </button>
               <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} />
            </div>
            <div className="meeting-structure">
               <h2 className="meeting-name">{name}</h2>
               {[...blocks!].reverse().map((block) => (
                  <section key={block.id} className="block">
                     <img className="block-image" src={block.imagePath} alt={block.name} />
                     <div className="block-details">
                        <h3 className="block-name">{block.name}</h3>
                        <p className="block-description">
                           <b>Description:</b> {block.description}
                        </p>
                        <p className="block-purpose">
                           <b>Purpose:</b> {block.purpose}
                        </p>
                        <p className="block-duration">
                           <b>Duration:</b> {block.duration.minimum} - {block.duration.maximum} minutes
                        </p>
                     </div>
                  </section>
               ))}
               <p className="meeting-duration">
                  <b>Estimated duration:</b> {duration}
               </p>
            </div>
         </div>
      </SketchProvider.Provider>
   )
}
