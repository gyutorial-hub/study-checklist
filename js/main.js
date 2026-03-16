// ============================================================
// 시험 종류 목록
// ============================================================
const EXAM_CATEGORIES = [
  '변리사','세무사','감평사','노무사','공무원','기술사','CPA','편입',
  '법무사','임용고시','행정사','수능','공기업','공인중개사','변호사시험',
  '손해사정사','관리사','기사','관세사','간부/간부후보','비상계획관',
  '승진시험','입사시험','5급','임상심리사','미국회계사','국가기술자',
  '사회복지사','기타'
];

// ============================================================
// 전역 상태
// ============================================================
let answers = {};
let sessionId = generateSessionId();
let selectedExamType = null;      // '객관식' | '논술형·주관식'
let selectedExamCategory = null;  // EXAM_CATEGORIES 중 하나
let selectedMbti = null;          // MBTI 16종 중 하나

function generateSessionId() {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ============================================================
// 인트로 초기화 - 시험 종류 그리드 렌더링
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  renderExamCategoryGrid();
});

function renderExamCategoryGrid() {
  const grid = document.getElementById('examCategoryGrid');
  if (!grid) return;
  grid.innerHTML = EXAM_CATEGORIES.map(cat => `
    <button class="exam-cat-btn" data-value="${cat}" onclick="selectExamCategory('${cat}')">
      ${cat}
    </button>
  `).join('');
}

