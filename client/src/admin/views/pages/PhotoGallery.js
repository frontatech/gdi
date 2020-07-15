import React, { useState, useCallback, Fragment, useContext}  from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photoFiles } from '../variables/photoFiles';
import GeneralHeader from 'admin/Headers/GeneralHeader';
import { Container, CardHeader, Button } from 'reactstrap';
import { GeneralContext } from 'admin/context/GeneralContext';
import SelectedImage from './SelectImage'
import { LOAD_MORE_PHOTOS } from 'admin/actions/actions';
import Axios from 'axios';


const PhotoGallery = ({location}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [showBtnText, setShowBtnText] = useState('Load More Photos')
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };
    const {gdiFiles:{photoFiles, totalFiles}, dispatch} = useContext(GeneralContext)
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo}) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        openLightbox={openLightbox}
      />
    ),
    [selectAll]
  );
    const loadMorePhotos = () =>{
        setShowBtnText('Loading...')
        const lastId = photoFiles.slice(-1)[0].file_id
        Axios.post('/adminLoadMorePhotos',{lastId}).then(res =>{
            setShowBtnText('Load More Photos')
            console.log(res)
            dispatch({type: LOAD_MORE_PHOTOS, payload: {photoFiles:res.data.photoFiles}})
        }).catch(error =>{
            if(error.response){
                console.log(error.response.data.error)
            }
        })
    }
    
    return (
        <Fragment>
            <GeneralHeader />
            <Container fluid>
                <CardHeader>
                    <div className="text-center">
                        <h3>Welcome to GDI Gallery</h3>
                        <span>We have {totalFiles} uploaded photo files</span>
                    </div>
                </CardHeader>
                <Gallery photos={photoFiles} renderImage={imageRenderer} />
                <ModalGateway>
                    {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                        currentIndex={currentImage}
                        views={photoFiles.map(x => ({
                            ...x,
                            srcset: x.srcSet,
                            caption: x.title
                        }))}
                        />
                    </Modal>
                    ) : null}
                </ModalGateway>
                <div className="col text-center">
                {totalFiles > photoFiles.length ? (<Button
                className="btn-round btn-white"
                color="primary"
                onClick={loadMorePhotos}
                size="lg"
                id="loadMoreBtn"
                >
                    {showBtnText}
                </Button>): <Button
                className="btn-round btn-white"
                color="warning"
                size="lg"
                disabled
                >
                No More Photos
                </Button>}
                
            </div>
            </Container>
        </Fragment>
    )
}

export default PhotoGallery
