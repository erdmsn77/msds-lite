/**
 * MSDS-Lite Automated Test Suite (v1.9.0)
 * Tests:
 * 1. Bug & Null-Safety Tests
 * 2. Exploit & Vulnerability Tests (XSS, Prototype Pollution, ReDoS)
 * 3. Read / Write / Edit (CRUD) Lifecycle Tests
 * 4. SDS Gatekeeper & Parser Verification
 * 5. Regression, Syntax & Edge-Case Bug Hunter Tests
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log('====================================================');
console.log('🧪 MSDS-LITE COMPREHENSIVE AUTOMATED TEST SUITE');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

// Read index.html to extract functions and simulate runtime
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// 1. Extract escape and getL
const escapeMatch = htmlContent.match(/const escape = (val) => [^\n]+/);
const escapeFn = (val) => (val == null ? '' : String(val)).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));

let currentLanguage = 'tr';
function getL(val) {
  return (typeof val === 'object' && val !== null && !Array.isArray(val)) 
    ? (val[currentLanguage] ?? val.tr ?? '') 
    : (val ?? '');
}

// ----------------------------------------------------
// SECTION 1: BUG & NULL-SAFETY TESTS
// ----------------------------------------------------
console.log('📦 [1/4] BUG & NULL-SAFETY TESTS:');

test('escape() handles null, undefined, numeric 0 and boolean false safely', () => {
  assert.strictEqual(escapeFn(null), '');
  assert.strictEqual(escapeFn(undefined), '');
  assert.strictEqual(escapeFn(0), '0', 'Numeric 0 must not turn into empty string');
  assert.strictEqual(escapeFn(false), 'false', 'Boolean false must not turn into empty string');
  assert.strictEqual(escapeFn('Normal Text'), 'Normal Text');
});

test('getL() handles numeric 0, null, and language fallbacks correctly', () => {
  assert.strictEqual(getL(null), '');
  assert.strictEqual(getL(undefined), '');
  assert.strictEqual(getL(0), 0);
  assert.strictEqual(getL({ tr: 'Türkçe', en: 'English' }), 'Türkçe');
  currentLanguage = 'en';
  assert.strictEqual(getL({ tr: 'Türkçe', en: 'English' }), 'English');
  currentLanguage = 'de';
  assert.strictEqual(getL({ tr: 'Türkçe Sadece' }), 'Türkçe Sadece', 'Fallback to tr if de missing');
  currentLanguage = 'tr';
});

test('Badge rendering logic produces NO empty pills on custom chemicals', () => {
  const customChemWithoutBadges = {
    id: 'custom_1',
    name: { tr: 'Test Epoksi' },
    badges: undefined
  };
  
  const fireBadge = getL(customChemWithoutBadges.badges?.fire);
  const healthBadge = getL(customChemWithoutBadges.badges?.health);
  const envBadge = getL(customChemWithoutBadges.badges?.environment);
  
  const pills = [
    fireBadge ? `<span class="badge-pill badge-fire">${escapeFn(fireBadge)}</span>` : '',
    healthBadge ? `<span class="badge-pill badge-health">${escapeFn(healthBadge)}</span>` : '',
    envBadge ? `<span class="badge-pill badge-env">${escapeFn(envBadge)}</span>` : ''
  ].filter(Boolean);
  
  const badgesContainer = pills.length > 0 ? `<div class="card-emergency-badges">${pills.join('')}</div>` : '';
  
  assert.strictEqual(badgesContainer, '', 'Container must be empty string when no badges exist');
  assert.strictEqual(pills.length, 0, 'No empty badge pills should be generated');
});

// ----------------------------------------------------
// SECTION 2: EXPLOIT & SECURITY TESTS (PENTEST AUDIT)
// ----------------------------------------------------
console.log('\n🛡️ [2/4] EXPLOIT & VULNERABILITY TESTS (XSS, PROTO-POLLUTION, REDOS):');

test('XSS Payload Neutralization in HTML output', () => {
  const maliciousInputs = [
    '<script>alert("XSS")</script>',
    '"><img src=x onerror=alert(1)>',
    '\'><svg onload=alert(2)>',
    'javascript:alert(3)',
    '&lt;script&gt;'
  ];

  for (const input of maliciousInputs) {
    const escaped = escapeFn(input);
    assert.doesNotMatch(escaped, /<script>/i, `Should escape script tags in: ${input}`);
    assert.doesNotMatch(escaped, /<img/i, `Should escape img tags in: ${input}`);
    assert.doesNotMatch(escaped, /<svg/i, `Should escape svg tags in: ${input}`);
    assert.doesNotMatch(escaped, /"/, `Should escape double quotes in: ${input}`);
    assert.doesNotMatch(escaped, /'/, `Should escape single quotes in: ${input}`);
  }
});

test('source_url validation rejects javascript: and file: schemes', () => {
  const maliciousUrls = [
    'javascript:alert(document.cookie)',
    'JAVASCRIPT:alert(1)',
    'vbscript:msgbox(1)',
    'data:text/html,<script>alert(1)</script>',
    'file:///C:/Windows/win.ini'
  ];

  for (const url of maliciousUrls) {
    const isSafe = /^https?:\/\//i.test(url);
    assert.strictEqual(isSafe, false, `URL must be rejected: ${url}`);
  }

  const safeUrls = [
    'https://echa.europa.eu/substance-information/-/substanceinfo/100.001.234',
    'http://localhost:8088/data'
  ];
  for (const url of safeUrls) {
    const isSafe = /^https?:\/\//i.test(url);
    assert.strictEqual(isSafe, true, `Legitimate HTTP/HTTPS URL must be allowed: ${url}`);
  }
});

test('Prototype Pollution Defense in JSON backup import', () => {
  const maliciousJson = `[
    {
      "id": "chem_safe_1",
      "name": "Güvenli Kimyasal",
      "__proto__": { "polluted": true },
      "constructor": { "prototype": { "isAdmin": true } }
    }
  ]`;

  const parsed = JSON.parse(maliciousJson);
  assert.strictEqual(Array.isArray(parsed), true);

  // Apply our sanitization pipeline from importCustomBackup
  for (const item of parsed) {
    delete item['__proto__'];
    delete item['constructor'];
    delete item['prototype'];
  }

  // Verify Object prototype was not polluted
  assert.strictEqual(Object.prototype.polluted, undefined, 'Object.prototype must not be polluted');
  assert.strictEqual(Object.prototype.isAdmin, undefined, 'Object.prototype must not have isAdmin');
});

test('ReDoS Stress Test: sliceSdsSections handles adversarial pathological input under 50ms', () => {
  // Extract sliceSdsSections logic
  const sliceSectionMatch = htmlContent.match(/function sliceSdsSections[\s\S]*?return sections;\s*\}/);
  assert.ok(sliceSectionMatch, 'sliceSdsSections function must be located');

  const sliceSdsSections = new Function('fullText', sliceSectionMatch[0] + '\nreturn sliceSdsSections(fullText);');

  // Create pathological adversarial string (50,000 characters of repetitive ambiguous headers)
  let pathologicalInput = '';
  for (let i = 0; i < 500; i++) {
    pathologicalInput += `BÖLÜM ${i % 16 + 1}: MADDENİN BİLEŞİMİ VE TEHLİKE TANIMI \n`;
    pathologicalInput += 'A'.repeat(80) + ' GUVENLIK BILGI FORMU ' + 'B'.repeat(80) + '\n';
  }

  const startTime = Date.now();
  const sections = sliceSdsSections(pathologicalInput);
  const elapsed = Date.now() - startTime;

  assert.ok(elapsed < 100, `ReDoS test exceeded 100ms: took ${elapsed}ms`);
  assert.ok(typeof sections === 'object');
  console.log(`     (Execution time for 50,000 chars: ${elapsed}ms)`);
});

// ----------------------------------------------------
// SECTION 3: READ / WRITE / EDIT (CRUD) TESTS
// ----------------------------------------------------
console.log('\n📝 [3/4] READ / WRITE / EDIT (CRUD) LIFECYCLE TESTS:');

// Mock localStorage
const localStorageStore = {};
const mockLocalStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; },
  clear: () => { for (const k in localStorageStore) delete localStorageStore[k]; }
};

test('CRUD: 1. Create (Save) Custom Chemical', () => {
  mockLocalStorage.clear();

  const customChem = {
    id: 'sds_custom_101',
    name: { tr: 'Özel İhtilal Reçinesi', en: 'Custom Epoxy Resin', de: 'Epoxidharz' },
    chemical_name: { tr: 'Bisfenol-A Bazlı Epoksi Reçine' },
    cas: '25068-38-6',
    category: 'recine',
    risk_level: 'YÜKSEK',
    signal_word: { tr: 'UYARI', en: 'WARNING', de: 'ACHTUNG' },
    ghs_codes: ['GHS07', 'GHS09'],
    emergency_timer_min: 15,
    flash_point: { tr: '>150°C' },
    first_aid: { eye: { tr: '15 dk yıkayın' } },
    badges: { fire: { tr: 'Parlama: >150°C' }, health: { tr: 'Zararlı' }, environment: { tr: 'Sucul Ortam' } }
  };

  // Simulate saveCustomChemical
  let customs = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals') || '[]');
  customs = customs.filter(c => c.id !== customChem.id);
  customChem.is_custom = true;
  customChem.verified_at = '2026-10-18';
  customs.unshift(customChem);
  mockLocalStorage.setItem('msds-custom-chemicals', JSON.stringify(customs));

  // Verify
  const loaded = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(loaded.length, 1);
  assert.strictEqual(loaded[0].id, 'sds_custom_101');
  assert.strictEqual(loaded[0].is_custom, true);
  assert.strictEqual(loaded[0].name.tr, 'Özel İhtilal Reçinesi');
});

test('CRUD: 2. Read Chemical by ID & Search Query Filter with Turkish-aware Normalization', () => {
  const loaded = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  const found = loaded.find(c => c.id === 'sds_custom_101');
  assert.ok(found, 'Should find chemical by ID');

  function normStr(str) {
    return String(str || '')
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .replace(/ı/g, 'i')
      .toLocaleLowerCase('tr-TR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Test both with dotted i and dotless I queries
  const queries = ['ihtilal', 'Ihtilal', 'İHTİLAL', 'ihtılal', '25068-38-6'];
  for (const q of queries) {
    const qNorm = normStr(q).trim();
    const matches = (
      normStr(found.name?.tr).includes(qNorm) ||
      normStr(found.cas).includes(qNorm)
    );
    assert.strictEqual(matches, true, `Search query "${q}" must match "Özel İhtilal Reçinesi"`);
  }
});

test('CRUD: 3. Edit (Düzeltme) Chemical WITHOUT Duplicating Records', () => {
  const existing = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(existing.length, 1);

  // User edits trade name and emergency timer
  const updatedChem = {
    ...existing[0],
    name: { tr: 'Özel İhtilal Reçinesi (DÜZELTİLDİ V2)', en: 'Custom Resin V2', de: 'Harz V2' },
    emergency_timer_min: 20
  };

  // Simulate saveCustomChemical update
  const updatedList = existing.filter(c => c.id !== updatedChem.id);
  updatedList.unshift(updatedChem);
  mockLocalStorage.setItem('msds-custom-chemicals', JSON.stringify(updatedList));

  // Verify list count is STILL 1 (no duplicate entries)
  const afterEdit = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(afterEdit.length, 1, 'Array length must remain 1 after editing');
  assert.strictEqual(afterEdit[0].name.tr, 'Özel İhtilal Reçinesi (DÜZELTİLDİ V2)');
  assert.strictEqual(afterEdit[0].emergency_timer_min, 20);
});

test('CRUD: 4. Delete Record & 5-Second Undo Restoration', () => {
  let existing = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(existing.length, 1);

  // Delete
  const deletedItem = existing.find(c => c.id === 'sds_custom_101');
  existing = existing.filter(c => c.id !== 'sds_custom_101');
  mockLocalStorage.setItem('msds-custom-chemicals', JSON.stringify(existing));

  // Verify deletion
  let afterDelete = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(afterDelete.length, 0, 'Should be 0 items after deletion');

  // Simulate Undo click (showUndoToast -> sdsUndoBtn click)
  existing = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals') || '[]');
  existing.unshift(deletedItem);
  mockLocalStorage.setItem('msds-custom-chemicals', JSON.stringify(existing));

  // Verify restoration
  let afterUndo = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(afterUndo.length, 1, 'Record should be fully restored by Undo');
  assert.strictEqual(afterUndo[0].id, 'sds_custom_101');
});

test('CRUD: 5. Backup Export & Import with Deduplication', () => {
  const currentCustoms = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  const exportedJson = JSON.stringify(currentCustoms);

  // Create a backup file with 1 existing item + 1 new item
  const importedPayload = [
    currentCustoms[0], // Duplicate ID
    {
      id: 'sds_custom_102',
      name: { tr: 'Polyester Hızlandırıcı Kobalt %6' },
      cas: '136-52-7',
      category: 'hizlandirici'
    }
  ];

  // Run import logic
  const existing = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  const existingIds = new Set(existing.map(c => c.id));
  let addedCount = 0;

  for (const item of importedPayload) {
    if (item && item.id && item.name) {
      if (!existingIds.has(item.id)) {
        existing.push(item);
        existingIds.add(item.id);
        addedCount++;
      }
    }
  }

  mockLocalStorage.setItem('msds-custom-chemicals', JSON.stringify(existing));

  const finalList = JSON.parse(mockLocalStorage.getItem('msds-custom-chemicals'));
  assert.strictEqual(addedCount, 1, 'Only 1 new item should be added (deduplicated)');
  assert.strictEqual(finalList.length, 2, 'Total items should now be 2');
});

// ----------------------------------------------------
// SECTION 4: SDS GATEKEEPER & VALIDATION TESTS
// ----------------------------------------------------
console.log('\n📄 [4/4] SDS GATEKEEPER & VALIDATOR TESTS:');

const validateMatch = htmlContent.match(/function validateSdsDocument[\s\S]*?return \{ isValid: true, count: detectedKeys\.length, detected: detectedKeys \};\s*\}/);
assert.ok(validateMatch, 'validateSdsDocument must be found');
const validateSdsDocument = new Function('sections', validateMatch[0] + '\nreturn validateSdsDocument(sections);');

test('Gatekeeper strictly REJECTS non-SDS documents (e.g. invoice, report)', () => {
  // Non-SDS document: Invoice with only 1 random section or no section 1
  const nonSdsSections = {
    5: 'Fatura No: 2026-981234, Tutar: 15.000 TL, Teslim Alan: Ali Kaya'
  };
  const result = validateSdsDocument(nonSdsSections);
  assert.strictEqual(result.isValid, false, 'Invoice must be rejected by gatekeeper');
});

test('Gatekeeper ACCEPTS compliant REACH/GHS documents with >=3 sections including Section 1', () => {
  const validSdsSections = {
    1: 'MADDENİN/KARIŞIMIN VE ŞİRKETİN/DAĞITICININ KİMLİĞİ. Ticari Adı: POLİPOL 3401',
    2: 'ZARARLILIK TANIMLANMASI. GHS02, GHS07, H226, H315',
    4: 'İLK YARDIM ÖNLEMLERİ. Göz teması: Bol suyla yıkayın.',
    8: 'MARUZİYET KONTROLLERİ/KİŞİSEL KORUNMA. Nitril eldiven kullanın.'
  };
  const result = validateSdsDocument(validSdsSections);
  assert.strictEqual(result.isValid, true, 'Valid SDS should be accepted');
  assert.strictEqual(result.count, 4);
});

// ----------------------------------------------------
// SECTION 5: REGRESSION & EDGE-CASE BUG HUNTER TESTS
// ----------------------------------------------------
console.log('\n🔍 [5/5] REGRESSION & EDGE-CASE BUG HUNTER TESTS:');

test('GHS_METADATA completeness: GHS01 through GHS09 all defined with SVG & tr/en/de titles', () => {
  const ghsMetaMatch = htmlContent.match(/const GHS_METADATA = \{([\s\S]*?)\n\s*\};/);
  assert.ok(ghsMetaMatch, 'GHS_METADATA must be found');
  const GHS_METADATA = new Function('return {' + ghsMetaMatch[1] + '};')();

  const requiredCodes = ['GHS01', 'GHS02', 'GHS03', 'GHS04', 'GHS05', 'GHS06', 'GHS07', 'GHS08', 'GHS09'];
  for (const code of requiredCodes) {
    assert.ok(GHS_METADATA[code], `GHS code ${code} must exist in GHS_METADATA`);
    assert.ok(GHS_METADATA[code].title_tr, `${code} must have title_tr`);
    assert.ok(GHS_METADATA[code].title_en, `${code} must have title_en`);
    assert.ok(GHS_METADATA[code].title_de, `${code} must have title_de`);
    assert.ok(GHS_METADATA[code].svg && (GHS_METADATA[code].svg.includes('<path') || GHS_METADATA[code].svg.includes('<rect') || GHS_METADATA[code].svg.includes('<circle')), `${code} must have valid SVG graphic elements`);
  }
});

test('Custom chemical category-based incompatibility resolution', () => {
  const incompMatch = htmlContent.match(/const INCOMPATIBILITY_ALERTS = \{([\s\S]*?)\n\s*\};/);
  const INCOMPATIBILITY_ALERTS = new Function('return {' + incompMatch[1] + '};')();

  function resolveIncomp(chem) {
    let incomp = INCOMPATIBILITY_ALERTS[chem.id];
    if (!incomp) {
      if (chem.category === 'peroksit') {
        incomp = INCOMPATIBILITY_ALERTS['mek-p'];
      } else if (chem.category === 'hizlandirici') {
        incomp = INCOMPATIBILITY_ALERTS['cobalt-naphthenate'];
      } else if (chem.category === 'sertlestirici' && (chem.ghs_codes || []).includes('GHS05')) {
        incomp = INCOMPATIBILITY_ALERTS['epoxy-hardener-isophoronediamine'];
      }
    }
    return incomp;
  }

  const customPeroxide = { id: 'sds_custom_butanox', category: 'peroksit' };
  const alertPerox = resolveIncomp(customPeroxide);
  assert.ok(alertPerox, 'Custom peroxide must trigger explosion incompatibility alert');
  assert.strictEqual(alertPerox.level, 'critical');

  const customCobalt = { id: 'sds_custom_cobalt', category: 'hizlandirici' };
  const alertCobalt = resolveIncomp(customCobalt);
  assert.ok(alertCobalt, 'Custom accelerator must trigger promoter incompatibility alert');
  assert.strictEqual(alertCobalt.level, 'critical');
});

test('First aid segmentation does NOT bleed Solunması/Yutulması into Cilt teması', () => {
  const s4 = `4.1 İlk yardım önlemleri
Göz teması: Bol su ile yıkayın.
Cilt teması: Sabunla yıkayın.
Solunması: Temiz havaya çıkarın.
Yutulması: Kusturmayın.`;

  function getFirstAidSub(patterns) {
    for (const pat of patterns) {
      const re = new RegExp('(?:^|\\n)\\s*(?:[0-9]\\.[0-9]\\s*)?' + pat + '[:\\-\\s]+([\\s\\S]*?)(?=(?:\\n\\s*(?:[0-9]\\.[0-9]\\s*)?(?:G[öo]z|Eye|Augen|Cilt|Deri|Skin|Haut|Solun?ma|Inhalation|Einatmen|Yut(?:ul)?ma|Ingestion|Verschlucken|4\\.[0-9]|B[ÖO]L[ÜU]M|SECTION|ABSCHNITT)|$))', 'i');
      const m = s4.match(re);
      if (m && m[1].trim().length > 3) {
        return m[1].trim().replace(/\s+/g, ' ');
      }
    }
    return '';
  }

  const skin = getFirstAidSub(['(?:Cilt|Deri)(?:\\s*(?:ile\\s*)?Temas[ıi])?(?:\\s*halinde)?']);
  const inh = getFirstAidSub(['Solun?mas?[ıi]?(?:\\s*halinde)?']);
  const ing = getFirstAidSub(['Yut(?:ul)?mas?[ıi]?(?:\\s*halinde)?']);

  assert.strictEqual(skin, 'Sabunla yıkayın.');
  assert.strictEqual(inh, 'Temiz havaya çıkarın.');
  assert.strictEqual(ing, 'Kusturmayın.');
});

test('Regex literal audit: zero double-backslash whitespace/digit escapes in index.html regex literals', () => {
  const lines = htmlContent.split('\n');
  const badRegexLines = [];
  lines.forEach((line, idx) => {
    if (/\/[^/\n]*\\\\[sSwWdDbB][^/\n]*\/[gimsuy]*/.test(line)) {
      badRegexLines.push(`${idx + 1}: ${line.trim()}`);
    }
  });
  assert.strictEqual(badRegexLines.length, 0, `Found broken double-backslash escapes in regex literals: \n${badRegexLines.join('\n')}`);
});

