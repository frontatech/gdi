import { MAIL_TEMPLATES } from "admin/actions/actions";
import { NEWSLETTER_THEME } from "admin/actions/actions";
import { SITE_SUBSCRIBERS } from "admin/actions/actions";
import { LOAD_MORE_SUBSCRIBERS } from "admin/actions/actions";
import { DELETE_SUBSCRIBER } from "admin/actions/actions";

export const NewsletterReducer = (state, action) =>{
    switch (action.type) {
        case MAIL_TEMPLATES:
            return {...state,...action.payload}
        case NEWSLETTER_THEME:
            return {...state, newsletterTheme:action.payload}
        case SITE_SUBSCRIBERS:
            return {...state, ...action.payload}
        case LOAD_MORE_SUBSCRIBERS:
            return {...state, siteSubscribers:state.siteSubscribers.concat(action.payload)}
        case DELETE_SUBSCRIBER:
            return {...state, siteSubscribers: state.siteSubscribers.filter(user => user.id !== parseInt(action.payload))}
        default:
            return state;
    }
}