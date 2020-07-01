import React, { useState, useCallback, useEffect }  from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from './misc/photos';
import LandingPageHeader from './Headers/LandingPageHeader';
import ScrollTop from './misc/ScrollTop';

const PhotoGallery = ({location}) => {
  ScrollTop(location)
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
    
    return (
        <div className="wrapper">
        <LandingPageHeader title={"Our Gallery"} background={require("assets/img/bg15.jpg")}/>
        <div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
    </div>
    )
}

export default PhotoGallery
