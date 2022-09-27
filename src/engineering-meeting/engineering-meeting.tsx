import { useState } from "react"
import FadeIn from "react-fade-in"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {} from "./extensions"
import { MeetingRandomiser } from "./meeting-randomiser"
import { Content, Initial, Loading, UiState } from "./models/state"
import { ScreenshotTaker } from "./screenshot-taker"
import EngineeringMeetingSketch from "./sketch/sketch"
import SketchProvider from "./sketch/sketch-provider"

import "./styles/engineering-meeting.css"

export default function EngineeringMeeting() {
   const randomiser = MeetingRandomiser.create()
   const screenshotTaker = new ScreenshotTaker()
   const [uiState, setState] = useState<UiState>(new Initial())

   async function randomise() {
      setState(new Loading())
      const content = await randomiser.randomise()
      setState(content)
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

   switch (uiState?.type) {
      case "initial":
         randomise()
         return loading()
      case "loading":
         return loading()
      case "content":
         return content(uiState, structureToClipboard, randomise)
      case "error":
         return error()
   }
}

function content(uiState: Content, copyToClipboard: () => Promise<void>, randomise: () => Promise<void>) {
   return (
      <SketchProvider.Provider value={uiState.blocks}>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <FadeIn delay={150}>
            <div id="meeting" className="engineeringMeeting">
               <a href="https://github.com/novoda/engineering-meeting">
                  <img className="logo" src={`${process.env.PUBLIC_URL}/images/novoda.png`} alt="Novoda" exclude-from-screenshot="yes" />
               </a>
               {preview(uiState, copyToClipboard, randomise)}
               {details(uiState)}
            </div>
         </FadeIn>
      </SketchProvider.Provider>
   )
}

function preview(uiState: Content, copyToClipboard: () => Promise<void>, randomise: () => Promise<void>) {
   return (
      <div className="meeting-preview">
         <div onClick={copyToClipboard}>
            <img className="click" src={`${process.env.PUBLIC_URL}/images/click-here-to-copy.png`} alt="Copy" exclude-from-screenshot="yes" />
            <h1 className="meeting-name">{uiState.name}</h1>
            <div className="preview-images">
               {uiState.imageUrl ? (
                  <>
                     <img className="meeting-image" src={uiState.imageUrl} alt={uiState.name} />
                     <EngineeringMeetingSketch />
                  </>
               ) : (
                  <EngineeringMeetingSketch />
               )}
            </div>
         </div>

         <button className="randomiseButton" onClick={randomise} exclude-from-screenshot="yes">
            <b>Randomise</b>
         </button>
         <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} />
      </div>
   )
}

function details(uiState: Content) {
   return (
      <FadeIn delay={150} className="meeting-structure">
         {uiState.blocks.map((block) => (
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
         <div className="meeting-metadata">
            <p className="meeting-duration">
               <b>Estimated duration:</b> {uiState.duration}
            </p>
            <p className="meeting-date">{uiState.date}</p>
         </div>
      </FadeIn>
   )
}

function loading() {
   return (
      <FadeIn delay={150}>
         <div className="loading-content">
            <img className="loading-image" src={`${process.env.PUBLIC_URL}/images/bot-thinking.png`} alt="Loading" />
            <p className="loading-text">Roberto, the bot, is dreaming your next meeting</p>
         </div>
      </FadeIn>
   )
}

function error() {
   return (
      <div className="error-content">
         <h2 className="error">Error</h2>
      </div>
   )
}
