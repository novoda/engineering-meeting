import React, { useState } from "react"
import { P5Instance, ReactP5Wrapper, Sketch, SketchProps } from "react-p5-wrapper"
import { BuildingBlock } from "../building-block"
import SketchProvider from "./sketch-provider"
import { StructureViewModel } from "./view-model"

const sketch: Sketch = (sketch: P5Instance) => {
   let structure: StructureViewModel

   sketch.setup = () => {
      sketch.createCanvas(512, 512)
   }

   sketch.draw = () => {
      sketch.clear(0, 0, 0, 0)
      structure?.blocks.reduce((accumulator, block) => {
         const x = sketch.width / 2 - block.width / 2
         const y = accumulator - block.height * 0.6 - block.height / 2

         sketch.image(block.image, x, y, block.width, block.height)

         return y + block.height / 2
      }, sketch.height)
   }

   sketch.updateWithProps = (props: SketchProps) => {
      if (512 !== sketch.width || 512 !== sketch.height || (props.data && props.data !== structure?.data)) {
         sketch.resizeCanvas(512, 512)

         const data = props.data as BuildingBlock[]
         structure = StructureViewModel.from(data, sketch, 512)
      }
   }
}

export default function EngineeringMeetingSketch() {
   const [canvasSize, setCanvasSize] = useState({})
   const [started, setStarted] = useState(false)

   if (!started) {
      setTimeout(() => setCanvasSize({ width: 512, height: 512 }), 0)
      setStarted(true)
   }

   return (
      <SketchProvider.Consumer>
         {(data) => (
            <div className="EngineeringMeetingSketch" id="sketch">
               <ReactP5Wrapper customClass="canvas" sketch={sketch} data={data} canvasSize={canvasSize} />
            </div>
         )}
      </SketchProvider.Consumer>
   )
}
