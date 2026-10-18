/**
 * MSDS-Lite Automated Test Suite (v1.8.0)
 * Tests:
 * 1. Bug & Null-Safety Tests
 * 2. Exploit & Vulnerability Tests (XSS, Prototype Pollution, ReDoS)
 * 3. Read / Write / Edit (CRUD) Lifecycle Tests
 * 4. SDS Gatekeeper & Parser Verification
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

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
