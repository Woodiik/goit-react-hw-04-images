import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, url }) {
  //componentDidMount() {
  //  window.addEventListener('keydown', this.handleKeydown);
  //}
  //componentWillUnmount() {
  //  window.removeEventListener('keydown', this.handleKeydown);
  //}
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={url} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
