# &#127752; My Taste

내 취향이 무엇을 한눈에 알아보기 위해 만든 프로젝트.
를 목표로 우선 책을 찾고, 담고, 읽은 내용을 남기는 서비스를 만들고 있습니다. 여러가지를 시도하면서 계속 발전시켜나갈 예정입니다.

- 기간 : 21.2.2~3.9 (이후 개선중)

## STACK

- frontend : react, nextjs(9 ver)
- backend : nodejs, express
- db : mongoDb, mongoose
- antd, styled-component

## 트러블슈팅

<details>
<summary>passport로 로그인 후 쿠키 공유</summary>
<div markdown="1">
&#128556; 패스포트 로그인을 하면, req.user로 세션 정보를 가지고 올 수 있다.는데 `req.user가 자꾸 undefined`로 떴다. ㅠ
이런 경우 __cors 문제__ 거나 __미들웨어 선언 순서__ 를 확인하라고 했는데, 미들웨어 선언 순서에는 문제가 없었다. 그렇다면 cors 문제인데 cors 문제 없이 백엔드 통신을 하게끔 설정을 해둬서 처음에는 이해를 못했다.

&#128161; 문제는 'cookie'였다. 세션 정보를 식별하기 위해서는 브라우저에서 cookie를 받아와야 한다. 그리고 쿠키를 받아오려면 `withCredentials=true` 로 설정해야 한다.

> withCredentials : true로 하면 쿠키를 주고받을 수 있음

```javascript
//backend-app.js
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true // 쿠키전달
  })
);
```

```javascript
// fonrt-end axios 설정
axios.defaults.withCredentials = true;
```

</div>
</details>

