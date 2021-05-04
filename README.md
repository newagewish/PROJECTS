#쇼핑몰 웹사이트 - 개인프로젝트
---

![메인 사진](https://user-images.githubusercontent.com/76409244/108950687-f1032d80-76a9-11eb-8076-59634dab1c1c.png)
---

배포 : www.shop-portfolio.site  
박경립  
연락처 010-5533-3222 / newagewish@gmail.com  

## 목차
  1. [들어가며](#1-들어가며)  
      1-1. [프로젝트 소개](#1-1-프로젝트-소개)  
      1-2. [프로젝트 기능](#1-2-프로젝트-기능)  
      1-3. [개발 환경](#1-3-개발-환경)  
      1-4. [프로젝트 작동구조](#1-4-프로젝트-작동구조)  
      
  2. [프론트엔드](#2-프론트엔드)  
      2-1. [프론트엔드 구조](#2-1-프론트엔드-구조)  
      2-2. [프론트엔드 개발 및 생각](#2-2-프론트엔드-개발-및-생각)  


  3. [백엔드](#3-백엔드)  
      3-1. [백엔드 구조](#3-1-백엔드-구조)  
      3-2. [스프링 설정 파일 구성](#3-2-스프링-설정-파일-구성)  
      3-3. [컨트롤러 구성](#3-3-컨트롤러-구성)  
      3-4. [모델 구성](#3-4-모델-구성)  
      
      
  4. [마치며](#4-마치며)  
      4-1. [프로젝트 보완사항](#4-1-프로젝트-보완사항)  
      4-2. [소감](#4-2-소감)  
---
<br/>
<br/>
<br/>

# 1. 들어가며

 코드가 난잡하거나 길기 때문에 리드미를 최대한 간결하게 기록하기 위해 링크와 편집 이미지를 첨부합니다.  
 개인 프로젝트로 스프링 프레임워크를 사용하여 프론트엔드와 백엔드로 웹을 개발해보았습니다.  
 주로 어떤 기능을 개발하려고 했는지 보여주려 합니다.  

## 1-1. 프로젝트 소개

 쇼핑몰 프로젝트를 시작한 이유는 기본적인 CRUD 기능을 가지고 있으며 DB에 저장된 정보를 활용한 기능 구현이 용이해 보였습니다.
실제 서비스 중인 쇼핑몰 기능을 직접 구현해보면 좋겠다고 생각했고 관련 기술을 학습한 후 혼자 제작한 개인프로젝트 입니다.
카카오프렌즈샵 사이트를 클론 코딩해보았으며 100% 구현 완료는 아니지만 현재 진행중이며 어느정도 틀은 완성한 상태입니다.
<br/>
<br/>

## 1-2. 프로젝트 기능

 프로젝트 초기에 구상한 기능은 상품에 대한 Create, Read, Update, Delete가 가능한 게시판 형태 였으나 많이 부족하다 생각하여
 실제 쇼핑몰 사이트에 근접할 수 있는 기능을 구현해보고자 몇가지 기능을 추가했습니다. 아래가 내용입니다.

  - 초기 기능

    - 게시물(상품)을 작성하여 DataBase에 저장.
    - DataBase에서 게시물을 조회하여 웹 페이지 상에 표시.
    - 게시물을 수정하여 DataBase에 저장.
    - 게시물을 삭제할 시 DataBase에서 삭제.

  - 주요 기능

    - Spring Security를 사용하여 페이지마다 접근 권한 혹은 각 기능에 필요한 권한이 필요하게 적용.
    - 회원가입 기능을 구현과 사용자를 (Admin, Member)로 분류, 가입에는 이메일 인증 필요.  
      Admin - 쇼핑몰 전체 상품, 카테고리, 카드, 공지사항, FAQ, 회원정보 등의 모든 기능에 접근 가능  
      Member - 회원정보(READ 및 UPDATE), 리뷰(별점, 댓글, 추천) 기능에 접근 가능  
    - 사용자 비밀번호 암호화 Sptring security의 BCryptPasswordEncoder 사용.
    - Google map api를 통해서 매장 위치 정보 조회 가능.
    - 공지사항, FAQ 등의 게시판 생성 및 CRUD 기능 추가.
    - 카테고리, 카드 CRUD 기능 추가.
    - 상품, 카테고리, 카드 CRUD 기능에 Ckeditor5 적용 및 Iframely(동영상 재생) 적용.
    - DB 테이블의 정보를 이용하여 상품 세부 조건 검색 기능(판매량순, 신상품순, 낮은 가격순, 높은 가격순).
    - 상품 세부 조건을 1가지만 적용하지 않고 최대 3가지 조건을 적용한 조회 기능.  
      예) 조건1(잡화 카테고리) + 조건2(낮은 가격순) + 조건3(어피치 캐릭터)
    - DB의 상품의 정보를 이용하여 현재 보는 상품과 유사한 제품 추천 표시 기능.
    - 최근 본 상품 최대 10개의 상품 표시 기능.
    - 상품의 옵션 추가(기본적인 옵션은 1개지만 휴대폰의 기종 혹은 옷의 사이즈 등과 같은 옵션).
    - 상품 스크롤 시 페이징 기능.
    - CRUD 기능에 Transaction 적용.
    - tomcat을 이용하여 WAR 배포
    
  - 기타 기능
    - history.state와 세션스토리지를 사용한 자동 스크롤

<br/>
<br/>

## 1-3. 개발 환경

   운영 체제 : window10  
   IDE : Eclipse 4.18.0  
   Back-end : Spring Framework5.0.7.RELEASE, myBatis3.5.3, Tomcat9.0  
   Front-end : HTML, CSS, Javascript, Jquery3.4.1  
   Data Base : Mysql8.0  
   Web browser : Chrome  
<br/>
<br/>

## 1-4. 프로젝트 작동구조

 Spring MVC패턴을 적용하여 MVC패턴 구조를 그대로 사용하고 있습니다.
![스프링 MVC패턴 사진](https://user-images.githubusercontent.com/76409244/108963493-81973900-76bd-11eb-9cf9-303116e41b86.png)  
프론트엔드와 백엔드 통신에는 주로 ajax 비동기 통신을 사용하며 파라미터로 데이터를 전달하는 방식을 사용하며 서버는 myBatis를 이용하여 mapper에 등록된 mapping interface에 해당하는 sql 문을 이용하여 DB에서 필요한 정보를 가져오고 JSON 형태로 데이터를 주고 받고 있습니다.
<br/>
<br/>

---
<br/>
<br/>
<br/>

# 2. 프론트엔드

## 2-1. 프론트엔드 구조

 일반적인 Spring Framework 구조를 가지고 있으며 Front-end 구조를 간단하게 표현하면 아래와 같습니다.
> src
> > main
> > > webapp
> > > > resources
> > > > > [css](./StoreProject/src/main/webapp/resources/css/)
> > > > > > css

> > > > > [script](./StoreProject/src/main/webapp/resources/script/)
> > > > > > js

> > > > WEB-INF
> > > > > [views](./StoreProject/src/main/webapp/WEB-INF/views/)
> > > > > > jsp
<br/>
<br/>

### 2-1-1. jsp  

 jsp 최상단에서는 스크립트 요소를 생성해주고  
head부분에 지시어를 통하여 다른 문서를 포함  
body에는 필요에 따라 액션태그 혹은 스크립트를 주로 사용하고 있습니다.  

예)  
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<title>스토어 프로젝트</title>
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
	<!-- css -->
	<link href="/resources/css/home.css" rel="stylesheet">
	<!-- script -->
	<script src="/resources/script/home.js"></script>
</head>
<body>
  <%@include file="includes/header.jsp" %>
  ...
  <%@include file="includes/footer.jsp" %>
  <script>
  ...
  </script>
</body>
</html>
```  
<br/>
<br/>

### 2-1-2. js

 JavaScript와 Jqeury를 주로 사용 하고 있으며 window.onload, doument.ready를 사용 하여 문서의 로드시점에 맞게 이벤트를 동작하고 있습니다.
통신은 주로 ajax 비동기 통신을 사용 합니다.  

예)  
```  
window.onload = function(){
	...
}
$(document).ready(function(){
	...
});
```  
<br/>
<br/>

## 2-2. 프론트엔드 개발 및 생각
 
### 2-2-1. 메인 페이지

+ home 링크  
	- javascript : [home.js](./StoreProject/src/main/webapp/resources/script/home.js)  
	- css : [home.css](./StoreProject/src/main/webapp/resources/css/home.css)  
	- jsp : [home.jsp](./StoreProject/src/main/webapp/WEB-INF/views/home.jsp)  

### 상단 메뉴바

+ header 링크  
	- javascript : [header.js](./StoreProject/src/main/webapp/resources/script/header/header.js)  
	- css : [header.css](./StoreProject/src/main/webapp/resources/css/includes/header.css)  
	- jsp : [header.jsp](./StoreProject/src/main/webapp/WEB-INF/views/includes/header.jsp)  
	
<img width="843" alt="headbar" src="https://user-images.githubusercontent.com/76409244/115557383-a0483380-a2ec-11eb-9697-cfcc37942e40.png">

 페이지의 top 부분에는 메뉴바를 2개 고정했습니다.  
첫 번째 메뉴바에는 '카테고리, 매장 안내, 고객센터, 로고, 검색, 사용자, 장바구니' 버튼이 자리하고 있습니다.  
어떤 페이지를 가도 첫 번째 메뉴바가 보이도록 include로 각 페이지의 상단에 포함하여 사용하고 있습니다.  

두 번째 메뉴바에는 홈페이지 메인에서 보여줄 상품의 표시 방법에 따라 소 메뉴로 나눈 버튼을 가지고 있습니다.  
'홈-신규-인기-세일-전체' 버튼이 메인 페이지에서만 노출되도록 사용하고 있습니다.  

<br/>

### 슬라이드 형식

![홈이미지1](https://user-images.githubusercontent.com/76409244/116383553-e99b0480-a851-11eb-94db-62e8012628e1.gif)

 각 소 메뉴 버튼 클릭 시 콘텐츠 박스의 margin을 조절하여 가로로 나열된 div를 하나씩 노출 되도록 했습니다.  

<br/>

### 페이징 처리

![홈이미지2](https://user-images.githubusercontent.com/76409244/116383568-edc72200-a851-11eb-88e9-1aca4385c109.gif)

 각 소 메뉴마다 스크롤이 바닥에 근접하면 자동으로 다음 페이지를 불러오는 형식을 가지고 있습니다.  
ajax 통신으로 가져온 상품 데이터를 가지고 주로 append 메서드를 사용하여 처리합니다.  

<br/>

### 소메뉴-전체-조건 조회

![조건 조회 1](https://user-images.githubusercontent.com/76409244/116383582-ef90e580-a851-11eb-865a-c7fd36a0f68e.gif)

 위 이미지는 첫 번째 조건+캐릭터 전체를 선택했을 때의 반응입니다.  
전체 소 메뉴에서는 상품을 일정 조건에 맞게 조회할 수 있도록 했습니다.  
첫 번째 조건에는 판매량순(기본)-신상품순-낮은가격순-높은가격순 을 지정할 수 있습니다.  

<br/>

![조건 조회 2](https://user-images.githubusercontent.com/76409244/116383591-f0297c00-a851-11eb-9631-a1daa7322d6c.gif)

 위 이미지는 첫 번째 조건 + 캐릭터 별 선택지에 대한 반응입니다.  
두 번재 조건에는 카카오 프렌즈 캐릭터를 각각 선택할 수 있도록 했으며,   
기존 공홈에는 없는 니니즈 캐릭터를 선택할 수 있도록 추가했습니다.  

home.jsp에 div에 button으로 배치하였고 각 버튼을 누를때는 버튼의 정보  
( 예 : 첫 번째 버튼 : value="sales", 두 번째 버튼 : value="ryan" )를 가지고   
js에서 ajax를 통하여 바로 해당하는 상품들을 가져올 수 있게 했습니다.  
첫 번째와 두번째를 따로 떼어 조회할 수는 없고 항상 두 조건을 동시에 만족하도록 설계되어 있습니다.  

<br/>

<img width="119" alt="session1" src="https://user-images.githubusercontent.com/76409244/116327533-eed06300-a801-11eb-80f7-0bfd61c916f0.png">

처음 홈페이지에 진입시 세션스토리지에 기본으로 선택된 조건 2가지가 저장됩니다.  
위 세션스토리지를 보면 기본값인 sales, all가 배열형태로 저장되어 있으며  
버튼을 누를 때 마다 값을 바꾸게 됩니다.  
( 예 : new, all ) - 신상품순, 캐릭터 전체  
( 예 : low, apeach ) - 낮은가격순, 어피치(캐릭터)  

버튼 클릭 -> 세션스토리지에 값 저장 -> 세션스토리지 값을 가지고 ajax로 db 상품조회 -> view에 append 으로 작동  

<br/>

### 스크롤 위치 기억

![자동 스크롤 1](https://user-images.githubusercontent.com/76409244/116768818-8b9a3700-aa74-11eb-9b8e-347544536a6c.gif)

 세션 스토리지에 각 소메뉴 별로 불러온 상품 개수와 각각 스크롤 위치를 담고 있습니다.  
이를 활용하여 소메뉴 내에서 이동 시 항상 마지막으로 위치했던 스크롤 위치에 자동으로 이동하도록 했습니다.  

<br/>

### 세션스토리지, history.state 사용과 이유

![자동 스크롤 2](https://user-images.githubusercontent.com/76409244/116769202-5e01bd80-aa75-11eb-9b7f-57e47c1d01d4.gif)

 이 정보를 저장한 이유는 페이지 전환 후 뒤로가기로 돌아왔을 때  
사용자가 보고있던 상품 노출을 위하여 페이지 변경 전의 위치를 그대로 보여주기 위함입니다.

anchor를 사용하면 fix된 메뉴바 등의 가림과 이전 스크롤 위치와 틀려지는 문제가 있었습니다.  
세션은 초기화 되더라도 history 이벤트로 페이지 호출 시 항상 이전 값을 불러오기 위해  
세션 스토리지 값을 state에 넣어서 사용하고 있습니다.  

history.state 사용 이유는 페이징 처리가 스크롤형식으로 처리되기 때문에 페이지 전환시 마지막에 보고 있던 화면을  
다시 보여주기가 어려웠습니다. 이를 해결하기위해 검색을 통해 history.pushState()를 알게 되었고  
상품 페이지를 가기 전에 history를 한번 거치면서 보고 있던 정보들을 state를 활용하여 기록 하게 되면서  
해결하게 되었습니다.  

<br/>

### 문제점

 히스토리 내에서 페이지 이동은 앞뒤 모두 잘 작동하지만 메인 페이지에서 세션, 불러온 상품 등을 초기화 후  
앞으로 가기로 history 페이지 호출 시 onpopstate 이벤트에서 상품 호출을 하지 않기 때문에  
뒤로 가기처럼 원하는 상품 노출을 시켜 줄 수 없었습니다.  
그렇다고 onpopstate에 상품을 불러오면 히스토리를 2번 이상 연속으로 이동할 때마다 중복으로 상품을 불러오는 문제가 있습니다.    

아직은 해결할 방법이 떠오르지 않아 현재는 해결하지 못했고
이 부분은 사용자 측면에서 앞으로 가기를 할 경우가 많지 않다는 점 때문에 다른 기능을 개발한 다음 짬짬이 개선해 보려 합니다.  

<br/>
<br/>

### 2-2-2. 상품 페이지

+ view 링크  
	- javascript : [view.js](./StoreProject/src/main/webapp/resources/script/view.js)  
	- css : [view.css](./StoreProject/src/main/webapp/resources/css/view.css)  
	- jsp : [view.jsp](./StoreProject/src/main/webapp/WEB-INF/views/view.jsp)  

![상품 페이지 이미지1](https://user-images.githubusercontent.com/76409244/116382252-ac824280-a850-11eb-82d1-2543f4c4074c.gif)

상품 페이지 구성 요약  
대표 이미지 ( 슬라이드 형식 )  
상품 설명  
상품 세부정보  
배송 반품  
리뷰  
추천 상품 ( 상품노출 8개 )  
최근 본 상품 ( 최근 본 상품 노출 최대 8개 )  
하단바  

<img width="140" alt="view1-1" src="https://user-images.githubusercontent.com/76409244/116335203-68238200-a811-11eb-8418-ce1b3849b988.png">

페이지 어디서든 상품 클릭 시 URL+파라미터(상품번호)가 담긴 페이지를 호출합니다.  
상품 페이지에서는 이 파라미터를 가지고 ajax로 상품 정보를 가져와서 처리합니다.  

<br/>

### 대표 이미지

![상품 페이지 이미지2](https://user-images.githubusercontent.com/76409244/116380842-4f39c180-a84f-11eb-92db-353f45c19ebf.gif)

DB에 저장된 상품 대표 이미지 이름을 불러와 프로젝트 폴더에서 해당하는 이미지를 슬라이드 형식으로 불러오도록 했습니다.

<br/>

### 상품 설명, 상품 세부정보, 배송 반품

![상품 페이지 이미지3](https://user-images.githubusercontent.com/76409244/116381073-84461400-a84f-11eb-90fb-65913a4dbf5a.gif)

DB에 저장된 상품 설명을 가져와서 보여줍니다.  
설명 내에는 이미지, 유튜브 영상, 글 등이 저장되어 있습니다.

<br/>

<img width="462" alt="view4" src="https://user-images.githubusercontent.com/76409244/116331963-d107fb80-a80b-11eb-853d-abb2a897304d.png">

DB에 저장된 상품 세부정보를 가져와서 보여줍니다.
내용은 상품별로 상이 합니다.

<br/>

<img width="534" alt="view5" src="https://user-images.githubusercontent.com/76409244/116331964-d1a09200-a80b-11eb-985c-9c1ca562caff.png">

DB에 저장된 배송 및 반품을 가져와서 보여줍니다.  
내용은 모두 통일되어 있고 상단에 회색 표시로 국내, 해외 배송 가능 상품 표기만 달라집니다.  
DB에 해당 부분은 boolean으로 0과 1로 저장되어 있고 0일 경우 국내, 1일 경우 국내, 해외 배송 가능 상품으로 구분합니다.  

<br/>

### EL 사용

```
<div id="view_title_box">${pdsInfo.pds_NM}</div>
<pre id="view_contents">
	${pdsInfo.pds_Contents}
</pre>
<pre id="view_detail">
	${pdsInfo.pds_Detail}
</pre>
...

```

상품 페이지 정보를 가져오기 위해 EL을 사용합니다.  
상품 설명, 세부사항, 배송정보 등 컨트롤러에서 모델에 저장한 값들을 불러옵니다.

<br/>

### 리뷰 ( 댓글 )

<img width="823" alt="view7" src="https://user-images.githubusercontent.com/76409244/116368008-dfbdd500-a842-11eb-9416-a966bff7d538.png">

각 상품별로 리뷰 or 댓글을 관리할 수 있습니다.  

<br/>

![리뷰 이미지1](https://user-images.githubusercontent.com/76409244/116379460-fcabd580-a84d-11eb-90eb-4e944f727947.gif)

리뷰는 평점, 내용을 등록할 수 있고 등록 후에는 좋아요 개수를 확인할 수 있습니다.  
'리뷰를 남겨주세요.' 버튼 클릭 시 해당 상품에 한 번도 리뷰를 작성한 적 없는 유저라면 위 이미지처럼 리뷰 등록 창이 표시됩니다.  

평점은 별표를 눌러서 1~5 개의 별점을 주도록 하였고  
내용은 200자를 넘지 못하게 설정하였습니다.  

<br/>

### 스프링 시큐리티 태그

```
<sec:authorize access="isAnonymous()">
	alert("로그인을 해주세요.");
	location.href = "/login/loginPage";
</sec:authorize>
```

로그인하지 않은 상태라면 '로그인을 해주세요.'라는 알림 창이 뜨고 확인을 누르면 로그인 창으로 가도록 하였습니다.  
로그인 후에는 다시 보던 상품페이지로 돌아오도록 되어있습니다.  

```
<sec:authorize access="isAuthenticated()">
	<div id="review_editor_box">
		<div>
			<sec:authentication property="principal.account.ac_NNM" />
		</div>
		...
	</div>
</sec:authorize>
```

비회원이 개발자 도구를 이용하여 등록할 수 없도록 등록창은 로그인 되어있을 경우에만  
html에 해당 내용이 들어가도록 하였습니다.  

<br/>

![리뷰 이미지2](https://user-images.githubusercontent.com/76409244/116377477-3085fb80-a84c-11eb-9595-93546d54220b.gif)

로그인 한 사용자는 다른 사람이 남긴 리뷰에 좋아요 체크를 할 수 있습니다.  
체크 시 해당 리뷰 좋아요 개수는 +1이 올라가며 반대로 재클릭 시 -1이 되도록 합니다.  
자기 자신이 남긴 리뷰에 좋아요 클릭 시 '자기가 쓴 리뷰에는 좋아요를 할 수 없습니다.' 알림 창이 표시됩니다.  

<br/>

![리뷰 이미지3](https://user-images.githubusercontent.com/76409244/116379557-15b48680-a84e-11eb-869f-24653fc4ede5.gif)

리뷰는 최신순, 좋아요 순으로 재정렬이 가능하도록 했습니다.  

<br/>

### 추천 상품, 최근 본 상품

<img width="831" alt="view11" src="https://user-images.githubusercontent.com/76409244/116339925-41694980-a819-11eb-8582-05169963da3a.png">

추천 상품은 현재 보는 상품의 정보를 활용하여 최대 8개의 다른 상품을 노출합니다.  

해당 기능은 js에서 판별하는 게 아닌 상품의 여러 테이블을 이용하여 MYSQL 쿼리문으로 8개의 상품을 도출합니다.  
요약하면 상품 정보에는 카테고리, 색상, 캐릭터 등의 정보가 있는데 이를 활용하여 정보가 일치하는 상품 8개를 랜덤 노출합니다.  

<br/>

<img width="827" alt="view12" src="https://user-images.githubusercontent.com/76409244/116344097-9f4d5f80-a820-11eb-9b7a-c84acf2999df.png">

최근 본 상품은 상품을 하나씩 확인할 때마다 로컬 스토리지에 상품 번호를 배열로 최대 9개까지 저장합니다.  
저장한 배열의 값을 앞에서부터 일치하는 상품번호 정보를 가져옵니다.  
최대 8개의 상품이 노출되는데 배열에는 9개를 저장하도록 한 이유는  
배열에 현재 보는 상품과 같은 상품 번호가 저장되어 있을 경우 이를 빼더라도 8개가 노출 되도록 하기 위함입니다.  

<br/>

### 옵션바

![리뷰 이미지4](https://user-images.githubusercontent.com/76409244/116376006-c9b41280-a84a-11eb-9b94-5f8128b54e79.gif)

상품 페이지 하단에는 옵션 바가 있습니다.  
사용 용도는 구매할 상품의 옵션 선택, 수량 설정입니다.  
옵션이 하나뿐인 상품은 위 이미지처럼 수량이 바로 보이는 형태로 되어 있습니다.  

<br/>

![리뷰 이미지5](https://user-images.githubusercontent.com/76409244/116375124-edc32400-a849-11eb-9fc8-4b4bb397b51b.gif)

옵션이 여러 개 있는 상품이라면  
상품 수량 대신 '기종' 버튼이 노출되며 클릭 시 옵션 선택이 가능합니다.  
옵션 선택 시 가격 위에 선택한 옵션과 수량을 표시해 주며 수량 조절 시 가격을 합산하여 보여주도록 했습니다.  
옵션은 'X' 버튼을 누르면 삭제가능합니다.  

<br/>
<br/>


------------
<br/>
<br/>
<br/>

# 3. 백엔드

## 3-1. 백엔드 구조

일반적인 Spring MVC 패턴 구조를 가지고 있으며 프로젝트의 back-end 구조를 간단하게 표현하면 아래와 같습니다.
> src
> > main
> > > java
> > > > com
> > > > > storeproject
> > > > > > [controller](./StoreProject/src/main/java/com/storeproject/controller/)  
> > > > > > [domain](./StoreProject/src/main/java/com/storeproject/domain/)  
> > > > > > [mapper](./StoreProject/src/main/java/com/storeproject/mapper/)  
> > > > > > [service](./StoreProject/src/main/java/com/storeproject/service/)  

> > > resources
> > > > com
> > > > > storeproject
> > > > > > [mapper](./StoreProject/src/main/resources/com/storeproject/mapper/)
> > > > > > > xml
<br/>
<br/>

### 3-2. 스프링 설정 파일 구성  

#### 3-2-1. Web.xml, Servlet-context.xml, root-context.xml, security-context.xml

+ 링크 & 요약
	- Web.xml : [Web.xml](./StoreProject/src/main/webapp/WEB-INF/web.xml)  
 	Deploy할 때 Servlet의 정보를 설정합니다.  
	
	- Servlet-context.xml : [Servlet-context.xml](./StoreProject/src/main/webapp/WEB-INF/spring/servlet-context.xml)  
	DispatcherServlet의 인프라를 정의합니다. 관련 설정을 내용으로 담고 있습니다.  
	어노테이션을 사용 가능하게 설정 및 뷰의 경로 접두어, 접미어를 설정 합니다.  
	파일 업로드 크기 관련 설정도 처리 하고 있습니다.  
	
	- root-context.xml : [root-context.xml](./StoreProject/src/main/webapp/WEB-INF/spring/root-context.xml)  
	View 지원을 제외한 bean 설정을 담고 있습니다.  
	jdbc, log4j, Hikari, mybatis, transaction, DB, Service, VO 등 주로 View 지원을 제외한 bean 설정을 다루고 있습니다.  
	
	- security-context.xml : [security-context.xml](./StoreProject/src/main/webapp/WEB-INF/spring/security-context.xml)  
	스프링 시큐리티 사용으로 페이지 사용 권한에 대해 설정을 다루고 있으며 암호화를 위해 bcryptPasswordEncoder를 사용 가능하게 설정하는 내용을 가지고 있습니다.
<br/>
<br/>

### 3-3. Spring MVC

+ 링크 & 요약
	- Controller : [Controller](./StoreProject/src/main/java/com/storeproject/controller)  
	- Service : [Service](./StoreProject/src/main/java/com/storeproject/service)  
	- DTO (Data Transfer Object) : [DTO](./StoreProject/src/main/java/com/storeproject/domain)  
	- DAO (Data Access Object) : [DAO](./StoreProject/src/main/java/com/storeproject/mapper)  
	- MyBatis : [MyBatis](./StoreProject/src/main/resources/com/storeproject/mapper)  

#### Controller

 대부분 Ajax 비동기 통신을 위한 요청을 처리하는 메소드들로 구성되어 있습니다.  
이를 위해 REST API를 적용하고 있으며 일부 HTTP Method를 사용하는 경우도 있습니다.  

각각의 Ajax 통신은 데이터를 json을 이용한 parameter를 넘기고 컨트롤러에서 받으며 데이터는 vo에 저장하고 씁니다.  
필요에 따라 controller 내에서 데이터를 가공하거나 처리하는 경우도 있습니다.  
이후 interface를 통해 serviceImpl -> mapper.xml 로 이동하면서 데이터 처리 및 SQL 문을 처리하게 됩니다.  
처리하고 난 뒤 front-end에 반환할 값이 있다면 @ResponseBody 어노테이션을 통해 Map으로 저장하여 json 형태로 전달하는 역할도 가지고 있습니다.  

#### Service

 Service interface 생성과 Impl에서 비즈니스 로직을 처리합니다.  
 
#### DAO

 커넥션을 통해 DB에 접근하고 사용자의 여러 요청을 처리합니다.  
 
#### MyBatis

 관계형 데이터베이스를 보다 쉽게 사용하게 해줍니다. SQL문장과 프로그램 코드를 분리하여 구분합니다.  

#### DTO

 데이터 객체 입니다. getter와 setter 메소드만 가진 클래스입니다.  

<br/>

### 3-4. 백엔드 모델별 설명
