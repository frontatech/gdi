import { GALLERY_PHOTOS } from "admin/actions/actions";
import { ConvertFilesToGallery } from "admin/functions/GeneralFunctions";
import { DELETE_PHOTO_FILE } from "admin/actions/actions";
import { UPLOADED_FILES } from "admin/actions/actions";
import { LOAD_MORE_PHOTOS } from "admin/actions/actions";
export const GeneralReducer = (state, action) =>{
    switch (action.type) {
        case GALLERY_PHOTOS:
            return ConvertFilesToGallery(state, action.payload)
        case DELETE_PHOTO_FILE:
            return {...state, totalFiles: state.totalFiles-1, photoFiles: state.photoFiles.filter(photoFile => photoFile.file_id !== action.payload.file_id)}
        case LOAD_MORE_PHOTOS:
            return ConvertFilesToGallery(state, action.payload)
        case UPLOADED_FILES:
            return {...state,photoFiles:action.payload.concat(state.photoFiles),totalFiles: state.totalFiles+action.payload.length}
        default:
            return state;
    }
}
