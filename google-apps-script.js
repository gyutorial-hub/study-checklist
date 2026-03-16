// ================================================================
// Google Apps Script - 수험생 학습 습관 자가진단 백엔드
// ================================================================
// ▶ 사용법:
//   1. https://script.google.com 에서 새 프로젝트 생성
//   2. 이 코드를 전체 복사 → 붙여넣기
//   3. 배포 → 새 배포 → 웹앱
//      - 실행 대상: 나(내 계정)
//      - 액세스 권한: 모든 사용자  ← 반드시!
//   4. 배포 URL을 js/config.js 의 APPS_SCRIPT_URL 에 설정
// ================================================================

const SHEET_NAME = 'responses';

// ────────────────────────────────────────────────────────────────
// CORS 헤더 설정 (GitHub Pages 포함 모든 도메인 허용)
// ────────────────────────────────────────────────────────────────
function corsOutput(content, mimeType) {
  return ContentService
    .createTextOutput(content)
    .setMimeType(mimeType)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

// ────────────────────────────────────────────────────────────────
// OPTIONS (프리플라이트 대응)
// ────────────────────────────────────────────────────────────────
function doOptions(e) {
  return corsOutput('', ContentService.MimeType.TEXT);
}

// ────────────────────────────────────────────────────────────────
// doGet: 통계 조회 / action=seed (샘플 삽입)
// ────────────────────────────────────────────────────────────────
function doGet(e) {
  try {
    const params  = e.parameter || {};
    const action  = params.action  || 'getAll';
    const callback = params.callback || '';  // JSONP 콜백 이름

    // ── action=seed: 샘플 데이터 5건 삽입 ──────────────────────
    if (action === 'seed') {
      seedSampleData();
      return respond({ success: true, message: '샘플 데이터 5건이 삽입되었습니다.' }, callback);
    }

    // ── action=getAll: 전체 응답 반환 ──────────────────────────
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() < 2) {
      return respond({ data: [], total: 0 }, callback);
    }

    const lastCol = sheet.getLastColumn();
    const lastRow = sheet.getLastRow();
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const rows    = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

    const data = rows.map(row => {
      const obj = {};
      headers.forEach((h, i) => { if (h !== '') obj[String(h)] = row[i]; });
      return obj;
    });

    return respond({ data: data, total: data.length }, callback);

  } catch (err) {
    return respond({ error: err.message, data: [], total: 0 }, '');
  }
}

// ────────────────────────────────────────────────────────────────
// doPost: 응답 데이터 저장 (no-cors POST, Content-Type: text/plain)
// ────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    let data = {};

    // text/plain 으로 전송된 JSON 파싱
    const raw = (e.postData && e.postData.contents) ? e.postData.contents : '';
    if (raw) {
      try { data = JSON.parse(raw); } catch (_) {}
    }

    // form-data 폴백
    if (!data || Object.keys(data).length === 0) {
      const params = e.parameter || {};
      if (params.data) {
        try { data = JSON.parse(decodeURIComponent(params.data)); } catch (_) {}
      }
    }

    if (!data || !data.session_id) {
      return respond({ success: false, error: 'no valid data received' }, '');
    }

    saveRow(data);
    return respond({ success: true }, '');

  } catch (err) {
    return respond({ success: false, error: err.message }, '');
  }
}

// ────────────────────────────────────────────────────────────────
// 응답 헬퍼 (JSON 또는 JSONP)
// ────────────────────────────────────────────────────────────────
function respond(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback) {
    // JSONP: callback(json) 형식으로 반환
    return corsOutput(`${callback}(${json})`, ContentService.MimeType.JAVASCRIPT);
  }
  return corsOutput(json, ContentService.MimeType.JSON);
}

// ────────────────────────────────────────────────────────────────
// 행 저장
// ────────────────────────────────────────────────────────────────
function saveRow(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  // 시트가 비어 있으면 헤더 생성
  if (sheet.getLastRow() === 0) {
    const headers = buildHeaders();
    const hRange  = sheet.getRange(1, 1, 1, headers.length);
    hRange.setValues([headers]);
    hRange.setBackground('#4F7EF7');
    hRange.setFontColor('#FFFFFF');
    hRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // 현재 헤더 읽기
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // 새 키가 있으면 열 추가
  Object.keys(data).forEach(key => {
    if (key && !headers.includes(key)) {
      headers.push(key);
      sheet.getRange(1, headers.length).setValue(key);
    }
  });

  // 데이터 행 생성
  const row = headers.map(h => (data[h] !== undefined && data[h] !== null) ? data[h] : '');
  sheet.appendRow(row);
}

// ────────────────────────────────────────────────────────────────
// 헤더 정의 (고정 5개 + q1~q82)
// ────────────────────────────────────────────────────────────────
function buildHeaders() {
  const fixed = ['session_id', 'mbti', 'exam_type', 'exam_category', 'submitted_at'];
  const qs    = [];
  for (let i = 1; i <= 82; i++) qs.push('q' + i);
  return [...fixed, ...qs];
}

// ────────────────────────────────────────────────────────────────
// 샘플 데이터 5건 삽입
// ────────────────────────────────────────────────────────────────
function seedSampleData() {
  const ans = (pattern) => {
    // pattern: 'y'=맞다, 'n'=아니다, 'm'=잘 모르겠다
    const map = { y:'맞다', n:'아니다', m:'잘 모르겠다' };
    return pattern.split('').map(c => map[c] || '아니다');
  };

  const samples = [
    {
      session_id:'sample_001', mbti:'INTJ', exam_type:'객관식',
      exam_category:'공무원', submitted_at:'2026-03-10T09:00:00.000Z',
      answers: ans('ynmnynymnynmynmymnymnynmynmynmynmynmynmynmynmynmynmynynnynynynmnmymynmymynmymynmy')
    },
    {
      session_id:'sample_002', mbti:'ENFP', exam_type:'객관식',
      exam_category:'세무사', submitted_at:'2026-03-11T10:30:00.000Z',
      answers: ans('nnmnnnmnnnnnmnnmnnmnnnnnmnnmnnmnnmnnmnnmnnmnnmnnmnnmnnnmnnmnnmnnmnnmnnmnnnmnnmnn')
    },
    {
      session_id:'sample_003', mbti:'ISTJ', exam_type:'논술형·주관식',
      exam_category:'CPA', submitted_at:'2026-03-12T08:00:00.000Z',
      answers: ans('yyyymyyymmyyymyyymyyyymyyymmyyymmyyymyyymyyymmyyyymnnnnnnyyymyyymyyymyyymmyyyymyy')
    },
    {
      session_id:'sample_004', mbti:'INFP', exam_type:'객관식',
      exam_category:'수능', submitted_at:'2026-03-13T14:00:00.000Z',
      answers: ans('mnmnnnmnnnmnmnnmnnnmmnmyynymynmynynymnmynmnnmnnmynmynmmnymnmnynnymymymynnnynmyyy')
    },
    {
      session_id:'sample_005', mbti:'ENFJ', exam_type:'객관식',
      exam_category:'공기업', submitted_at:'2026-03-14T11:00:00.000Z',
      answers: ans('ynymmnymmnymmnymmnymmnymynymynymynmynynynnynmynmynmynmynmynmynmynynynnymynmynmyn')
    }
  ];

  samples.forEach(s => {
    const data = {
      session_id: s.session_id,
      mbti: s.mbti,
      exam_type: s.exam_type,
      exam_category: s.exam_category,
      submitted_at: s.submitted_at,
    };
    s.answers.forEach((v, i) => { data['q' + (i + 1)] = v; });
    saveRow(data);
  });
}
