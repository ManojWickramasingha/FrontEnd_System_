import React from "react";
import MyCalendar from "../../../components/ReminderComponents/Calender";

const Remender = () => {
  return (
    <div className="pageTemplate2">
      <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Reminder</h1>
      <div className="calender">
        <MyCalendar />
      </div>
    </div>
  );
};

export default Remender;
