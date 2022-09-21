import html2canvas from 'html2canvas';
export class ScreenshotTaker {
    async takeScreenshot(): Promise<HTMLCanvasElement> {
        const page = document.getElementById("root")
        const options = { ignoreElements: (element: Element) => element.hasAttribute("exclude-from-screenshot"), backgroundColor: "#00000000", windowWidth: 1920, windowHeight: 988 }
        if (page) {
            return await html2canvas(page, options)
        }
        throw Error('Unable to get root elemante for screenshot creation')
    }
}
