const IMAGE_PATH = `${process.env.PUBLIC_URL}/images/blocks`
export class BuildingBlock {
    readonly id: number | undefined
    readonly name: string
    readonly description: string
    readonly purpose: string
    readonly duration: Duration
    readonly imagePath: string
    readonly isRequired: boolean
    constructor({ id, name, description, purpose, duration, imagePath, isRequired }: { id: number | undefined; name: string; description: string; purpose: string; duration: Duration; imagePath: string; isRequired: boolean }) {
        this.id = id
        this.name = name
        this.description = description
        this.purpose = purpose
        this.duration = duration
        this.imagePath = imagePath
        this.isRequired = isRequired
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
            imagePath: `${IMAGE_PATH}/block1.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: 2,
            name: "Project Updates",
            description: "This is a 5 minutes max updates for our running projects. Each team self organise to share their updates to the team.",
            purpose: "The purpose of this block is to help the team to be up to date with the events in the projects we are working on at Novoda.",
            duration: new Duration({ minimum: 15, maximum: 20 }),
            imagePath: `${IMAGE_PATH}/block2.png`,
            isRequired: true,
        },
    ),
    new BuildingBlock(
        {
            id: 3,
            name: "Tool of the month",
            description: "Showcase a tool we use that we like, new or old.",
            purpose: "We share ideas about tools that we use for work.",
            duration: new Duration({ minimum: 5, maximum: 15 }),
            imagePath: `${IMAGE_PATH}/block3.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: 4,
            name: "Old H&T resurfaced",
            description: "Not much time to write a new H&T? Why not dig out an old one and present it as new?",
            purpose: "H&T  sharing.",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block4.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: 5,
            name: "Tech and the World",
            description: "A roundtable discussion or presentation on some aspect of how the tech industry affects the world. Might be an ethical issue, or maybe just a presentation on an interesting new application of tech in the world.",
            purpose: "A greater awareness of how technology affects the contemporary world (for good or ill).",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block5.png`,
            isRequired: true,
        },
    ),
    new BuildingBlock(
        {
            id: 6,
            name: "Learning Pill",
            description: "This building block is about knowledge sharing. You can share everything you find interesting.\nJust entry the topic you would like to discuss and the most voted one will be presented.",
            purpose: "Sharing is caring. The idea is to create an engaging place on which we can gather to share our learning with our colleagues.",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block6.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: 7,
            name: "Result.failure === WIN",
            description: "This building block is about celebration around failure and the learning associated to that.\nEveryone should have thought about their own failures and ready for sharing it as a group. \nA roulette will dictate the person sharing their failures.",
            purpose: "To be able to share failure stories and celebrate the leanings associated to them.\nIt’s OK to fail.Failure is part of learning.This building block help us to  be conscious about that.",
            duration: new Duration({ minimum: 5, maximum: 10 }),
            imagePath: `${IMAGE_PATH}/block7.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: 8,
            name: "Quick Wins",
            description: "Lets celebrate our wins as a department too, regardless if they’re big or small, or if there’s a lesson to share or not",
            purpose: "Integrate the celebration of success into the Eng department more",
            duration: new Duration({ minimum: 5, maximum: 10 }),
            imagePath: `${IMAGE_PATH}/block8.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block9.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block10.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block11.png`,
            isRequired: false,
        },
    ),
    new BuildingBlock(
        {
            id: undefined,
            name: "???",
            description: "???",
            purpose: "???",
            duration: new Duration({ minimum: 20, maximum: 30 }),
            imagePath: `${IMAGE_PATH}/block12.png`,
            isRequired: false,
        },
    ),
].filter(block => block.id !== undefined)