import { allBlocks } from "./building-block"

export class BlockRandomiser {
   randomise() {
      const availableBlocks = allBlocks.filter((block) => block.id !== undefined).shuffle()
      const blocks = []
      let maxDuration = 0
      for (let i = 0; i < availableBlocks.length && (maxDuration <= 70); i++) {
         blocks.push(availableBlocks[i])
         maxDuration += availableBlocks[i].duration.maximum
      }
      return blocks
   }
}
