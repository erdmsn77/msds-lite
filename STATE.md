# MSDS-Lite Durum Raporu (STATE.md)

## Surum: v1.9.2
## Tarih: 2026-10-21
## Hedef: TURKCOMPOSITE Fuari Uluslararasi Ziyaretci Destegi & Adli i18n Denetimi (TR / EN / DE / FR / ZH / JA)

---

## Tamamlanan Calismalar

1. **Arayuz ve UI Sozlugu (translations)**:
   - `index.html` icindeki `translations` sozlügüne Fransizca (fr), Cince Basitlestirilmis (zh) ve Japonca (ja) cevirileri eklendi.
   - TR, EN, DE, FR, ZH, JA dilleri arasinda 100% anahtar paritesi saglandi (~100 UI terimi x 6 dil).
   - Dil degistirme butonlari (`.lang-btn[data-lang="x"]`) topbar'a yerlestirildi ve mobil ekranlar icin stil optimizasyonu yapildi (`max-width: 640px`).

2. **SDS Ice Aktar Butonunun Gizlenmesi (Fuar Sunum Modu)**:
   - `index.html` `.search-row` sablonundan `#sdsImportTriggerBtn` arayuzden gizlendi.
   - Arama kutusu tam genislige yayılarak arayuz daha ferah ve odaklanmis hale getirildi.
   - SDS parser ve modal motoru kod tabaninda gelecekteki kullanim icin guvenle saklandi.

3. **CAS Numarasi ve Bilesen Tercumeleri (v1.9.2 Duzeltmesi)**:
   - Kartlarda ve detay cekmecesinde yer alan CAS rozetlerindeki Turkce bilesen aciklamalari ("Stiren", "Karbon", "Karnauba", "İPA") 6 dile gore tam yerellestirildi:
     * Polyester & Vinilester & Jelkot: TR "Stiren", EN "Styrene", DE "Styrol", FR "Styrène", ZH "苯乙烯", JA "スチレン"
     * Karbon Elyaf Tozu: TR "Karbon", EN "Carbon", DE "Kohlenstoff", FR "Carbone", ZH "碳", JA "炭素"
     * Kalip Agdasi: TR "Karnauba", EN/DE/FR "Carnauba", ZH "巴西棕榈蜡", JA "カルナバ蝋"
     * PVA Kalip Ayirici: Bozuk karakter temizlenerek TR "İPA", EN/DE/FR/ZH/JA "IPA" yapildi.
   - Arama fonksiyonu (`#searchInput`), kullanicilarin kendi dillerindeki CAS bilesen adlariyla (orn. "Styrene", "炭素", "Styrol") arama yapabilmesi icin genisletildi.
   - `index.html` render sablonlarinda `chem.cas` yerine `getL(chem.cas)` entegrasyonu tamamlandi.
   - `data/chemicals.json` ve `fallbackChemicals` birebir senkronize edildi.

4. **Kanonik Veri Dosyasi (data/chemicals.json) & Adli Duzeltmeler**:
   - 8 kimyasalda `first_aid.eye.fr` alanina yapismis bozuk Ingilizce cumleler ayiklanip kusursuz Fransizcaya donusturuldu.
   - `vinylester-resin.badges.health.fr` alanindaki Turkce sizinti ("Stiren Buharı / Nörotoksisite") giderilerek "Vapeur de Styrène / Neurotoxique" yapildi.
   - 10 kimyasalda tibbi ve GHS standartlarina uygun net direktifler yerlestirildi:
     * Asindirici ve hidrokarbonlarda hayati "KUSTURMAYIN / DO NOT INDUCE VOMITING / NE PAS FAIRE VOMIR / 切勿催吐 / 吐かせないこと" uyarilari tum dillerde eksiksiz saglandi.
     * Recinelerde "Cilde aseton surmeyin" uyarisi FR, ZH, JA'ya islendi.
     * Asetonda ince nitril ve lateksin eridigi ve butil kaucuk eldivenin zorunlu oldugu FR, ZH, JA'da guvenceye alindi.
     * Karbon tozu icin gozu ve cildi ovusturmama uyarilari ve iletken toz kisa devre tehlikeleri eksiksiz cevrildi.

5. **Test Paketi ve Otomasyon (test_msds_suite.js)**:
   - CAS diller arasi parite ve Turkce sizinti denetimleri eklendi.
   - 27 testin 27'si de basariyla gecti.

6. **Canli Tarayici Dogrulamasi (Edge CDP)**:
   - Headless Microsoft Edge motorunda 6 dilde kartlar, cekmeceler ve arama fonksiyonu canli test edildi.

7. **Surum Guncellemesi (v1.9.2)**:
   - `sw.js` (Cache adi: `msds-lite-v1.9.2`), `index.html` footer ve cache guncellendi.

