import React, { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BuildingBlock } from "./building-block"
import { } from "./extensions"
import { MeetingRandomiser } from "./meeting-randomiser"
import { ScreenshotTaker } from "./screenshot-taker"
import EngineeringMeetingSketch from "./sketch/sketch"
import SketchProvider from "./sketch/sketch-provider"
import "./styles/engineering-meeting.css"

export default function EngineeringMeeting() {
   const randomiser = MeetingRandomiser.create()
   const screenshotTaker = new ScreenshotTaker()
   const [uiState, setState] = useState<UiState>(randomContent(randomiser))

   async function randomise() {
      setState(new Loading())
      await timeout(3000) // TODO remove fake delay when real time-consuming action is added
      const meeting = randomiser.randomise()
      setState(randomContent(randomiser))
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

   if (uiState instanceof Content) {
      return content(uiState, structureToClipboard, randomise)
   } else if (uiState instanceof Loading) {
      return loading()
   } else {
      return error()
   }
}

function content(
   uiState: Content,
   copyToClipboard: () => Promise<void>,
   randomise: () => Promise<void>
) {
   return (
      <SketchProvider.Provider value={uiState.blocks}>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <a href="https://github.com/novoda/engineering-meeting">
            <img className="logo" src={`${process.env.PUBLIC_URL}/images/novoda.png`} alt="Novoda" exclude-from-screenshot="yes" />
         </a>
         <div id="meeting" className="engineeringMeeting">
            <div className="sketch-view">
               <div onClick={copyToClipboard}>
                  <img className="click" src={`${process.env.PUBLIC_URL}/images/click-here-to-copy.png`} alt="Copy" exclude-from-screenshot="yes" />
                  <EngineeringMeetingSketch />
               </div>
               <b><span id="date-generated">{uiState.date}</span></b>
               <button className="randomiseButton" onClick={randomise} exclude-from-screenshot="yes">
                  <b>Randomise</b>
               </button>
               <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} />
            </div>
            <div className="meeting-structure">
               <h2 className="meeting-name">{uiState.name}</h2>
               {uiState.blocks.reverse().map((block) => (
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
                  <b>Estimated duration:</b> {uiState.duration}
               </p>
            </div>
         </div>
      </SketchProvider.Provider>
   )
}

function loading() {
   return (
      <body>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <div className="loading-content">
            <h2 className="loading">Loading</h2>
         </div>
      </body>
   )
}

function error() {
   return (
      <body>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <div className="error-content">
            <h2 className="error">Error</h2>
         </div>
      </body>)
}

function timeout(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

function randomContent(randomiser: MeetingRandomiser): Content {
   const meeting = randomiser.randomise()
   return new Content(
      meeting.blocks,
      meeting.name,
      meeting.duration,
      meeting.generatedDate
   )
}

abstract class UiState { }

class Loading extends UiState { }

class Error extends UiState {
   message: string

   constructor(
      message: string,
   ) {
      super()
      this.message = message
   }
}

class Content extends UiState {
   blocks: BuildingBlock[]
   name: string
   duration: string
   date: string

   constructor(
      blocks: BuildingBlock[],
      name: string,
      duration: string,
      date: string
   ) {
      super()
      this.blocks = blocks
      this.name = name
      this.duration = duration
      this.date = date
   }
}