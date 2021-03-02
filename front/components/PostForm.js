import { useCallback, useRef, useState } from "react";
import { FaTimesCircle, FaTimes } from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import useInput from "../hooks/useInput";
import { removeImage, uploadImageRequest } from "../modules/utill";
import {backUrl, imgUrl} from '../config/config'


const PostForm = ({msg})=>{
    const dispatch = useDispatch();
    const {imagePath} = useSelector(state=>state.utill)
    
    const [img, setImage] = useState(null);
    const imageInput = useRef();
   /*  const [ph1, onChangePh1] = useInput('');
    const [ph2, onChangePh2] = useInput('');
    const [ph3, onChangePh3] = useInput('');
    const [ph4, onChangePh4] = useInput('');
    const [ph5, onChangePh5] = useInput('');
    const [ph6, onChangePh6] = useInput('');
    const [ph6, onChangePh6] = useInput('');
    const [ph, onChangePh1] = useInput('');
    const [ph1, onChangePh1] = useInput('');
    const [ph1, onChangePh1] = useInput('');
    const [ph1, onChangePh1] = useInput(''); */

    const onChange = (e) => {
        setImage(e.target.files[0]);
      }
    
      const onClick = async () => {
        const formData = new FormData();
        formData.append('file', img);
        // 서버의 upload API 호출
        const res = await axios.post("/api/upload", formData);
        console.log(res);
      }

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
      <div className="post-form">
          <div className="head">
                <FaTimesCircle className="icon"/>
          </div>
          <div className="body">            
            {imagePath && 
              <div className="image">
                  <FaTimes className="icon" onClick={onRemoveImage}/>
                  <img src={`${backUrl}/${imagePath}`} />                                      
              </div>
            }
                  
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                
                  <input type="file" name="image"  multiple hidden ref={imageInput} onChange={onChangeImages}/>
                  <button onClick={onClickImageUpload}>이미지업로드</button>
                
                
                </form>
                <div className="phrase">
                    <span className="title">문장</span>
                    <div className="content">{}</div>

                </div>
                <textarea></textarea>
                
                <button type="submit">저장</button>
            
          </div>
      </div>
    );
};


export default PostForm;