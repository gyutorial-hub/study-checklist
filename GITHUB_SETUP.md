# GitHub Pages 배포 & Google Sheets 연동 가이드

## 개요

GitHub Pages는 **정적 파일만 제공**하기 때문에, 응답 저장과 통계 기능을 위해
**Google Sheets + Apps Script**를 무료 백엔드로 사용합니다.

---

## 🔧 1단계: Google Sheets 준비

1. [Google Sheets](https://sheets.google.com) 접속 → **새 스프레드시트 만들기**
2. 스프레드시트 이름: `수험생 자가진단 응답` (아무 이름이나 가능)
3. 시트는 비워두세요 (코드가 자동으로 헤더를 만듭니다)

---

## 🔧 2단계: Apps Script 설정

1. 스프레드시트 상단 메뉴 → **확장 프로그램 → Apps Script** 클릭

2. 기존 코드(function myFunction...) 전체 **삭제**

3. 이 프로젝트의 `google-apps-script.js` 파일 내용을 **전체 복사 → 붙여넣기**

4. 상단 **💾 저장** (Ctrl+S)

5. 상단 **배포 → 새 배포** 클릭

6. 설정:
   - 유형 선택: **웹 앱**
   - 설명: `자가진단 백엔드`
   - 실행 대상: **나(내 계정)**
   - 액세스 권한: **모든 사용자** ← 반드시 이렇게 설정

7. **배포** 클릭 → Google 계정 **권한 승인**

8. 배포 완료 후 나오는 **웹 앱 URL 복사** (아래처럼 생긴 URL)
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxx.../exec
   ```

---

## 🔧 3단계: config.js 수정

`js/config.js` 파일을 열고 URL을 붙여넣습니다:

```js
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/여기에붙여넣기/exec',
  APP_NAME: '수험생 학습 습관 자가진단',
};
```

저장 후 GitHub에 push하면 완료!

---

## ✅ 동작 확인

1. **응답 저장 테스트**: 진단을 완료하고 제출 → Google Sheets에 행이 추가되는지 확인
2. **통계 확인**: `stats.html` 접속 → 데이터가 표시되면 성공

---

## ❓ 자주 묻는 문제

### "데이터를 불러오지 못했습니다" 에러
- `config.js`의 URL이 정확한지 확인
- Apps Script 배포에서 **액세스: 모든 사용자**로 설정했는지 확인
- Apps Script를 **수정 후 재배포**할 때는 "새 배포"가 아닌 **"기존 배포 관리 → 편집"**으로 해야 URL이 바뀌지 않음

### 응답은 제출되는데 통계에 안 보임
- Apps Script에서 GET 요청이 허용되어 있는지 확인
- 브라우저 개발자 도구 Console에서 CORS 에러 여부 확인

### CORS 에러
- Apps Script 배포 설정에서 **액세스 권한이 "모든 사용자"**인지 재확인
- 배포를 삭제하고 새로 만들어보기

---

## 📊 통계 기능 없이 사용하기

`config.js`에서 `APPS_SCRIPT_URL`을 비워두면 (**기본값**):
- ✅ 진단 및 결과 보기 → 정상 동작
- ✅ 링크 공유, PDF 저장 → 정상 동작
- ❌ 응답 DB 저장 → 저장 안 됨 (결과는 URL에 담겨 공유 가능)
- ❌ 전체 통계 → 설정 필요 안내 표시

---

## 📁 GitHub Pages 배포 파일 목록

```
index.html          메인 진단 페이지
result.html         공유 결과 페이지
stats.html          전체 통계 페이지
css/
  style.css
  print.css
js/
  config.js         ← Apps Script URL 설정 (이 파일만 수정)
  questions.js
  solutions.js
  main.js
  stats.js
google-apps-script.js  ← Apps Script에 붙여넣을 코드
```
