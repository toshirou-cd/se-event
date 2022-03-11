import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { Link, useHistory } from 'react-router-dom'
// import { useGoogleAuth } from "../../googleAuth/googleAuth";
import UserNavBar from "../../components/user/UserNavBar/UserNavBar";
import Carousel from 'react-material-ui-carousel'
import { useGoogleLogout } from "react-google-login";
import { Button, containerClasses, Paper } from "@mui/material";
import { getEventListForUser } from "../../services/event/EventService";
import BASE_URL from "../../utils/Url";

const LandingPage = (props) => {
  const [data,setData] = useState([])

    const onLogoutSuccess = (res) => {
      console.log('log out success')
      localStorage.setItem('isSignedIn',false)
    }
    const onFailure =() => {
      console.log('log out fail')
    }


    const {signOut} = useGoogleLogout({
      clientId : '14536865243-pqo2h6g02uulf087dovb0bhvp56qldnd.apps.googleusercontent.com',
      onLogoutSuccess,
      onFailure,
    })

    useEffect(() => {
          getEventListForUser(null,100,null,null).then(res => {
            if(res.statusCode === 200) {
              setData(res.data)
            }else {
              setData(null)
            }
          })
    },[])

    var items = [
      {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!"
      },
      {
          name: "Random Name #2",
          description: "Hello World!"
      }
  ]
  

  return (
    <Carousel navButtonsAlwaysVisible fullHeightHover={false}
      className="my-carousel"
      indicatorContainerProps={{style: {
        position:"absolute",
        bottom:"0"
      }}}
      indicators={true}
    >
        { 
            data && data.map( (event, i) => 
            <div className="content-container">{
              <div className="landing-img-container">
                <img src={`${BASE_URL.images}/${event.event_img_url}`} className="landing-images"/>
                  <Link to={`${props.match.url}/${event.id}`}>
                <div className="landing-detail">
                    <span className="landing-name">{event.event_name}</span>
                    <span className="landing-des">{event.description}</span>
                </div>
                  </Link>
              </div>
            }
            </div> 
            )
        }
    </Carousel>
)
};

export default LandingPage;
