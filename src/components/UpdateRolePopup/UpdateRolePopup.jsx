import { Button,  DialogActions, MenuItem, Select, Box, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle,makeStyles } from '@material-ui/core'
import { getRoleForAdmin, updateUserRole } from '../../services/account/account'

const useStyle = makeStyles({
    dialogWrapper :{
        "&:first-child" : {
            paddingTop: '0'
        },
        padding: '0',
        borderRadius:'10px',
        "& .MuiPaper-root": {
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
    },
    scrollPaper :{
        maxHeight :'100%',
    }
})


const UpdateRolePopup = (props) => {
    const {userID,openPopUp,setOpenPopUp}= props
    const classes = useStyle()
    const [roles,setRoles] = useState([])
    const [roleId,setRoleId] = useState()
    const [loading,setLoading] =useState(false)

    useEffect(() => {
        getRoleForAdmin().then(res => {
            if(res.statusCode === 200) {
              setRoles(res.data)
            } else {
              setRoles([])
            }
        }).catch(err => {
          console.log('get role err :' + err)
        })
    },[openPopUp])


    //handle select role 
    const handleSelectRole = (e) => {
        setRoleId(e.target.value)
    }


    // handle save 
    const handleSave = () => {
        setLoading(true)
        updateUserRole(userID,roleId).then(res => {
            if(res.statusCode === 200) {
               
               console.log('ok')
            } else {
                console.log('not ok')
            } 
            setOpenPopUp(false) 
        }).catch(err => {
            console.log('err ' + err)
        })
        setLoading(false)
    }
  return (
    <Dialog open={openPopUp} maxWidth='false' onClose={() => setOpenPopUp(false)}
                    disableEnforceFocus
                    >
            <DialogTitle>
               Update Role 
            </DialogTitle>
            <DialogContent 
                 classes={{
                    root  : classes.dialogWrapper
            }}
            >
                <div>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap',minWidth:200, paddingLeft : 1, paddingRight : 1 }}> 
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
              {/* <InputLabel id="demo-simple-select-label" sx={{
                '&.MuiFormLabel-root': {
                  color : 'black'
                }
              }}>Select Category</InputLabel> */}
              Select new role : 
              <Select
                  labelId="demo-simple-select-label"
                  value={roleId}
                  label="Status"
                  onChange={(e) => handleSelectRole(e)}
                  variant="standard"
                  sx={{
                    ':before': { borderBottomColor: '#000' },
                    ':after': { borderBottomColor: '#000' },
                  }}
                  required
                  >
                     {/* <MenuItem value={'default'}> All Categories</MenuItem> */}
                  {roles && roles.map((roles) => (
                    <MenuItem value={roles.id} key={roles.id}> {roles.role_name}  </MenuItem>
                  )) }
              </Select>
          </FormControl>
        </Box>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() =>handleSave()} disabled={loading}> Save</Button>
                <Button onClick={ () => setOpenPopUp(false)} disabled={loading}> Cancel</Button>
            </DialogActions>
        </Dialog>
  )
}

export default UpdateRolePopup