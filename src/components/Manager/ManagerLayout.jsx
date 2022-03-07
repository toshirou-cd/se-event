import React from 'react'
import SideBar from '../SideBar';
import Notification from "../Notification"

const ManagerLayout = (props) => {
    const { children, routerPath, navItems,title } = props;
    return (
      <div class="flex md:flex md:flex-row md:min-h-screen w-full bg-slate-200 relative">
      <SideBar items={navItems} routerPath={routerPath} title={title}/>
      <div className="mt-16 ml-64  w-full p-5">
          {children}
      </div>
      <Notification />
     </div>       
    )
}

export default ManagerLayout