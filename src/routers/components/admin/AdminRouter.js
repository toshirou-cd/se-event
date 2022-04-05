import Home from "../../../pages/Admin/Home";
import Template from "../../../pages/Admin/Template/Template";
import RouterRender from "../../RouterRender";

export const adminNavItems = [
  {
    title : "Accounts",
    path : 'accounts'
  },
  {
    title : "Template Upload",
    path : "template"
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
      component: Template,
      path: '/template  ',
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
  