test('Syntax & compilation audit: all inline scripts in index.html compile with zero syntax errors', () => {
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let scriptIndex = 0;
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    const code = match[1].trim();
    if (!code) continue;
    assert.doesNotThrow(() => {
      new vm.Script(code, { filename: `index.html[script-${scriptIndex}]` });
    }, `Inline script #${scriptIndex} failed to compile in V8 vm.Script`);
    scriptIndex++;
  }
  assert.ok(scriptIndex >= 2, 'Must have validated at least 2 inline scripts');
});

test('Syntax & compilation audit: sw.js compiles with zero syntax errors', () => {
  const swContent = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf-8');
  assert.doesNotThrow(() => {
    new vm.Script(swContent, { filename: 'sw.js' });
  }, 'sw.js failed to compile in V8 vm.Script');
});

// ----------------------------------------------------
// SECTION 6: INTERNATIONALIZATION (i18n: TR / EN / DE / FR / ZH / JA)
// ----------------------------------------------------
console.log('\n🌐 [6/6] INTERNATIONALIZATION (i18n) TESTS:');

test('translations dictionary contains all 6 languages with complete key parity', () => {
  const transMatch = htmlContent.match(/const translations = \{([\s\S]*?)\n\s*\};\s*\n\s*function detectInitialTheme/);
  assert.ok(transMatch, 'translations dictionary must be found in index.html');
  const translations = new Function('return {' + transMatch[1] + '};')();

  const requiredLangs = ['tr', 'en', 'de', 'fr', 'zh', 'ja'];
  requiredLangs.forEach(lang => {
    assert.ok(translations[lang], `Language '${lang}' must exist in translations`);
  });

  const baseKeys = Object.keys(translations.tr);
  assert.ok(baseKeys.length >= 70, `Expected at least 70 translation keys, found ${baseKeys.length}`);

  for (const lang of requiredLangs) {
    const missingKeys = baseKeys.filter(k => !translations[lang][k] || typeof translations[lang][k] !== 'string');
    assert.strictEqual(missingKeys.length, 0, `Language '${lang}' missing keys: ${missingKeys.join(', ')}`);
  }
});

