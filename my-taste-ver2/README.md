# My-taset ver2

## 개발 순서

1. 최소단위 컴포넌트 만들기

- global style 적용해보기
  [v] styled-component 사용 - theme-provider이용
  [v] Grid.js
  [v] Button.js
  [v] Input.js
  [v] Text.js
  [v] Image.js

2. 로그인 설정
   [v] router, redux, firebase 설치
   [v] navbar 만들기
   [v] 로그인 컴포넌트
   [v] 회원가입 컴포넌트
   [v] 회원가입 구현 + validation 체크
   [v] 로그인 구현
   [v] fb auth error msg 처리
   [v] 로그인 상태 가져오기
   [v] Permit으로 로그인 상태에 따라 버튼노출 다르게
   [v] 로그아웃구현

3. 포스트작성
   [v] Post Write 컴포넌트 만들기
   [v] Preview만들기
   [v] 포스트 작성
   [v] 게시글 작성할 때 이미지 업로드
   [v] Post 컴포넌트

4. 댓글 작성 + 좋아요 기능
   [v] 댓글 목록 컴포넌트 만들기
   [v] 댓글 가져오기 기능
   [v] 댓글 작성 컴포넌트 만들기
   [v] 댓글 추가기능

5. 알림기능
   [v] 댓글 알림
   [v] 좋아요 알림

6. 책 검색기능
   [v] 컴포넌트 생성
   [v] 검색
   [v] 책 상세보기
   [] 스타일링, 반응형 적용

7. 책 좋아요 기능
   [v] 모듈 생성
   [v] 스타일링

8. basket 페이지
   [] 컴포넌트 생성

![](https://images.velog.io/images/ouo_yoonk/post/6022eff8-676d-44b4-8417-3268f5125d36/home.gif)

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

# 상세기능

- 메인화면
- 회원관련 페이지
- 검색기능

  - 이미지

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e75307f4-5c65-4e95-95f4-6316e66eddaf/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e75307f4-5c65-4e95-95f4-6316e66eddaf/Untitled.png)

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c08f9f79-ac5f-4293-b424-a946fefa53ca/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c08f9f79-ac5f-4293-b424-a946fefa53ca/Untitled.png)

  - 무한 스크롤 적용

- 책장 기능
- 책 기록 기능
- Feed 기능

  - 무한 스크롤 적용
  - 좋아요 기능 - 좋아요, 댓글 알림
  - 포스트 수정,삭제 기능
  - 이미지

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8961da74-b33b-4a2b-97aa-27a925320bde/post.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8961da74-b33b-4a2b-97aa-27a925320bde/post.gif)

- Caleandar

  - shelf에서 좋아요 한 책 저장
  - 이미지

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3446a9a1-be11-410e-bf66-2d77c426f6cd/caleandar.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3446a9a1-be11-410e-bf66-2d77c426f6cd/caleandar.gif)
