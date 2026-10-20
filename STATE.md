# MSDS-Lite Durum Raporu (STATE.md)

## Surum: v1.9.1
## Tarih: 2026-10-21
## Hedef: TURKCOMPOSITE Fuari Uluslararasi Ziyaretci Destegi & Adli i18n Denetimi (TR / EN / DE / FR / ZH / JA)

---

## Tamamlanan Calismalar

1. **Arayuz ve UI Sozlugu (translations)**:
   - `index.html` icindeki `translations` sozlügüne Fransizca (fr), Cince Basitlestirilmis (zh) ve Japonca (ja) cevirileri eklendi.
   - TR, EN, DE, FR, ZH, JA dilleri arasinda 100% anahtar paritesi saglandi (~100 UI terimi x 6 dil).
   - Dil degistirme butonlari (`.lang-btn[data-lang="x"]`) topbar'a yerlestirildi ve mobil ekranlar icin stil optimizasyonu yapildi (`max-width: 640px`).

2. **Kanonik Veri Dosyasi (data/chemicals.json) & Adli Duzeltmeler (v1.9.1)**:
   - 8 kimyasalda `first_aid.eye.fr` alanina yapismis bozuk Ingilizce cumleler ayiklanip kusursuz Fransizcaya donusturuldu.
   - `vinylester-resin.badges.health.fr` alanindaki Turkce sizinti ("Stiren Buharı / Nörotoksisite") giderilerek "Vapeur de Styrène / Neurotoxique" yapildi.
   - 10 kimyasalda (polyester, aseton, karbon tozu, kobalt naftenat, epoksi recine, izoforondiamin, vinilester, PVA, vakslar, jelkot) generic sablonlar yerine tibbi ve GHS standartlarina uygun net direktifler yerlestirildi:
     * Asindirici ve hidrokarbonlarda hayati "KUSTURMAYIN / DO NOT INDUCE VOMITING / NE PAS FAIRE VOMIR / 切勿催吐 / 吐かせないこと" uyarilari tum dillerde eksiksiz saglandi.
     * Recinelerde (polyester, vinilester, jelkot, epoksi) "Cilde aseton surmeyin" uyarisi FR, ZH, JA'ya islendi.
     * Asetonda ince nitril ve lateksin eridigi ve butil kaucuk eldivenin zorunlu oldugu FR, ZH, JA'da guvenceye alindi.
     * Karbon tozu icin gozu ve cildi ovusturmama uyarilari ve iletken toz kisa devre tehlikeleri eksiksiz cevrildi.

3. **Cevrimdisi Fallback Dizisi (fallbackChemicals)**:
   - `index.html` icindeki `fallbackChemicals` dizisi yeni `data/chemicals.json` ile birebir senkronize edildi.

4. **GHS Piktogram ve Uyusmazlik Panelleri**:
   - `GHS_METADATA` piktogram sozlugune (GHS01 - GHS09) Fransizca, Cince ve Japonca baslik ve aciklamalar eklendi.
   - `INCOMPATIBILITY_ALERTS` kritik uyusmazlik uyari kartlarina FR, ZH ve JA cevirileri eklendi.

5. **Test Paketi ve Otomasyon (test_msds_suite.js)**:
   - Adli i18n parite ve tibbi guvenlik testleri eklenerek test sayisi 27'ye cikarildi. 27 testin 27'si de basariyla gecti.

6. **Canli Tarayici Dogrulamasi (Edge CDP)**:
   - Headless tarayici uzerinde canli DOM, 6 dilli gecisler ve drawer acilislari sifir konsol hatasi ile test edildi.

7. **Surum Guncellemesi (v1.9.1)**:
   - `sw.js` (Cache adi: `msds-lite-v1.9.1`), `STATE.md` guncellendi.
