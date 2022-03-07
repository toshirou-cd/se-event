import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Input } from '@mui/material'
import React, {useState} from 'react'
import parse from 'html-react-parser';

const ContentPopup = (props) => {
    const [loading, setLoading ] = useState(false)
    const {openPopup,setOpenPopup,content} = props
    return (

        <Dialog open={openPopup} onClose={() => setOpenPopup(false)} disableEnforceFocus
        fullWidth={true}
        maxWidth = {'lg'} >
            <DialogTitle>
               <span style={{fontSize:"22px",fontWeight:"500"}}>Event Content</span>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                    <div style={{fontSize:"1.5rem"}}>
                        {parse(content)}
                    </div>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleSave} disabled={loading}> Save</Button> */}
                <Button
                 onClick={() => setOpenPopup(false)} color="error" disabled={loading}> Cancel</Button>
            </DialogActions>
        </Dialog>
      )
}

export default ContentPopup