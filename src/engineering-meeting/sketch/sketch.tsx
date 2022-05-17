import $ from "jquery"
import { P5Instance, ReactP5Wrapper, Sketch, SketchProps } from "react-p5-wrapper"
import { BuildingBlock } from "../building-block"
import { BlockViewModel as BuildingBlockViewModel } from "./block-view-model"
import SketchProvider from "./sketch-provider"

const sketch: Sketch = (p5: P5Instance) => {
   const overlappingFactor = 0.6
   let blocks: BuildingBlockViewModel[] = []
   p5.setup = () => {
      console.log($("#sketch").width()!)
      p5.createCanvas($("#sketch").width()!, $("#sketch").height()!)
      p5.background(255)
   }

   p5.draw = () => {
      p5.background(255)
      const x = 200
      let y = p5.height - 100
      blocks?.forEach((block) => {
         y -= block.height * overlappingFactor
         p5.image(block.image, x, y, block.width, block.height)
      })
   }

   p5.updateWithProps = (props: SketchProps) => {
      p5.resizeCanvas($("#sketch").width()!, $("#sketch").height()!)
      if (props.blocks) {
         console.log("Updating blocks")
         console.log($("#sketch").width()!)
         blocks = (props!.blocks as BuildingBlock[]).map((block) => BuildingBlockViewModel.fromBuildingBlock(block, p5))
      }
   }
}

export default function EngineeringMeetingSketch() {
   return (
      <SketchProvider.Consumer>
         {(blocks) => (
            <div className="EngineeringMeetingSketch" id="sketch">
               <ReactP5Wrapper customClass="canvas" sketch={sketch} blocks={blocks} />
            </div>
         )}
      </SketchProvider.Consumer>
   )
}
