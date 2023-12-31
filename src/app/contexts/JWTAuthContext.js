import { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { MatxLoading } from 'app/components';
import { useSelector } from 'react-redux';

const initialState = {
    user: null,
    isInitialised: false,
    isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state, action) => {
    // console.log(31, action.type);

    switch (action.type) {
        case 'INIT': {
            // console.log(action.payload)
            const { isAuthenticated, user } = action.payload;
            return { ...state, isAuthenticated, isInitialised: true, user };
        }

        case 'LOGIN': {
            const { user } = action.payload;
            return { ...state, isAuthenticated: true, user };
        }

        case 'LOGOUT': {
            return { ...state, isAuthenticated: false, user: null };
        }

        case 'REGISTER': {
            const { user } = action.payload;

            return { ...state, isAuthenticated: true, user };
        }

        default:
            return state;
    }
};

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    // login: () => {},
    // logout: () => {},
    // register: () => {}
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, error, successMessage, authenticate, token, myInfo } = useSelector((state) => state.Authors)

    useEffect(() => {
        if (
            authenticate
            && window.location.pathname !== "/session/signin"
            && window.location.pathname !== "/session/404"
            && `/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}` !== "/session/reset-password"
            && window.location.pathname !== "/session/reset-password"
            && window.location.pathname !== "*"
        ) {
            // let userRoutes = [...children?.props?.children[1]?.props?.match?.route?.children]

            let userRoutes = [];
            if (
                children
                && children.props
                && children.props.children[1]
                && children.props.children[1].props
                && children.props.children[1].props.match
                && children.props.children[1].props.match.route
                && children.props.children[1].props.match.route.children
            ) {
                userRoutes = [...children.props.children[1].props.match.route.children];
            } else {
                // Handle the case where one of the properties is not defined or does not have the expected structure.
                console.error("Error: Unable to retrieve userRoutes. Check the structure of the properties.");
            }

            // console.log(81, children);
            let curUserRoutes = []
            if (userRoutes && userRoutes.length > 0) {
                for (let i = 0; i < userRoutes.length; i++) {
                    let inc = userRoutes[i]?.auth.includes(myInfo?.role)
                    if (inc) {
                        curUserRoutes.push(userRoutes[i])
                    }
                }
            }
            if (curUserRoutes && curUserRoutes.length > 0) {
                children.props.children[1].props.match.route.children = curUserRoutes
            }
            // console.log(curUserRoutes)
        }

        if (authenticate) {
            // console.log('110')
            dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: myInfo } });
        } else {
            dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: {} } });
        }
    }, [authenticate, myInfo])

    // SHOW LOADER
    if (!state.isInitialised) return <MatxLoading />;

    return (
        <AuthContext.Provider value={{ ...state, method: 'JWT' }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;
