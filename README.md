<div align="center">
 <img src="https://github.com/user-attachments/assets/36b0d180-6c07-4a53-8ca8-f2c70d6dfb93" width="400"/>

<br/> [<img src="https://img.shields.io/badge/프로젝트 기간-2024.10.22~2024.11.14-green?style=flat&logo=&logoColor=white" />]()

</div>

<br>

## 프로젝트 소개

- 병원 및 의료 기관, 특히 치과 환자 관리와 세션을 돕기 위한 소프트웨어 시스템
- 환자 관리, 예약, 진료 접수, 진료 차트, 약품 재고 관리 등의 기능을 체계화하여 효율적으로 업무를 수행할 수 있도록 돕습니다.

<br>

## 팀원 구성

<div align="center">

| **이재준** | **백지영** | **김관호** | **정수빈** | **송겹섭** | **최선아** |
| :------: |  :------: | :------: | :------: | :------: | :------: |
| <img src="https://avatars.githubusercontent.com/u/106502312?v=4" height=150 width=150> |<img src="https://avatars.githubusercontent.com/u/112460466?v=4" height=150 width=150> | <img src="https://avatars.githubusercontent.com/u/112460506?v=4" height=150 width=150>| <img src="https://avatars.githubusercontent.com/u/76766459?v=4" height=150 width=150> | <img src="https://avatars.githubusercontent.com/u/76766459?v=4" height=150 width=150>| <img src="https://avatars.githubusercontent.com/u/76766459?v=4" height=150 width=150> |
| [GitHub](https://github.com/ksol0048) | [GitHub](https://github.com/ksol0048) | [GitHub](https://github.com/ksol0048) | [GitHub](https://github.com/ksol0048) | [GitHub](https://github.com/ksol0048) | [GitHub](https://github.com/ksol0048) |
  
</div>

<br>

## ⚙ 개발환경
> skills 폴더에 있는 아이콘을 이용할 수 있습니다.

### 운영체제
<div>
<img src="https://github.com/user-attachments/assets/2efc2c61-9b0f-4cc4-9c25-b56d9b80f854?raw=true" width="90">
</div>

### IDE
<div>
<img src="https://github.com/user-attachments/assets/8620ffd6-a5c5-4553-8df4-4b5750219690?raw=true" width="90">
</div>

### font-end
<div>
<img src="https://github.com/user-attachments/assets/657602b8-3bbc-40d7-bf0e-c2a0ae9275fb?raw=true" width="90">
<img src="https://github.com/user-attachments/assets/e1814c3a-9972-44bd-9d9e-15f5003aff42?raw=true" width="90">
<img src="https://github.com/user-attachments/assets/15be680f-5259-4583-8cfd-50d4361f6812?raw=true" width="90">

</div>

### Back-end
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Java.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/SpringBoot.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/SpringSecurity.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/SpringDataJPA.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Mysql.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Ajax.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Thymeleaf.png?raw=true" width="80">
<!-- <img src="https://github.com/user-attachments/assets/28b66b4b-95cf-48c6-9019-46c7a83ef12d?raw=true" width="100"> -->
<!-- <img src="https://github.com/user-attachments/assets/f224cc4b-1e6e-4362-8a38-bd8d16d5e0f5?raw=true" width="100"> -->
</div>

### Tools
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
</div>

<br />

# 2. Key Features (주요 기능)
- **회원가입**:
  - 회원가입 시 DB에 유저정보가 등록됩니다.

- **로그인**:
  - 사용자 인증 정보를 통해 로그인합니다.

- **내 동아리 일정관리**:
  - 캘린더 UI를 통해 동아리 관련 일정 추가&삭제가 가능합니다.
  - 체크박스를 통해 종료되거나 이미 수행한 일정을 표시할 수 있습니다.

- **동아리 찾기**:
  - 대학 내 동아리를 검색할 수 있습니다.
  - 검색 시 해당 동아리가 업로드한 홍보글이 보여집니다.

- **동아리 홍보**:
  - 홍보글 등록을 통해 동아리를 홍보할 수 있습니다.

- **동아리 만들기**:
  - 새로운 동아리를 만들어 관리할 수 있습니다.

- **동아리 프로필**:
  - 동아리 홍보글에서 동아리 이름(링크)를 클릭하면 해당 동아리 프로필로 이동합니다.
  - 동아리 프로필에서는 동아리 소개, 동아리 활동사진 갤러리, 동아리 홍보글 기록관 등을 볼 수 있습니다.

<br/>

## 3. 프로젝트 구조

```
├── README.md
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
│
├── public
│    └── index.html
└── src
     ├── App.jsx
     ├── index.jsx
     ├── api
     │     └── mandarinAPI.js
     ├── asset
     │     ├── fonts
     │     ├── css_sprites.png
     │     ├── logo-404.svg
     │     └── logo-home.svg
     │          .
     │          .
     │          .
     ├── atoms
     │     ├── LoginData.js
     │     └── LoginState.js
     ├── common
     │     ├── alert
     │     │     ├── Alert.jsx
     │     │     └── Alert.Style.jsx
     │     ├── button
     │     ├── comment
     │     ├── inputBox
     │     ├── post
     │     ├── postModal
     │     ├── product
     │     ├── tabMenu
     │     ├── topBanner
     │     └── userBanner
     ├── pages
     │     ├── addProduct
     │     │     ├── AddProduct.jsx
     │     │     └── AddProduct.Style.jsx
     │     ├── chatList
     │     ├── chatRoom
     │     ├── emailLogin
     │     ├── followerList
     │     ├── followingList
     │     ├── home
     │     ├── join
     │     ├── page404
     │     ├── postDetail
     │     ├── postEdit
     │     ├── postUpload
     │     ├── productEdit
     │     ├── profile
     │     ├── profileEdit
     │     ├── profileSetting
     │     ├── search
     │     ├── snsLogin
     │     └── splash
     ├── routes
     │     ├── privateRoutes.jsx
     │     └── privateRoutesRev.jsx  
     └── styles
           └── Globalstyled.jsx
```

<br>

## 4. 역할 분담

### 이재준

- **UI**
    - 페이지 : layout, 로그인, 환자관리, 진료차트(List목록, PLAN)
- **기능**
    - 환자 검색, 환자 등록/수정/삭제, 환자 메모장 등록/수정/삭제, 진료차트 조회(검색 필터),PLAN 등록/수정/삭제

<br>
    
### 백지영

- **UI**
    - 페이지 : 홈(재고현황), 진료차트(CC, PI), 재고관리
- **기능**
    - 재고 조회, CC/PI 등록/수정/삭제, 재료사,재료,입출고, 재고현황 조회/등록/수정/삭제 

<br>

### 김관호

- **UI**
    - 페이지 : 예약
- **기능**
    - 환자 예약 등록/수정/삭제 및 예약 현황, 캘린더 현황 조회

<br>

### 정수빈

- **UI**
    - 페이지 : 홈(공지사항), 사용자관리, 공지사항
- **기능**
    - 사용자 관리 조회/등록/수정/삭제 , 공지사항 조회/등록/수정/삭제
    
<br>

### 송경섭

- **UI**
    - 페이지 : 홈(접수 현황, 예약 현황), 접수
- **기능**
    - 환자 접수 접수, 진료중, 진료완료, 접수 취소 WebSocket을 활용한 실시간 반영
    
<br>

### 최선아

- **UI**
    - 페이지 : 재고관리, 메신저
- **기능**
    - 기본 채팅 기능, 알람 기능, 채팅방 관리, 개별 채팅방 삭제 기능
    
<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-10-22 ~ 2024-11-14

<br>

### 작업 관리

- GitHub Projects 사용하여 진행 상황을 공유했습니다.
- Figma를 활용하여 프로젝트의 방향성과 회의 내용을 기록했습니다.

<br>

## 6. 신경 쓴 부분

- [접근제한 설정](https://github.com/likelion-project-README/README/wiki/README-6.%EC%8B%A0%EA%B2%BD-%EC%93%B4-%EB%B6%80%EB%B6%84_%EC%A0%91%EA%B7%BC%EC%A0%9C%ED%95%9C-%EC%84%A4%EC%A0%95)

- [Recoil을 통한 상태관리 및 유지](https://github.com/likelion-project-README/README/wiki/README-6.%EC%8B%A0%EA%B2%BD-%EC%93%B4-%EB%B6%80%EB%B6%84_Recoil%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EC%9C%A0%EC%A7%80)

<br>

## 7. 페이지별 기능

### [초기화면]
- 서비스 접속 초기화면으로 splash 화면이 잠시 나온 뒤 다음 페이지가 나타납니다.
    - 로그인이 되어 있지 않은 경우 : SNS 로그인 페이지
    - 로그인이 되어 있는 경우 : README 홈 화면
- SNS(카카오톡, 구글, 페이스북) 로그인 기능은 구현되어 있지 않습니다.

| 초기화면 |
|----------|
|![splash](https://user-images.githubusercontent.com/112460466/210172920-aef402ed-5aef-4d4a-94b9-2b7147fd8389.gif)|

<br>

### [회원가입]
- 이메일 주소와 비밀번호를 입력하면 입력창에서 바로 유효성 검사가 진행되고 통과하지 못한 경우 각 경고 문구가 입력창 하단에 표시됩니다.
- 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우 또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
- 작성이 완료된 후, 유효성 검사가 통과된 경우 다음 버튼이 활성화되며, 버튼을 클릭하면 프로필 설정 화면이 나타납니다.

| 회원가입 |
|----------|
|![join](https://user-images.githubusercontent.com/112460466/210173571-490f5beb-5791-4a4a-8c5e-510cdcb5f1fe.gif)|

<br>

### [프로필 설정]
- 회원가입 페이지의 유효성 검사를 통과해야 진입할 수 있습니다.
- 프로필 설정에 필요한 프로필 사진, 사용자 이름, 계정 ID, 소개를 입력받습니다.
- 사용자 이름과 계정 ID는 필수 입력사항입니다.
- 계정 ID에는 형식 및 중복 검사가 진행됩니다.
- 프로필 사진은 등록하지 않을 경우 기본 이미지가 등록됩니다.

| 프로필 설정 |
|----------|
|![setProfile](https://user-images.githubusercontent.com/112460466/210173749-2da6c9af-eb93-4eea-9663-1a03e19299ec.gif)|

<br>

### [로그인]
- 이메일 주소와 비밀번호를 입력하면 입력창에서 바로 유효성 검사가 진행되고 통과하지 못한 경우 각 경고 문구가 입력창 하단에 표시됩니다.
- 이메일 주소의 형식이 유효하지 않거나 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
- 작성이 완료된 후, 유효성 검사가 통과된 경우 로그인 버튼이 활성화됩니다.
- 로그인 버튼 클릭 시 이메일 주소 또는 비밀번호가 일치하지 않을 경우에는 경고 문구가 나타나며, 로그인에 성공하면 홈 피드 화면으로 이동합니다.

| 로그인 |
|----------|
|![login](https://user-images.githubusercontent.com/112460466/210177956-c716414e-01c2-4c1e-b1f7-6562b9b7a857.gif)|

<br>

### [로그아웃]
- 상단 의 kebab menu를 클릭 후 나타나는 모달창의 로그아웃 버튼을 클릭하면 확인창이 뜹니다.
- 로그아웃시 로컬 저장소의 토큰 값과 사용자 정보를 삭제하고 초기화면으로 이동합니다.

| 로그아웃 |
|----------|
|![logout](https://user-images.githubusercontent.com/112460466/210178009-11225733-7af5-4b8b-aa1c-fe264af01797.gif)|

<br>

### [상하단 배너]
- 상단 배너 : 각 페이지별로 다른 종류의 버튼을 가지고 있습니다.
    - 뒤로가기 : 브라우저 상에 기록된 이전 페이지로 돌아갑니다.
    - 검색 : 사용자 검색 페이지로 이동합니다.
    - 사용자 이름 : 채팅룸 페이지의 경우 상대방의 사용자 이름을 보여줍니다.
    - kebab menu : 각 페이지 또는 컴포넌트에 따른 하단 모달창을 생성합니다.
        - 상품, 댓글, 게시글 컴포넌트 - 삭제, 수정, 신고하기
        - 사용자 프로필 페이지 - 설정 및 사용자 정보, 로그아웃
- 하단 탭 메뉴 : 홈, 채팅, 게시물 작성, 프로필 아이콘을 클릭하면 각각 홈 피드, 채팅 목록, 게시글 작성 페이지, 내 프로필 페이지로 이동합니다.

| 상하단 배너 |
|----------|
|![tab](https://user-images.githubusercontent.com/112460466/210178028-3185f944-6ac1-468a-94ba-b32cdc5e380e.gif)|

<br>

### [홈 피드]
- 자신이 팔로우 한 유저의 게시글이 최신순으로 보여집니다.
- 팔로우 한 유저가 없거나, 팔로워의 게시글이 없을 경우 검색 버튼이 표시됩니다.
- 게시글의 상단 유저 배너 클릭 시 게시글을 작성한 유저의 프로필 페이지로, 본문 클릭 시 게시글 상세 페이지로 이동합니다.

| 팔로우하는 유저가 없을 때 | 팔로우하는 유저가 있을 때 |
|----------|----------|
|![home0](https://user-images.githubusercontent.com/112460466/210379059-48900aac-3735-45c6-a249-bc9c41b49414.gif)|![home1](https://user-images.githubusercontent.com/112460466/210379110-49153d27-0405-48e6-adfb-62c7818d2f43.gif)|

<br>

### [검색]
- 사용자 이름 혹은 계정 ID로 유저를 검색할 수 있습니다.
- 검색어와 일치하는 단어는 파란색 글씨로 표시됩니다.
- 클릭 시 해당 유저의 프로필 페이지로 진입합니다.

| 검색 |
|----------|
|![search](https://user-images.githubusercontent.com/112460466/210379805-6c8a42c0-0de8-48d3-8f75-cdf0ae5f4fb6.gif)|

<br>

### [프로필]

#### 1. 내 프로필
- 상단 프로필란에 프로필 수정과 상품 등록 버튼이 나타납니다.
- 판매중인 상품란에는 사용자가 판매하는 상품이 등록되며, 판매중인 상품이 없을 경우에는 영역 자체가 나타나지 않습니다.
- 게시글란은 상단의 리스트형과 앨범형 두 개의 버튼을 통해서 나누어 볼 수 있습니다.
    - 리스트형의 경우, 사용자가 작성한 글 내용과 이미지, 좋아요와 댓글의 수를 보여줍니다.
    - 앨범형의 경우, 사용자 게시글 중 이미지가 있는 글만 필터링해 바둑판 배열로 보여줍니다.
- 게시글을 클릭하면 각 게시글의 상세페이지로 이동합니다.

| 리스트형 & 앨범형 게시글 | 팔로잉 & 팔로워 리스트 |
|----------|----------|
|![myProfile](https://user-images.githubusercontent.com/112460466/210380492-40560e0b-c306-4e69-8939-cc3e7dc3d8fe.gif)|![followList](https://user-images.githubusercontent.com/112460466/210380539-d09b0bd7-0b61-4b22-85fa-f75e6bcecb68.gif)|

<br>

#### 2. 타 유저의 프로필
- 버튼을 클릭해 해당 사용자를 팔로우 또는 언팔로우할지 결정할 수 있으며 팔로워 수의 변화가 페이지에 즉시 반영됩니다.

| 팔로우 & 언팔로우 |
|----------|
|![yourProfile](https://user-images.githubusercontent.com/112460466/210380853-04f2d2bd-adab-4786-a8e8-c275ce765071.gif)|

<br>

#### 3. 프로필 수정
- 사용자 프로필 이미지, 이름, 아이디, 소개 중 한 가지를 수정하면 저장 버튼이 활성화됩니다.
- 계정 ID의 유효한 형식 및 중복 검사를 통과하지 못하면 하단에 경고 문구가 나타나며 저장 버튼이 비활성화됩니다.
- 사용자 이름과 소개는 공백으로 시작할 수 없습니다.
- 프로필 수정이 완료되면 내 프로필 페이지로 이동합니다.

| 초기화면 |
|----------|
|![editProfile](https://user-images.githubusercontent.com/112460466/210381212-d67fdf87-b90c-4501-a331-f2a384534941.gif)|

<br>

### [게시글]

#### 1. 게시글 작성
- 글이 입력되거나 사진이 첨부되면 업로드 버튼이 활성화됩니다.
- 최대 세 장까지 이미지 첨부가 가능하며 첨부한 파일을 취소할 수 있습니다.
- 게시글 하단에 업로드 날짜가 표시됩니다.

| 게시글 작성 |
|----------|
|![uploadPost](https://user-images.githubusercontent.com/112460466/210381758-1de5a889-f587-41d2-b200-22c20a970519.gif)|

<br>

#### 2. 게시글 수정 및 삭제
- 자신의 게시글일 경우 모달 버튼을 통해 수정, 삭제가 가능합니다.
- 게시글 삭제 버튼 클릭 시, 게시글을 삭제하고 페이지를 리렌더링하여 삭제된 내용을 페이지에 반영합니다.
- 타 유저의 게시글일 경우 모달 버튼을 통해 신고할 수 있습니다.

| 게시글 수정 & 삭제 |
|----------|
|![editDeletePost](https://user-images.githubusercontent.com/112460466/210382021-da057943-dc21-411e-a1f8-552be0e973bf.gif)|

<br>

#### 3. 좋아요와 댓글
- 좋아요와 댓글 수는 실시간으로 상세 페이지에 반영됩니다.
- 댓글이 몇 분 전에 작성되었는지 표시됩니다.
- 자신의 댓글일 경우 모달 버튼을 통해 삭제가 가능합니다.
- 타 유저의 댓글일 경우 모달 버튼을 통해 신고할 수 있습니다.

| 좋아요 & 댓글 |
|----------|
|![likeComment](https://user-images.githubusercontent.com/112460466/210382217-01d70181-91c3-43db-a1b8-409a612afb1c.gif)|

<br>

### [상품]

#### 1. 상품 등록
- 상품 이미지, 상품명, 가격, 판매 링크를 필수로 입력해야 저장 버튼이 활성화됩니다.
- 상품 가격은 숫자만 입력할 수 있으며, 숫자를 입력하면 자동으로 원 단위로 변환됩니다.
- 상품 가격이 0원일 경우 버튼이 비활성화되며 하단에 경고 문구가 나타납니다.
- 상품명과 판매 링크는 공백으로 시작할 수 없습니다.
- 상품 등록이 완료되면 내 프로필 페이지로 이동합니다.

| 상품 등록 |
|----------|
|![addProduct](https://user-images.githubusercontent.com/112460466/210386068-c6ff2e05-eb64-4abc-b6dc-93bf52b88d3f.gif)|

<br>

#### 2. 상품 수정 및 삭제
- 상품 이미지, 상품명, 가격, 판매 링크 중 한 가지를 수정하면 저장 버튼이 활성화됩니다.
- 상품 수정이 완료되면 내 프로필 페이지로 이동합니다.
- 상품 삭제 버튼 클릭 시, 상품을 삭제하고 페이지를 리렌더링하여 삭제된 내용을 페이지에 반영합니다.

| 상품 수정 & 삭제 |
|----------|
|![editDeleteProduct](https://user-images.githubusercontent.com/112460466/210386311-5fae87a7-745f-47c0-b8e3-fc41c65cb3cb.gif)|

<br>

### [채팅]
- 채팅 목록에서 아직 읽지 않은 채팅에는 좌측 상단의 파란색 알림을 띄워줍니다.
- 채팅방에서 메시지를 입력하거나 파일을 업로드하면 전송 버튼이 활성화됩니다.
- 채팅방에서 우측 상단의 채팅방 나가기 모달 버튼을 통해 채팅 목록 페이지로 이동할 수 있습니다.
- 채팅 메시지 전송 및 수신 기능은 개발 예정입니다.

| 채팅 |
|----------|
|![chat](https://user-images.githubusercontent.com/112460466/210386478-ea4877c5-1728-4872-ab50-a8408ddf6dcd.gif)|

<br>

## 8. 트러블 슈팅

- [탭메뉴 프로필 버튼 이슈](https://github.com/likelion-project-README/README/wiki/README-8.%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85_%ED%83%AD%EB%A9%94%EB%89%B4-%ED%94%84%EB%A1%9C%ED%95%84-%EB%B2%84%ED%8A%BC-%EC%9D%B4%EC%8A%88)

- [프로필 수정 이슈](https://github.com/likelion-project-README/README/wiki/README-8.%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85_%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95-%EC%9D%B4%EC%8A%88)

<br>

## 9. 개선 목표

- API 모듈화 : API를 불러오는 코드의 반복이 많아 모듈화할 예정
- lighthouse Performance 증진
    - 모든 페이지에서 특히 Best Practices & SEO 점수는 90~100으로 우수
    - Performance 점수가 대체적으로 미흡한 문제
    
    ![KakaoTalk_Photo_2023-01-04-16-55-30](https://user-images.githubusercontent.com/112460466/210591134-09bf8efd-3c34-4b99-a3d7-895ca99e1457.png)
    
- **23-01-17 성능 개선 내용**
    
    ![성능개선 후](https://user-images.githubusercontent.com/106502312/212872369-7ceeb2cf-d551-41d2-bfb0-01e35e9903fe.png)
    
    - 이미지 최적화
        - `<img>` 요소에 `width` , `height` 속성값을 명시해 불필요한 Reflow를 방지했습니다.
        - browser-image-compression 라이브러리를 사용해 유저가 업로드하는 이미지를 압축했습니다.
        - Intersection Observer API를 사용해 Lazy Loading 기법을 적용하여 홈 피드의 게시글 이미지가 viewport 내에 들어오는 순간 로딩되도록 변경했습니다.
    - 웹폰트 최적화
        - WOFF2 포맷을 추가하고 가장 우선적으로 적용되도록 선언했습니다.
        - 서브셋 폰트로 교체해 용량을 줄였습니다.
    
<br>

## 10. 프로젝트 후기

### 🍊 고지연

깃헙을 통한 협업에 익숙해지는 것, 서로 감정 상하지 않고 무사히 마무리하는 것이 1차적인 목표였어서 항상 이 부분을 명심하면서 작업했습니다.
각자 페이지를 작업하고 합치는 과정에서 마주친 버그들이 몇 있었는데, 시간에 쫓기느라 해결하기에 급급해서 제대로 트러블슈팅 과정을 기록하지 못한 게 살짝 아쉬운 부분으로 남습니다. 그래도 2022년 한 해 동안 가장 치열하게 살았던 한 달인 것 같습니다. 조원들 모두에게 고생했다고 전하고 싶습니다🧡

<br>

### 👻 김민제

여러모로 많은 것들을 배울 수 있었던 한 달이었습니다. 혼자서는 할 수 없었던 일이라는 것을 너무 잘 알기에 팀원들에게 정말 감사하다는 말 전하고 싶습니다. 개인적으로 아쉬웠던 부분은 기한 내에 기능을 구현하는 데에만 집중하면서 트러블 슈팅이나 새로 배웠던 것들을 체계적으로 기록하지 못했다는 점입니다. 이렇게 느낀 바가 있으니 이후의 제가 잘 정리하면서 개발할 거라 믿습니다… 하하 다들 수고하셨습니다!!!!

<br>

### 😎 양희지

팀 프로젝트 시작에 앞서 초기 설정을 진행하며 체계적인 설계의 중요성을 느꼈습니다. 앞으로는 점점 더 체계적이고 효율적으로 프로젝트를 진행할 수 있도록 발전하고 싶습니다.
정규 수업 직후에 프로젝트를 진행하면서 배운 내용을 직접 구현하는 과정이 어색했지만 어떤 부분이 부족한지 알 수 있는 기회였습니다. 스스로 최대한 노력해보고 팀원들과 함께 해결해 나가면서 협업의 장점을 체감할 수 있었습니다. 하지만 빠르게 작업을 진행하면서 팀원들과 함께 해결한 이슈가 어떤 이슈이며 어떻게 해결했는지에 대해 자세히 작성하지 못한 것이 아쉽습니다.
’멋쟁이 사자처럼’이라는 같은 목표를 가진 집단에서 프로젝트에 함께할 수 있는 소중한 경험이었습니다. 함께 고생한 조원들 모두 고생하셨습니다! 앞으로도 화이팅해서 함께 목표를 이뤄가고 싶습니다.

<br>

### 🐬 지창언

컨벤션을 정하는 것부터 Readme 파일 작성까지 전 과정을 진행하려니 처음 생각보다 많은 에너지를 썼어요. 좋은 의미로 많이 썼다기보다, 제 능력을 십분 발휘하지 못해서 아쉬움이 남는 쪽입니다. 개발한다고 개발만 해서는 안 된다는 것을 몸소 느껴보는 기간이었던 것 같습니다. 이번 기회로 프로젝트를 진행하면서, 제가 잘하는 점과 부족한 점을 확실하게 알고 가는 건 정말 좋습니다. 기술적인 부분에 있어서는 리액트의 컴포넌트화가 주는 장점을 알았습니다. 조금 느린 개발이 되었을지라도 코드 가독성 부분에 있어서 좋았고, 오류가 발생해도 전체가 아닌 오류가 난 컴포넌트와 근접한 컴포넌트만 살펴보면 수정할 수 있는 부분이 너무 편했습니다. 모두 고생 참 많으셨고 리팩토링을 통해 더 나은 프로젝트 완성까지 화이팅입니다.