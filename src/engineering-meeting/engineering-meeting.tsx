import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BlockRandomiser } from "./block-randomiser"
import {} from "./extensions"
import { ScreenshotTaker } from "./screenshot-taker"
import EngineeringMeetingSketch from "./sketch/sketch"
import SketchProvider from "./sketch/sketch-provider"
import "./styles/engineering-meeting.css"

export default function EngineeringMeeting() {
   const randomiser = new BlockRandomiser()
   const screenshotTaker = new ScreenshotTaker()
   const [blocks, setBlocks] = useState(randomiser.randomise())

   async function randomise() {
      setBlocks(randomiser.randomise())
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
            <img className="logo" src={`${process.env.PUBLIC_URL}/images/novoda.png`} alt="Novoda" exclude-from-screenshot="" />
         </a>
         <div id="meeting" className="engineeringMeeting">
            <div className="sketch-view">
               <div onClick={structureToClipboard}>
                  <img className="click" src={`${process.env.PUBLIC_URL}/images/click-here-to-copy.png`} alt="Copy" exclude-from-screenshot="" />
                  <EngineeringMeetingSketch />
               </div>
               <button className="randomiseButton" onClick={randomise} exclude-from-screenshot="">
                  Randomise
               </button>
               <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} />
            </div>
            <div className="meeting-structure">
               {[...blocks!].reverse().map((block) => (
                  <section key={block.id} className="block">
                     <img className="block-image" src={block.imagePath} alt={block.name} />
                     <div className="block-details">
                        <h1 className="block-name">{block.name}</h1>
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
            </div>
         </div>
      </SketchProvider.Provider>
   )
}
