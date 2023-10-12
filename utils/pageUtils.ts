type getPageArrayFunction = (pageIndex: number, pageArray: number[], siblings?: number) => number[]

export const getPageArray: getPageArrayFunction = (pageIndex, pageArray, siblings = 2) => {
    const lastIndex = pageArray.length - 1 //The last index in the array
    const take = 1 + (siblings * 2) //The maximum number of elements returned

    // pageArray: [0,1,2,3,4,5,6,7,8]
    // index - result
    // 0 - [0,1,2,3,4]
    // 1 - [0,1,2,3,4]
    // 2 - [0,1,2,3,4]
    // ..............
    // 3 - [1,2,3,4,5]
    // 4 - [2,3,4,5,6]
    // 5 - [3,4,5,6,7]
    // ..............
    // 6 - [4,5,6,7,8]
    // 7 - [4,5,6,7,8]
    // 8 - [4,5,6,7,8]

    if (pageIndex <= siblings) {
        return pageArray.slice(0, take)
    }

    if (pageIndex >= lastIndex - siblings) {
        return pageArray.slice(Math.max(0, (lastIndex - take + 1)))
    }

    return pageArray.slice(pageIndex - siblings, pageIndex + siblings + 1)
}