import { Dialog, DialogContent } from '@material-ui/core'
import { Button, DialogActions, DialogTitle, Divider, Input } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions'
import { checkCode } from '../../../services/event/EventService'

const CheckPopup = (props) => {
    const {checkPopup, setCheckPopup } = props
    const [code,setCode]= useState("")
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState(false)
    const dispatch  = useDispatch()
    const checkUserCode =() => {
        setLoading(true)
        checkCode(code,checkPopup.id).then(res => {
            if(res.statusCode === 200) {
                setCheckPopup({
                    ...checkPopup,
                    isOpen: false
                })
                dispatch(notifySuccessfully("Checked code success !"))
            } else {
                setError(true)
                dispatch(notifyError())
            }
        }
        )
        setLoading(false)
    }

  return (
    <Dialog 
        open={checkPopup.isOpen}
        onClose={() => setCheckPopup({...checkPopup, isOpen : false})}
        maxWidth="sm"
        disableEnforceFocus
    >
        <DialogTitle>
                Please input invite code 
                <Divider/>
        </DialogTitle>
        <DialogContent>
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>

            <Input variant="outlined" type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
            {
                error &&
            <span style={{color:"red"}}>Your code is invalid</span>
            }
            </div>
        </DialogContent>
        <DialogActions>
            <Button disabled={loading}
                onClick={checkUserCode}
            >
                Check 
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default CheckPopup