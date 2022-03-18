import React, { useEffect, useState} from 'react'
import { getUserList } from '../services/event/EventService'

export const  useGuestListSearch = (searchName , pageSize,status , page,id,type,open,checkPopup,confirm) => {
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        setLoading(true)
        getUserList(searchName,pageSize,status,page,id,type) 
        .then((res) => {
            if (res.statusCode === 200 ) {
                // console.log('events ' + JSON.stringify(res.data))
                setUsers(res.data)
                setTotalRow(res.total)
            } else {
                setUsers([])
                setTotalRow(0)
            }
            setLoading(false)
        })
        .catch((err) => {
            console.log('err' + err)
        })
    }, [searchName, status, pageSize, page,open,checkPopup,confirm])
    return {users, loading, totalRow}
}
