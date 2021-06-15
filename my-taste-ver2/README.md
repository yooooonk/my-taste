# My-taset ver2

# 프로젝트 정보

좋아하는 것은 보고만 있어도 기분이 좋습니다.

그런 것들을 한 담고, 기록해, 모아서 본다면 팍팍한 하루에 잠깐이라도 기쁠 수 있지않을까?라는 마음에서 출발한 프로젝트입니다.

우선은 개발자의 독서습관을 담아 책에 대한 서비스를 만들었습니다.

- URL : [https://my-taste-e6d3f.firebaseapp.com/](https://my-taste-e6d3f.firebaseapp.com/)
- stack : react, redux, thunk, firebase, styled-component
- 개발 기간 : 21.3.28~21.4.1(1차 수정) 이후 개선 수정 중

- ✔️ 책을 검색해, 읽을 예정인 책 혹은 관심있는 책을 담을 수 있다
- ✔️ 책에 대해 감상과 기억하고 싶은 문장을 기록할 수 있다
- ✔️ 달력으로 독서 현황을 한 눈에 확인할 수 있다
- ✔️ 피드에서 다른 사람이 남긴 글을 볼 수 있다

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bd1cab33-6e4a-4985-a3f1-036bcb213434/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210615%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210615T134115Z&X-Amz-Expires=86400&X-Amz-Signature=a24e67412b55cdc68256bb5b8050ebe31a3e5ab6d658cd21862ea9276ce93d84&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

# ver2의 개선 사항

- 무한 스크롤, resize 이벤트 throttle 처리

  ```tsx
  // AppLayout.js
  const handleResize = _.throttle(() => {
    dispatch(commonActions.setIsMobile(window.innerWidth < 1025));
  }, 300);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  ```

- 반응형 Scroll Wrapper에서 스크롤 에러 수정

  반응형으로 레이아웃을 바꿨더니 무한 스크롤이 안됐다.

  스크롤 이벤트를 걸어둔 곳은 div고, 모바일에서는 window에 스크롤이 적용된다는 것을 알아냄.

  각각 스크롤 이벤트를 만들어 적용

  ```tsx
  // ScrollWrapper.js
  const handleScrollForMobile = _.throttle((e) => {
    if (loading) return;

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScrollForDesktop = _.throttle((e) => {
    if (loading) return;

    const scrollPer = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100
    );
    if (scrollPer > 80) {
      callNext();
    }
  }, 300);

  useEffect(() => {
    if (loading) return;
    if (is_next) {
      window.addEventListener('scroll', handleScrollForMobile);
    } else {
      window.removeEventListener('scroll', handleScrollForMobile);
    }
    return () => {
      window.removeEventListener('scroll', handleScrollForMobile);
    };
  }, [is_next, loading]);
  ```

- async-await으로 리팩토링

  ```tsx
  // redux/modules/post.js
  const fetchDeletePost =
    (postId, basketId) =>
    async (dispatch, getState, { history }) => {
      try {
        const res = await postAPI.deletePost(postId);

        dispatch(deletePost(postId));

        dispatch(bookActions.fetchUpdateBookBasket(basketId, { postId: null }));

        history.replace('/feed');
      } catch (error) {
        alert('삭제에 실패했습니다');
        console.error(error);
      }
    };
  ```

- firebase로 서버리스 구현

  firebase의 인증, 실시간 database, fireStore, storage, hosting 기능 사용

  ```tsx
  //shared/firebase.js
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  import 'firebase/storage';
  import 'firebase/database';

  const firebaseConfig = {
    apiKey: 'AIzaSyAt8BaxkFizyfmIaB4dsVF7B0mGWBfx54g',
    authDomain: 'my-taste-e6d3f.firebaseapp.com',
    projectId: 'my-taste-e6d3f',
    storageBucket: 'my-taste-e6d3f.appspot.com',
    messagingSenderId: '843241165360',
    appId: '1:843241165360:web:4f67bd9e0acfc46b2f93f5'
  };
  export const apiKey = firebaseConfig.apiKey;

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const realtime = firebase.database();

  export { auth, firestore, storage, realtime };
  ```

- 이미지 캐루셀 수정

  ```tsx
  // ImageCarousel.js
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
      slideRef.current.style.transform = `translateX(-${
        currentSlide * size
      }vw)`; // 여기
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
  ```

- Post Feed에서 좋아요, 댓글, 알림 기능 추가 - firebase realtile database 이용

  ```tsx
  // Notification.js
  if (!user) return;

      const notiDB = realtime.ref(`noti/${user.uid}/list`);

      const _noti = notiDB.orderByChild('insert_dt');
      _noti.once('value', (snapshot) => {
        if (snapshot.exists()) {
          let _data = snapshot.val();
          let _noti_list = Object.keys(_data)
            .reverse()
            .map((s) => {
              return _data[s];
            });

          setNoti(_noti_list);
        }
      });
      return () => {};
    }, [user]);
  ```

- 글쓰기 누르면 썸네일 자동 삽입

  ```tsx
  // BascketCard.js
  const onWrite = async (e) => {
    if (book.postId) {
      goTo(`/edit/${book.postId}`);
    } else {
      // 연필 아이콘을 클릭하면 image module의 프리뷰를 셋팅해
      // PostWrite 화면에서 썸네일을 볼 수 있다
      await dispatch(imageActions.setPreview(book.thumbnail));
      goTo(`/write/${book.id}`);
    }
  };
  ```

- loading spinner 적용

  ```tsx
  // BookCalendaer.js
  <Container>
    <Calendar />
    <PulseLoader loading={loading} css={spinnerStyle} color="#3a5378" />
  </Container>
  ```

- 서버통신관련에서 리덕스에서 관리, Error Msg 컴포넌트 만들어 처리

  ```tsx
  // Login.js에서 에러처리 관련 로직
  ...
  const loginError = useSelector ((state) => state.user.loginError);
  ...
  <ErrorMsg valid={loginError.isError}>{loginError.msg}</ErrorMsg>
  ```

- 독서 달력 추가
- atomic 디자인 패턴 중 atom-component-page 구조 적용
- 회원가입 벨리데이션 수정
-

## 상세기능

### 메인화면

![](https://images.velog.io/images/ouo_yoonk/post/7e018fed-f0e0-44d5-89c3-005cd1d0014f/login.gif)

- dashboard에서 저장한 책, 읽은 책, 기록한 책 통계를 확인할 수 있다
- 저장한 문장을 랜덤으로 보여준다

### 회원가입

![](https://images.velog.io/images/ouo_yoonk/post/659778d8-67dc-4018-be3e-84f4ba04a65d/signup.gif)

- 회원가입 후 바로 로그인

### 프로필 수정

![](https://images.velog.io/images/ouo_yoonk/post/277faa81-2caf-4da9-82b0-f5832a26f378/profile.gif)

- firebase auth 기능 이용

### 검색 후 저장

![](https://images.velog.io/images/ouo_yoonk/post/67ac17d3-683d-4cf1-a725-3e70cca84601/search.gif)

- 무한 스크롤, spinner 추가

### 포스트 쓰기

![](https://images.velog.io/images/ouo_yoonk/post/39da54bd-9955-48ac-8f45-a7149042ac60/writefull.gif)

- 썸네일 자동 추가
- 문장, 감상 스위치를 이용해 하나의 text area에서 작성
- 이미 작성한 글이 있으면 수정 페이지로 감

### Feed

![](https://images.velog.io/images/ouo_yoonk/post/c2da62d6-52eb-455a-9e81-bf5704fa71d5/post.gif)

- 무한 스크롤 적용
- 좋아요, 댓글 기능 - 알림 기능 추가
- 포스트 수정, 삭제

### Calendar

![](https://images.velog.io/images/ouo_yoonk/post/d3707e45-c662-4b90-a4e2-0ab845c88b24/caleandar.gif)

- shelf에서 읽음 표시하면 달력에 저장

```

```
