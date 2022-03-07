import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {searchAccount} from "../services/account/account"
import { ContactlessOutlined } from '@mui/icons-material'

export const  useAccountSearch = (searchName ,status , pageSize, page,openPopUp) => {
    
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        setLoading(true)
        // let cancel
        // cancel = axios.CancelToken.source()
        searchAccount(searchName,status,pageSize,page,null).then((res) => {
            if (res.data !== null) {
                setAccounts(res.data)
                setTotalRow(res.total)
            } else {
                setAccounts([])
                setTotalRow(0)
            }
        })
        setLoading(false)
    }, [searchName, status, pageSize, page,openPopUp])
    return {accounts, loading, totalRow}
}




