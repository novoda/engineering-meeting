import $ from "jquery"
import React, { useReducer } from "react"
import { P5Instance, ReactP5Wrapper, Sketch, SketchProps } from "react-p5-wrapper"
import { debounce } from "ts-debounce"
import { BuildingBlock } from "../building-block"
import { BlockViewModel as BuildingBlockViewModel } from "./block-view-model"
import SketchProvider from "./sketch-provider"

const sketch: Sketch = (p5: P5Instance) => {
   const overlappingFactor = 0.6
   let buildingBlocks = [] as BuildingBlock[]
   let blocks: BuildingBlockViewModel[] = []
   p5.setup = () => {
      p5.createCanvas($("#sketch").width()!, $("#sketch").height()!)
      p5.background(255)
   }

   p5.draw = () => {
      p5.background(255)

      let y = p5.height - p5.height / 7
      blocks?.forEach((block) => {
         y -= block.height * overlappingFactor
         p5.image(block.image, p5.width / 3, y, block.width, block.height)
      })
   }

   p5.updateWithProps = (props: SketchProps) => {
      p5.resizeCanvas($("#sketch").width()!, $("#sketch").height()!)
      if (props.blocks !== buildingBlocks) {
         buildingBlocks = props!.blocks as BuildingBlock[]
         blocks = (props!.blocks as BuildingBlock[]).map((block) => BuildingBlockViewModel.fromBuildingBlock(block, p5, buildingBlocks.length))
      }
   }
}

export default function EngineeringMeetingSketch() {
   const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

   React.useEffect(() => {
      const debounced = debounce(() => forceUpdate(), 200)
      const handleResize = () => debounced()
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
   }, [])

   return (
      <SketchProvider.Consumer>
         {(blocks) => (
            <div className="EngineeringMeetingSketch" id="sketch">
               <ReactP5Wrapper customClass="canvas" sketch={sketch} blocks={blocks} ignored={ignored} />
            </div>
         )}
      </SketchProvider.Consumer>
   )
}
