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
import { FidgetSpinner } from 'react-loader-spinner'

export default function EngineeringMeeting() {
   const randomiser = MeetingRandomiser.create()
   const screenshotTaker = new ScreenshotTaker()
   const [uiState, setState] = useState<UiState>(new Initial())

   async function randomise() {
      setState(new Loading())
      await timeout(1000) // TODO remove fake delay when real long-running action is added
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

   switch (uiState?.type) {
      case "initial": randomise(); return loading()
      case "loading": return loading()
      case "content": return content(uiState, structureToClipboard, randomise)
      case "error": return error()
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
      <div className="loading-content">
         <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={['#ACCF75', '#F6FA25', '#FAA426']}
            backgroundColor="#1BA3DB"
         />
      </div>
   )
}

function error() {
   return (
      <div className="error-content">
         <h2 className="error">Error</h2>
      </div>
   )
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

type UiState = Loading | Error | Content | Initial

class Initial {
   readonly type: "initial" = "initial"
}
class Loading {
   readonly type: "loading" = "loading"
}

class Error {
   readonly type: "error" = "error"
   message: string

   constructor(
      message: string,
   ) {
      this.message = message
   }
}

class Content {
   readonly type: "content" = "content"
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
      this.blocks = blocks
      this.name = name
      this.duration = duration
      this.date = date
   }
}
