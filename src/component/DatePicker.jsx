import dayjs from "dayjs";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'
import { GrCaretPrevious, GrCaretNext, GrHomeRounded } from "react-icons/gr";
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/fr'
dayjs.extend(weekday)
dayjs.locale('fr')


function Datepicker({ selectedDate, setSelectedDate, isOpen, setIsOpen }) {
    const [date, setDate] = useState(selectedDate)
    const ref = useRef(null)

    const getCalendarCells = useCallback(date => {
        const daysToFirstOfTheMonth = date.date(1).weekday() - 1

        const calendarCells = []
        const daysInMonth = date.daysInMonth()

        const prepareCell = (date, dayNumber) => {
            return {
                text: String(dayNumber),
                value: date.clone().set("date", dayNumber)
            };
        };

        // push current month day cells
        for (let i = 0; i < daysInMonth; i++) {
            calendarCells.push(prepareCell(date, i + 1));
        }
        const cellsToAdd = 42 - daysInMonth - (daysToFirstOfTheMonth + 1)

        // Gets the number of days between the first day of the month and the monday of the same week, same for the last day
        // add to start from prev month
        const lastMonth = date.subtract(1, "month");
        for (let i = 0; i <= daysToFirstOfTheMonth; i++) {
            calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i));
        }

        // add to end from next month
        const nextMonth = date.add(1, "month");
        for (let i = 0; i < cellsToAdd; i++) {
            calendarCells.push(prepareCell(nextMonth, i + 1));
        }
        //const dateClone = date.clone().set('date', 12)
        return calendarCells
    }, [])

    const cells = useMemo(() => getCalendarCells(date), [date, getCalendarCells])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(state => !state)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [setIsOpen, ref])

    const numberOfMonths = Array.from(Array(12).keys())
    const numberOfYears = Array.from(Array(144).keys())

    return (
        <>
            {
                isOpen ? <div className="calendar" ref={ref}>
                    <div className="calendar_header">
                        <GrCaretPrevious className="arrow" onClick={() => setDate(date => date.clone().subtract(1, "month"))} />
                        <GrHomeRounded onClick={() => setDate(dayjs())} />
                        <div className="selectWrapper">
                            <select name="month"
                                value={date.month()}
                                onChange={(e) => setDate(date => date.clone().set('month', e.target.value))}>
                                {
                                    numberOfMonths.map((key) => <option
                                        key={key}
                                        value={key}>

                                        {dayjs().month(key).format("MMM")}
                                    </option>
                                    )
                                }
                            </select>

                            <select name="year" value={date.year()} onChange={(e) => setDate(date => date.clone().set('year', e.target.value))}>
                                {
                                    numberOfYears.map((key) => <option
                                        key={key}
                                        value={dayjs().year(2050).subtract(key, "year").format('YYYY')}>

                                        {dayjs().year(2050).subtract(key, "year").format('YYYY')}
                                    </option>)
                                }
                            </select>
                        </div>
                        <GrCaretNext className="arrow" onClick={() => setDate(date.clone().add(1, "month"))} />
                    </div>

                    <div className="daysOfWeek">Lun</div>
                    <div className="daysOfWeek">Mar</div>
                    <div className="daysOfWeek">Mer</div>
                    <div className="daysOfWeek">Jeu</div>
                    <div className="daysOfWeek">Ven</div>
                    <div className="daysOfWeek">Sam</div>
                    <div className="daysOfWeek">Dim</div>

                    {
                        cells.map((cell, cellIndex) => (

                            <div className={`cell ${selectedDate.format() === cell.value.format() ? "selectedCell" : ''} ${dayjs().format('DD-MM') === cell.value.format('DD-MM') ? "todayCell" : ''}`}
                                key={cellIndex}
                                onClick={() => setSelectedDate(cell.value)}>
                                {cell.text}
                            </div>
                        )
                        )
                    }
                </div> : null
            }
        </>
    );
}

Datepicker.propTypes = {
    selectedDate: PropTypes.object,
    setSelectedDate: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
}
export { Datepicker };