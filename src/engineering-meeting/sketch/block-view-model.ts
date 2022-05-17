import p5, { Image } from "p5";
import { BuildingBlock } from '../building-block';

export class BlockViewModel {
    readonly image: Image
    private scale: number

    static fromBuildingBlock(buildingBlock: BuildingBlock, p5: p5, numberOfBlocks: number): BlockViewModel {
        const image = p5.loadImage(buildingBlock.imagePath)
        return new BlockViewModel({
            image,
            scale: p5.height / (numberOfBlocks * 700)

        })
    }
    constructor({ image, scale }: { image: Image, scale: number }) {
        this.image = image
        this.scale = scale
    }

    get width(): number {
        return (this.image.width * this.scale)
    }

    get height(): number {
        return (this.image.height * this.scale)
    }
}