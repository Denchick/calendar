function build(year, month) {
    const calendar = getDatesList(year, month);
    const days = calendar.map(date => date.getDate());
    const firstDayOfMonth = days.indexOf(1);
    if (firstDayOfMonth === -1) {
        firstDayOfMonth = 0;
    }
    const lastDayOfMonth = days.lastIndexOf(1);
    if (lastDayOfMonth === -1) {
        lastDayOfMonth = 41;
    }
    
    const previousMonth =  calendar.slice(0, firstDayOfMonth);
    const targetMonth = calendar.slice(firstDayOfMonth, lastDayOfMonth);
    const nextMonth = calendar.slice(lastDayOfMonth);

    return [].concat( 
        colorPartOfCalendar(previousMonth, '#666666', '#ff9999'),
        colorPartOfCalendar(targetMonth, '#ffffff', '#ff0000'),
        colorPartOfCalendar(nextMonth, '#666666', '#ff9999')
    );
}

function colorPartOfCalendar(partOfCalendar, workingDayColor, holidayColor) {
    return partOfCalendar.map(currentDate => {
        if (isHolidayDay(currentDate)) {
            return createDayObject(currentDate, holidayColor);
        }

        return createDayObject(currentDate, workingDayColor);
    })
}

function getDatesList(year, month) {
    const firstDate = getFirstDayOfCalendar(year, month);
    let dates = [firstDate];
    for (let i = 0; i < 42 - 1; i++) {
        dates.push(getNextDay(dates[i]))
    }

    return dates;
}

function getFirstDayOfCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay() || 7;
    return new Date(year, month - 1, 2 - dayOfWeek); // тут баг
}

function getNextDay(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    return new Date(year, month, day + 1);
}

function getFormattedDay(date) {
    const day = date.getDate().toString();
    if (day.length == 2) {
        return day;
    }

    return '0' + day;
}

function isHolidayDay(date) {
    const dayOfWeek = date.getDay();

    return dayOfWeek === 6 || dayOfWeek === 0;
}

function createDayObject(date, color) {
    return {
        day: getFormattedDay(date),
        color: color
    };
}

exports.build = build;