import React, { useEffect, useState} from 'react'
import { getEventList } from '../services/event/EventService'

export const  useEventSearch = (searchName , pageSize,status , page,popup,confirmDialog) => {
    
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        setLoading(true)
        getEventList(searchName,pageSize,status,page,null,null) 
        .then((res) => {
            if (res.statusCode === 200 ) {
                console.log('events ' + JSON.stringify(res.data))
                setEvents(res.data)
                setTotalRow(res.total)
            } else {
                setEvents([])
                setTotalRow(0)
            }
            setLoading(false)
        })
        .catch((err) => {
            console.log('err' + err)
        })
    }, [searchName, status, pageSize, page,popup.isOpen,confirmDialog])
    return {events, loading, totalRow}
}
