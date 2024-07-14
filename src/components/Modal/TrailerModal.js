import React from 'react';
import Modal from 'react-modal';
import './TrailerModal.css';

Modal.setAppElement('#root');

const TrailerModal = ({ isOpen, onRequestClose, videoUrl }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onRequestClose}>X</button>
        <iframe
          width="100%"
          height="400px"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
        ></iframe>
      </div>
    </Modal>
  );
};

export default TrailerModal;
