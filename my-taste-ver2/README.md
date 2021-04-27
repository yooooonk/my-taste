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

# 🙋About

My Taste를 수정하고, 개선한 ver2!

- stack : React, redux, thunk, styled-component, firebase
- 개발기간 : 21.3.28~21.4.1(1차)

## 상세기능과 개선기능

### 반응형으로 수정

![](https://images.velog.io/images/ouo_yoonk/post/7ed3cb47-912a-47fa-83a7-68665efeb7b7/responsive.gif)

### 로그인, 회원가입

![](https://images.velog.io/images/ouo_yoonk/post/0a626ff3-a9d7-406e-91c8-2cc24a5a7612/login.gif)

- 로그인은 firebase의 authentication 기능 이용
- Error Msg 컴포넌트를 만들어 error msg 처리
- 로그인 여부에 따른 버튼 노출은 Permit 컴포넌트를 만들어 처리

### 이미지 캐루셀과 레이아웃 선택기능

![](https://images.velog.io/images/ouo_yoonk/post/44fd61ac-258a-4a0d-8810-ef6cb52de108/layout.gif)
🐤 radio 버튼으로 layout을 선택하면 layout type을 store에 저장.
{layouttype && ()}
{layouttype && ()} 이런식으로 타입별로 조건부 렌더링을 했다. layout component를 만들어서 끼워넣는 방법이 있을까..? -이미지 캐루셀 버튼 이동

### 포스트 디테일에서 좋아요, 댓글, 알림기능 추가

![](https://images.velog.io/images/ouo_yoonk/post/1db8c48f-6e2e-40bc-bfcf-1ecfc6bd283f/noti.gif)

- firebase의 realtime database를 이용해 알람기능을 만들었다

### thunk async-await 사용

## ?

- styled component 글로벌
  https://howdy-mj.me/css/styled-components-with-global-style/

- firebase realtime -- 복합쿼리 설정
- list가져올 때 중복없이 하는 법!

- 좋아요 데이터를 post collection에 넣을지? 따로 like로 뺄지? -- like로 뺐음 --> Post 컴포넌트에서 like를 가지고오면 할때마다 like를 힛함..post에 넣음
- like할 때 알람울림

- saga와 locash, thunk

- 레이아웃을 바꿨더니 무한 스크롤안됨-- div에 scroll이 생기는건 widnow scroll이 아님. wrapper를 만들어서 scroll 이벤트를 주고, 모바일와 데스크탑모드의 스크롤이벤트를 분리해 가져오는 값을 ㅂ꿈

- 반응형 웹을 위해 resize할때마다 이벤트를 불러오는데 너무 자주불러옴..괜찮은것? -- header에 resize할 때 viewMode를 설정하게끔 만듦, \_throttle 붙임

- 반응형 wrapper 만들기!

- 레이아웃 선택.... -> 모드에 따라 각각 레이아웃을 일단 만들자

- 책검색 목록에서 카드 선택하면 translate 이동?

  - 처음에는 bookCard 컴포넌트에서 uesRef를 이용했는데 이전 카드 정보를 기억못함
  - bookCard는 현재 자기자신의 ref만 가지고잇음.
  - store에 selected card를 저장했음
  - 상위컴포넌트인 SearchList에서 preCard state를 줘서 관리하는 걸로 바꿈

- 컴포넌트 디렉토리 구조에 대한 고민
  - page별로 나눴는데, 재사용성이라는 리액트 철학에 안 맞는 것 같다.
