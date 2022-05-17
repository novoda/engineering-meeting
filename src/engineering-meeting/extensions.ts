export { }

declare global {
    interface Array<T> {
        shuffle(): Array<T>
        removeDuplicates(): Array<T>
    }

    interface HTMLElement {
        toClipboard(onSuccess: () => void): void
    }
}


// eslint-disable-next-line no-extend-native
Array.prototype.removeDuplicates = function <T>(this: T[]) {
    return this.filter((value, index, self) => self.indexOf(value) === index)
}

// eslint-disable-next-line no-extend-native
Array.prototype.shuffle = function <T>(this: T[]) {
    return this.sort(() => Math.random() - 0.5)
}

HTMLCanvasElement.prototype.toClipboard = function (this: HTMLCanvasElement, onSuccess: () => void) {
    const data = async () =>
        new Promise<Blob>((resolve, reject) => {
            this.toBlob((blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject()
                }
            })
        })

    navigator.clipboard.write([new ClipboardItem({ "image/png": data() })]).then(() => {
        onSuccess()
    })
}
