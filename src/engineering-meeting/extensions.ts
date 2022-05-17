export { }

declare global {
    interface Array<T> {
        shuffle(): Array<T>
        removeDuplicates(): Array<T>
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