// ============================================================
// MBTI 선택
// ============================================================
function selectMbti(value) {
  selectedMbti = value;
  document.querySelectorAll('.mbti-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
  // 선택 표시 업데이트
  const display = document.getElementById('mbtiSelectedDisplay');
  const text = document.getElementById('mbtiSelectedText');
  if (display && text) {
    const profile = typeof MBTI_PROFILES !== 'undefined' ? MBTI_PROFILES[value] : null;
    text.textContent = profile ? `${value} (${profile.nickname})` : value;
    display.style.display = 'flex';
  }
  updateStartButton();
  updateSelectionSummary();
}

// ============================================================
// 시험 유형 선택
// ============================================================
function selectExamType(value) {
  selectedExamType = value;
  document.querySelectorAll('.exam-type-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
  updateStartButton();
  updateSelectionSummary();
}

// ============================================================
// 시험 종류 선택
// ============================================================
function selectExamCategory(value) {
  selectedExamCategory = value;
  document.querySelectorAll('.exam-cat-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
  updateStartButton();
  updateSelectionSummary();
}

// ============================================================
// 시작 버튼 활성화 제어
// ============================================================
function updateStartButton() {
  const btn = document.getElementById('btnStart');
  const note = document.getElementById('selectNote');
  if (selectedMbti && selectedExamType && selectedExamCategory) {
    btn.disabled = false;
    btn.classList.add('ready-to-start');
    if (note) note.style.display = 'none';
  } else {
    btn.disabled = true;
    btn.classList.remove('ready-to-start');
    if (note) note.style.display = 'block';
  }
}

// ============================================================
// 선택 요약 배지
// ============================================================
function updateSelectionSummary() {
  const el = document.getElementById('selectionSummary');
  const textEl = document.getElementById('selectionText');
  if (!el || !textEl) return;
  const parts = [];
  if (selectedMbti) parts.push(selectedMbti);
  if (selectedExamCategory) parts.push(selectedExamCategory);
  if (selectedExamType) parts.push(selectedExamType);
  if (parts.length > 0) {
    textEl.textContent = parts.join(' · ');
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
}

// ============================================================
// 화면 전환 - CSS 클래스 방식 완전 제거, style.display 직접 제어
// ============================================================
const SCREENS = {
  'intro-screen':  { display: 'flex' },
  'survey-screen': { display: 'block' },
  'result-screen': { display: 'block' },
};

function showScreen(id) {
  // 모든 화면 숨기기
  Object.keys(SCREENS).forEach(screenId => {
    document.getElementById(screenId).style.display = 'none';
  });
  // 대상 화면만 표시
  const display = SCREENS[id] ? SCREENS[id].display : 'block';
  document.getElementById(id).style.display = display;
  // 스크롤 맨 위로
  window.scrollTo(0, 0);
}
// ============================================================
// 설문 시작
// ============================================================
function startSurvey() {
  if (!selectedMbti || !selectedExamType || !selectedExamCategory) {
    alert('MBTI, 시험 유형, 시험 종류를 모두 선택해주세요.');
    return;
  }
  // 설문 헤더 배지 업데이트
  const badge = document.getElementById('surveyExamBadge');
  if (badge) {
    badge.textContent = `${selectedMbti} · ${selectedExamCategory} · ${selectedExamType}`;
  }
  renderCategoryTabs();
  renderQuestions();
  showScreen('survey-screen');
  // 스크롤 확실히 풀기
  document.body.style.overflow = '';
  document.body.style.height = '';
  document.documentElement.style.overflow = '';
  document.documentElement.style.height = '';
}

// ============================================================
// 카테고리 탭 렌더링
// ============================================================
function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-tab" id="tab-${cat.id}" onclick="scrollToCategory('${cat.id}')" style="--cat-color:${cat.color}">
      <i class="fas ${cat.icon}"></i>
      <span>${cat.label}</span>
    </button>
  `).join('');
}

// ============================================================
// 질문 목록 렌더링
// ============================================================
function renderQuestions() {
  const container = document.getElementById('questionsContainer');
  let html = '';
  CATEGORIES.forEach(cat => {
    html += `
      <div class="cat-section" id="cat-${cat.id}" data-cat="${cat.id}">
        <div class="cat-section-header" style="--cat-color:${cat.color}">
          <i class="fas ${cat.icon}"></i>
          <span>${cat.label}</span>
          <span class="cat-count">${cat.qs.length}문항</span>
        </div>
        <div class="questions-list">
          ${QUESTIONS.filter(q => q.cat === cat.id).map(q => renderQuestion(q)).join('')}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderQuestion(q) {
  const isObj = q.obj;
  const badge = isObj ? '<span class="obj-badge"><i class="fas fa-star"></i> 객관식</span>' : '';
  const options = isObj
    ? ['맞다', '잘 모르겠다', '아니다', '해당없음']
    : ['맞다', '잘 모르겠다', '아니다'];

  return `
    <div class="question-card" id="qcard-${q.id}">
      <div class="question-header">
        <span class="q-num">Q${q.id}</span>
        ${badge}
      </div>
      <p class="q-text">${q.text}</p>
      <div class="q-options">
        ${options.map(opt => `
          <button class="q-btn q-btn-${optClass(opt)}"
                  id="qbtn-${q.id}-${opt}"
                  onclick="selectAnswer(${q.id}, '${opt}')">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function optClass(opt) {
  if (opt === '맞다') return 'yes';
  if (opt === '잘 모르겠다') return 'maybe';
  if (opt === '아니다') return 'no';
  return 'na';
}

// ============================================================
// 답변 선택
// ============================================================
function selectAnswer(qId, value) {
  answers[qId] = value;

  const card = document.getElementById(`qcard-${qId}`);
  card.querySelectorAll('.q-btn').forEach(btn => btn.classList.remove('selected'));
  const q = QUESTIONS.find(q => q.id === qId);
  const opts = q.obj ? ['맞다', '잘 모르겠다', '아니다', '해당없음'] : ['맞다', '잘 모르겠다', '아니다'];
  opts.forEach(opt => {
    const btn = document.getElementById(`qbtn-${qId}-${opt}`);
    if (btn && opt === value) btn.classList.add('selected');
  });
  card.classList.add('answered');
  updateProgress();
}

// ============================================================
// 진행률 업데이트
// ============================================================
function updateProgress() {
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const pct = Math.round((answered / total) * 100);

  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${answered} / ${total}`;
  document.getElementById('answeredCount').textContent = answered;
  document.getElementById('remainingCount').textContent = total - answered;

  CATEGORIES.forEach(cat => {
    const catQs = QUESTIONS.filter(q => q.cat === cat.id);
    const catAnswered = catQs.filter(q => answers[q.id] !== undefined).length;
    const tab = document.getElementById(`tab-${cat.id}`);
    if (tab) {
      tab.classList.toggle('cat-done', catAnswered === catQs.length);
      const spans = tab.querySelectorAll('span');
      if (spans.length > 0) spans[spans.length - 1].textContent = `${catAnswered}/${catQs.length}`;
    }
  });

  const submitBtn = document.getElementById('submitBtn');
  if (answered === total) {
    submitBtn.classList.add('ready');
  } else {
    submitBtn.classList.remove('ready');
  }
}

// ============================================================
// ============================================================
// 카테고리 스크롤
// ============================================================
function getStickyHeight() {
  const stickyTop = document.querySelector('.survey-sticky-top');
  return stickyTop ? stickyTop.offsetHeight + 12 : 160;
}

function scrollToCategory(catId) {
  const el = document.getElementById(`cat-${catId}`);
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - getStickyHeight();
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
}

// 스크롤 감지 → 활성 카테고리 탭 강조
window.addEventListener('scroll', () => {
  if (!document.getElementById('survey-screen').classList.contains('active')) return;
  const stickyH = getStickyHeight();
  let current = null;
  CATEGORIES.forEach(cat => {
    const el = document.getElementById(`cat-${cat.id}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= stickyH + 20) current = cat.id;
    }
  });
  if (current) {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active-tab'));
    const activeTab = document.getElementById(`tab-${current}`);
    if (activeTab) {
      activeTab.classList.add('active-tab');
      activeTab.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }
});

// ============================================================
// 제출
// ============================================================
async function submitSurvey() {
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;

  if (answered < total) {
    const remaining = total - answered;
    alert(`아직 ${remaining}개의 항목에 답하지 않았습니다.\n모든 항목에 응답 후 제출해주세요.`);
    for (const q of QUESTIONS) {
      if (answers[q.id] === undefined) {
        const card = document.getElementById(`qcard-${q.id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('shake');
          setTimeout(() => card.classList.remove('shake'), 600);
        }
        break;
      }
    }
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 저장 중...';

  // ── 저장 시도 (Apps Script URL이 설정된 경우만) ─────────
  const apiUrl = typeof CONFIG !== 'undefined' ? CONFIG.APPS_SCRIPT_URL : '';

  if (apiUrl) {
    try {
      const payload = {
        session_id: sessionId,
        exam_type: selectedExamType,
        exam_category: selectedExamCategory,
        mbti: selectedMbti,
        submitted_at: new Date().toISOString(),
      };
      QUESTIONS.forEach(q => { payload[`q${q.id}`] = answers[q.id]; });

      // ── Google Apps Script 저장 방식 ──────────────────────
      // no-cors 환경에서 JSON body가 전달되지 않는 문제 해결:
      // payload를 JSON 문자열로 직렬화 후 URL 파라미터로 GET 전송
      // (Apps Script doGet에서 e.parameter.data로 수신)
      const jsonStr = encodeURIComponent(JSON.stringify(payload));
      await fetch(`${apiUrl}?action=save&data=${jsonStr}`, {
        method: 'GET',
        mode: 'no-cors',
      });
      console.log('데이터 저장 요청 완료');
    } catch (e) {
      console.warn('데이터 저장 실패 (결과는 계속 표시):', e);
    }
  } else {
    console.info('CONFIG.APPS_SCRIPT_URL 미설정 → 저장 건너뜀');
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 진단 결과 제출하기';
  showResult();
}

// ============================================================
// 결과 화면
// ============================================================
function showResult() {
  let yesCount = 0, maybeCount = 0, noCount = 0, naCount = 0;

  QUESTIONS.forEach(q => {
    const ans = answers[q.id];
    if (ans === '맞다') yesCount++;
    else if (ans === '잘 모르겠다') maybeCount++;
    else if (ans === '아니다') noCount++;
    else naCount++;
  });

  document.getElementById('dangerCount').textContent = yesCount;
  document.getElementById('maybeCount').textContent = maybeCount;
  document.getElementById('noCount').textContent = noCount;

  // 시험 정보 배지
  const examInfoEl = document.getElementById('resultExamInfo');
  if (examInfoEl) {
    examInfoEl.textContent = `${selectedMbti} · ${selectedExamCategory} · ${selectedExamType}`;
  }

  // ── MBTI 맞춤 조언 ─────────────────────────────────────────
  renderMbtiAdvice();

  // ── 카테고리별 솔루션 ─────────────────────────────────────
  renderCategorySolutions();

  // ── 공유 섹션 확실히 표시 ─────────────────────────────────
  const shareSection = document.getElementById('resultShareSection');
  if (shareSection) shareSection.style.display = 'block';

  // 공유 링크 미리보기 초기화
  const shareLinkPreview = document.getElementById('shareLinkPreview');
  if (shareLinkPreview) shareLinkPreview.style.display = 'none';

  showScreen('result-screen');
}

// ── MBTI 조언 렌더링 ────────────────────────────────────────
function renderMbtiAdvice() {
  const profile = MBTI_PROFILES[selectedMbti];
  if (!profile) return;

  const titleEl = document.getElementById('mbtiAdviceTitle');
  if (titleEl) titleEl.textContent = `${selectedMbti} (${profile.nickname}) 맞춤 학습 조언`;

  const card = document.getElementById('mbtiAdviceCard');
  if (!card) return;

  const groupColors = {
    analyst: { bg: '#EEF2FF', border: '#6366F1', badge: '#6366F1' },
    diplomat: { bg: '#F0FDF4', border: '#22C55E', badge: '#22C55E' },
    sentinel: { bg: '#FFF7ED', border: '#F97316', badge: '#F97316' },
    explorer: { bg: '#FFF1F2', border: '#F43F5E', badge: '#F43F5E' },
  };
  const gc = groupColors[profile.group] || groupColors.analyst;

  const groupLabel = { analyst: '분석가형', diplomat: '외교관형', sentinel: '관리자형', explorer: '탐험가형' };

  card.innerHTML = `
    <div class="mbti-card-inner" style="background:${gc.bg};border-color:${gc.border}">
      <div class="mbti-card-head">
        <div class="mbti-card-emoji">${profile.emoji}</div>
        <div class="mbti-card-info">
          <div class="mbti-card-type">
            <span class="mbti-type-badge" style="background:${gc.badge}">${selectedMbti}</span>
            <span class="mbti-group-badge">${groupLabel[profile.group]}</span>
          </div>
          <div class="mbti-card-trait">${profile.studyTrait}</div>
        </div>
      </div>

      <div class="mbti-sw-grid">
        <div class="mbti-sw-block strength">
          <div class="mbti-sw-label"><i class="fas fa-thumbs-up"></i> 강점</div>
          <ul>${profile.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="mbti-sw-block weakness">
          <div class="mbti-sw-label"><i class="fas fa-exclamation-triangle"></i> 약점</div>
          <ul>${profile.weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="mbti-advice-list">
        <div class="mbti-advice-heading"><i class="fas fa-lightbulb"></i> 맞춤 조언</div>
        ${profile.advice.map(a => `
          <div class="mbti-advice-item">
            <span class="mbti-advice-icon">${a.icon}</span>
            <span class="mbti-advice-text">${a.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── 카테고리별 솔루션 렌더링 ────────────────────────────────
function renderCategorySolutions() {
  const container = document.getElementById('categorySolutionList');
  if (!container) return;

  let html = '';

  CATEGORIES.forEach(cat => {
    const catQs = QUESTIONS.filter(q => q.cat === cat.id);
    const catYes = catQs.filter(q => answers[q.id] === '맞다').length;
    const catMaybe = catQs.filter(q => answers[q.id] === '잘 모르겠다').length;
    const catTotal = catQs.filter(q => answers[q.id] !== '해당없음').length;
    const pct = catTotal > 0 ? Math.round((catYes / catTotal) * 100) : 0;

    const level = pct >= 60 ? 'danger' : pct >= 30 ? 'warn' : 'good';
    const levelLabel = pct >= 60 ? '위험' : pct >= 30 ? '주의' : '양호';
    const levelColor = pct >= 60 ? '#EF4444' : pct >= 30 ? '#F59E0B' : '#22C55E';

    const sol = CATEGORY_SOLUTIONS[cat.id];

    // 해당 카테고리에서 '맞다'로 답한 문항들
    const dangerQs = catQs.filter(q => answers[q.id] === '맞다');
    const maybeQs  = catQs.filter(q => answers[q.id] === '잘 모르겠다');

    // 솔루션 카드: 위험/주의 카테고리만 솔루션 펼침, 양호는 접힘
    const isOpen = level !== 'good';

    html += `
      <div class="cat-sol-card ${level}" id="catSol-${cat.id}">
        <!-- 카테고리 헤더 -->
        <div class="cat-sol-header" onclick="toggleCatSol('${cat.id}')">
          <div class="cat-sol-header-left">
            <span class="cat-sol-icon" style="background:${cat.color}20;color:${cat.color}">
              <i class="fas ${cat.icon}"></i>
            </span>
            <div>
              <div class="cat-sol-name">${cat.label}</div>
              <div class="cat-sol-stat">${catYes}/${catTotal} 개선 필요</div>
            </div>
          </div>
          <div class="cat-sol-header-right">
            <div class="cat-sol-pct-wrap">
              <div class="cat-sol-pct" style="color:${levelColor}">${pct}%</div>
              <div class="cat-sol-level-badge" style="background:${levelColor}20;color:${levelColor}">${levelLabel}</div>
            </div>
            <i class="fas fa-chevron-${isOpen ? 'up' : 'down'} cat-sol-chevron"></i>
          </div>
        </div>

        <!-- 진행 바 -->
        <div class="cat-sol-bar-wrap">
          <div class="cat-sol-bar" style="width:${pct}%;background:${levelColor}"></div>
        </div>

        <!-- 펼쳐지는 솔루션 영역 -->
        <div class="cat-sol-body" style="display:${isOpen ? 'block' : 'none'}">
          ${sol ? `<div class="cat-sol-summary"><i class="fas fa-quote-left"></i> ${sol.summary}</div>` : ''}

          ${dangerQs.length > 0 ? `
            <div class="cat-sol-issues">
              <div class="issues-heading danger-heading"><i class="fas fa-times-circle"></i> 개선이 필요한 항목 (${dangerQs.length}개)</div>
              <ul class="issues-list">
                ${dangerQs.map(q => `<li><span class="q-num-sm">Q${q.id}</span>${q.text}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${maybeQs.length > 0 ? `
            <div class="cat-sol-issues">
              <div class="issues-heading maybe-heading"><i class="fas fa-question-circle"></i> 확인이 필요한 항목 (${maybeQs.length}개)</div>
              <ul class="issues-list maybe-list">
                ${maybeQs.map(q => `<li><span class="q-num-sm maybe">Q${q.id}</span>${q.text}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${sol && sol.tips ? `
            <div class="tips-wrap">
              <div class="tips-heading"><i class="fas fa-lightbulb"></i> 솔루션</div>
              <div class="tips-grid">
                ${sol.tips.map(tip => `
                  <div class="tip-card">
                    <div class="tip-title">${tip.title}</div>
                    <div class="tip-desc">${tip.desc}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${level === 'good' && dangerQs.length === 0 ? `
            <div class="cat-sol-good-msg">
              <i class="fas fa-check-circle"></i> 이 영역은 양호합니다! 현재 습관을 유지하세요.
            </div>
          ` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 카테고리 솔루션 토글
function toggleCatSol(catId) {
  const card = document.getElementById(`catSol-${catId}`);
  if (!card) return;
  const body = card.querySelector('.cat-sol-body');
  const chevron = card.querySelector('.cat-sol-chevron');
  const isHidden = body.style.display === 'none';
  body.style.display = isHidden ? 'block' : 'none';
  chevron.className = `fas fa-chevron-${isHidden ? 'up' : 'down'} cat-sol-chevron`;
}

// ============================================================
// 공유 URL 생성
// ============================================================
function buildShareUrl() {
  const payload = {
    mbti: selectedMbti,
    examType: selectedExamType,
    examCategory: selectedExamCategory,
    answers: answers,
    savedAt: new Date().toISOString(),
  };
  const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
  const base = window.location.href.replace(/\/[^/]*$/, '/');
  return `${base}result.html?d=${encoded}`;
}

// ── 결과 링크 복사 ───────────────────────────────────────────
function copyResultLink() {
  const url = buildShareUrl();

  // 링크 미리보기 표시
  const preview = document.getElementById('shareLinkPreview');
  const input = document.getElementById('shareLinkInput');
  if (preview && input) {
    input.value = url;
    preview.style.display = 'flex';
  }

  // 클립보드 복사
  navigator.clipboard.writeText(url).then(() => {
    showToast('✅ 링크가 클립보드에 복사되었습니다!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ 링크가 복사되었습니다!');
  });
}

function copyShareInputLink() {
  const input = document.getElementById('shareLinkInput');
  if (!input) return;
  navigator.clipboard.writeText(input.value).then(() => {
    showToast('✅ 링크가 복사되었습니다!');
  }).catch(() => {
    input.select();
    document.execCommand('copy');
    showToast('✅ 링크가 복사되었습니다!');
  });
}

// ── PDF 저장 ─────────────────────────────────────────────────
function saveResultPdf() {
  // 모든 카테고리 펼치기
  document.querySelectorAll('.cat-sol-body').forEach(b => b.style.display = 'block');
  document.querySelectorAll('.cat-sol-chevron').forEach(c => {
    c.className = 'fas fa-chevron-up cat-sol-chevron';
  });
  showToast('📄 인쇄 창에서 "PDF로 저장"을 선택하세요');
  setTimeout(() => window.print(), 500);
}

// ── 토스트 알림 ──────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ============================================================
// 다시 진단하기
// ============================================================
function retakeSurvey() {
  answers = {};
  sessionId = generateSessionId();
  selectedExamType = null;
  selectedExamCategory = null;
  selectedMbti = null;

  document.querySelectorAll('.question-card').forEach(c => {
    c.classList.remove('answered');
    c.querySelectorAll('.q-btn').forEach(b => b.classList.remove('selected'));
  });

  // 인트로 초기화
  document.querySelectorAll('.mbti-btn').forEach(b => b.classList.remove('selected'));
  const mbtiDisplay = document.getElementById('mbtiSelectedDisplay');
  if (mbtiDisplay) mbtiDisplay.style.display = 'none';
  document.querySelectorAll('.exam-type-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.exam-cat-btn').forEach(b => b.classList.remove('selected'));
  const selSummary = document.getElementById('selectionSummary');
  if (selSummary) selSummary.style.display = 'none';
  updateStartButton();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = false;
  submitBtn.classList.remove('ready');
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 진단 결과 제출하기';
  updateProgress();
  showScreen('intro-screen');
}
