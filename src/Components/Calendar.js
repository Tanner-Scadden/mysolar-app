import React, { useState, useEffect, useReducer } from 'react';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from 'moment';
import swal from 'sweetalert';
import axios from 'axios';

import TopNav from '../shared/TopNav';

import '../Styles/components/Calendar.scss';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const Calendar = (props) => {

  // const [addEvent, toggleAdd] = useState(false);

  const [events, dispatch] = useReducer(reducer, []);

  function reducer(events, action) {
    switch (action.type) {

      case ('gotData'): {
        let { data } = action.res;

        data = data.map(event => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          event.allDay = false;
          return event;
        })

        return [...data];
      }

      case ('changeName'): {
        const { index, name } = action;

        events[index].title = name;

        return [...events];
      }

      case ('changeTime'): {
        const { index, start, end } = action;

        events[index].start = start;
        events[index].end = end;

        return [...events]
      }

      default: {
        return [...events]
      }
    }
  }

  function changeEventTime(e) {
    const { id, type } = e.event;
    const { user_type } = props.account
    
    if (type !== "Personal" && user_type !== "admin"){
      return swal("Error!", "You do not have permission to edit these events", "error");
    }

    let { start, end } = e;
    start = moment(start).format("YYYY-MM-DD HH:mm:ss");
    end = moment(end).format("YYYY-MM-DD HH:mm:ss");

    const event = {
      start,
      end,
      id
    }

    axios.put('/api/changeEvent', {event, id: props.account.employee_id}).then(res => {
      dispatch({ type: 'gotData', res })
    }).catch(err => console.log(err));
  };

  function eventStyleGetter(event) {
    let backgroundColor = '#' + event.hexColor;
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      display: 'block',
      border: '1px solid black',
      padding: '.5em 0',
      textAlign: 'center'
    };

    const { type } = event;
    if (type === "Group Meeting") {
      style.backgroundColor = "#3174AD"
    }

    if (type === "1 on 1") {
      style.backgroundColor = "#3CB371"
    }

    if (type === "Personal") {
      style.backgroundColor = "#DC143C"
    }




    return {
      style: style
    };
  }

  useEffect(() => {
    axios.get('/auth/getUser').then((res) => {
      axios.get(`/api/getEvents?id=${res.data.employee_id}`).then((res) => {
        dispatch({ type: 'gotData', res })
      }).catch(err => console.log(err));
    }).catch((err) => console.log(err))
  }, [])

  return (
    <div className="container">
      <TopNav
        name="Calendar"
      />
      <div className="calendar">
        <div className={!events.length ? 'loading' : null}>
          <DnDCalendar
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            localizer={localizer}
            onEventDrop={(e) => changeEventTime(e)}
            onEventResize={(e) => changeEventTime(e)}
            eventPropGetter={eventStyleGetter}
            resizable
            className="big-calendar"
          />
        </div>

        <div className="info">

          <div className="add">

          </div>

          <div className="key">

            <ul>
              <li className="box blue"></li>
              <li className="box green"></li>
              <li className="box red"></li>
            </ul>

            <ul>
              <li className="name">Group Meeting</li>
              <li className="name">1 on 1</li>
              <li className="name">Personal Event</li>
            </ul>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Calendar;