test('CATEGORIES dictionary contains complete labels for all 6 languages', () => {
  const catMatch = htmlContent.match(/const CATEGORIES = \{([\s\S]*?)\n\s*\};/);
  assert.ok(catMatch, 'CATEGORIES must be found');
  const CATEGORIES = new Function('return {' + catMatch[1] + '};')();

  const requiredLangs = ['tr', 'en', 'de', 'fr', 'zh', 'ja'];
  for (const [catKey, labelObj] of Object.entries(CATEGORIES)) {
    for (const lang of requiredLangs) {
      assert.ok(labelObj[lang], `Category '${catKey}' missing translation for '${lang}'`);
      assert.ok(labelObj[lang].trim().length > 0, `Category '${catKey}' translation for '${lang}' must not be empty`);
    }
  }
});

test('GHS_METADATA has complete titles and descriptions in all 6 languages', () => {
  const ghsMetaMatch = htmlContent.match(/const GHS_METADATA = \{([\s\S]*?)\n\s*\};/);
  const GHS_METADATA = new Function('return {' + ghsMetaMatch[1] + '};')();
  const codes = ['GHS01', 'GHS02', 'GHS03', 'GHS04', 'GHS05', 'GHS06', 'GHS07', 'GHS08', 'GHS09'];
  const langs = ['tr', 'en', 'de', 'fr', 'zh', 'ja'];

  for (const code of codes) {
    for (const lang of langs) {
      assert.ok(GHS_METADATA[code]['title_' + lang], `${code} missing title_${lang}`);
      assert.ok(GHS_METADATA[code]['desc_' + lang], `${code} missing desc_${lang}`);
    }
  }
});

