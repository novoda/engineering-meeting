import html2canvas from 'html2canvas';
export class ScreenshotTaker {
    async takeScreenshot(): Promise<HTMLCanvasElement> {
        const page = document.getElementById("root")!
        const options = { ignoreElements: (element: Element) => element.hasAttribute("exclude-from-screenshot") }
        return await html2canvas(page, options)
    }
}
