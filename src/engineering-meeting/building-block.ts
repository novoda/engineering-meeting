const IMAGE_PATH = `${process.env.PUBLIC_URL}/images`
export class BuildingBlock {
    readonly id: number | undefined
    readonly name: string
    readonly description: string
    readonly purpose: string
    readonly duration: Duration
    readonly imagePath: string
    constructor({ id, name, description, purpose, duration, imagePath }: { id: number | undefined; name: string; description: string; purpose: string; duration: Duration; imagePath: string }) {
        this.id = id
        this.name = name
        this.description = description
        this.purpose = purpose
        this.duration = duration
        this.imagePath = imagePath
    }
}

export class Duration {
    readonly minimum: number
    readonly maximum: number
    constructor({ minimum, maximum }: { minimum: number; maximum: number; }) {
        this.minimum = minimum
        this.maximum = maximum
    }
}

export const allBlocks = [
    new BuildingBlock(
        {
            id: 1,
            name: "Wiki Page Showcase",
            description: "This building block is an opportunity to showcase a particularly useful entry in the wiki.",
            purpose: "Surfacing the most useful content of the wiki and encouraging people to write more entries in the wiki.",
            duration: new Duration({ minimum: 5, maximum: 15 }),
            imagePath: `${IMAGE_PATH}/image1.png`,
        },
    ),
    new BuildingBlock(
        {
            id: 2,
            name: "Project Updates",
            description: "This is a 5 minutes max updates for our running projects. Each team self organise to share their updates to the team.",
            purpose: "The purpose of this block is to help the team to be up to date with the events in the projects we are working on at Novoda.",
            duration: new Duration({ minimum: 15, maximum: 20 }),
            imagePath: `${IMAGE_PATH}/image2.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image3.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image4.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}image5.png`,
        },
    ),
    new BuildingBlock(
        {
            id: 6,
            name: "Learning Pill",
            description: "This building block is about knowledge sharing. You can share everything you find interesting.\nJust entry the topic you would like to discuss and the most voted one will be presented.",
            purpose: "Sharing is caring. The idea is to create an engaging place on which we can gather to share our learning with our colleagues.",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image6.png`,
        },
    ),
    new BuildingBlock(
        {
            id: 7,
            name: "Result.failure === WIN",
            description: "This building block is about celebration around failure and the learning associated to that.\nEveryone should have thought about their own failures and ready for sharing it as a group. \nA roulette will dictate the person sharing their failures.",
            purpose: "To be able to share failure stories and celebrate the leanings associated to them.\nIt’s OK to fail.Failure is part of learning.This building block help us to  be conscious about that.",
            duration: new Duration({ minimum: 5, maximum: 10 }),
            imagePath: `${IMAGE_PATH}/image7.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image8.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image9.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image10.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image11.png`,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/image12.png`,
        },
    ),
]