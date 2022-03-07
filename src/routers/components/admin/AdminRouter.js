import Home from "../../../pages/Admin/Home";
import RouterRender from "../../RouterRender";

export const adminNavItems = [
  {
    title : "Accounts",
    path : 'accounts'
  },
  {
    title : "Manage Role",
    path : "roles"
  }
]

const routes= [
    {
      path: '/',
      exact: true,
      component: Home,
      redirectTo: '/home',
      isPrivate: true
    },
    {
      component: Home,
      path: '/accounts',
      isPrivate: true
    },
    {
      component: Home,
      path: '/roles',
      isPrivate: true
    },
  ];
  
  const AdminRouter = (props) => {
    return (
      <RouterRender
        routerPath={props.match.path}
        helperRoutes={routes}
      />
    );
  };
  
  export default AdminRouter;
  