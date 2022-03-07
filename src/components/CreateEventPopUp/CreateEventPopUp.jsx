import {useState} from "react"
import { DialogContent } from '@material-ui/core'
import { Button, Dialog, DialogActions, DialogTitle, Divider, FormControl, Input, MenuItem, Select } from '@mui/material'
import './CreateEventPopUp.css'
import React from 'react'
import BASE_URL from '../../utils/Url'
import { createEvent } from '../../services/event/EventService'
import { useDispatch } from "react-redux"
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions"
import { Box } from "@mui/system"
import moment from "moment"

const CreateEventPopUp = (props) => {
    const {popup, setPopup,groupEvents} = props
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [data,setData] = useState({
        name: "",
        des: "",
        start_join: "",
        start_join_time: "",
        end_join : "",
        end_join_time : "",
        start : "",
        start_time : "",
        end_time :  "",
        img : "",
        file : "",
        group_id: "",
    })
    const [checked, setChecked] = useState(false)
    // const [groupEvent, setGroupEvent] = useState([])

    const handleSave =() =>{
        setLoading(true)
        const formData = new FormData()
        formData.append('event_name',data.name)
        formData.append('description',data.des)
        formData.append('date_start_join',moment(`${data.start_join},${data.start_join_time}`,'YYYY-MM-DD HH:mm:ss').format())
        formData.append('date_end_join',moment(`${data.end_join},${data.end_join_time}`,'YYYY-MM-DD HH:mm:ss').format())
        formData.append('date_start_event',moment(`${data.start},${data.start_time}`,'YYYY-MM-DD HH:mm:ss').format())
        formData.append('date_end_event',moment(`${data.end},${data.end_time}`,'YYYY-MM-DD HH:mm:ss').format())
        formData.append('EventImg',data.img)
        formData.append('EventPlantFile',data.file)
        formData.append('groupevent_id',checked ? data.group_id : "")
        
        createEvent(
            // data.name,data.des,data.start_join,data.end_join,data.start,data.end,data.img,data.file,null
            formData
            ).then(res => {
            if(res.statusCode === 200) {
                setData({
                    name: "",
        des: "",
        start_join_time: "",
        start_join: "",
        end_join : "",
        end_join_time : "",
        start_time : "",
        end_time :  "",
        img : null,
        file : null,
        group_id: "",
                })
                dispatch(notifySuccessfully("Created Event Success "))
                setPopup({...popup,isOpen:false})
                
            } else {
                dispatch(notifyError())
                setPopup({...popup,isOpen:false})
            }
        }).catch(err => {
            console.log(err)
        })
        
        setLoading(false)
    }

    if(!groupEvents) return (<div>
        <Dialog open={popup.isOpen} onClose={() => setPopup({...popup,isOpen : false})} disableEnforceFocus
    fullWidth={true}
    maxWidth = {'md'} >
            <DialogTitle>
                Loading...
            </DialogTitle>
        </Dialog>
    </div>)

  return (

    <Dialog open={popup.isOpen} onClose={() => setPopup({...popup,isOpen : false})} disableEnforceFocus
    fullWidth={true}
    maxWidth = {'md'} >
        <DialogTitle>
           <span style={{fontSize:"22px",fontWeight:"500"}}>Create Event</span>
        </DialogTitle>
        <Divider/>
        <DialogContent>
                <form  enctype="multipart/form-data" >
                <div className="content-wrapper">
                    <div className="label"> Event Name : </div>

                    <div className='field-name'>
                        <Input type="text" placeholder='event name'className='field-name' value={data.name} onChange={(e)=> setData({...data,name:e.target.value})}/>
                    </div>
                    <div className="label"> Description: </div>
                    <div className='field-name'>
                        <Input type="text" placeholder='Description'className='field-name' value={data.des}
                        onChange={(e)=> setData({...data,des:e.target.value})}/>
                    </div >
                    <div className="label"> Start from : </div>
                    <Input type="date" placeholder='day' value={data.start}
                      onChange={(e)=> setData({...data,start:e.target.value})}/>
                        <Input type="time" placeholder='day' value={data.start_time}
                        onChange={(e)=> setData({...data,start_time:e.target.value})}/>
                    <div      className="label"> To : </div>
                    <Input type="date" placeholder='event name' value={data.end}
                    onChange={(e)=> setData({...data,end:e.target.value})}/>
                        <Input type="time" placeholder='day' value={data.end_time}
                        onChange={(e)=> setData({...data,end_time:e.target.value})}/>
                    <div     className="label"> Start Joining from: </div>
                    <Input type="date" placeholder='event name' value={data.start_join}
                    onChange={(e)=> setData({...data,start_join:e.target.value})}/>
                        <Input type="time" placeholder='day' value={data.start_join_time}
                        onChange={(e)=> setData({...data,start_join_time:e.target.value})}/>
                    <div    className="label"> to : </div>
                    <Input type="date" placeholder='event name' value={data.end_join}
                    onChange={(e)=> setData({...data,end_join:e.target.value})}/>
                        <Input type="time" placeholder='day' value={data.end_join_time}
                        onChange={(e)=> setData({...data,end_join_time:e.target.value})}/>
                    <div   className="label"> Image : </div>
                    <Input type="file" className='field-name' 
                    onChange={(e)=> setData({...data,img:e.target.files[0]})}/>
                    <div  className="label"> Plan File  : </div>
                    <Input type="file" className='field-name' 
                    onChange={(e)=> setData({...data,file:e.target.files[0]})} accept=".xlsx, .xls, .csv"/>
                    <div className="label"> Get Plan File Template : </div>
                    <a href={`${BASE_URL.planFileTemplate}`} download target="_blank" className="field-name"> Download</a>
                    <label className="label">
                        Is Group
                        <input type="checkbox"  label="Is group" style={{marginLeft : '5px'}} checked={checked} onChange={() => setChecked(!checked)} /> 
                    </label>
                    
                    <Box sx={{
          maxWidth : 100,
          marginLeft: '5px',
        }}> 
          <FormControl fullWidth>
              
              <Select
                  value={data.group_id}
                  label="Choose group event"
                  onChange={(e) => setData({...data,group_id : e.target.value})}
                  variant="standard"
                  sx={{
                    ':before': { borderBottomColor: 'black' },
                    ':after': { borderBottomColor: 'black' },
                  }}
                  disabled={!checked}
                  >
                  
                  {
                      groupEvents.map(GE => (
                          <MenuItem value={GE.id} key={GE.id}>
                            {GE.group_name}
                          </MenuItem>
                      ))
                  }
                  {/* <MenuItem value={5}> Inactivate</MenuItem>
                  <MenuItem value={9}> Blocking</MenuItem> */}
              </Select>
          </FormControl>
        </Box>
                </div>
                    </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave} disabled={loading}> Save</Button>
            <Button onClick={() => setPopup({...popup,isOpen:false})} color="error" disabled={loading}> Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default CreateEventPopUp