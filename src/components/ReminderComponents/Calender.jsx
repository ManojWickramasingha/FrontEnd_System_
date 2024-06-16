import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReminderSet from "./ReminderSet";
import ReminderDetail from "./ReminderDetail";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import axios from "axios";

const localizer = momentLocalizer(moment);




const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [rdate, setrdate] = useState(new Date());
  const [openSet, setOpenSet] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [count, setCount] = useState(0);

  const [tempevents, Settempevents] = useState([]);

  const handlePopup = ({ start }) => {
    const selectedDate = moment(start).format('YYYY-MM-DD');
    setrdate(selectedDate);
    setOpenSet(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDetail(true);
  };

  const handleDelete = () => {
    setEvents(events.filter(event => event !== selectedEvent));
    setOpenDetail(false);
  };

  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setOpenSet(false);
  };
  useEffect(() => {
    document.body.style.margin = "0";
    axios
      .get(
        "http://localhost:5296/api/Reminders",
      ).then((response) => {
        const data = response.data;
        console.log(data);
        
        const newItems = [];
        for (let i = 0; i < data.length; i++) {
          const newEvent = {
            id: data[i].reminderId,
            start: data[i].reminderstartDate,
            end: data[i].reminderendDate,
            title: data[i].reminderName,
            amount: data[i].reminderAmount,
            description: data[i].reminderDescription,

          };
          newItems.push(newEvent);
          console.log("newevent" ,newEvent);
      }
      setEvents(newItems);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [count]);



  return (
    <div>
      <style>
        {`
          .rbc-toolbar-label {
            font-size: 30px !important;
          }
          .rbc-today {
            background-color: #4ADE80 !important;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handlePopup}
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        views={{ month: true }}
      />

      <ReminderSet rdate={rdate} open={openSet} setOpen={setOpenSet} addEvent={addEvent} setCount={setCount} setOpenSet={setOpenSet} />
      <ReminderDetail
        event={selectedEvent}
        open={openDetail}
        setOpen={setOpenDetail}
        onDelete={handleDelete}
        events={events}
        setEvents={setEvents}
        setCount={setCount}
      />
    </div>
  );
};

export default MyCalendar;
