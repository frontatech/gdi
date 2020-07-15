import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { UserAuthContext } from 'admin/context/UserAuthContext'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user:{isAuthenticated}} = useContext(UserAuthContext)
    console.log(isAuthenticated)
    return (
        <Route {...rest} render={props => {
            if(isAuthenticated) return <Component {...rest} {...props} />
            return <Redirect to={{pathname: '/auth/login',state: {from: props.location}
            }} />
        }
     } />
    )
}

export default ProtectedRoute
