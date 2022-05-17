import { useState } from "react"
import { BlockRandomiser } from "./block-randomiser"
import { BuildingBlock } from "./building-block"
import {} from "./extensions"
import EngineeringMeetingSketch from "./sketch/sketch"
import SketchProvider from "./sketch/sketch-provider"
import "./styles/engineering-meeting.css"

export default function EngineeringMeeting() {
   const [blocks, setBlocks] = useState([] as BuildingBlock[])
   const randomiser = new BlockRandomiser()

   async function randomize() {
      setBlocks(randomiser.randomise())
   }

   return (
      <SketchProvider.Provider value={blocks}>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <div className="engineeringMeeting">
            <div className="sketch-view">
               <EngineeringMeetingSketch />
               <button className="randomiseButton" onClick={randomize}>
                  Randomize
               </button>
            </div>
            <div className="meeting-structure">
               {[...blocks].reverse().map((block) => (
                  <section className="block">
                     <img className="block-image" src={block.imagePath} alt={block.name} />
                     <section className="block-details">
                        <h1 className="block-name">{block.name}</h1>
                        <text className="block-description">
                           <b>Description:</b> {block.description}
                        </text>
                        <br />
                        <br />
                        <text className="block-purpose">
                           <b>Purpose:</b> {block.purpose}
                        </text>
                        <br />
                        <br />
                        <text className="block-duration">
                           <b>Duration:</b> {block.duration.minimum} - {block.duration.maximum} minutes
                        </text>
                     </section>
                  </section>
               ))}
            </div>
         </div>
      </SketchProvider.Provider>
   )
}
