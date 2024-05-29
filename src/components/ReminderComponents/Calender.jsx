import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import ReminderSet from "./ReminderSet";


const localizer = momentLocalizer(moment);

const myEventsList = [
  // {
  //   start: moment("2024-02-27T14:00:00").toDate(),
  //   end: moment("2024-02-27T14:00:00").toDate(),
  //   title: "Birthday",
  // },
  {
    start: moment("2024-04-12T14:00:00").toDate(),
    end: moment("2024-04-12T14:00:00").toDate(),
    title: "name",
  },
  {
    start: moment("2024-02-01T14:00:00").toDate(),
    end: moment("2024-02-01T14:00:00").toDate(),
    title: "special event",
  },
  {
    start: moment("2024-04-14T14:00:00").toDate(),
    end: moment("2024-04-14T14:00:00").toDate(),
    title: "Birthday",
  }
  // {
  //   start: moment("Feb 15 2024").toDate(),
  //   end: moment("Feb 15 2024").toDate(),
  //   title: "special event",
  // },
];

const MyCalendar = (props) => {
  const [rdate,setrdate] = useState("");
  const [open, setOpen] = useState(false);

  const handlePopup = (event) => {
    const selectedDate = moment(event.start).format('YYYY-MM-DD');
    console.log(selectedDate);
    setrdate(selectedDate)
    setOpen(true);
    console.log("This is open popup");
  
  };
  return (
    <div><Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handlePopup}
        style={{ height: 500 }}
        views={{ month: true }}
      />

      <ReminderSet rdate={rdate} open={open} setOpen={setOpen} />
    </div>
  );
};
export default MyCalendar;
