
export function MapPathToToolName({pathName}: {pathName: string}) {
    let pathMap = {
        "rpbg": "Replace Background",
        "rembg": "Remove Background",
    }
    return pathMap[pathName]
}