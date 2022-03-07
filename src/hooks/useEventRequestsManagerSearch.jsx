import React, { useEffect, useState} from 'react'
import { getEventReqHeadManagerList, getEventReqManagerList } from '../services/event/EventRequestService'
import { getEventList } from '../services/event/EventService'

export const  useEventRequestSearch = (searchName,pageSize,status , page,confirmDialog,role) => {
    
    const [eventRequests, setEventRequests] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        setLoading(true)
        if(role === "Manager") {

            getEventReqManagerList(searchName,pageSize,status,page,null,null) 
            .then((res) => {
                if (res.statusCode === 200 ) {
                    console.log('events ' + JSON.stringify(res.data))
                    setEventRequests(res.data)
                    setTotalRow(res.total)
                } else {
                    setEventRequests([])
                    setTotalRow(0)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log('err' + err)
            })
        } else {
            getEventReqHeadManagerList(searchName,pageSize,status,page,null,null) 
            .then((res) => {
                if (res.statusCode === 200 ) {
                    console.log('events ' + JSON.stringify(res.data))
                    setEventRequests(res.data)
                    setTotalRow(res.total)
                } else {
                    setEventRequests([])
                    setTotalRow(0)
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log('err' + err)
            })
        }
        }, [searchName,status, pageSize, page,confirmDialog])
    return {eventRequests, loading, totalRow}
}
