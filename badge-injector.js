const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchStr = `                <div class="card-name">\${escape(getL(chem.name))} <span style="font-size:11px; color:var(--text-dim); font-family:var(--font-mono); font-weight:normal;">| \${escape(getL(chem.chemical_name).split(';')[0])}</span></div>
                
                <div class="card-footer">`;

const badgeLogic = `          let hasFire = chem.ghs_codes.includes('GHS02') || chem.ghs_codes.includes('GHS03') || chem.ghs_codes.includes('GHS01');
          let hasHealth = chem.ghs_codes.includes('GHS05') || chem.ghs_codes.includes('GHS06') || chem.ghs_codes.includes('GHS07') || chem.ghs_codes.includes('GHS08');
          let hasEnv = chem.ghs_codes.includes('GHS09');
          let badgeHtml = '';
          if (hasFire) badgeHtml += \`<span class="stat-badge" style="color:#B91C1C; background:#FEE2E2;">🔥 \${state.language === 'tr' ? 'Yangın' : (state.language === 'de' ? 'Feuer' : 'Fire')}</span>\`;
          if (hasHealth) badgeHtml += \`<span class="stat-badge" style="color:#1D4ED8; background:#DBEAFE;">⚕️ \${state.language === 'tr' ? 'Sağlık' : (state.language === 'de' ? 'Gesundheit' : 'Health')}</span>\`;
          if (hasEnv) badgeHtml += \`<span class="stat-badge" style="color:#047857; background:#D1FAE5;">🌿 \${state.language === 'tr' ? 'Çevre' : (state.language === 'de' ? 'Umwelt' : 'Environment')}</span>\`;
`;

html = html.replace(`const ghsMiniHtml = chem.ghs_codes.map(c => renderGhsDiamond(c, 'ghs-diamond-mini')).join('');`, `const ghsMiniHtml = chem.ghs_codes.map(c => renderGhsDiamond(c, 'ghs-diamond-mini')).join('');\n` + badgeLogic);

html = html.replace(searchStr, `                <div class="card-name">\${escape(getL(chem.name))} <span style="font-size:11px; color:var(--text-dim); font-family:var(--font-mono); font-weight:normal;">| \${escape(getL(chem.chemical_name).split(';')[0])}</span></div>
                <div style="margin-top: 6px; display: flex; gap: 6px; flex-wrap: wrap;">\${badgeHtml}</div>
                <div class="card-footer">`);

fs.writeFileSync('index.html', html);
console.log('Done!');
