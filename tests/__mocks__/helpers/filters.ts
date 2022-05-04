export const formatDate = (dateInMs: number) => {
    if (!dateInMs) return
    const dateObj = new Date(dateInMs)
    const datePtBr = Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(dateObj)
    return datePtBr
}