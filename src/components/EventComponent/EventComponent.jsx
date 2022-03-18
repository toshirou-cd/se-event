import moment from 'moment'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import BASE_URL from '../../utils/Url'
import './EventComponent.css'

const EventComponent = (props) => {
    const {event} = props

   if( !event) return null
   return (
    <div className="event-component"  >
        <img className="img-event" src={`${BASE_URL.images}/${event.event_img_url}`}/>
        <div className='e-name'> {event.event_name}</div>
        <div className='label'> Start from</div>
        <div > {moment(event.date_start_event).format("DD-MMM-yyyy")}</div>
        <div className='label'> -</div>
        <div > {moment(event.date_end_event).format("DD-MMM-yyyy")}</div>
        <div className='label'> Joining from </div>
        <div > {moment(event.date_start_join).format("DD-MMM-yyyy")} </div>
        <div className='label'> -</div>
        <div > {moment(event.date_start_join).format("DD-MMM-yyyy")}</div>
        <div  className='label'> Date create</div>
        <div  className='create-day'> {moment(event.date_create).format("DD-MMM-yyyy")}</div>
        <div className='label'>  Date update</div>
        <div  className='create-day'>{moment(event.date_update).format("DD-MMM-yyyy")}</div>
    </div>
  )
}

export default EventComponent