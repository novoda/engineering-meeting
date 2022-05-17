import { useState } from "react"
import { BlockRandomiser } from "./block-randomiser"
import { BuildingBlock } from "./building-block"
import {} from "./extensions"
import EngineeringMeetingSketch from "./sketch/sketch"
import SketchProvider from "./sketch/sketch-provider"
import "./styles/engineering-meeting.css"

export default function EngineeringMeeting() {
   const randomiser = new BlockRandomiser()
   const [started, setStarted] = useState(false)
   const [blocks, setBlocks] = useState([] as BuildingBlock[])

   if (!started) {
      setTimeout(() => randomise(), 100)
      setStarted(true)
   }

   async function randomise() {
      setBlocks(randomiser.randomise())
   }

   return (
      <SketchProvider.Provider value={blocks}>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <div className="engineeringMeeting">
            <div className="sketch-view">
               <EngineeringMeetingSketch />
               <button className="randomiseButton" onClick={randomise}>
                  Randomise
               </button>
            </div>
            <div className="meeting-structure">
               {[...blocks].reverse().map((block) => (
                  <section key={block.name} className="block">
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
