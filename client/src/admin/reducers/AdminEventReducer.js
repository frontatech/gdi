import React from 'react'
import { UpdateEvent } from 'admin/functions/EventFunctions';
import { EVENTS } from 'admin/actions/actions';
import { UPDATE_EVENT } from 'admin/actions/actions';
import { DELETE_EVENT } from 'admin/actions/actions';
import { DeleteEvent } from 'admin/functions/EventFunctions';
import { ADD_EVENT } from 'admin/actions/actions';
import { LOAD_MORE_EVENTS } from 'admin/actions/actions';

const AdminEventReducer = (state, action) => {
    switch (action.type) {
        case EVENTS:
            return {...state, ...action.payload}
        case ADD_EVENT:
            return {...state, events:[...state.events,...action.payload], totalEvents: state.totalEvents + 1}
        case LOAD_MORE_EVENTS:
            return {...state, events:[...state.events,...action.payload]}
        case UPDATE_EVENT:
            return UpdateEvent(state, action.payload)
        case DELETE_EVENT:
            return DeleteEvent(state, action.payload)
        default:
            return state;
    }
}

export default AdminEventReducer
