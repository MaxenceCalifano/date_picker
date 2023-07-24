# React Date Picker

A simple and easy to use date picker build with React and dayjs

![Static Badge](https://img.shields.io/badge/react-white?style=for-the-badge&logo=react&logoColor=61DAFB&color=181717)


## Features

- Display a calendar
- Select date
- Change month and year quickly with selector

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install react-date-picker-mc
    $ yarn add react-date-picker-mc

    ⚠️ These component needs to receive a dayjs date object
    $ npm install daysjs
    $ yarn add daysjs

### Usage

The component needs two props: 

|   Props                       |  Types                            | Required             | Default        | Description                               |
|   --------------------------  |  -------------------------------  | --------------------:| -------------: | -----------------------------------------:|
| isOpen                     |  Bool                   | ✅                   |                | Boolean that indicates if the calendat tootip should be open or not |
| setIsOpen                         | function        |          ✅            |                | change the state of isOpen |
| date                         | Object       |          ✅            |                | A dayjs date object |
| setDate                         | function       |          ✅            |                | change the state of date |


```jsx
import { Datepicker } from 'react-date-picker-mc'
import "react-date-picker-mc/dist/style.css"

import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

function App() {
    const [date, setDate] = useState(dayjs())
    const [calendarIsOpen, setCalendarIsOpen] = useState(false)
  return (
    <div className="App">
        <Datepicker isOpen={calendarIsOpen} setIsOpen={setCalendarIsOpen} selectedDate={date} setSelectedDate={setDate} />
    </div>
  )
}

export default App

```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-maxencecalifano.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/maxence-califano/)


[![github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MaxenceCalifano)