import React from 'react'

function Modal({ img, showModal, setShowModal }) {
  const handleShowModal = () => {
    setShowModal(false)
  }
  return (
    <div className={`modal ${showModal ? 'zoomin' : ''}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <img className='modal-img' src={img} alt=''/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleShowModal}>Close</button>
            </div>
          </div>{/* /.modal-content */}
        </div>{/* /.modal-dialog */}
      </div>
  )
}

export default Modal