// ============================================================
// 시험 종류 목록 (main.js와 동일)
// ============================================================
const EXAM_CATEGORIES_LIST = [
  '변리사','세무사','감평사','노무사','공무원','기술사','CPA','편입',
  '법무사','임용고시','행정사','수능','공기업','공인중개사','변호사시험',
  '손해사정사','관리사','기사','관세사','간부/간부후보','비상계획관',
  '승진시험','입사시험','5급','임상심리사','미국회계사','국가기술자',
  '사회복지사','기타'
];

// ============================================================
// 샘플 데이터 (API 연결 실패 시 표시용)
// ============================================================
const SAMPLE_DATA = [
  {
    session_id:'sample_001',mbti:'INTJ',exam_type:'객관식',exam_category:'공무원',submitted_at:'2026-03-10T09:00:00.000Z',
    q1:'맞다',q2:'아니다',q3:'맞다',q4:'잘 모르겠다',q5:'아니다',q6:'맞다',q7:'아니다',q8:'잘 모르겠다',q9:'아니다',q10:'맞다',
    q11:'잘 모르겠다',q12:'아니다',q13:'맞다',q14:'아니다',q15:'맞다',q16:'잘 모르겠다',q17:'맞다',q18:'아니다',q19:'맞다',q20:'아니다',
    q21:'잘 모르겠다',q22:'맞다',q23:'아니다',q24:'맞다',q25:'잘 모르겠다',q26:'아니다',q27:'맞다',q28:'아니다',q29:'맞다',q30:'잘 모르겠다',
    q31:'맞다',q32:'아니다',q33:'잘 모르겠다',q34:'맞다',q35:'아니다',q36:'맞다',q37:'잘 모르겠다',q38:'아니다',q39:'맞다',q40:'아니다',
    q41:'맞다',q42:'잘 모르겠다',q43:'아니다',q44:'맞다',q45:'아니다',q46:'맞다',q47:'잘 모르겠다',q48:'아니다',q49:'맞다',q50:'아니다',
    q51:'잘 모르겠다',q52:'아니다',q53:'맞다',q54:'아니다',q55:'잘 모르겠다',q56:'맞다',q57:'아니다',q58:'맞다',q59:'잘 모르겠다',q60:'아니다',
    q61:'맞다',q62:'아니다',q63:'잘 모르겠다',q64:'맞다',q65:'아니다',q66:'맞다',q67:'맞다',q68:'아니다',q69:'잘 모르겠다',q70:'맞다',
    q71:'아니다',q72:'맞다',q73:'잘 모르겠다',q74:'아니다',q75:'맞다',q76:'아니다',q77:'잘 모르겠다',q78:'맞다',q79:'아니다',q80:'맞다',
    q81:'잘 모르겠다',q82:'아니다'
  },
  {
    session_id:'sample_002',mbti:'ENFP',exam_type:'객관식',exam_category:'세무사',submitted_at:'2026-03-11T10:30:00.000Z',
    q1:'아니다',q2:'아니다',q3:'잘 모르겠다',q4:'아니다',q5:'아니다',q6:'아니다',q7:'잘 모르겠다',q8:'아니다',q9:'아니다',q10:'아니다',
    q11:'아니다',q12:'잘 모르겠다',q13:'아니다',q14:'아니다',q15:'잘 모르겠다',q16:'아니다',q17:'아니다',q18:'아니다',q19:'잘 모르겠다',q20:'아니다',
    q21:'아니다',q22:'아니다',q23:'아니다',q24:'잘 모르겠다',q25:'아니다',q26:'아니다',q27:'아니다',q28:'잘 모르겠다',q29:'아니다',q30:'아니다',
    q31:'아니다',q32:'잘 모르겠다',q33:'아니다',q34:'아니다',q35:'아니다',q36:'아니다',q37:'잘 모르겠다',q38:'아니다',q39:'아니다',q40:'아니다',
    q41:'아니다',q42:'아니다',q43:'잘 모르겠다',q44:'아니다',q45:'아니다',q46:'아니다',q47:'아니다',q48:'잘 모르겠다',q49:'아니다',q50:'아니다',
    q51:'아니다',q52:'아니다',q53:'잘 모르겠다',q54:'아니다',q55:'아니다',q56:'아니다',q57:'아니다',q58:'아니다',q59:'잘 모르겠다',q60:'아니다',
    q61:'아니다',q62:'아니다',q63:'아니다',q64:'잘 모르겠다',q65:'아니다',q66:'아니다',q67:'아니다',q68:'잘 모르겠다',q69:'아니다',q70:'아니다',
    q71:'아니다',q72:'아니다',q73:'잘 모르겠다',q74:'아니다',q75:'아니다',q76:'아니다',q77:'아니다',q78:'아니다',q79:'잘 모르겠다',q80:'아니다',
    q81:'아니다',q82:'아니다'
  },
  {
    session_id:'sample_003',mbti:'ISTJ',exam_type:'논술형·주관식',exam_category:'CPA',submitted_at:'2026-03-12T08:00:00.000Z',
    q1:'맞다',q2:'맞다',q3:'맞다',q4:'맞다',q5:'잘 모르겠다',q6:'맞다',q7:'맞다',q8:'맞다',q9:'잘 모르겠다',q10:'맞다',
    q11:'맞다',q12:'잘 모르겠다',q13:'맞다',q14:'맞다',q15:'맞다',q16:'맞다',q17:'맞다',q18:'잘 모르겠다',q19:'맞다',q20:'맞다',
    q21:'맞다',q22:'맞다',q23:'잘 모르겠다',q24:'맞다',q25:'맞다',q26:'맞다',q27:'맞다',q28:'잘 모르겠다',q29:'맞다',q30:'맞다',
    q31:'맞다',q32:'맞다',q33:'맞다',q34:'잘 모르겠다',q35:'맞다',q36:'맞다',q37:'맞다',q38:'맞다',q39:'잘 모르겠다',q40:'맞다',
    q41:'맞다',q42:'맞다',q43:'맞다',q44:'잘 모르겠다',q45:'맞다',q46:'맞다',q47:'맞다',q48:'잘 모르겠다',q49:'맞다',q50:'맞다',
    q51:'맞다',q52:'아니다',q53:'아니다',q54:'아니다',q55:'아니다',q56:'아니다',q57:'아니다',q58:'맞다',q59:'맞다',q60:'잘 모르겠다',
    q61:'맞다',q62:'맞다',q63:'맞다',q64:'잘 모르겠다',q65:'맞다',q66:'맞다',q67:'맞다',q68:'맞다',q69:'잘 모르겠다',q70:'맞다',
    q71:'맞다',q72:'맞다',q73:'잘 모르겠다',q74:'맞다',q75:'맞다',q76:'잘 모르겠다',q77:'맞다',q78:'맞다',q79:'맞다',q80:'잘 모르겠다',
    q81:'맞다',q82:'맞다'
  },
  {
    session_id:'sample_004',mbti:'INFP',exam_type:'객관식',exam_category:'수능',submitted_at:'2026-03-13T14:00:00.000Z',
    q1:'잘 모르겠다',q2:'아니다',q3:'잘 모르겠다',q4:'아니다',q5:'아니다',q6:'잘 모르겠다',q7:'아니다',q8:'아니다',q9:'잘 모르겠다',q10:'아니다',
    q11:'잘 모르겠다',q12:'아니다',q13:'아니다',q14:'잘 모르겠다',q15:'아니다',q16:'아니다',q17:'잘 모르겠다',q18:'아니다',q19:'아니다',q20:'잘 모르겠다',
    q21:'아니다',q22:'맞다',q23:'맞다',q24:'아니다',q25:'맞다',q26:'아니다',q27:'맞다',q28:'잘 모르겠다',q29:'아니다',q30:'맞다',
    q31:'잘 모르겠다',q32:'아니다',q33:'맞다',q34:'아니다',q35:'잘 모르겠다',q36:'아니다',q37:'맞다',q38:'아니다',q39:'잘 모르겠다',q40:'아니다',
    q41:'맞다',q42:'아니다',q43:'잘 모르겠다',q44:'아니다',q45:'아니다',q46:'아니다',q47:'잘 모르겠다',q48:'아니다',q49:'아니다',q50:'잘 모르겠다',
    q51:'아니다',q52:'맞다',q53:'아니다',q54:'잘 모르겠다',q55:'아니다',q56:'아니다',q57:'잘 모르겠다',q58:'맞다',q59:'아니다',q60:'잘 모르겠다',
    q61:'아니다',q62:'맞다',q63:'아니다',q64:'잘 모르겠다',q65:'아니다',q66:'아니다',q67:'맞다',q68:'아니다',q69:'잘 모르겠다',q70:'맞다',
    q71:'아니다',q72:'잘 모르겠다',q73:'아니다',q74:'맞다',q75:'아니다',q76:'잘 모르겠다',q77:'아니다',q78:'맞다',q79:'잘 모르겠다',q80:'아니다',
    q81:'맞다',q82:'아니다'
  },
  {
    session_id:'sample_005',mbti:'ENFJ',exam_type:'객관식',exam_category:'공기업',submitted_at:'2026-03-14T11:00:00.000Z',
    q1:'아니다',q2:'맞다',q3:'아니다',q4:'맞다',q5:'잘 모르겠다',q6:'아니다',q7:'맞다',q8:'잘 모르겠다',q9:'아니다',q10:'아니다',
    q11:'맞다',q12:'아니다',q13:'잘 모르겠다',q14:'아니다',q15:'맞다',q16:'아니다',q17:'맞다',q18:'아니다',q19:'잘 모르겠다',q20:'맞다',
    q21:'아니다',q22:'아니다',q23:'맞다',q24:'아니다',q25:'잘 모르겠다',q26:'맞다',q27:'아니다',q28:'맞다',q29:'잘 모르겠다',q30:'아니다',
    q31:'아니다',q32:'맞다',q33:'아니다',q34:'잘 모르겠다',q35:'맞다',q36:'아니다',q37:'아니다',q38:'맞다',q39:'아니다',q40:'잘 모르겠다',
    q41:'아니다',q42:'맞다',q43:'아니다',q44:'아니다',q45:'잘 모르겠다',q46:'아니다',q47:'맞다',q48:'아니다',q49:'잘 모르겠다',q50:'아니다',
    q51:'맞다',q52:'아니다',q53:'아니다',q54:'맞다',q55:'아니다',q56:'잘 모르겠다',q57:'맞다',q58:'아니다',q59:'맞다',q60:'아니다',
    q61:'잘 모르겠다',q62:'아니다',q63:'맞다',q64:'아니다',q65:'맞다',q66:'아니다',q67:'아니다',q68:'맞다',q69:'아니다',q70:'잘 모르겠다',
    q71:'맞다',q72:'아니다',q73:'맞다',q74:'아니다',q75:'잘 모르겠다',q76:'맞다',q77:'아니다',q78:'아니다',q79:'맞다',q80:'아니다',
    q81:'잘 모르겠다',q82:'맞다'
  }
];

