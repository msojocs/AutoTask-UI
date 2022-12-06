/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/**
 * Map<k, v>转换为对象
 * @param list
 * @returns
 */
export const dataList2objList = (list: any) => {
  const result = []
  for (const data of list) {
    const obj: any = {}
    for (const item of data) {
      let k = item.dataname
      let v = item.datavalue
      if (k === undefined) {
        k = item.DATANAME
        v = item.DATAVALUE
      }
      obj[k] = v
    }
    result.push(obj)
  }
  return result
}
/**
 * DataList提取key
 * @param list
 * @returns
 */
// export const dataList2keyList = (list: any) => {
//   const result: string[] = []
//   if (list === null || list === undefined || list.length === 0)
//     return result
//   for (const item of list[0]) {
//     let k = item.dataname
//     if (k === undefined)
//       k = item.DATANAME
//     result.push(k as string)
//   }
//   return result
// }
export const objList2dataList = (objList: any[]) => {
  const result = []
  for (const obj1 of objList) {
    const data: any = []
    obj1.forEach((k: any, v: any) => {
      data.push({
        dataname: k,
        datavalue: v,
      })
    })
    result.push(data)
  }
  return result
}
