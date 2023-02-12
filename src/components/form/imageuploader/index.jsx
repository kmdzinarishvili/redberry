import React from 'react';

const ImageUploader = ({ setImage }) => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = (event) => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileUploaded);
        reader.addEventListener('load', () => {
            setImage(reader.result);
        });
    };
    return (
        <div
            className="inpGroup"
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center',
            }}
        >
            <label className="label">პირადი ფოტოს ატვირთვა</label>
            <button className="uploadBtn" type="button" onClick={handleClick}>
                ატვირთვა{' '}
            </button>
            <input
                type="file"
                accept="image/png, image/svg, image/jpeg"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageUploader;
