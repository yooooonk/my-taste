import { useCallback, useRef, useState } from "react";
import { FaTimesCircle, FaTimes } from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import useInput from "../hooks/useInput";
import { removeImage, uploadImageRequest } from "../modules/utill";
import {backUrl, imgUrl} from '../config/config'
import PhraseInput from '../components/PhraseInput';


const PostForm = ({msg})=>{
    const dispatch = useDispatch();
    const {imagePath} = useSelector(state=>state.utill)
    
    const [img, setImage] = useState(null);
    const imageInput = useRef();  
    const [phraseInputList, setPhraseInputList] = useState([1,2,3,4,5]);
    console.log(phraseInputList,'배열')
    const onChange = (e) => {
        setImage(e.target.files[0]);
    }
    
      const onClick = async () => {
        const formData = new FormData();
        formData.append('file', img);        
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

    const addPhrase = useCallback(e=>{
      
    },[])
 

    const onRemovePhrase = useCallback((phrase)=> (e) => {
        console.log('onremove',phrase)
    },[])

    const onPushPhrease = useCallback((idx,phrase)=>e=>{
        let arr =[0,1,2,3,4,5] //-6 -5 -4 -3 -2 -1
        let len = (arr.length*-1)+1;
        console.log('index',idx,len)
        let temp = arr.splice(len+idx ,idx-1 )
        console.log(temp)


        /* const temp = phraseInputList;
        console.log(idx, phrase,temp);
        const newList = temp.slice(idx,1,phrase)
        console.log('newList',newList, temp) */
        //setPhraseInputList(newList)
    });
    const mapToPhraseInput =  phraseInputList?.map((book,idx)=>{   
         
      return <PhraseInput key={idx} idx={idx} onPushPhrease={onPushPhrease} onRemovePhrase={onRemovePhrase}/>
    }) 

      

    return (
      <div className="post-form">
          <section className="head">
                <FaTimesCircle className="icon"/>
          </section>
          <section className="body">            
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
            <div className="phrase-wrapper">
                    {/* <PhraseInput onRemovePhrase={onRemovePhrase}/> */}
                    {mapToPhraseInput}
                    
                <button onClick={addPhrase}>문장 추가</button>
            </div>
            <textarea></textarea>
                
            <button type="submit">저장</button>
            
          </section>
      </div>
    );
};


export default PostForm;