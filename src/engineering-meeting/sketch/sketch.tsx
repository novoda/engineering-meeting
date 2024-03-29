import $ from "jquery"
import React, { useState } from "react"
import { P5Instance, ReactP5Wrapper, Sketch, SketchProps } from "react-p5-wrapper"
import { debounce } from "ts-debounce"
import { BuildingBlock } from "../models/building-block"
import SketchProvider from "./sketch-provider"
import { StructureViewModel } from "./view-model"

const sketch: Sketch = (sketch: P5Instance) => {
   let structure: StructureViewModel

   sketch.setup = () => {
      sketch.createCanvas(0, 0)
   }

   sketch.draw = () => {
      sketch.clear(0, 0, 0, 0)
      sketch.background(255, 255, 255)
      structure?.blocks.reduce((accumulator, block) => {
         const x = sketch.width / 2 - block.width / 2
         const y = accumulator - block.height * 0.6 - block.height / 2

         sketch.image(block.image, x, y, block.width, block.height)

         return y + block.height / 2
      }, sketch.height - (sketch.height - structure.height) / 4)
   }

   sketch.updateWithProps = (props: SketchProps) => {
      const canvasSize = props.canvasSize as { width: number; height: number }
      if (canvasSize.width !== sketch.width || canvasSize.height !== sketch.height || (props.data && props.data !== structure?.data)) {
         sketch.resizeCanvas(canvasSize.width, canvasSize.height)

         const data = props.data as BuildingBlock[]
         structure = StructureViewModel.from([...data].reverse(), sketch, canvasSize.height)
      }
   }
}

export default function EngineeringMeetingSketch() {
   const [canvasSize, setCanvasSize] = useState({})
   const [started, setStarted] = useState(false)

   if (!started) {
      setTimeout(() => setCanvasSize({ width: $("#sketch").width(), height: $("#sketch").height() }), 0)
      setStarted(true)
   }

   React.useEffect(() => {
      const debounced = debounce((width, height) => setCanvasSize({ width, height }), 200)
      const handleResize = () => debounced($("#sketch").width(), $("#sketch").height())
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
   }, [])

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