// ============================================================
// 전역
// ============================================================
let allData = [];
let overallChartInst = null;
let radarChartInst = null;

// 현재 필터
let activeFilterType = 'all';     // 'all' | '객관식' | '논술형·주관식'
let activeFilterCat = 'all';      // 'all' | EXAM_CATEGORIES_LIST의 값

// ============================================================
// 초기화
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  renderFilterCatBtns();
  loadStats();
});

function renderFilterCatBtns() {
  const wrap = document.getElementById('filterCatBtns');
  if (!wrap) return;
  wrap.innerHTML = `<button class="filter-btn active" data-value="all" onclick="setFilterCat('all')">전체</button>` +
    EXAM_CATEGORIES_LIST.map(cat => `
      <button class="filter-btn" data-value="${cat}" onclick="setFilterCat('${cat}')">${cat}</button>
    `).join('');
}

// ============================================================
// 필터 설정
// ============================================================
function setFilterType(value) {
  activeFilterType = value;
  document.querySelectorAll('#filterTypeBtns .filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.value === value);
  });
  applyFiltersAndRender();
}

function setFilterCat(value) {
  activeFilterCat = value;
  document.querySelectorAll('#filterCatBtns .filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.value === value);
  });
  applyFiltersAndRender();
}

// ============================================================
// 필터 적용 후 재렌더
// ============================================================
function applyFiltersAndRender() {
  let filtered = allData;
  if (activeFilterType !== 'all') {
    filtered = filtered.filter(r => r.exam_type === activeFilterType);
  }
  if (activeFilterCat !== 'all') {
    filtered = filtered.filter(r => r.exam_category === activeFilterCat);
  }

  // 필터 정보 텍스트 업데이트
  const infoText = document.getElementById('filterInfoText');
  const countBadge = document.getElementById('filterCountBadge');
  if (infoText) {
    const parts = [];
    if (activeFilterType !== 'all') parts.push(activeFilterType);
    if (activeFilterCat !== 'all') parts.push(activeFilterCat);
    infoText.textContent = parts.length > 0 ? parts.join(' · ') + ' 기준' : '전체 데이터 기준';
  }
  if (countBadge) {
    countBadge.textContent = `${filtered.length}명`;
  }

  renderStats(filtered);
}

