import React, { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, match, Redirect} from 'react-router-dom';
import { useGoogleAuth } from '../googleAuth/googleAuth';
import PageNotFound from '../pages/PageNotFound';
// import { useSelector } from 'react-redux';
// export interface RouteRenderProps {
//   component?: React.FC<{ match: match }>;
//   layout?: React.FC<{
//     children: ReactNode;
//     routerPath: string;
//     navItems?: NavItem[];
//   }>;
//   navItems?: NavItem[];
//   path?: string;
//   exact?: boolean;
//   isPrivate?: boolean;
//   routerPath?: string;
//   redirectTo?: string;
// }

const RenderRoute = (props) => {
  const {
    component: Component,
    layout: Layout,
    path,
    exact,
    routerPath,
    navItems,
    isPrivate,
    redirectTo,
    navBartitle
  } = props;

  // const { isAuthenticated } = useAuth();
  // const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  // const isAuth = useSelector((state) => state.AuthReducer.isLoggedIn)
  
  const isSignedIn = useSelector(state => state.AuthReducer.isLoggedIn)

  if (!Component && !redirectTo) {
    return <Route key="" path="/notfound" />;
  }

  return (
    <Route
      key={`${routerPath}${path}`}
      path={`${routerPath}${path}`}
      exact={exact}
      render={(componentProps) => {
        if (Component) {
          if ((isPrivate && isSignedIn) || !isPrivate) {
            if (Layout) {
              return (
                <Layout
                  routerPath={componentProps.match.path}
                  navItems={navItems}
                  title={navBartitle}
                >
                  <Component match={componentProps.match} />
                </Layout>
              );
            }
            return <Component match={componentProps.match} />;
          } else {
            return <Redirect to='/'/>
          }
        }
        if (redirectTo) {
          return <Redirect to={`${routerPath}${redirectTo}`} />;
        }
        return <Redirect to="/notfound" />;
      }}
    />
  );
};

export default RenderRoute;
