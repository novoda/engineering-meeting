import p5, { Image } from "p5";
import { BuildingBlock } from '../building-block';

export class StructureViewModel {
    readonly blocks: BlockViewModel[] = [];
    readonly data: BuildingBlock[] = [];

    static from(blocks: BuildingBlock[], sketch: p5): StructureViewModel {
        const blocksViewModel: BlockViewModel[] = blocks.map(block => BlockViewModel.from(block, sketch, blocks.length));
        return new StructureViewModel(blocksViewModel, blocks);
    }

    constructor(blocks: BlockViewModel[], data: BuildingBlock[]) {
        this.blocks = blocks;
        this.data = data;
    }
}

export class BlockViewModel {
    readonly image: Image
    private scale: number

    static from(buildingBlock: BuildingBlock, sketch: p5, numberOfBlocks: number): BlockViewModel {
        const image = sketch.loadImage(buildingBlock.imagePath)
        return new BlockViewModel({
            image,
            scale: sketch.height / (Math.max(4, numberOfBlocks) * 600)
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