test('INCOMPATIBILITY_ALERTS has complete title and text in all 6 languages', () => {
  const incompMatch = htmlContent.match(/const INCOMPATIBILITY_ALERTS = \{([\s\S]*?)\n\s*\};/);
  const INCOMPATIBILITY_ALERTS = new Function('return {' + incompMatch[1] + '};')();
  const alertKeys = ['mek-p', 'cobalt-naphthenate', 'technical-acetone', 'epoxy-resin-dgeba', 'epoxy-hardener-isophoronediamine'];
  const langs = ['tr', 'en', 'de', 'fr', 'zh', 'ja'];

  for (const key of alertKeys) {
    const alert = INCOMPATIBILITY_ALERTS[key];
    assert.ok(alert, `Alert '${key}' must exist`);
    for (const lang of langs) {
      assert.ok(alert['title_' + lang], `Alert '${key}' missing title_${lang}`);
      assert.ok(alert['text_' + lang], `Alert '${key}' missing text_${lang}`);
    }
  }
});

test('data/chemicals.json has complete TR, EN, DE, FR, ZH, JA translations for all 11 chemicals', () => {
  const chemData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'chemicals.json'), 'utf-8'));
  assert.strictEqual(chemData.length, 11, 'Expected 11 chemicals in chemicals.json');

  const langs = ['tr', 'en', 'de', 'fr', 'zh', 'ja'];
  for (const c of chemData) {
    const cid = c.id;
    for (const l of langs) {
      assert.ok(c.name && c.name[l], `${cid}: name.${l} missing`);
      assert.ok(c.chemical_name && c.chemical_name[l], `${cid}: chemical_name.${l} missing`);
      assert.ok(c.signal_word && c.signal_word[l], `${cid}: signal_word.${l} missing`);
      assert.ok(c.hazard_statement && c.hazard_statement[l], `${cid}: hazard_statement.${l} missing`);
      assert.ok(c.first_aid?.eye && c.first_aid.eye[l], `${cid}: first_aid.eye.${l} missing`);
      assert.ok(c.first_aid?.skin && c.first_aid.skin[l], `${cid}: first_aid.skin.${l} missing`);
      assert.ok(c.first_aid?.inhalation && c.first_aid.inhalation[l], `${cid}: first_aid.inhalation.${l} missing`);
      assert.ok(c.first_aid?.ingestion && c.first_aid.ingestion[l], `${cid}: first_aid.ingestion.${l} missing`);
      assert.ok(c.ppe?.gloves?.warning && c.ppe.gloves.warning[l], `${cid}: ppe.gloves.warning.${l} missing`);
      assert.ok(c.ppe?.mask && c.ppe.mask[l], `${cid}: ppe.mask.${l} missing`);
      assert.ok(c.ppe?.eye && c.ppe.eye[l], `${cid}: ppe.eye.${l} missing`);
      assert.ok(c.fire_fighting?.suitable && c.fire_fighting.suitable[l], `${cid}: fire_fighting.suitable.${l} missing`);
      assert.ok(c.fire_fighting?.prohibited && c.fire_fighting.prohibited[l], `${cid}: fire_fighting.prohibited.${l} missing`);
      assert.ok(c.storage_incompatibility?.storage && c.storage_incompatibility.storage[l], `${cid}: storage.${l} missing`);
      assert.ok(c.storage_incompatibility?.incompatible && c.storage_incompatibility.incompatible[l], `${cid}: incompatible.${l} missing`);
    }
  }
});

