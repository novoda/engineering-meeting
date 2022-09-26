import p5, { Image } from "p5";
import { BuildingBlock } from '../models/building-block';

export class StructureViewModel {
    readonly blocks: BlockViewModel[] = [];
    readonly data: BuildingBlock[] = [];

    static from(blocks: BuildingBlock[], sketch: p5, canvasHeight: number): StructureViewModel {
        const blocksViewModel: BlockViewModel[] = blocks.map(block => BlockViewModel.from(block, sketch, canvasHeight, blocks.length));
        return new StructureViewModel(blocksViewModel, blocks);
    }

    constructor(blocks: BlockViewModel[], data: BuildingBlock[]) {
        this.blocks = blocks;
        this.data = data;
    }

    get height() {
        return this.blocks.reduce((acc, block) => acc + block.height * 0.6, 0)
    }
}

export class BlockViewModel {
    readonly image: Image
    private scale: number

    static from(buildingBlock: BuildingBlock, sketch: p5, canvasHeight: number, numberOfBlocks: number): BlockViewModel {
        const image = sketch.loadImage(buildingBlock.imagePath)
        return new BlockViewModel({
            image,
            scale: canvasHeight / (Math.max(4, numberOfBlocks) * 325)
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
