
export const UpdateEvent = (state,data) =>{
    const event_id = parseInt(data.event_id)
    let events = state.events
    events = events.map(event => event.event_id === event_id ? {...event,...data, event_id} : event)
    return {...state,events}
}
export const DeleteEvent = (state, event_id) =>{
    event_id = parseInt(event_id)
    let events = state.events
    events = events.filter(event => event.event_id !== event_id)
    return {...state,totalEvents: state.totalEvents - 1,events}
}