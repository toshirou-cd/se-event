import { Button } from '@material-ui/core'
import React , { useState }from 'react'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions'
import { uploadFile } from '../../../services/image/imageService'
import receiveMessageCode from '../../../utils/messageCode'
import './Template.css'

const Template = () => {
    const [file,setFile] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    // handle upload template
    const handleUpload = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("PlanFile",file)
        formData.append("FileName","Template")
        uploadFile(formData).then(res => {
            if(res.statusCode === 200) {
                dispatch(notifySuccessfully("Uploaded Template !!"))
            } else {
                dispatch(notifyError(receiveMessageCode(res.messageCode)))
            }
        })
        setLoading(false)
    }
  return (
    <div className='template-page'>
        <div className='upload-container'>
            <input type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                accept=".xlsx, .xls, .csv"
            />
            <Button variant='contained' color='primary'
            disabled={loading}
            onClick={handleUpload}
            >
                Upload
            </Button>
        </div>
    </div>
  )
}

export default Template