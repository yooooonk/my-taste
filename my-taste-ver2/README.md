# My-taset ver2

# 프로젝트 정보

좋아하는 것은 보고만 있어도 기분이 좋습니다.

그런 것들을 한 담고, 기록해, 모아서 본다면 팍팍한 하루에 잠깐이라도 기쁠 수 있지않을까?라는 마음에서 출발한 프로젝트입니다.

우선은 개발자의 독서습관을 담아 책에 대한 서비스를 만들었습니다.

- URL : [https://my-taste-e6d3f.firebaseapp.com/](https://my-taste-e6d3f.firebaseapp.com/)
- stack : react, redux, thunk, firebase, styled-component
- 개발 기간 : 21.3.28~21.4.1(1차 수정) 이후 개선 수정 중

✔️ 책을 검색해, 읽을 예정인 책 혹은 관심있는 책을 담을 수 있다
✔️ 책에 대해 감상과 기억하고 싶은 문장을 기록할 수 있다
✔️ 달력으로 독서 현황을 한 눈에 확인할 수 있다
✔️ 피드에서 다른 사람이 남긴 글을 볼 수 있다

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
- async-await으로 리팩토링
- firebase로 서버리스 구현
- styled component사용, 디자인 수정 및 반응형 디자인 추가
- 이미지 캐루셀 수정
- atomic 디자인 패턴 중 atom-component-page 구조 적용
- 회원가입 벨리데이션 수정
- Post Feed에서 좋아요, 댓글, 알림 기능 추가 - firebase realtile database 이용
- 독서 달력 추가
- 글쓰기 누르면 썸네일 자동 삽입
- loading spinner 적용
- 서버통신관련에서 리덕스에서 관리, Error Msg 컴포넌트 만들어 처리
- bookShelf Grid 적용

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
