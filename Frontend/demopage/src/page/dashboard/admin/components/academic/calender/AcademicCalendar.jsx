import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "antd";
import EventModal from "./EventModal";
import { getEvents } from "../../../../../../services/clenadarService";

export default function AcademicCalendar(){

const [events,setEvents] = useState([]);
const [open,setOpen] = useState(false);
const [selectedDate,setSelectedDate] = useState(null);

useEffect(()=>{
 // eslint-disable-next-line react-hooks/immutability
 loadEvents();
},[]);

const loadEvents = async ()=>{
 const data = await getEvents();
 setEvents(data);
};

return(

<div className="bg-white p-6 rounded-lg shadow">

<div className="flex justify-between mb-4">

<h2 className="text-xl font-semibold">
Academic Calendar
</h2>

<Button type="primary" onClick={()=>setOpen(true)}>
Add Event
</Button>

</div>

<FullCalendar
plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}

initialView="dayGridMonth"

headerToolbar={{
 left:"prev,next today",
 center:"title",
 right:"dayGridMonth,timeGridWeek,timeGridDay"
}}

events={events}

dateClick={(info)=>{
 setSelectedDate(info.dateStr);
 setOpen(true);
}}

height="650px"
/>

<EventModal
open={open}
setOpen={setOpen}
selectedDate={selectedDate}
reload={loadEvents}
/>

</div>

);

}