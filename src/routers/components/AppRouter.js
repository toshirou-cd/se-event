import React from 'react';
import RouterRender from '../RouterRender';
import Login from '../../pages/Login/Login';
import LandingPage from '../../pages/LandingPage/LandingPage';
import UserRouter from './user/UserRouter';
import UserLayout from '../../components/user/UserLayout';
import { useSelector } from 'react-redux';
import ManagerRouter, { managerNavItems } from './manager/ManagerRouter';
import AdminRouter, { adminNavItems } from './admin/AdminRouter';
import AdminLayout from '../../components/admin/AdminLayout';
import ManagerLayout from '../../components/Manager/ManagerLayout';
import HeadManagerRouter, { headManagerNavItems } from './headmanager/HeadManagerRouter';


  const AppRouter= () => {

    const user = localStorage.getItem('user')
    console.log('í : ' + JSON.stringify(user).role)
    const routes = [
      {
        path: '/',
        isPrivate: false,
        exact: true,
        redirectTo :  '/login'
      },
      {
        component: Login,
        path: '/login',
        isPrivate: false
      },
      {
        component: UserRouter,
        path: '/user',
        layout: UserLayout,
        isPrivate: true
      },
      {
        component: ManagerRouter,
        path: '/manager',
        layout: ManagerLayout,
        navItems : managerNavItems,
        navBartitle : "FPT Event Manager",
        isPrivate: true
      },
      {
        component: HeadManagerRouter,
        path: '/headmanager',
        layout: ManagerLayout,
        navItems : headManagerNavItems,
        navBartitle : "FPT Event H Manager",
        isPrivate: true
      },
        {
          component: AdminRouter,
          path: '/admin',
          layout: AdminLayout,
           navItems: adminNavItems, 
          isPrivate: true,
          navBartitle : "FPT EVENT ADMIN"
        },
        // {
        //   component: PageNotFound,
        //   path: '/notfound',
        // },
        // {
        //   component: UserProfile,
        //   path: '/:id',
        //   isPrivate: true
        // },
        
      ];
      
    return <RouterRender isRoot helperRoutes={routes} />;
  };
  
  export default AppRouter;


