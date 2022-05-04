export const debounce = <F extends (...args: any) => any>(
    func: F,
    waitFor: number,
) => {
    let timeoutId: ReturnType<typeof setTimeout>

    const debounced = (...args: any) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), waitFor)
    }

    return debounced as (...args: Parameters<F>) => ReturnType<F>
}