import React, { createContext, useEffect, useReducer } from 'react'
import Axios from 'axios'
import { NewsletterReducer } from 'admin/reducers/NewsletterReducer'
import { MAIL_TEMPLATES } from 'admin/actions/actions'
import { SITE_SUBSCRIBERS } from 'admin/actions/actions'


const initialState = {
    templates: [],
    newsletterTheme: {htmlTemplate:'',subject:''},
    siteSubscribers: [],
    totalSubscribers: 0

}

export const NewsletterContext = createContext()
export const NewsletterProvider = props => {
    const [mainState, dispatch] = useReducer(NewsletterReducer, initialState)
    useEffect(() => {
        let requestOne = Axios.get("/mailTemplates")
        let requestTwo = Axios.get("/siteSubscribers")
        Axios.all([requestOne, requestTwo]).then(Axios.spread((...responses) =>{
            const responeOne = responses[0]
            const responseTwo = responses[1]
            dispatch({type: MAIL_TEMPLATES,payload:{templates: responeOne.data.templates}})
            dispatch({type: SITE_SUBSCRIBERS,payload:{siteSubscribers: responseTwo.data.subscribers,totalSubscribers:responseTwo.data.total}})
        })).catch(errors =>{
            if(errors.response){
                console.log(errors.response)
            }
        })
        return () => {}
    }, [])
    return (
        <NewsletterContext.Provider value={{mainState,dispatch}}>
            {props.children}
        </NewsletterContext.Provider>
    )
}

