import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventDetailForUser, regisEvent } from '../../../services/event/EventService'
import './UserEvent.css'
import parse from 'html-react-parser';
import { Button } from '@mui/material';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import {useDispatch} from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions';


const UserEvent = () => {
    const [eventDetail,setEventDetail] = useState({})
    const [loading,setLoading] = useState(false)
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
    },[])

    const dispatch = useDispatch()

    const handleRegisEvetnt = () =>{
        setLoading(true)
        regisEvent(eventId,2).then(res => {
            if(res.statusCode === 200) {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen : false
                })
                dispatch(notifySuccessfully("Regised Event Successfully !!!"))

            } else {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen : false
                })
                dispatch(notifyError())
            }
        }).catch(() => {
            setConfirmDialog({
                ...confirmDialog,
                isOpen : false
            })
            dispatch(notifyError())
        })
        setLoading(false)
    }


    if(eventDetail === null) return "Loading...."

  return (
    <div className='user-event-page'>
        <div className="ue-content-containter">
            <div className="ue-content">
            {eventDetail.contents && eventDetail.contents.map((co) => {
                return parse(co.content)
            })}
            </div>
            <div className="regis-button">
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
                    Regis now !!!
                </Button>
                </div>
        </div>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </div>
  )
}

export default UserEvent