import { allBlocks } from "./building-block"

export class BlockRandomiser {
   randomise() {
      const availableBlocks = allBlocks.filter((block) => block.name !== undefined).shuffle()
      const blocks = []
      let minDuration = 0
      let maxDuration = 0
      for (let i = 0; i < availableBlocks.length && (maxDuration <= 70 || minDuration >= 40); i++) {
         blocks.push(availableBlocks[i])
         maxDuration += availableBlocks[i].duration.maximum
         minDuration += availableBlocks[i].duration.minimum
      }
      return blocks
   }
}
