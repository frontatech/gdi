import React,{useEffect} from 'react'

const ScrollTop = (location) => {
    return (
        useEffect(() => {
            window.scrollTo(0,0)
            return () => {
              
            }
          }, [location.pathname])
    )
}

export default ScrollTop
