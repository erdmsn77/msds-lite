# MSDS-Lite Atölye İSG

[![Deploy to GitHub Pages](https://github.com/erdmsn77/msds-lite/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/erdmsn77/msds-lite/actions/workflows/deploy-pages.yml)
![PWA Ready](https://img.shields.io/badge/PWA-Ready%20%26%20Offline-10b981?logo=pwa&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Vanilla)-ff7828)
![Version](https://img.shields.io/badge/Version-v1.2.0%20Marine%20Pro-38bdf8)

Kompozit ve tekne imalat atölyeleri (infüzyon, el yatırması, vakum torbalama, kalıphane) için hızlı, mobil öncelikli ve çevrimdışı çalışabilen kimyasal güvenlik asistanı. 

Uygulama; GHS piktogramlarını, KKD gereksinimlerini, ilk yardım protokollerini, kritik atölye uyuşmazlık ikazlarını, kaynak doğrulamasını ve sesli/titreşimli acil yıkama sayacını tek bir sahada kullanım ekranında sunar.

> 🌐 **Canlı Uygulama:** https://erdmsn77.github.io/msds-lite/  
> ⚠️ **Güvenlik Sınırı:** Bu proje üretici SDS'inin, resmi kurum prosedürlerinin veya yetkili İSG değerlendirmesinin yerine geçmez. Gerçek atölye kullanımı öncesinde her ürünün güncel üretici SDS'i ve işyeri risk değerlendirmesi kontrol edilmelidir.

## Projenin Amacı

Atölyede çalışan laminasyon ustaları, teknisyenler veya kompozit tekne imalatı öğrencilerinin:

1. Kimyasala **tek dokunuşla veya hızlı aramayla** ulaşması,
2. Risk seviyesini ve uluslararası standart **GHS tehlike piktogramlarını** görmesi,
3. **MEK-P & Kobalt** gibi ölümcül yangın/patlama uyuşmazlıklarını anında fark etmesi,
4. Maske, gözlük ve **lateks / nitril / bütil eldiven uyumluluğunu** kontrol etmesi,
5. Göz / cilt maruziyetinde ilk yardım protokollerine (özellikle reçinede aseton kullanmama kuralına) hızla ulaşması,
6. Doğru süreyle acil göz/cilt yıkama sayacını başlatması ve süre bittiğinde **sesli & titreşimli alarm** alması

hedeflenir.

## Arayüz & Teknik Özellikler ("Marine Composite Pro")

- **Modern Yat & Kompozit Arayüzü:** Derin mat antrasit/titanyum zeminler, denizci emniyet turuncusu (`#ff7828`) ve yüksek kontrastlı marine gösterge dili.
- **Sıfır Bağımlılık (Zero Dependencies):** Harici CDN, Tailwind veya JS framework yükü yoktur; saf, optimize edilmiş Vanilla CSS ve modern HTML5/JS ile anında açılır.
- **Atölye Ergonomisi:** Eldivenli ellerle dahi kolayca basılabilen büyük 1-dokunuş kategori filtre çipleri (`Tümü`, `Peroksit`, `Reçine`, `Solvent`, `Hızlandırıcı`, `Sertleştirici`, `Toz & Elyaf`, `Kalıp Ayırıcı`).
- **Anlık Akıllı Arama:** Ticari ad (MEK-P, Jelkot), teknik ad (Stiren, DGEBA), kategori ve CAS numaralarına duyarlı anlık arama ve tek dokunuşla temizleme (✕).
- **GHS Kırmızı Baklava Vektör Piktogramları:** Alev (GHS02), Aşındırıcı (GHS05), Toksik (GHS06) ve Zararlı (GHS07) için net SVG sembolleri.
- **Kritik Uyuşmazlık İkaz Paneli:**
  - *MEK-P & Kobalt:* Doğrudan karıştırma yasağı, şiddetli ekzotermik patlama uyarısı.
  - *Reçine & Aseton:* Cilt temizliğinde aseton kullanmama, ılık sabunlu su kullanma kuralı.
  - *Epoksi Reaksiyonu:* Kütlesel termal kaçak (exotherm) yangın riski.
- **Akıllı Yıkama Sayacı:** Sayacı başlatma, durdurma ve sıfırlama; süre bittiğinde **Web Audio API** ile elektronik alarm, mobil cihazlarda **titreşim (`navigator.vibrate`)** ve acil durum görsel flaşı.
- **Detay Çekmecesi (Drawer):** 4 sekme (Özet, KKD, İlk yardım, Kaynak).
- **İki Dilli (TR / EN):** Tam Türkçe ve İngilizce arayüz desteği; dil seçimi `localStorage` ile cihazda hatırlanır.
- **Deep-Linking (Doğrudan Link):** URL hash desteği (`/#mek-p`, `/#technical-acetone`) ile doğrudan kimyasal kartı açılabilir.
- **PWA & Tam Çevrimdışı Çalışma:** Service Worker ile internet olmadan sahada kesintisiz çalışır.
- **Çift Senkron Veri Güvencesi:** `file://` açılışında CORS sorununu önleyen `fallbackChemicals` ile `data/chemicals.json` 1:1 senkronizedir.

### Sayaç davranışı

- `Sayacı başlat`: Sayaç çalışmaya başlar ve düğme `Sayacı durdur` olur.
- `Sayacı durdur`: Mevcut süre korunur.
- Tekrar başlatma: Kaldığı yerden devam eder.
- `Sıfırla`: Seçili kimyasalın `emergency_timer_min` değerine döner.
- Süre bittiğinde sayaç durur; yeniden kullanılmadan önce sıfırlanabilir.

## Kimyasal Kapsamı

1. MEK-P
2. Ortoftalik Polyester Reçine
3. Teknik Aseton
4. Karbon Elyaf Tozu
5. Kobalt Naftenat
6. Epoksi Reçine
7. Epoksi Sertleştirici
8. Vinilester Reçine
9. PVA Ayırıcı Ajan
10. Kalıp Cilası/Wax
11. Gelcoat

Ürün formülasyonuna bağlı kayıtlar için ana bileşen bilgisi tam ürün SDS'i gibi sunulmaz. Ürün SDS'i olmayan alanlarda doğrulama durumu açıkça belirtilir; teknik değerler tahmin edilmemelidir.

## Dosya Yapısı

```text
msds-lite/
├── index.html
├── data/
│   └── chemicals.json
├── manifest.json
├── sw.js
├── icons/
│   ├── icon.svg
│   └── icon-maskable.svg
├── .github/workflows/
│   └── deploy-pages.yml
├── AI_AGENT_CONTEXT.md
└── README.md
```

- `index.html`: Arayüz, CSS, uygulama mantığı ve `fallbackChemicals`.
- `data/chemicals.json`: HTTP/HTTPS ortamında kullanılan kanonik veri.
- `manifest.json`: PWA adı, renkleri, kapsamı ve ikonları.
- `sw.js`: Offline cache ve ağ/cache fallback stratejisi.
- `deploy-pages.yml`: GitHub Pages deployment workflow'u.
- `AI_AGENT_CONTEXT.md`: Başka bir AI ajanı için teknik çalışma sözleşmesi.

## Kritik Veri Senkron Kuralı

Kimyasal verileri iki yerde tutulur ve birebir aynı kalmalıdır:

1. `data/chemicals.json`
2. `index.html` içindeki `fallbackChemicals`

Bir kimyasal eklenir, silinir veya değiştirilirse iki kaynak aynı anda güncellenmelidir. Şema ayrıntıları için [AI_AGENT_CONTEXT.md](./AI_AGENT_CONTEXT.md) okunmalıdır.

## Yerel Çalıştırma

`file://` açılışı arayüzü gösterebilir ancak Service Worker ve JSON fetch test edilemez. PWA davranışını test etmek için Python ile yerel HTTP sunucusu başlatın:

```powershell
cd C:\Users\PC\Desktop\msds-lite
python -m http.server 4173
```

Sonra şu adresi açın:

```text
http://localhost:4173/index.html
```

## Telefonda Kullanım ve PWA Kurulumu

Canlı HTTPS adresini açın:

```text
https://erdmsn77.github.io/msds-lite/
```

### Android / Chrome

1. Adresi Chrome'da açın.
2. Üç nokta menüsünü açın.
3. **Ana ekrana ekle** veya **Uygulamayı yükle** seçeneğini seçin.
4. Onaylayın.

### iPhone / Safari

1. Adresi Safari'de açın.
2. Paylaş menüsünü açın.
3. **Ana Ekrana Ekle** seçeneğine basın.
4. **Ekle** ile onaylayın.

`file:///...` adresi PWA kurulumu için kullanılmamalıdır. Güncelleme sonrası eski Service Worker cache'i görülürse siteyi kapatıp yeniden açın; gerekirse PWA'yı kaldırıp tekrar kurun.

## Yayınlama

`main` branch'e push yapıldığında `.github/workflows/deploy-pages.yml` otomatik çalışır. GitHub repository ayarlarında Pages kaynağı **GitHub Actions** olmalıdır.

Workflow durumu:

https://github.com/erdmsn77/msds-lite/actions

## Doğrulama Kontrolü

PowerShell ile JSON ve kayıt sayısını kontrol edin:

```powershell
$data = Get-Content -Raw -Encoding UTF8 .\data\chemicals.json | ConvertFrom-Json
$data.Count
($data.id | Sort-Object -Unique).Count
git status --short
```

Değişiklik sonrası kontrol listesi:

- JSON parse ediliyor mu?
- ID'ler benzersiz mi?
- JSON ve `fallbackChemicals` aynı kayıtları içeriyor mu?
- Kimyasal satırına tıklayınca drawer açılıyor mu?
- Başlık veya boş alana tıklayınca drawer açılmıyor mu?
- TR/EN değişimi kapalı drawer'ı açmadan çalışıyor mu?
- Acil erişim kimyasal seçilmeden varsayılan bir kimyasal açıyor mu?
- Sayaç başlat/durdur/devam/sıfırla akışı çalışıyor mu?
- HTML/JavaScript diagnostic hatası var mı?
- PWA HTTPS/localhost üzerinde Service Worker kaydediyor mu?

## Güvenlik ve Veri Kalitesi

- Kullanıcı veya JSON kaynaklı metinler HTML'e basılmadan önce kaçışlanır.
- Dış JSON temel şema doğrulamasından geçirilir.
- GHS kodları `GHS` + iki rakam formatında doğrulanır.
- `source_url` yalnızca HTTPS kaynakları için kabul edilir.
- Ürün SDS'i olmayan ürünlerde kesin teknik değer uydurulmaz.
- Kobalt Naftenat için MEKP/peroksitlerle karıştırmama ve ayrı depolama uyarısı korunmalıdır.
- Harici CDN/CSS bağımlılığı kaldırılmış, saf optimize CSS mimarisi ve CSP uyumlu yapı benimsenmiştir.

## Gelecek Geliştirmeler

- PNG ikonlar ve iOS uyumluluk testi
- Playwright smoke testleri
- GitHub Actions içinde otomatik JSON/fallback senkron kontrolü
- Büyük yazı ve acil durum erişilebilirlik modu
- Üretici SDS PDF bağlantıları ve periyodik doğrulama akışı
- QR kod ile doğrudan kimyasal drawer'ı açma

## Lisans ve Katkı

Proje açık kaynak geliştirme ve portföy amacıyla sürdürülmektedir. Güvenlik verisi ekleyen katkılar için üretici SDS kaynağı, doğrulama tarihi ve kapsam notu belirtilmelidir.
