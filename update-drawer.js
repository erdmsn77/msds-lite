const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the click listener to expand accordion instead of drawer
const oldListener = `          chemicalList.addEventListener('click', (e) => {
            const card = e.target.closest('.chemical-card');
            if (card) {
              const chemId = card.dataset.chemicalId;
              openDrawer(chemId);
            }
          });`;
          
const newListener = `          chemicalList.addEventListener('click', (e) => {
            const card = e.target.closest('.chemical-card');
            if (card) {
              const chemId = card.dataset.chemicalId;
              const isExpanded = card.classList.contains('expanded');
              
              if (e.target.closest('.accordion-content') || e.target.closest('.timer-btn')) {
                // If clicking inside accordion but it's a timer button, let it bubble or handle it
                if(e.target.id === 'timerToggleBtn') toggleTimer();
                if(e.target.id === 'timerResetBtn') resetTimer();
                return;
              }
              
              document.querySelectorAll('.chemical-card.expanded').forEach(c => {
                if(c !== card) c.classList.remove('expanded');
              });
              
              if (!isExpanded) {
                card.classList.add('expanded');
                const accContent = card.querySelector('.accordion-content');
                if (accContent && accContent.innerHTML === '') {
                  const chem = state.chemicals.find(c => c.id === chemId);
                  if (chem) {
                    accContent.innerHTML = renderDrawerContent(chem);
                    state.selectedChemical = chem;
                    state.timerSeconds = chem.emergency_timer_min * 60;
                    state.alarmActive = false;
                    stopTimer();
                    updateTimerDisplay();
                  }
                }
              } else {
                card.classList.remove('expanded');
              }
            }
          });`;

html = html.replace(oldListener, newListener);

// Rewrite renderDrawerContent to match the 4 specific tabs:
// İlk Yardım, Yangın & Müdahale, KKD, Depolama & Uyuşmazlık
// and we remove the old drawer-header logic.

const drawerFunctionStart = `      // Render Drawer Content
      function renderDrawerContent(chem) {`;

const drawerFunctionEnd = `        return \`
          <div class="drawer-header">
            <div class="drawer-header-top">
              <div>
                <span class="drawer-category-tag">\${escape(catLabel)}</span>
                <h2 class="drawer-title" id="drawerTitle">\${escape(getL(chem.name))}</h2>
                <div class="drawer-chemical-name">\${escape(getL(chem.chemical_name))}</div>
              </div>
              <button type="button" class="drawer-close" id="drawerCloseBtn" aria-label="\${t('close')}">✕</button>
            </div>
          </div>
          <div class="drawer-body">
            \${tabBodyHtml}
          </div>
        \`;
      }`;