// ============================================================
// 데이터 로드 (Google Apps Script 연동)
// ============================================================
async function loadStats() {
  showLoading(true);
  const refreshIcon = document.getElementById('refreshIcon');
  if (refreshIcon) refreshIcon.classList.add('fa-spin');

  const apiUrl = typeof CONFIG !== 'undefined' ? CONFIG.APPS_SCRIPT_URL : '';

  const hideLoading = () => {
    document.getElementById('loadingState').style.display = 'none';
    if (refreshIcon) refreshIcon.classList.remove('fa-spin');
  };

  const showContent = () => {
    document.getElementById('statsContent').style.display = 'block';
    document.getElementById('errorState').style.display = 'none';
  };

  // ── URL 미설정 ───────────────────────────────────────────────
  if (!apiUrl || apiUrl === 'APPS_SCRIPT_URL_NOT_SET') {
    hideLoading();
    showContent();
    allData = [];
    applyFiltersAndRender();
    showSetupBanner();
    return;
  }

  // ── API 호출 ────────────────────────────────────────────────
  fetchStats(apiUrl, hideLoading, showContent);
}

// Apps Script fetch (no-cors 우회: 리다이렉트 URL 직접 추적)
async function fetchStats(apiUrl, hideLoading, showContent) {
  try {
    // Apps Script는 302 리다이렉트를 하므로 redirect:'follow' 필수
    const resp = await fetch(apiUrl + '?action=getAll', {
      method: 'GET',
      redirect: 'follow',
    });

    const text = await resp.text();
    let json;
    try { json = JSON.parse(text); } catch(_) {
      throw new Error('JSON 파싱 실패: ' + text.slice(0, 100));
    }

    allData = Array.isArray(json.data) ? json.data : [];
    hideLoading();
    showContent();
    applyFiltersAndRender();
    if (allData.length === 0) showEmptyDataBanner();

  } catch (e) {
    console.warn('fetch 실패, JSONP 시도:', e.message);
    // fetch 실패 시 JSONP 폴백
    loadWithJsonp(apiUrl, hideLoading, showContent);
  }
}