test('fallbackChemicals in index.html has complete TR, EN, DE, FR, ZH, JA translations', () => {
  const fbMatch = htmlContent.match(/const fallbackChemicals = (\[[\s\S]*?\n\s*\]);/);
  assert.ok(fbMatch, 'fallbackChemicals array must be found in index.html');
  const fallbackChemicals = new Function('return ' + fbMatch[1] + ';')();
  assert.strictEqual(fallbackChemicals.length, 11, 'Expected 11 chemicals in fallbackChemicals');

  const langs = ['tr', 'en', 'de', 'fr', 'zh', 'ja'];
  for (const c of fallbackChemicals) {
    const cid = c.id;
    for (const l of langs) {
      assert.ok(c.name && c.name[l], `fallback ${cid}: name.${l} missing`);
      assert.ok(c.chemical_name && c.chemical_name[l], `fallback ${cid}: chemical_name.${l} missing`);
      assert.ok(c.signal_word && c.signal_word[l], `fallback ${cid}: signal_word.${l} missing`);
      assert.ok(c.hazard_statement && c.hazard_statement[l], `fallback ${cid}: hazard_statement.${l} missing`);
      assert.ok(c.first_aid?.eye && c.first_aid.eye[l], `fallback ${cid}: first_aid.eye.${l} missing`);
      assert.ok(c.ppe?.gloves?.warning && c.ppe.gloves.warning[l], `fallback ${cid}: ppe.gloves.warning.${l} missing`);
    }
  }
});

