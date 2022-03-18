import { Dialog, DialogContent } from '@material-ui/core'
import { Button, DialogActions, DialogTitle, Divider, Input } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions'
import { checkCode, updateUserEvent } from '../../../services/event/EventService'
import receiveMessageCode from "../../../utils/messageCode";


const CheckPopup = (props) => {
    const {checkPopup, setCheckPopup } = props
    const [code,setCode]= useState("")
    const [user,setUser]= useState(null)
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState(false)
    const dispatch  = useDispatch()
    const checkUserCode =() => {
        setLoading(true)
        checkCode(code,checkPopup.id).then(res => {
            if(res.statusCode === 200) {
                // setCheckPopup({
                //     ...checkPopup,
                //     isOpen: false
                // })
                // dispatch(notifySuccessfully("Checked code success !"))
                setUser(res.data)
            } else {
                setError(true)
                dispatch(notifyError(receiveMessageCode(res.messageCode)))
            }
        }
        )
        setLoading(false)
    }

    // handle update status 
    const handleUpdateUserInEvent = () => {
        updateUserEvent(user.user_id,checkPopup.id,13).then(res => {
            if(res.statusCode === 200) {
                notifySuccessfully("Check user successfully ")
                setCode("")
                setUser(null)
            } else {
                dispatch(notifyError(receiveMessageCode(res.messageCode)))
            }
        }).catch(err => {
            console.log('err' + err)
        })
    }

  return (
    <Dialog 
        open={checkPopup.isOpen}
        onClose={() => setCheckPopup({...checkPopup, isOpen : false})}
        width="xl"
        maxWidth="xl"
        disableEnforceFocus
    >
        <DialogTitle>
                Please input invite code 
                <Divider/>
        </DialogTitle>
        <DialogContent>
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>
            <div style={{display:"flex",flexDirection:"row",gap:"1rem"}}>
            <Input variant="contained" color='primary' type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
            <Button disabled={loading}
                onClick={checkUserCode}
            >
                Search Code
            </Button>
            </div>
           
            {
                error &&
            <span style={{color:"red"}}>Your code is invalid</span>
            }
            <div style={{minHeight:"100px"}}>

            {
                user && 
                <div style={{display:"flex", flexDirection:"column",marginTop:"1rem"}}>
                    <span style={{fontWeight:"500"}}>
                        
                        {user.user.user_name}
                        </span>
                    <span>
                        
                        {user.user.user_email}
                        </span>
                </div>
            }
            </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color="primary"
            disabled={!user ? true : false}
                onClick={handleUpdateUserInEvent}
            >
                Check
            </Button>
           
        </DialogActions>
    </Dialog>
  )
}

export default CheckPopup