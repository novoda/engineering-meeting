import { useEffect, useState } from "react"
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
   const [meetingUrl, setImage] = useState<string>()

   async function randomise() {
      const meeting = randomiser.randomise()
      setName(meeting.name)
      setBlocks(meeting.blocks)
      setDuration(meeting.duration)
      setDate(meeting.generatedDate)
   }

   async function fetchImage() {
      const result = await fetch(
         `https://novoda-dreams.loca.lt/dreams?prompt="${name} made of lego bricks. Trending on artstation. Beautiful. Good in details"`,
         {
            headers: { "Bypass-Tunnel-Reminder": "" },
         }
      )
      const blob = await result.blob()
      const imageObjectURL = URL.createObjectURL(blob)
      setImage(imageObjectURL)
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

   useEffect(() => {
      fetchImage()
   }, [name])

   // 1. Manual fetch of the image that we want to display
   // 2. We need to store the result of the fetch into a blob object
   // 3. We need to pass the blob to the `src` property on the img tag
   // Optional (for the future). Before trying to fetch the image using the dreams API, check if the dreams API is enabled (as a sort of feature flag) otherwise do nothing and operate as normal.

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
                  <h2 className="meeting-name">{name}</h2>
                  <div className="sketch-group">
                     <img className="sketch-image" src={meetingUrl} width="512" height="512" alt={name} />
                     <EngineeringMeetingSketch />
                  </div>
               </div>
               <button className="randomiseButton" onClick={randomise} exclude-from-screenshot="yes">
                  <b>Randomise</b>
               </button>
               <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} />
            </div>
            <div className="meeting-structure">
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
               <p className="meeting-date">
                  <b>Date:</b> {date}
               </p>
            </div>
         </div>
      </SketchProvider.Provider>
   )
}
