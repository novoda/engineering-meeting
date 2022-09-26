import { BuildingBlock } from "./building-block"

export type UiState = Loading | Error | Content | Initial

class Initial {
    readonly type: "initial" = "initial"
}
class Loading {
    readonly type: "loading" = "loading"
}

class Error {
    readonly type: "error" = "error"
    message: string

    constructor(message: string) {
        this.message = message
    }
}

class Content {
    readonly type: "content" = "content"
    blocks: BuildingBlock[]
    name: string
    duration: string
    date: string
    imageUrl: string | undefined

    constructor(blocks: BuildingBlock[], name: string, duration: string, date: string, imageUrl: string | undefined = undefined) {
        this.blocks = blocks
        this.name = name
        this.duration = duration
        this.date = date
        this.imageUrl = imageUrl
    }
}

export { Content, Loading, Error, Initial}
