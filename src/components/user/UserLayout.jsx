import React from 'react';
import UserNavBar from '../user/UserNavBar/UserNavBar'
import './UserLayout.css'

const UserLayout = (props) => {
    const { children, routerPath, navItems } = props;
  return (
    <div className="page-wrapper text-white">

     <UserNavBar />
     <div className="mt-10">
         {children}
     </div>
    </div>
  );
};

export default UserLayout;