// JSONP 폴백
function loadWithJsonp(apiUrl, hideLoading, showContent) {
  const cbName = '__statsCallback_' + Date.now();

  const timeoutId = setTimeout(() => {
    cleanup();
    hideLoading();
    showContent();
    allData = [];
    applyFiltersAndRender();
    showCorsErrorBanner(apiUrl);
  }, 12000);

  function cleanup() {
    clearTimeout(timeoutId);
    delete window[cbName];
    const el = document.getElementById('jsonp-stats-script');
    if (el) el.remove();
  }

  window[cbName] = function(json) {
    cleanup();
    allData = Array.isArray(json.data) ? json.data : [];
    hideLoading();
    showContent();
    applyFiltersAndRender();
    if (allData.length === 0) showEmptyDataBanner();
  };

  const script = document.createElement('script');
  script.id = 'jsonp-stats-script';
  script.src = apiUrl + '?action=getAll&callback=' + cbName;
  script.onerror = function() {
    cleanup();
    hideLoading();
    showContent();
    allData = [];
    applyFiltersAndRender();
    showCorsErrorBanner(apiUrl);
  };
  document.head.appendChild(script);
}

function showEmptyDataBanner() {
  const existing = document.getElementById('emptyDataBanner');
  if (existing) return;
  const banner = document.createElement('div');
  banner.id = 'emptyDataBanner';
  banner.style.cssText = `
    background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:10px;
    padding:16px 20px; margin-bottom:20px; display:flex; align-items:flex-start; gap:14px;
  `;
  banner.innerHTML = `
    <i class="fas fa-database" style="color:#22C55E;font-size:1.3rem;margin-top:2px;flex-shrink:0;"></i>
    <div>
      <strong style="color:#15803D;font-size:.95rem;">연결 성공! 아직 응답 데이터가 없습니다</strong>
      <p style="color:#166534;font-size:.82rem;margin:6px 0 0;line-height:1.6;">
        설문을 완료하면 이 통계 페이지에 데이터가 표시됩니다.<br/>
        샘플 데이터를 삽입하려면 아래 URL을 브라우저에서 열어보세요:<br/>
        <code style="background:#DCFCE7;padding:2px 6px;border-radius:4px;font-size:.78rem;word-break:break-all;">
          ${typeof CONFIG !== 'undefined' ? CONFIG.APPS_SCRIPT_URL : ''}?action=seed
        </code>
      </p>
    </div>
  `;
  const content = document.getElementById('statsContent');
  if (content) content.insertBefore(banner, content.firstChild);
}

