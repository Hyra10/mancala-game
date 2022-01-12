export function deepClone<T>(obj: any): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

export const sum = (arr: number[]) => {
  return arr.reduce((acc: number, cur: number) => acc + cur, 0)
}

export const toSentenceCase = (text: string = '') => {
  return text
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim()
}
