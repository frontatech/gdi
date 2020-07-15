import Axios from "axios"

export const ConvertFilesToGallery = (state,payload) =>{
    console.log(state)
    console.log(payload)
    
    const photoFiles = payload.photoFiles.map(photoFile => {
        const sizes = [4,1,3,1]
        const fileSize = sizes.length - 1
        let widthIndex = sizes[Math.round(Math.random() * fileSize)]
        let heightIndex = sizes[Math.round(Math.random() * fileSize)]
        widthIndex = widthIndex === 1 ? heightIndex = 1 : heightIndex === 1 ? widthIndex = 1 : widthIndex
        console.log(widthIndex)
        console.log(heightIndex)
        console.log(photoFile.file_name)
        const fileObject = {
            src: photoFile.file_name,
            width: widthIndex,
            height: heightIndex,
            title: photoFile.file_caption,
            file_id: photoFile.gallery_id
          }
        return fileObject
    })
    return {...state, ...payload, photoFiles:[...state.photoFiles, ...photoFiles]}
}
export const DeletePhotoFile = async (file) =>{
    try {
        console.log(file)
        file = JSON.stringify(file)
        const response = await Axios.delete(`/deletePhotoFile/?file=${file}`)
        return {response: response.data}
    } catch (error) {
        return {error}
    }
}