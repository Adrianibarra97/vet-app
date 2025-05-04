export class FilterTurn {
    day: string | null
    today: boolean
    thisWeek: boolean
    constructor(
        day: string | null,
        today: boolean,
        thisWeek: boolean
    ) {
        this.day = day === '' ? null : day
        this.today = today
        this.thisWeek = thisWeek
    }
}