function showCorsErrorBanner(apiUrl) {
  const existing = document.getElementById('corsErrorBanner');
  if (existing) return;
  const banner = document.createElement('div');
  banner.id = 'corsErrorBanner';
  banner.style.cssText = `
    background:#FFF7ED; border:1.5px solid #FED7AA; border-radius:10px;
    padding:16px 20px; margin-bottom:20px; display:flex; align-items:flex-start; gap:14px;
  `;
  banner.innerHTML = `
    <i class="fas fa-exclamation-triangle" style="color:#F97316;font-size:1.3rem;margin-top:2px;flex-shrink:0;"></i>
    <div style="width:100%">
      <strong style="color:#C2410C;font-size:.95rem;">통계 데이터 연결 확인 필요</strong>
      <p style="color:#92400E;font-size:.82rem;margin:6px 0 8px;line-height:1.6;">
        Google Apps Script URL이 설정되었으나 데이터를 불러오지 못했습니다.<br/>
        아래 버튼을 눌러 직접 API를 열어보세요 (새 탭에서 JSON 응답이 보이면 정상):
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
        <a href="${apiUrl}?action=getAll" target="_blank"
           style="display:inline-flex;align-items:center;gap:6px;background:#F97316;color:#fff;padding:7px 14px;border-radius:8px;font-size:.82rem;font-weight:700;text-decoration:none;">
          <i class="fas fa-external-link-alt"></i> API 직접 열기
        </a>
        <a href="${apiUrl}?action=seed" target="_blank"
           style="display:inline-flex;align-items:center;gap:6px;background:#22C55E;color:#fff;padding:7px 14px;border-radius:8px;font-size:.82rem;font-weight:700;text-decoration:none;">
          <i class="fas fa-database"></i> 샘플 5건 삽입
        </a>
        <button onclick="loadSamplePreview()"
           style="display:inline-flex;align-items:center;gap:6px;background:#4F7EF7;color:#fff;padding:7px 14px;border-radius:8px;font-size:.82rem;font-weight:700;border:none;cursor:pointer;">
          <i class="fas fa-eye"></i> 샘플 데이터로 미리보기
        </button>
      </div>
      <p style="color:#92400E;font-size:.78rem;margin:0;line-height:1.5;">
        ⚠️ Apps Script 배포 시 <strong>"모든 사용자"</strong>로 설정했는지 확인하세요.<br/>
        샘플 삽입 후 이 페이지를 새로고침하면 실제 통계가 표시됩니다.
      </p>
    </div>
  `;
  const content = document.getElementById('statsContent');
  if (content) content.insertBefore(banner, content.firstChild);
}

// 샘플 데이터 미리보기 로드
function loadSamplePreview() {
  allData = SAMPLE_DATA;
  applyFiltersAndRender();
  // 배너 업데이트
  const banner = document.getElementById('corsErrorBanner');
  if (banner) {
    banner.style.background = '#EFF6FF';
    banner.style.borderColor = '#BFDBFE';
    banner.innerHTML = `
      <i class="fas fa-info-circle" style="color:#3B82F6;font-size:1.3rem;margin-top:2px;flex-shrink:0;"></i>
      <div>
        <strong style="color:#1D4ED8;font-size:.95rem;">📊 샘플 데이터 5건으로 미리보기 중</strong>
        <p style="color:#1E40AF;font-size:.82rem;margin:6px 0 0;line-height:1.6;">
          현재 표시되는 통계는 실제 데이터가 아닌 예시 데이터입니다.<br/>
          실제 통계를 보려면 Google Apps Script를 설정하고 이 페이지를 새로고침하세요.
        </p>
      </div>
    `;
  }
}

function showSetupBanner() {
  const existing = document.getElementById('setupBanner');
  if (existing) return;
  const banner = document.createElement('div');
  banner.id = 'setupBanner';
  banner.style.cssText = `
    background:#FFF7ED; border:1.5px solid #FED7AA; border-radius:10px;
    padding:16px 20px; margin-bottom:20px; display:flex; align-items:flex-start; gap:14px;
  `;
  banner.innerHTML = `
    <i class="fas fa-info-circle" style="color:#F97316;font-size:1.3rem;margin-top:2px;flex-shrink:0;"></i>
    <div>
      <strong style="color:#C2410C;font-size:.95rem;">통계 기능 설정이 필요합니다</strong>
      <p style="color:#92400E;font-size:.82rem;margin:6px 0 0;line-height:1.6;">
        GitHub Pages에서 통계를 보려면 Google Sheets 연동이 필요합니다.<br/>
        <code style="background:#FEF3C7;padding:2px 6px;border-radius:4px;">js/config.js</code>에
        <code style="background:#FEF3C7;padding:2px 6px;border-radius:4px;">APPS_SCRIPT_URL</code>을 설정해주세요.
        &nbsp;<a href="GITHUB_SETUP.md" style="color:#F97316;font-weight:700;text-decoration:underline;" target="_blank">설정 가이드 보기 →</a>
      </p>
    </div>
  `;
  const content = document.getElementById('statsContent');
  if (content) content.insertBefore(banner, content.firstChild);
}

function showLoading(v) {
  document.getElementById('loadingState').style.display = v ? 'flex' : 'none';
  if (v) document.getElementById('statsContent').style.display = 'none';
}

