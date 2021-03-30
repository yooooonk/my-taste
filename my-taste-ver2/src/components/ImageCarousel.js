import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Image } from '../elements';
import styled from 'styled-components';

const ImageCarousel = ({ image, phraseList, size }) => {
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    /* if (image.indexOf('http') === 0) {
      setImageSrc(image);
    } else {
      setImageSrc(`${backUrl}/${image}`);
    } */
    slideRef.current.style.width = `${40 * (phraseList.length + 1)}vh`;
    setTotalSlides(phraseList.length);
  }, []);

  const mapToCarouselDiv = phraseList.map((v, idx) => {
    return (
      <CarouselDiv text={v} key={idx}>
        {v}
      </CarouselDiv>
    );
  });

  // 캐루셀 이벤트

  const nextSlide = (e) => {
    e.stopPropagation();
    if (currentSlide >= totalSlides) return;

    setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (currentSlide === 0) return;

    setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide * 40}vh)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]);
  return (
    <Wrapper>
      <SlideBtn onClick={(e) => prevSlide(e)}>
        {currentSlide > 0 ? <FaChevronLeft /> : '  '}
      </SlideBtn>

      <Slider>
        <Paging>
          {currentSlide + 1}/{totalSlides + 1}
        </Paging>
        <ImageWrap ref={slideRef}>
          <Image size="40vh" src={image} />
          {mapToCarouselDiv}
        </ImageWrap>
      </Slider>
      <SlideBtn onClick={(e) => nextSlide(e)}>
        {currentSlide === totalSlides ? '' : <FaChevronRight />}
      </SlideBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SlideBtn = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Slider = styled.div`
  width: 40vh;
  overflow: hidden;
`;

const ImageWrap = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  height: 40vh;
`;

const CarouselDiv = styled.div`
  background-color: rgb(238, 247, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vh;
  height: 40vh;
`;

const Paging = styled.div`
  display: inline-block;
  text-align: center;
  position: relative;
  border-radius: 10px;
  z-index: 1;
  top: 30px;
  left: 100px;
  width: 40px;
  color: white;
  font-size: 0.8em;
  background-color: rgba(128, 128, 128, 0.795);
`;
export default ImageCarousel;
