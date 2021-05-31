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
    slideRef.current.style.width = `${size * (phraseList.length + 1)}vw`; //여기
    setTotalSlides(phraseList.length);
  }, []);

  const mapToCarouselDiv = phraseList.map((v, idx) => {
    return (
      <CarouselDiv size={size} text={v} key={idx}>
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
    slideRef.current.style.transform = `translateX(-${currentSlide * size}vw)`; // 여기
  }, [currentSlide]);
  return (
    <Wrapper>
      <SlideBtn className="left" onClick={(e) => prevSlide(e)}>
        {currentSlide > 0 ? <FaChevronLeft /> : '  '}
      </SlideBtn>

      <Slider size={size}>
        <Paging>
          {currentSlide + 1}/{totalSlides + 1}
        </Paging>
        <ImageWrap ref={slideRef}>
          <Image margin="0px" size={size} src={image} />
          {mapToCarouselDiv}
        </ImageWrap>
      </Slider>

      <SlideBtn className="right" onClick={(e) => nextSlide(e)}>
        {currentSlide === totalSlides ? '' : <FaChevronRight />}
      </SlideBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: ${(props) => props.size}vw;
  height: ${(props) => props.size}vw;
`;

const SlideBtn = styled.div`
  width: 20px;
  position: absolute;
  cursor: pointer;
  height: 100%;
  color: ${(props) => props.theme.color.gray};

  &:hover {
    color: ${(props) => props.theme.color.navy};
  }

  ${(props) => props.theme.flex_row};
  &.left {
    z-index: 1;
    left: 0;
  }

  &.right {
    z-index: 1;
    right: 0;
  }
`;

const Slider = styled.div`
  width: ${(props) => props.size}vw; // 여기
  overflow: hidden;
`;

const ImageWrap = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  height: ${(props) => props.size}vw; // 여기
`;

const CarouselDiv = styled.div`
  background-color: rgb(238, 247, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size}vw; // 여기
  height: ${(props) => props.size}vw; // 여기
`;

const Paging = styled.div`
  position: absolute;
  width: 40px;
  color: white;
  font-size: 0.5rem;
  background-color: rgb(164, 164, 164, 0.75);
  top: 0;
  right: 0;
  margin: 0.5rem;
  z-index: 1;
  border-radius: 1rem;
  height: 1rem;
  ${(props) => props.theme.flex_row};
  justify-content: center;
`;
export default ImageCarousel;
