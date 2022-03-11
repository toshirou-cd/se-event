import React from 'react';
import UserNavBar from '../user/UserNavBar/UserNavBar'
import './UserLayout.css'
import Notification from "../Notification"

const UserLayout = (props) => {
    const { children, routerPath, navItems } = props;
  return (
    <div className="page-wrapper text-white">

     <UserNavBar />
     <div className="mt-10">
         {children}
     </div>
     <Notification />
    </div>
  );
};

export default UserLayout;
