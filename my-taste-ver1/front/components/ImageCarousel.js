import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backUrl } from "../config/config";
import CarouselDiv from "./CarouselDiv";
import { FaChevronRight, FaChevronLeft} from "react-icons/fa"; 


const ImageCarousel = ({image,phraseList})=>{
    const [imageSrc, setImageSrc] = useState('')
    const [totalSlides, setTotalSlides] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    
    useEffect(()=>{
      if(image.indexOf('http')===0){
          setImageSrc(image);
      }else{
          setImageSrc(`${backUrl}/${image}`);        
      } 
      slideRef.current.style.width= `${40*(phraseList.length+1)}vh`;
      setTotalSlides(phraseList.length)
    },[])

    const mapToCarouselDiv = phraseList.map(v=>{
      return <CarouselDiv text={v.phrase} key={v._id} />
    })
    
    // 캐루셀 이벤트    
   
    const nextSlide = () => {
      if (currentSlide >= totalSlides) return;
      
      setCurrentSlide(currentSlide + 1);      
    };

    const prevSlide = () => {
      if (currentSlide === 0) return ;
     
      setCurrentSlide(currentSlide - 1);   
    };

    useEffect(() => {
      console.log(currentSlide)
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide*40}vh)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);
    return (
      <div className="image-carousel">
        <span className='blank' onClick={prevSlide}>
        {currentSlide >0 ?<FaChevronLeft /> : '  '}
        </span>
        
        <div className="slider" >           
            <div className="image-wrap" ref={slideRef}>
                <img src={imageSrc}></img>
                  {mapToCarouselDiv}
            </div>   
            <span>{currentSlide+1}/{totalSlides+1}</span>         
        </div>
        <span className='blank' onClick={nextSlide}>
         {currentSlide===totalSlides? '':<FaChevronRight /> }
        </span>
        
      
       
      </div>
    );
};


export default ImageCarousel;