// ============================================================
// 통계 렌더링
// ============================================================
function renderStats(data) {
  const n = data.length;
  document.getElementById('totalResponses').textContent = n.toLocaleString() + '명';

  if (n === 0) {
    document.getElementById('avgDanger').textContent = '-';
    document.getElementById('topDangerPct').textContent = '-';
    document.getElementById('avgGoodPct').textContent = '-';
    document.getElementById('catSummaryGrid').innerHTML = '<p class="no-data">해당 조건의 응답 데이터가 없습니다.</p>';
    document.getElementById('rankingList').innerHTML = '<p class="no-data">해당 조건의 응답 데이터가 없습니다.</p>';
    window._qStats = buildQStats(data);
    renderDetailTable();
    renderExamBreakdown(data);
    return;
  }

  const qStats = buildQStats(data);
  window._qStats = qStats;

  // 평균 위험 항목 수
  const totalDanger = data.reduce((sum, row) => {
    return sum + QUESTIONS.filter(q => row[`q${q.id}`] === '맞다').length;
  }, 0);
  document.getElementById('avgDanger').textContent = (totalDanger / n).toFixed(1) + '개';

  // 최고 위험 항목 비율
  let maxDangerPct = 0;
  QUESTIONS.forEach(q => {
    const s = qStats[q.id];
    const valid = s.yes + s.maybe + s.no;
    if (valid > 0) {
      const pct = (s.yes / valid) * 100;
      if (pct > maxDangerPct) maxDangerPct = pct;
    }
  });
  document.getElementById('topDangerPct').textContent = maxDangerPct.toFixed(0) + '%';

  // 평균 양호 비율
  let totalGoodPct = 0, goodCount = 0;
  QUESTIONS.forEach(q => {
    const s = qStats[q.id];
    const valid = s.yes + s.maybe + s.no;
    if (valid > 0) { totalGoodPct += (s.no / valid) * 100; goodCount++; }
  });
  document.getElementById('avgGoodPct').textContent = goodCount > 0 ? (totalGoodPct / goodCount).toFixed(0) + '%' : '-';

  // 차트
  let totalYes = 0, totalMaybe = 0, totalNo = 0, totalNa = 0;
  QUESTIONS.forEach(q => {
    totalYes += qStats[q.id].yes;
    totalMaybe += qStats[q.id].maybe;
    totalNo += qStats[q.id].no;
    totalNa += qStats[q.id].na;
  });
  renderOverallChart(totalYes, totalMaybe, totalNo, totalNa);

  const catDangerPct = CATEGORIES.map(cat => {
    const catQs = QUESTIONS.filter(q => q.cat === cat.id);
    let yes = 0, valid = 0;
    catQs.forEach(q => {
      yes += qStats[q.id].yes;
      valid += qStats[q.id].yes + qStats[q.id].maybe + qStats[q.id].no;
    });
    return valid > 0 ? Math.round((yes / valid) * 100) : 0;
  });
  renderRadarChart(catDangerPct);

  renderCatSummary(qStats);
  renderRanking(qStats);
  renderExamBreakdown(data);

  // 상세 테이블 필터 옵션
  const catFilter = document.getElementById('catFilter');
  catFilter.innerHTML = '<option value="all">전체 카테고리</option>' +
    CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');

  renderDetailTable();
}

// ============================================================
// qStats 빌더
// ============================================================
function buildQStats(data) {
  const qStats = {};
  QUESTIONS.forEach(q => {
    qStats[q.id] = { yes: 0, maybe: 0, no: 0, na: 0, total: 0 };
  });
  data.forEach(row => {
    QUESTIONS.forEach(q => {
      const ans = row[`q${q.id}`];
      if (!ans) return;
      qStats[q.id].total++;
      if (ans === '맞다') qStats[q.id].yes++;
      else if (ans === '잘 모르겠다') qStats[q.id].maybe++;
      else if (ans === '아니다') qStats[q.id].no++;
      else qStats[q.id].na++;
    });
  });
  return qStats;
}

