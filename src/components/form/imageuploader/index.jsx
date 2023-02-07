
import React from "react";

const ImageUploader = () => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
      hiddenFileInput.current.click();
    };
    const handleChange = event => {
      const fileUploaded = event.target.files[0];
    };
    return (
  <div className='inpGroup'
        style={{display:'flex',
        flexDirection:'row',
        width:"100%",
        height:'100%',
        alignItems:"center"}}>
         <label className="label">
            პირადი ფოტოს ატვირთვა
          </label>
        <button
         className='uploadBtn'
         onClick={handleClick}
              >
        ატვირთვა      </button>
        <input type="file"
               ref={hiddenFileInput}
               onChange={handleChange}
               style={{display:'none'}} 
        /> 
      </div>
    );
  };

  export default ImageUploader;