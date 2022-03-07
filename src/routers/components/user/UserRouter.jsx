import LandingPage from "../../../pages/LandingPage/LandingPage";
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

// export const sideBarItems = [  
//     {
//         title: 'Darsh Board',
//         path: 'dashboard',
//         icon: <DashboardOutlinedIcon/>,
//       },
//       {
//         title: 'Account',
//         path: 'account',
//         icon: <ManageAccountsOutlinedIcon/>,
//       },
//       {
//         title: 'Post',
//         path: 'posts',
//         icon: <ImageOutlinedIcon/>,
//       },
//       {
//         title: 'Reported Post',
//         path: 'reportedposts',
//         icon: <NotificationImportantOutlinedIcon/>,
//       },
//       {
//         title: 'Manage Contest',
//         path: 'contest',
//         icon: <CardGiftcardOutlinedIcon/>,
//       }
//   ];

const routes= [
  {
    path: '/',
    exact: true,
    component: LandingPage,
    redirectTo: '/landingPage',
    isPrivate: true
  },
  {
    component: LandingPage,
    path: '/landingPage',
    isPrivate: true
  },
];

const UserRouter = (props) => {
  return (
    <RouterRender
      routerPath={props.match.path}
      helperRoutes={routes}
    />
  );
};

export default UserRouter;
