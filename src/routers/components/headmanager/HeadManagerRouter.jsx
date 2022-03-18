import LandingPage from "../../../pages/LandingPage/LandingPage";
import Event from "../../../pages/Manager/Event/Event";
import EventDetail from "../../../pages/Manager/EventDetail/EventDetail";
import EventRequest from "../../../pages/Manager/EventRequest/EventRequest";
import GroupEvent from "../../../pages/Manager/GroupEvent/GroupEvent";
import GroupEventDetail from "../../../pages/Manager/GroupEventDetail/GroupEventDetail";
import RouterRender from "../../RouterRender";

// import Account from "../../../pages/Account/Account";
// import { Darshboard } from "../../../pages/DarshBoard";
// import React from 'react';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
// import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
// import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
// import RouterRender from "../../RouterRender";
// import ProfileMenu from "../../../components/ProfileMenu.js/ProfileMenu";
// import UserProfile from "../../../pages/UserProfile/UserProfile";
// import Posts from "../../../pages/Posts/Posts";
// import PostDetailPage from "../../../pages/PostDetailPage/PostDetailPage";
// import ReportedPost from "../../../pages/ReportedPost/ReportedPost";
// import ReportDetail from "../../../pages/ReportDetail/ReportDetail";

export const headManagerNavItems = [  
      {
        title: 'Event Request',
        path: 'eventrequest',
      },
  ];

const routes= [
  {
    path: '/',
    exact: true,
    redirectTo: '/event',
    isPrivate: true
  },
  {
    component: EventDetail,
    path: '/event/:eventId',
    isPrivate: true
  },
  {
    component: Event,
    path: '/event',
    isPrivate: true
  },
  {
    component: GroupEventDetail,
    path: '/groupevent/:groupeventId',
    isPrivate: true
  },
  {
    component: GroupEvent,
    path: '/groupevent',
    isPrivate: true
  },
  {
    component: EventDetail,
    path: '/eventrequest/:eventId',
    isPrivate: true
  },
  {
    component: EventRequest,
    path: '/eventrequest',
    isPrivate: true
  },
];

const HeadManagerRouter = (props) => {
  return (
    <RouterRender
      routerPath={props.match.path}
      helperRoutes={routes}
    />
  );
};

export default HeadManagerRouter;