<details>
<summary>axios 분리</summary>
<div markdown="1">
&#128556; withCredential=true로 설정했더니, 이번엔 open API를 호출하는 부분에서 cors 에러가 발생했다.
withCredential=true일 때는 cors를 *로 설정못하기 때문...
![](https://images.velog.io/images/ouo_yoonk/post/fac316a1-a7f2-4e02-bfb4-92a633152915/image.png)

&#128161; 그래서 open API 호출용 axios를 따로 생성해, withCredentials 설정 바꿔주었다

```javascript
const openApi = axios.create();
openApi.defaults.withCredentials = false;
```

</div>
</details>

<details>
<summary>컴포넌트에서 스크롤 이벤트</summary>
<div markdown="1">
  &#128556; 무한 스크롤링을 구현하고 싶은데, 컴포넌트에서는 기존의 방법으로 scroll 높이를 구할 수 없었다. 이전에 무한 스크롤을 구현할 때 썼던 속성은 아래의 세가지였다. __document.documentElement는 <html> 태그에 해당__ 한다. 내 경우 문서 전체 스크롤이 아닌 컴포넌트의 스크롤을 이용하므로, 이 속성으로는 내가 원하는 값을 구할 수 없었다.

```javascript
window.scrollY;
document.documentElement.clientHeight;
document.documentElement.scrollHeight;
```

&#128161; 해당 컴포넌트의 높이와 스크롤 위치를 구하면 된다. onScroll 이벤트를 컴포넌트 div에 붙였기 때문에 onScroll 함수에서 이벤트 객체를 전달받을 수 있다. `e.target`로 컴포넌트의 DOM element 객체를 얻어 scrollHeight, clientHeight, scrollTop 속성으로 스크롤 값을 구할 수 있었다.

```javascript

 const onScroll = (e)=>{
 	console.log(e.target.scrollHeight-e.target.clientHeight, e.target.scrollTop)
 {

 return (
     <div className="BookSearchList" onScroll={onScroll}  >
       { bookSearchList.length>0? mapToComponent : <NoSearchResult/>}
     </div>
   );
```

> Element.scrollHeight : 스크롤하지 않았을 때의 전체 높이
> Element.clientHeight : 눈에 보이는 만큼의 높이
> Element.scrollTop : 스크롤해서 올라간 높이

</div>
</details>
<details>
<summary>업로드한 이미지가 안보임</summary>
<div markdown="1">
&#128556; multer를 이용해 업로드한 이미지를 미리보기 하려고 하는데 경로를 가져와도 이미지가 안보였다.
&#128161; express static이라는 middeware를 사용해서 해결했다.

> 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하십시오. 정적 자산이 포함된 디렉토리의 이름을 express.static 미들웨어 함수에 전달하면 파일의 직접적인 제공을 시작할 수 있습니다. 예를 들면, 다음과 같은 코드를 이용하여 public이라는 이름의 디렉토리에 포함된 이미지, CSS 파일 및 JavaScript 파일을 제공하십시오.

[express static](https://expressjs.com/ko/starter/static-files.html)

</div>
</details>
<details>
<summary>배열을 state로 사용하기  </summary>
<div markdown="1">
&#128556; 기록하고 싶은 문장을 추가하는 컴포넌트를 계속 추가하기 위해 list로 반복 렌더링하는 방법을 사용하기로 했다. 반복 렌더링을 위해서는 배열을 사용해야 하는데 list를 state로 어떻게 사용할까싶어 찾아봤다. 
  
&#128161; immer는 reducer 만들 때만 사용하는 줄 알았는데...당연히 컴포넌트에서도 사용할 수 있었다. 또는 javascript의 array 함수를 사용할 수도 있는데, 배열을 직접 변경하는 push, splice, unshift, pop은 사용할 수 없고, 새로운 배열을 리턴하는 `concat`, `slice`, `map`, `filter` 등을 사용해야 한다.
 [출처](https://velopert.com/3636)

</div>
</details>
<details>
<summary>무한렌더링 에러</summary>
<div markdown="1">

![](https://images.velog.io/images/ouo_yoonk/post/4033b235-a237-42c0-aa6a-0290c98d90f2/image.png)

```javascript
{
  isEdit ? (
    <input
      type="text"
      onChange={onChangePhrase}
      onBlur={setIsEdit(false)}
      value={phraseData}
    ></input>
  ) : (
    <div>
      <span onClick={setIsEdit(true)}>{phraseData}</span>
      <FaTimes className="icon" onClick={onRemovePhrase} />
    </div>
  );
}
```

&#128556; 문제의 소스...처음에 어디서부터 손을 대야할지 몰라서 컴포넌트 하나하나를 지워가며 찾은 결과..저 문제인걸 알았다. 저기서 또 뭐가 문제인지...한참을 찾아서 찾은 원인은 `onClick={setIsEdit(true)}` 이 부분이었다.
&#128161; 리액트 컴포넌트는 이렇게 생겼다고한다. 그래서 위의 경우 onClick 이벤트 안에는 함수!가 들어가야한다. 함수를 호출해야한다면 함수를 호출하는 함수를 만들어 넣어야한다. 그래서 해결은 `onClick={()=> setIsEdit(true)}` 이렇게 함수를 호출하는 함수를 넣어줬다. 완벽하게 이해가 안됐지만 ... 리액트에 좀 더 본질적이고 중요한 부분인것같다...더 공부공부 ㅠ

```javascript
const div = ({ setState }) => {
  const onClick = (e) => {
    setState(e);
  };
  return <></>;
};
```

</div>
</details>

<details>
<summary>useCallback handler에서 parameter 받기</summary>
<div markdown="1">
``` javascript
  const onRemovePhrase = useCallback((phrase)=> (e) => {
        console.log('onremove',phrase)
    },[])
```
</div>
</details>

## 상세기능

![](https://images.velog.io/images/ouo_yoonk/post/d0f3b76f-6732-41c0-8c67-27581f5ff22a/calendar4gg.gif)

- 회원가입
- validation 체크
  ![](https://images.velog.io/images/ouo_yoonk/post/2b88e80d-c591-4a87-aeb7-20e0ab3c8572/loginn.gif)
- passport로 로그인 구현
- validation 확인
- 좋아요, 읽은 수, 남긴 글의 개수을 dashboard에 표시
- diary에 남긴 문장 중 하나를 랜덤으로 노출

![](https://images.velog.io/images/ouo_yoonk/post/a41edf51-0325-41bd-b217-8bd8b4186df4/search.gif)

- open api를 이용해 책 검색
- list 무한 스크롤링
- 좋아요 기능 - basket에 담김
- basket에 담겨있는 책과 글을 작성한 책은 하트와 연필이 진한 색으로 나타남

![](https://images.velog.io/images/ouo_yoonk/post/9bb6b9b5-0e93-47db-bc03-e0b04b26155e/calendar4.gif)

- 쓰기기능
- 사진을 등록하고, 기록하고 싶은 문장 10개와 감상을 저장할 수 있다.
- 이렇게 저장한 문장은 div 형태로 보여줌

![](https://images.velog.io/images/ouo_yoonk/post/867e7b57-05a1-4ef9-8637-28124f9b3d11/gggg.gif)

- 검색목록에서 좋아요한 책들이 담김
- 읽음 표시 기능
- 다이어리에 기록 표시 기능
- 삭제 기능
- 링크선택시 상세보기

![](https://images.velog.io/images/ouo_yoonk/post/ade7a5a6-264f-4252-88a9-391539ab793b/diary.gif)

- 책에 대해 기록한 것을 모아보는 기능
- 사진을 등록하면 등록한 사진이 나오고 등록하지 않으면 썸네일이 기본으로 저장됨
- 두 번째부터는 기록했던 문장을 div형태로 볼 수 있게 처리
- 이미지 캐루셀은 라이브러리 없이 직접 구현

## 기록

<details>
<summary>next js</summary>
<div markdown="1">

- pages 폴더의 라우팅 기능
- 동적 라우팅 기능
- pages/\_app.js는 페이지마다 공통된 것을 처리
- nextjs에서 scss를 사용하기 위한 셋팅

```javascript
// next.config.js
const withSass = require('@zeit/next-sass');
module.exports = withSass();
```

- next-redux-saga 사용

```
$ npm i redux-saga next-redux-saga
```

```javascript
// page/_app.js
inport withReduxSaga from 'next-redux-saga'
...
export default wrapper.withRedux(withReduxSaga(App));
```

</div>
</details>

<details>
<summary>redux, redux-toolkit 사용</summary>
<div markdown="1">

- 기존의 리덕스 사용법 보다 간편하고, immer가 적용되어 있어서 사용
- [리덕스 툴킷 사용법](https://blog.rhostem.com/posts/2020-03-04-redux-toolkits)

```
$ npm i redux-saga next-redux-wrapper redux-devtools-extension redux react-redux
```

- reducer tool-kit을 이용해 작성한 reducer

```javascript
import { createReducer, createAction } from '@reduxjs/toolkit';

export const initialState = {
  isLoggedIn: false,
  user: null
};

export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');

const user = createReducer(initialState, {
  [login]: (state, action) => {
    state.isLoggedIn = true;
    state.user = action.data;
  },
  [logout]: (state) => {
    state.isLoggedIn = false;
    state.user = null;
  }
});

export default user;
```

</div>
</details>

<details>
<summary>로그인 구현 with passport js</summary>
<div markdown="1">
- passport index.js
- local
- 사용 : app.js, user controller - passport.authenticate('local',(err,user,info)=>{

}), passport 안에서 next를 사용하는방법잇음-미들웨어확장

```
$ npm i passport passport-local cookie-parser express-session
```

</div>
</details>

---

**&#128209; reference**

- [인프런 - react로 nodebird sns만들기](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC#)
- [nest.js에서 sass 사용하기](https://this-programmer.tistory.com/entry/nextjs%EC%97%90%EC%84%9C-sass%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
