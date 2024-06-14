import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReminderSet from "./ReminderSet";
import ReminderDetail from "./ReminderDetail";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [rdate, setrdate] = useState("");
  const [openSet, setOpenSet] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

      <ReminderSet rdate={rdate} open={openSet} setOpen={setOpenSet} addEvent={addEvent} />
      <ReminderDetail
        event={selectedEvent}
        open={openDetail}
        setOpen={setOpenDetail}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MyCalendar;
