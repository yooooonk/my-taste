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