const newDrawerFunction = `      // Render Drawer Content (Now Accordion Content)
      function renderDrawerContent(chem) {
        const catLabel = (CATEGORIES[chem.category] && CATEGORIES[chem.category][state.language]) || chem.category;

        // 1. Depolama & Uyuşmazlık
        const incomp = INCOMPATIBILITY_ALERTS[chem.id];
        let incompHtml = '';
        if (incomp) {
          const isCrit = incomp.level === 'critical';
          const header = isCrit ? t('incompatibilityNotice') : t('warningNotice');
          const title = state.language === 'tr' ? incomp.title_tr : (state.language === 'de' ? incomp.title_de : incomp.title_en);
          const text = state.language === 'tr' ? incomp.text_tr : (state.language === 'de' ? incomp.text_de : incomp.text_en);
          incompHtml = \`
            <div class="incompatibility-box \${isCrit ? '' : 'warning-box'}" style="margin-bottom:12px;">
              <div class="incompatibility-header">⚠️ \${escape(header)}</div>
              <div class="incompatibility-title">\${escape(title)}</div>
              <div class="incompatibility-text">\${escape(text)}</div>
              <div class="incompatibility-source">\${escape(incomp.source)}</div>
            </div>
          \`;
        }

        // 2. İlk Yardım & Timer
        const firstAidHtml = \`
          <div class="drawer-section">
            <div class="section-title-row">
              <span class="section-icon">🚑</span>
              <span class="section-title">\${state.language === 'tr' ? 'İLK YARDIM (Acil Eylem)' : (state.language === 'de' ? 'ERSTE HILFE' : 'FIRST AID')}</span>
            </div>
            
            <div class="timer-console \${state.alarmActive ? 'alarm-active' : ''}" id="timerConsole" style="margin-bottom:12px;">
              <div class="timer-label">⏱ \${t('rinseTimer')}</div>
              <div class="timer-clock" id="timerClock">\${formatTime(state.timerSeconds)}</div>
              <div class="timer-btn-row">
                <button type="button" class="timer-btn timer-btn-primary" id="timerToggleBtn">
                  \${state.timerSeconds <= 0 ? t('resetTimer') : (state.timerRunning ? t('pauseTimer') : t('startTimer'))}
                </button>
                <button type="button" class="timer-btn timer-btn-secondary" id="timerResetBtn">
                  \${t('resetTimer')}
                </button>
              </div>
              <div class="timer-alarm-notice \${state.alarmActive ? '' : 'hidden'}" id="timerAlarmNotice">
                🚨 \${t('timeCompleted')}
              </div>
            </div>

            <div class="aid-block">
              <div class="aid-label">👁️ \${t('firstAidEye')} (En az \${chem.emergency_timer_min} \${t('minutes')})</div>
              <div class="aid-text">\${escape(getL(chem.first_aid.eye))}</div>
            </div>
            <div class="aid-block">
              <div class="aid-label">✋ \${t('firstAidSkin')}</div>
              <div class="aid-text">\${escape(getL(chem.first_aid.skin))}</div>
            </div>
            <div class="aid-block">
              <div class="aid-label">🫁 \${t('firstAidInhalation')}</div>
              <div class="aid-text">\${escape(getL(chem.first_aid.inhalation))}</div>
            </div>
          </div>
        \`;

        // 3. Yangın & Müdahale
        const ghsCardsHtml = chem.ghs_codes.map(c => {
          const meta = GHS_METADATA[c] || GHS_METADATA.GHS07;
          const title = state.language === 'tr' ? meta.title_tr : (state.language === 'de' ? meta.title_de : meta.title_en);
          const desc = state.language === 'tr' ? meta.desc_tr : (state.language === 'de' ? meta.desc_de : meta.desc_en);
          return \`
            <div class="ghs-card-item">
              \${renderGhsDiamond(c, 'ghs-diamond-large')}
              <div class="ghs-card-meta">
                <div class="ghs-card-code">\${escape(c)}</div>
                <div class="ghs-card-name">\${escape(title)}</div>
                <div class="ghs-card-desc">\${escape(desc)}</div>
              </div>
            </div>
          \`;
        }).join('');
        
        const fireHtml = \`
          <div class="drawer-section">
            <div class="section-title-row">
              <span class="section-icon">🔥</span>
              <span class="section-title">\${state.language === 'tr' ? 'YANGIN & MÜDAHALE' : (state.language === 'de' ? 'FEUERBEKÄMPFUNG' : 'FIRE & RESPONSE')}</span>
            </div>
            <div style="margin-bottom:12px;">
              <span class="metric-label">\${t('flashPoint')}:</span>
              <span class="metric-val" style="color:var(--text-main); font-weight:bold; margin-left:4px;">\${escape(getL(chem.flash_point))}</span>
            </div>
            <div class="ghs-cards-grid">\${ghsCardsHtml}</div>
          </div>
        \`;

        // 4. KKD (Kişisel Koruyucu Donanım)
        const gloves = chem.ppe.gloves;
        const ppeHtml = \`
          <div class="drawer-section">
            <div class="section-title-row">
              <span class="section-icon">🤿</span>
              <span class="section-title">\${t('ppe').toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 12px;">
              <div style="font-size:11px; color:var(--text-dim); margin-bottom:2px;">\${t('mask')}</div>
              <div style="font-size:13px; font-weight:600; color:var(--text-main);">\${escape(getL(chem.ppe.mask))}</div>
            </div>
            <div style="margin-bottom: 12px;">
              <div style="font-size:11px; color:var(--text-dim); margin-bottom:2px;">\${t('eyeProtection')}</div>
              <div style="font-size:13px; font-weight:600; color:var(--text-main);">\${escape(getL(chem.ppe.eye))}</div>
            </div>
            <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">\${t('gloves')}</div>
            <div class="glove-list">
              <div class="glove-item">
                <span class="glove-name">\${t('latex')}</span>
                <span class="glove-badge \${gloves.latex ? 'safe' : 'unsafe'}">\${gloves.latex ? t('suitable') : t('unsuitable')}</span>
              </div>
              <div class="glove-item">
                <span class="glove-name">\${t('nitrile')}</span>
                <span class="glove-badge \${gloves.nitrile ? 'safe' : 'unsafe'}">\${gloves.nitrile ? t('suitable') : t('unsuitable')}</span>
              </div>
              <div class="glove-item">
                <span class="glove-name">\${t('butyl')}</span>
                <span class="glove-badge \${gloves.butyl ? 'safe' : 'unsafe'}">\${gloves.butyl ? t('suitable') : t('unsuitable')}</span>
              </div>
            </div>
            <div class="glove-warning-box">
              <strong>\${t('warning')}:</strong> \${escape(getL(gloves.warning))}
            </div>
          </div>
        \`;

        // 5. Source Information (Ek olarak)
        const sourceLinkHtml = chem.source_url 
          ? \`<a href="\${escape(chem.source_url)}" class="source-link-btn" target="_blank" rel="noopener noreferrer">\${t('openSource')} ↗</a>\`
          : \`<span style="color:var(--text-dim);">\${t('canonicalSource')}</span>\`;
          
        const sourceHtml = \`
          <div class="drawer-section">
            <div class="source-block">
              <div class="source-row">
                <span style="color:var(--text-muted);">\${t('sourceStatus')}:</span>
                <strong style="color:\${getL(chem.verification_status).includes('bekleniyor') || getL(chem.verification_status).includes('pending') || getL(chem.verification_status).includes('ausstehend') ? 'var(--marine-amber)' : 'var(--marine-emerald)'};">\${escape(getL(chem.verification_status))}</strong>
              </div>
              <div class="source-row">
                <span style="color:var(--text-muted);">\${t('verifiedAt')}:</span>
                <span>\${escape(chem.verified_at || '—')}</span>
              </div>
              <div class="source-row">
                <span style="color:var(--text-muted);">\${t('canonicalSource')}:</span>
                <span style="text-align:right; max-width:65%; color:var(--text-main); font-weight:600;">\${escape(getL(chem.source))}</span>
              </div>
              <div style="margin-top:4px; text-align:right;">
                \${sourceLinkHtml}
              </div>
            </div>
            <div style="margin-top:16px; font-size:11px; color:#94a3b8; line-height:1.5;">
              <strong>ℹ️ \${t('scopeNote')}:</strong> \${escape(getL(chem.verification_note) || t('disclaimer'))}
            </div>
          </div>
        \`;

        // We wrap them in tabs or simple sections
        return \`
          <div class="accordion-inner" style="text-align:left;">
            \${incompHtml}
            \${firstAidHtml}
            \${fireHtml}
            \${ppeHtml}
            \${sourceHtml}
          </div>
        \`;
      }`;

const startIndex = html.indexOf(drawerFunctionStart);
const endIndex = html.indexOf(drawerFunctionEnd) + drawerFunctionEnd.length;
if(startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + newDrawerFunction + html.substring(endIndex);
} else {
  console.log("Could not find drawer block");
}

fs.writeFileSync('index.html', html);
console.log("Done");
