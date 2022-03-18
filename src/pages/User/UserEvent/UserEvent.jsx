import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventDetailForUser, regisEvent } from '../../../services/event/EventService'
import './UserEvent.css'
import parse from 'html-react-parser';
import { Button } from '@mui/material';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import {useDispatch} from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions';
import receiveMessageCode from "../../../utils/messageCode";
import { TextField } from '@material-ui/core';
import moment from 'moment';

const UserEvent = () => {
    const [eventDetail,setEventDetail] = useState({})
    const [loading,setLoading] = useState(false)
    const [regis,setRegis] = useState(eventDetail.isCare_Register === 2 ? true : false)
    const [confirmDialog,setConfirmDialog] = useState({
        isOpen:false,
        title : "",
        subTitle : ""
    })
    const {eventId} = useParams()   
    useEffect(() => {
        getEventDetailForUser(eventId,100).then(res=> {
            if(res.statusCode === 200) {
                setEventDetail(res.data)
            } else {
                setEventDetail(null)
            }
        })
    },[confirmDialog.isOpen])

    const dispatch = useDispatch()

    const handleRegisEvetnt = () =>{
        setLoading(true)
        regisEvent(eventId,2).then(res => {
            if(res.statusCode === 200) {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen : false
                })
                setRegis(true)
                dispatch(notifySuccessfully("Regised Event Successfully !!!"))

            } else {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen : false
                })
                dispatch(notifyError(receiveMessageCode(res.messageCode)))
            }
        }).catch((err) => {
            setConfirmDialog({
                ...confirmDialog,
                isOpen : false
            })
            dispatch(notifyError(receiveMessageCode(err)))
        })
        setLoading(false)
    }


    if(eventDetail === null) return "Loading...."

  return (
    <div className='user-event-page'>
        <div className="ue-content-containter">
            <div className="header">
                    {eventDetail.event_name}
            </div>
            <div style={{fontWeigth:"500",color:'red'}}>
                  Open register:  * {moment(eventDetail.date_start_join).format("DD-MMM-YYYY HH:mm")} - {moment(eventDetail.date_end_join).format("DD-MMM-YYYY HH:mm")}
                </div>
            <div className="ue-content">
            {eventDetail.contents && eventDetail.contents.map((co) => {
                return parse(co.content)
            })}
            </div>
            <div className="regis-button">

                {
                    eventDetail.isCare_Register === 2 ? 
                    <Button variant="standard" color='primary' disabled={!regis}>
                       You 've registed this event. Please be on time !
                    </Button>
                     :
                    <Button variant='contained' color='primary' 
                    onClick={() => {
                        setConfirmDialog({
                            isOpen : true, 
                            title : "Register this event ?",
                            subTitle : "Your attend code will be sent to your mail. You will need it at the entrance. Enjoy this event !",
                            onConfirm : () => handleRegisEvetnt()
                        })
                    }}
                    > 
                    Register now !!!
                </Button>
                }
               
                </div>
        </div>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </div>
  )
}

export default UserEvent