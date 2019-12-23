import React from 'react';
import { Trans } from '@lingui/macro';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: {}, imagePreviewUrl: undefined, error: '' };
        this.fileRef = React.createRef();
    }

    _handleSubmit(e) {
        e.preventDefault();
        const { updateAvatar, onClose } = this.props;        
        updateAvatar(this.state.file);
        onClose();
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];        
        let validImg = this._isValidImage(file);
        if (validImg && validImg !== null) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file)
        } else {
            this.setState({ error: 'invalid image file' });
        }
    }

    _isValidImage = (file) => {
        return file.type.match('image.*');
    }

    openFilesWindow = () => {
        this.fileRef.current.click();
    }

    render() {
        const { isOpen, onClose } = this.props;
        const { imagePreviewUrl } = this.state;

        return (
            <div className={`modal-wrap ${isOpen === true ? "modal-ready" : ''}`} id="js-open-change-pass" style={{ overflow: "hidden auto"}}>
                <div className="modal-container">
                    <div className="modal-content" style={{ textAlign:'center' }}>
                        <div className="popup popup--cp">
                            <div className="popup-logo">
                                <div className="popup-logo__title"> <Trans id="mia"> MIA </Trans> </div>
                            </div>
                            <div className="popup__title popup__title--md"> <Trans id="upload_avatar"> Upload Avatar </Trans> </div>
                            <div className="popup__image" >
                                {
                                    imagePreviewUrl !== undefined ?  <img src={imagePreviewUrl} alt="" /> : <img src="./assets/images/no-image.png" alt="" />
                                }
                            </div>
                            <input ref={this.fileRef} className="fileInput" type="file" style={{display:'none'}} onChange={(e) => this._handleImageChange(e)} />
                            <span onClick={this.openFilesWindow} className="pc-profile__change-photo" style={{cursor:'default'}}>  <Trans id="select_your_image"> Select Your Image </Trans> </span>
                            <div className="form-group">
                                <button type="submit" className="button button--full-width" onClick={(e) => this._handleSubmit(e)}>
                                    <span className="button__text"><Trans id="upload_image"> <Trans id="upload_image"> Upload Image </Trans> </Trans></span>
                                </button>
                            </div>

                            <button title="Close (ESC)" type="button" className="modal-close" onClick={onClose}>
                                <span className="svg">
                                    <svg width="30" height="30">
                                        <use href="#cancel"></use>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="modal-preloader"><Trans id="loading"> Loading.... </Trans></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageUpload;


