import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {backUrl} from '../config/config'
import { removeImage, uploadImageRequest } from "../modules/utill";
import { FaTimes } from "react-icons/fa"; 

const ImageForm = ({})=>{
    const dispatch = useDispatch();
    const {imagePath} = useSelector(state=>state.utill)
    const imageInput = useRef();  
    const onSubmit=useCallback(e=>{
        e.preventDefault();
      })

    const onClickImageUpload = useCallback(()=>{        
    imageInput.current.click()
    },[imageInput.current])
    
    const onChangeImages = useCallback((e)=>{
        
        const imageFormData = new FormData();
        [].forEach.call(e.target.files,(f)=>{
          imageFormData.append('image',f);
        });

        dispatch(uploadImageRequest(imageFormData));
    });
  
    
    const onRemoveImage = useCallback(e=>{
        dispatch(removeImage());
    })

    return (
      <div className="image-form">
         {imagePath ?
              <div className="image">
                  <FaTimes className="icon" onClick={onRemoveImage}/>
                  <img src={`${backUrl}/${imagePath}`} />                                      
              </div> 
            : <div className="camera-img" onClick={onClickImageUpload}>&#128247;</div>
        }
            
            <form encType="multipart/form-data" onSubmit={onSubmit}>                
            <input type="file" name="image"  multiple hidden ref={imageInput} onChange={onChangeImages}/>
                  
            </form>
      </div>
    );
};


export default ImageForm;