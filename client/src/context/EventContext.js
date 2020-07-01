import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
export const EventContext = createContext()
export const EventProvider = (props) => {
    const [showEvent, setEvent] = useState([])
    const [events, setEvents] = useState([])
    const [showLoadBtn, setLoadBtn] = useState(true)
    const [showBtnText, setBtnText] = useState('Load More Events')
    const [totalEvents, setTotalEvents] = useState(0)
    useEffect(() => {
        axios.get('/events').then(res =>{
            console.log(res)
            setEvents(res.data.events)
            setTotalEvents(res.data.total)
        }).catch(error =>{
            console.log(error)
        })
    }, [])
    const loadMoreEvents = (e) =>{
        e.preventDefault()
        setBtnText('Loading...')
        const lastId = events.slice(-1)[0].event_id
        axios.post('/loadMoreEvents',{lastId}).then(res =>{
            setBtnText('Load More Events')
            if(res.data.length < 12) {
                setBtnText('No More Posts')
                setLoadBtn(false)
            }
            setEvents(events => [...events,...res.data])
        }).catch(error =>{
            console.log(error)
        })
    }
    const getEvent = (path,history, slug) =>{
        const singlePost = events.filter(event => event.event_slug === slug)
        if(singlePost.length === 0){
            axios.get(path).then(res =>{
                if(res.data.length === 0 || res.data.error)return history.push('/404')
                setEvent(res.data.post)
              }).catch(error =>{
                console.log(error)
              })
        }
        else{
            setEvent(singlePost)
        }
    }
    return (
        <EventContext.Provider value={{showEvent,getEvent,events,showLoadBtn,totalEvents,showBtnText,loadMoreEvents}}>
            {props.children}
        </EventContext.Provider>
    )
}

