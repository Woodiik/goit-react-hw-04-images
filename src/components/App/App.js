import { Button } from 'components/Button/Button';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { fetchPhotos } from 'components/servises/fetch';
import { useState, useEffect } from 'react';
export function App() {
  const [name, setName] = useState('');
  const [items, setItems] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (name === '') {
      return;
    }
    setLoader(true);
    setPage(state => {
      fetchPhotos(name, state)
        .then(({ hits }) => {
          setItems(hits);
          setLoader(false);
        })
        .catch(error => new Error(error.message));
      return state;
    });
  }, [name]);

  const onButtonClick = () => {
    setLoader(true);
    fetchPhotos(name, page + 1).then(({ hits }) => {
      setItems(state => [...state, ...hits]);
      setLoader(false);
      setPage(s => s + 1);
    });
  };

  const onSubmit = name => {
    setName(name);
    setPage(1);
    setItems([]);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };
  const onItemClick = url => {
    setCurrentImage(url);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {showModal && <Modal onClose={toggleModal} url={currentImage} />}

      {items?.length === 0 && !loader && (
        <h1 className="error-text">
          We could not find the photos for the request '{name}'
        </h1>
      )}
      <Gallery>
        {items &&
          items.map(({ id, largeImageURL, webformatURL }, index) => {
            return (
              <Item
                key={index}
                url={webformatURL}
                largeImg={largeImageURL}
                openModal={toggleModal}
                onClick={onItemClick}
              />
            );
          })}
      </Gallery>
      {loader && <Loader />}
      {items?.length > 0 && <Button onClick={onButtonClick} />}
    </div>
  );
}