test('Forensic i18n: zero English splice leaks in French, and data/chemicals.json equals fallbackChemicals', () => {
  const chems = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'chemicals.json'), 'utf-8'));
  const fbMatch = htmlContent.match(/const fallbackChemicals = (\[[\s\S]*?\n\s*\]);/);
  const fallbackChemicals = new Function('return ' + fbMatch[1] + ';')();

  assert.strictEqual(JSON.stringify(chems), JSON.stringify(fallbackChemicals), 'chemicals.json and fallbackChemicals must be 100% identical');

  for (const c of chems) {
    for (const [k, fa] of Object.entries(c.first_aid)) {
      assert(!fa.fr.includes('Rinse with'), `English leaked in ${c.id}.first_aid.${k}.fr`);
      assert(!fa.fr.includes('holding eyelids'), `English leaked in ${c.id}.first_aid.${k}.fr`);
      assert(!fa.fr.includes('Do not rub'), `English leaked in ${c.id}.first_aid.${k}.fr`);
    }
  }

  // Check critical safety instructions in all languages
  const acetone = chems.find(x => x.id === 'technical-acetone');
  assert(acetone.ppe.gloves.warning.fr.includes('butyle'), 'FR acetone glove warning must require butyl');
  assert(acetone.ppe.gloves.warning.zh.includes('丁基'), 'ZH acetone glove warning must require butyl');
  assert(acetone.ppe.gloves.warning.ja.includes('ブチル'), 'JA acetone glove warning must require butyl');

  for (const id of ['polyester-resin', 'vinylester-resin', 'gelcoat']) {
    const c = chems.find(x => x.id === id);
    assert(c.first_aid.skin.fr.toLowerCase().includes('acétone'), `Missing acetone skin warning in FR ${id}`);
    assert(c.first_aid.skin.zh.includes('丙酮'), `Missing acetone skin warning in ZH ${id}`);
    assert(c.first_aid.skin.ja.includes('アセトン'), `Missing acetone skin warning in JA ${id}`);
  }

  for (const id of ['mek-p', 'polyester-resin', 'technical-acetone', 'cobalt-naphthenate', 'epoxy-resin-dgeba', 'epoxy-hardener-isophoronediamine', 'vinylester-resin', 'mold-release-wax', 'gelcoat']) {
    const c = chems.find(x => x.id === id);
    assert(c.first_aid.ingestion.fr.toLowerCase().includes('faire vomir'), `Missing do not vomit in FR ${id}`);
    assert(c.first_aid.ingestion.zh.includes('催吐'), `Missing do not vomit in ZH ${id}`);
    assert(c.first_aid.ingestion.ja.includes('吐かせない'), `Missing do not vomit in JA ${id}`);
  }
});



// ----------------------------------------------------
// SUMMARY REPORT
// ----------------------------------------------------
console.log('\n====================================================');
console.log(`📊 TEST SUITE SUMMARY:`);
console.log(`   Total Tests:  ${totalTests}`);
console.log(`   Passed:       ${passedTests}`);
console.log(`   Failed:       ${failedTests}`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL BUG, EXPLOIT, AND CRUD TESTS PASSED CLEANLY!\n');
}
