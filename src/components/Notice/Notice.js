import './Notice.css';

function Notice({ isOpen, message, isSuccess, onButtonClick }) {

  return (
    <div className={`notice ${isOpen ? "notice_opened" : ""}`} >
      <div className={`notice__container ${isSuccess ? "notice__container_type_success" : "notice__container_type_error"}`}>
        <p className="notice__text">{message}</p>
        <button className="notice__close-button" type="button" onClick={onButtonClick}>Закрыть</button>
      </div>
    </div>
  );
}

export default Notice;