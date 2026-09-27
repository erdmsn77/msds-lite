const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /\/\/\s*Render Drawer Content\s*function renderDrawerContent\(chem\) \{[\s\S]*?\}\s*function openDrawer/m;

const newDrawerFunction = `// Render Drawer Content (Now Accordion Content)
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
          <div class="drawer-section" style="border:1px solid var(--border-subtle); padding:12px; border-radius:8px; margin-bottom:12px; background:var(--bg-card);">
            <div class="section-title-row" style="margin-bottom:12px;">
              <span class="section-icon">🚑</span>
              <span class="section-title">\${state.language === 'tr' ? 'İLK YARDIM (Acil Eylem)' : (state.language === 'de' ? 'ERSTE HILFE' : 'FIRST AID')}</span>
            </div>
            
            <div class="timer-console \${state.alarmActive ? 'alarm-active' : ''}" id="timerConsole" style="margin-bottom:16px;">
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
              <div class="aid-label" style="color:var(--text-main); font-weight:600;">👁️ \${t('firstAidEye')} <span style="font-size:11px; color:var(--marine-cyan);">(Min \${chem.emergency_timer_min} \${t('minutes')})</span></div>
              <div class="aid-text" style="color:var(--text-dim);">\${escape(getL(chem.first_aid.eye))}</div>
            </div>
            <div class="aid-block">
              <div class="aid-label" style="color:var(--text-main); font-weight:600;">✋ \${t('firstAidSkin')}</div>
              <div class="aid-text" style="color:var(--text-dim);">\${escape(getL(chem.first_aid.skin))}</div>
            </div>
            <div class="aid-block">
              <div class="aid-label" style="color:var(--text-main); font-weight:600;">🫁 \${t('firstAidInhalation')}</div>
              <div class="aid-text" style="color:var(--text-dim);">\${escape(getL(chem.first_aid.inhalation))}</div>
            </div>
          </div>
        \`;

        // 3. Yangın & Müdahale
        const ghsCardsHtml = chem.ghs_codes.map(c => {
          const meta = GHS_METADATA[c] || GHS_METADATA.GHS07;
          const title = state.language === 'tr' ? meta.title_tr : (state.language === 'de' ? meta.title_de : meta.title_en);
          const desc = state.language === 'tr' ? meta.desc_tr : (state.language === 'de' ? meta.desc_de : meta.desc_en);
          return \`
            <div class="ghs-card-item" style="display:flex; align-items:center; gap:8px; margin-bottom:8px; background:var(--bg-main); padding:8px; border-radius:6px;">
              \${renderGhsDiamond(c, 'ghs-diamond-large')}
              <div class="ghs-card-meta">
                <div class="ghs-card-code" style="font-size:10px; color:var(--text-muted); font-weight:bold;">\${escape(c)}</div>
                <div class="ghs-card-name" style="font-size:12px; font-weight:600; color:var(--text-main);">\${escape(title)}</div>
                <div class="ghs-card-desc" style="font-size:11px; color:var(--text-dim);">\${escape(desc)}</div>
              </div>
            </div>
          \`;
        }).join('');
        
        const fireHtml = \`
          <div class="drawer-section" style="border:1px solid var(--border-subtle); padding:12px; border-radius:8px; margin-bottom:12px; background:var(--bg-card);">
            <div class="section-title-row" style="margin-bottom:12px;">
              <span class="section-icon">🔥</span>
              <span class="section-title">\${state.language === 'tr' ? 'YANGIN & MÜDAHALE' : (state.language === 'de' ? 'FEUERBEKÄMPFUNG' : 'FIRE & RESPONSE')}</span>
            </div>
            <div style="margin-bottom:12px; font-size:13px;">
              <span class="metric-label" style="color:var(--text-dim);">\${t('flashPoint')}:</span>
              <span class="metric-val" style="color:var(--text-main); font-weight:bold; margin-left:4px;">\${escape(getL(chem.flash_point))}</span>
            </div>
            <div class="ghs-cards-grid">\${ghsCardsHtml}</div>
          </div>
        \`;

        // 4. KKD (Kişisel Koruyucu Donanım)
        const gloves = chem.ppe.gloves;
        const ppeHtml = \`
          <div class="drawer-section" style="border:1px solid var(--border-subtle); padding:12px; border-radius:8px; margin-bottom:12px; background:var(--bg-card);">
            <div class="section-title-row" style="margin-bottom:12px;">
              <span class="section-icon">🤿</span>
              <span class="section-title">\${t('ppe').toUpperCase()}</span>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:12px;">
              <div>
                <div style="font-size:11px; color:var(--text-dim); margin-bottom:2px;">\${t('mask')}</div>
                <div style="font-size:13px; font-weight:600; color:var(--text-main);">\${escape(getL(chem.ppe.mask))}</div>
              </div>
              <div>
                <div style="font-size:11px; color:var(--text-dim); margin-bottom:2px;">\${t('eyeProtection')}</div>
                <div style="font-size:13px; font-weight:600; color:var(--text-main);">\${escape(getL(chem.ppe.eye))}</div>
              </div>
            </div>
            <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">\${t('gloves')}</div>
            <div class="glove-list" style="display:flex; gap:6px; margin-bottom:8px;">
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

        // 5. Source Information
        const sourceLinkHtml = chem.source_url 
          ? \`<a href="\${escape(chem.source_url)}" class="source-link-btn" target="_blank" rel="noopener noreferrer">\${t('openSource')} ↗</a>\`
          : \`<span style="color:var(--text-dim);">\${t('canonicalSource')}</span>\`;
          
        const sourceHtml = \`
          <div class="drawer-section" style="border:1px solid var(--border-subtle); padding:12px; border-radius:8px; background:var(--bg-card);">
            <div class="source-block">
              <div class="source-row" style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                <span style="color:var(--text-muted);">\${t('sourceStatus')}:</span>
                <strong style="color:\${getL(chem.verification_status).includes('bekleniyor') || getL(chem.verification_status).includes('pending') || getL(chem.verification_status).includes('ausstehend') ? 'var(--marine-amber)' : 'var(--marine-emerald)'};">\${escape(getL(chem.verification_status))}</strong>
              </div>
              <div class="source-row" style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                <span style="color:var(--text-muted);">\${t('verifiedAt')}:</span>
                <span style="color:var(--text-dim);">\${escape(chem.verified_at || '—')}</span>
              </div>
              <div class="source-row" style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                <span style="color:var(--text-muted);">\${t('canonicalSource')}:</span>
                <span style="text-align:right; max-width:65%; color:var(--text-main); font-weight:600;">\${escape(getL(chem.source))}</span>
              </div>
              <div style="margin-top:8px; text-align:right;">
                \${sourceLinkHtml}
              </div>
            </div>
            <div style="margin-top:12px; font-size:11px; color:#94a3b8; line-height:1.4;">
              <strong>ℹ️ \${t('scopeNote')}:</strong> \${escape(getL(chem.verification_note) || t('disclaimer'))}
            </div>
          </div>
        \`;

        return \`
          <div class="accordion-inner" style="text-align:left; padding:8px 0;">
            \${incompHtml}
            \${firstAidHtml}
            \${fireHtml}
            \${ppeHtml}
            \${sourceHtml}
          </div>
        \`;
      }

      function openDrawer`;

html = html.replace(regex, newDrawerFunction);
fs.writeFileSync('index.html', html);
console.log('Replaced function body via regex');