// ============================================================
// 시험종류·유형별 응답자 현황 차트
// ============================================================
function renderExamBreakdown(data) {
  const wrap = document.getElementById('examBreakdownSection');
  if (!wrap) return;

  // 시험 유형별
  const typeCounts = { '객관식': 0, '논술형·주관식': 0, '미입력': 0 };
  data.forEach(r => {
    if (r.exam_type === '객관식') typeCounts['객관식']++;
    else if (r.exam_type === '논술형·주관식') typeCounts['논술형·주관식']++;
    else typeCounts['미입력']++;
  });

  // 시험 종류별 (상위 10개)
  const catCounts = {};
  data.forEach(r => {
    const c = r.exam_category || '미입력';
    catCounts[c] = (catCounts[c] || 0) + 1;
  });
  const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);

  wrap.innerHTML = `
    <section class="exam-breakdown-section">
      <h2 class="section-title"><i class="fas fa-users-cog"></i> 시험 종류 · 유형별 응답자 현황</h2>
      <div class="exam-breakdown-grid">
        <div class="chart-card">
          <h3 class="chart-title"><i class="fas fa-pen-ruler"></i> 시험 유형별 응답 비율</h3>
          <div class="chart-wrap" style="height:240px;">
            <canvas id="typeChart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <h3 class="chart-title"><i class="fas fa-graduation-cap"></i> 시험 종류별 응답자 수</h3>
          <div class="chart-wrap" style="height:240px; overflow-y:auto;">
            <div class="cat-count-list">
              ${sortedCats.map(([name, cnt], i) => `
                <div class="cat-count-row">
                  <span class="cat-count-rank">${i+1}</span>
                  <span class="cat-count-name">${name}</span>
                  <div class="cat-count-bar-bg">
                    <div class="cat-count-bar" style="width:${sortedCats[0][1] > 0 ? Math.round(cnt/sortedCats[0][1]*100) : 0}%"></div>
                  </div>
                  <span class="cat-count-val">${cnt}명</span>
                </div>
              `).join('')}
              ${sortedCats.length === 0 ? '<p class="no-data">데이터 없음</p>' : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // 도넛 차트
  const typeCtx = document.getElementById('typeChart');
  if (typeCtx) {
    const existing = Chart.getChart(typeCtx);
    if (existing) existing.destroy();
    new Chart(typeCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(typeCounts),
        datasets: [{
          data: Object.values(typeCounts),
          backgroundColor: ['#4F7EF7', '#9B59B6', '#94A3B8'],
          borderWidth: 2,
          borderColor: '#fff',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Noto Sans KR', size: 12 }, padding: 12 } },
          tooltip: {
            callbacks: {
              label: ctx => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0;
                return ` ${ctx.label}: ${ctx.parsed}명 (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }
}

// ============================================================
// 차트들
// ============================================================
function renderOverallChart(yes, maybe, no, na) {
  const ctx = document.getElementById('overallChart').getContext('2d');
  if (overallChartInst) overallChartInst.destroy();
  overallChartInst = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['맞다 (개선 필요)', '잘 모르겠다', '아니다 (양호)', '해당없음'],
      datasets: [{
        data: [yes, maybe, no, na],
        backgroundColor: ['#EF4444', '#F59E0B', '#22C55E', '#94A3B8'],
        borderWidth: 2,
        borderColor: '#fff',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Noto Sans KR', size: 12 }, padding: 16 } },
        tooltip: {
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0;
              return ` ${ctx.label}: ${ctx.parsed.toLocaleString()}건 (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

function renderRadarChart(catPcts) {
  const ctx = document.getElementById('radarChart').getContext('2d');
  if (radarChartInst) radarChartInst.destroy();
  radarChartInst = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: CATEGORIES.map(c => c.label),
      datasets: [{
        label: '위험도 (%)',
        data: catPcts,
        backgroundColor: 'rgba(239,68,68,0.15)',
        borderColor: '#EF4444',
        pointBackgroundColor: '#EF4444',
        pointRadius: 4,
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 20, font: { size: 10 } },
          pointLabels: { font: { family: 'Noto Sans KR', size: 11 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.r}%` } }
      }
    }
  });
}

function renderCatSummary(qStats) {
  const grid = document.getElementById('catSummaryGrid');
  grid.innerHTML = CATEGORIES.map(cat => {
    const catQs = QUESTIONS.filter(q => q.cat === cat.id);
    let yes = 0, valid = 0;
    catQs.forEach(q => {
      yes += qStats[q.id].yes;
      valid += qStats[q.id].yes + qStats[q.id].maybe + qStats[q.id].no;
    });
    const pct = valid > 0 ? Math.round((yes / valid) * 100) : 0;
    let level = pct >= 60 ? 'danger' : pct >= 30 ? 'warn' : 'good';
    const levelLabel = pct >= 60 ? '주의 필요' : pct >= 30 ? '보통' : '양호';
    return `
      <div class="cat-sum-card ${level}">
        <div class="cat-sum-header" style="--cat-color:${cat.color}">
          <i class="fas ${cat.icon}"></i>
          <span>${cat.label}</span>
          <span class="cat-sum-level">${levelLabel}</span>
        </div>
        <div class="cat-sum-pct">${pct}%</div>
        <div class="cat-sum-bar-bg">
          <div class="cat-sum-bar" style="width:${pct}%;background:${cat.color}"></div>
        </div>
        <div class="cat-sum-detail">${catQs.length}개 항목 중 위험 비율</div>
      </div>
    `;
  }).join('');
}

