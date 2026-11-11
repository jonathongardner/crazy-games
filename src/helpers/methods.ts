export function array<T>(count: number, callback: (index: number) => T): T[] {
  return Array.from({ length: count }, (_, index) => callback(index))
}

export function randomColor(): string {
  const color = Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0')
  return `#${color}`
}

export function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  timeout = 1000,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: TArgs) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), timeout)
  }
}
