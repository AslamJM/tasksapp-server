export function expTime() {
    const date = new Date()
    const month = (date.getMonth() + 1) % 12
    date.setMonth(month)
    if (month === 0) {
        date.setFullYear(date.getFullYear() + 1)
    }
    return date
}