function renderRanking(qStats) {
  const sorted = QUESTIONS
    .filter(q => { const s = qStats[q.id]; return (s.yes + s.maybe + s.no) > 0; })
    .map(q => {
      const s = qStats[q.id];
      const valid = s.yes + s.maybe + s.no;
      return { q, pct: valid > 0 ? (s.yes / valid) * 100 : 0, yes: s.yes, valid };
    })
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 15);

  const rankingList = document.getElementById('rankingList');
  if (sorted.length === 0) {
    rankingList.innerHTML = '<p class="no-data">해당 조건의 응답 데이터가 없습니다.</p>';
    return;
  }

  rankingList.innerHTML = sorted.map((item, i) => {
    const cat = CATEGORIES.find(c => c.id === item.q.cat);
    const rank = i + 1;
    const medal = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `${rank}.`;
    return `
      <div class="rank-item">
        <div class="rank-medal">${medal}</div>
        <div class="rank-info">
          <div class="rank-cat" style="color:${cat.color}">
            <i class="fas ${cat.icon}"></i> ${cat.label}
          </div>
          <div class="rank-text">Q${item.q.id}. ${item.q.text}</div>
          <div class="rank-bar-row">
            <div class="rank-bar-bg">
              <div class="rank-bar" style="width:${item.pct.toFixed(0)}%;background:${cat.color}"></div>
            </div>
            <span class="rank-pct">${item.pct.toFixed(0)}%</span>
            <span class="rank-count">(${item.yes}/${item.valid}명)</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderDetailTable() {
  const qStats = window._qStats;
  if (!qStats) return;

  const catFilter = document.getElementById('catFilter').value;
  const sortFilter = document.getElementById('sortFilter').value;

  let questions = QUESTIONS;
  if (catFilter !== 'all') questions = questions.filter(q => q.cat === catFilter);

  questions = questions.map(q => {
    const s = qStats[q.id];
    const valid = s.yes + s.maybe + s.no;
    return { q, s, yesPct: valid > 0 ? (s.yes / valid * 100) : 0, noPct: valid > 0 ? (s.no / valid * 100) : 0 };
  });

  if (sortFilter === 'danger') questions.sort((a, b) => b.yesPct - a.yesPct);
  else if (sortFilter === 'good') questions.sort((a, b) => b.noPct - a.noPct);
  else questions.sort((a, b) => a.q.id - b.q.id);

  if (questions.length === 0) {
    document.getElementById('detailTable').innerHTML = '<p class="no-data">표시할 데이터가 없습니다.</p>';
    return;
  }

  const rows = questions.map(({ q, s, yesPct, noPct }) => {
    const cat = CATEGORIES.find(c => c.id === q.cat);
    const valid = s.yes + s.maybe + s.no;
    const maybePct = valid > 0 ? (s.maybe / valid * 100) : 0;
    return `
      <div class="detail-row">
        <div class="detail-row-header">
          <span class="detail-qnum">Q${q.id}</span>
          <span class="detail-cat" style="color:${cat.color}">
            <i class="fas ${cat.icon}"></i> ${cat.label}
          </span>
          ${q.obj ? '<span class="obj-badge-sm">객관식</span>' : ''}
        </div>
        <p class="detail-qtext">${q.text}</p>
        <div class="detail-bars">
          <div class="detail-bar-item yes">
            <span class="detail-bar-label">맞다</span>
            <div class="detail-bar-track">
              <div class="detail-bar-fill" style="width:${yesPct.toFixed(0)}%;background:#EF4444"></div>
            </div>
            <span class="detail-bar-val">${yesPct.toFixed(0)}% (${s.yes}명)</span>
          </div>
          <div class="detail-bar-item maybe">
            <span class="detail-bar-label">모르겠다</span>
            <div class="detail-bar-track">
              <div class="detail-bar-fill" style="width:${maybePct.toFixed(0)}%;background:#F59E0B"></div>
            </div>
            <span class="detail-bar-val">${maybePct.toFixed(0)}% (${s.maybe}명)</span>
          </div>
          <div class="detail-bar-item no">
            <span class="detail-bar-label">아니다</span>
            <div class="detail-bar-track">
              <div class="detail-bar-fill" style="width:${noPct.toFixed(0)}%;background:#22C55E"></div>
            </div>
            <span class="detail-bar-val">${noPct.toFixed(0)}% (${s.no}명)</span>
          </div>
          ${s.na > 0 ? `
          <div class="detail-bar-item na">
            <span class="detail-bar-label">해당없음</span>
            <div class="detail-bar-track">
              <div class="detail-bar-fill" style="width:${(valid > 0 ? s.na/(valid+s.na)*100 : 0).toFixed(0)}%;background:#94A3B8"></div>
            </div>
            <span class="detail-bar-val">${s.na}명</span>
          </div>` : ''}
        </div>
        <div class="detail-total">총 ${valid}명 응답</div>
      </div>
    `;
  }).join('');

  document.getElementById('detailTable').innerHTML = `<div class="detail-rows">${rows}</div>`;
}
