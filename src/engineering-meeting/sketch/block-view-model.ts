import p5, { Image } from "p5";
import { BuildingBlock } from '../building-block';

export class BlockViewModel {
    readonly image: Image

    static fromBuildingBlock(buildingBlock: BuildingBlock, p5: p5): BlockViewModel {
        const image = p5.loadImage(buildingBlock.imagePath)
        return new BlockViewModel({
            image
        })
    }
    constructor({ image }: { image: Image }) {
        this.image = image
    }

    get width(): number {
        return this.image.width / 4
    }

    get height(): number {
        return this.image.height / 4
    }
}