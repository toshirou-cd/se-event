import React, { useEffect, useState} from 'react'
import { getGroupEventList } from '../services/event/EventService'

export const  useGroupEventSearch = (searchGEName , pageSizeGE,statusGE , pageGE,createGEPopup,confirmDialog) => {
    
    const [groupEvents, setGroupEvents] = useState([])
    const [loadingSE, setLoadingGE] = useState(false)
    const [totalGERow, setGETotalRow] = useState()


    useEffect(() => {
        setLoadingGE(true)
        getGroupEventList(searchGEName,pageSizeGE,statusGE,pageGE,null,null) 
        .then((res) => {
            if (res.statusCode === 200 ) {
                console.log('events ' + JSON.stringify(res.data))
                setGroupEvents(res.data)
                setGETotalRow(res.total)
            } else {
                setGroupEvents([])
                setGETotalRow(0)
            }
            setLoadingGE(false)
        })
        .catch((err) => {
            console.log('err' + err)
        })
    }, [searchGEName, statusGE, pageSizeGE, pageGE,createGEPopup.isOpen,confirmDialog])
    return {groupEvents, loadingSE, totalGERow}
}
