# MSDS-Lite Atölye İSG

Kompozit ve tekne imalat atölyeleri için hızlı, mobil öncelikli ve çevrimdışı çalışabilen kimyasal güvenlik asistanı. Uygulama; GHS kodlarını, KKD gereksinimlerini, ilk yardım protokollerini, kaynak doğrulamasını ve acil yıkama sayacını tek bir saha ekranında sunar.

> **Canlı demo:** https://erdmsn77.github.io/msds-lite/

> **Güvenlik sınırı:** Bu proje üretici SDS'inin, kurum prosedürlerinin veya yetkili İSG değerlendirmesinin yerine geçmez. Gerçek kullanım öncesinde her ürünün güncel SDS'i ve işyeri risk değerlendirmesi kontrol edilmelidir.

## Projenin Amacı

Atölyede çalışan veya eğitim alan bir kişinin:

1. Kimyasalı hızlıca seçmesi,
2. Risk ve GHS kodlarını görmesi,
3. Maske, gözlük ve eldiven gereksinimini kontrol etmesi,
4. Göz/cilt/solunum maruziyetinde ilk yardım adımlarına ulaşması,
5. Doğru süreyle acil yıkama sayacını başlatması

hedeflenir. Uygulama kurumsal bir SDS yönetim platformu değil; küçük kompozit atölyeleri, eğitim atölyeleri ve öğrenciler için hızlı bir saha referansıdır.

## Mevcut Özellikler

- 11 kimyasal için kompakt envanter listesi
- Karbon/industrial mobil arayüz
- Kimyasal satırına tıklayınca sağdan açılan detay drawer'ı
- Drawer sekmeleri: Özet, KKD, İlk yardım, Kaynak
- TR/EN arayüz dil geçişi; seçim `localStorage` ile hatırlanır
- Acil erişim kısayolları: göz teması, cilt teması, solunum ve yıkama sayacı
- Kimyasal seçilmeden acil kısayolların rastgele bir kimyasal açmaması
- GHS tehlike kodları ve KRİTİK/YÜKSEK/ORTA risk seviyeleri
- Parlama noktası ve acil yıkama süresi
- Maske, gözlük ve lateks/nitril/bütil eldiven uyumluluk matrisi
- Göz, cilt ve solunum ilk yardım protokolleri
- Sayaç başlatma, durdurma/devam ettirme ve sıfırlama
- Kaynak, doğrulama tarihi, doğrulama durumu ve kapsam notu
- Service Worker ile offline uygulama kabuğu
- `file://` açılışında CORS sorununu önleyen fallback veri dizisi

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
- Tailwind CDN prototip için kullanılmıştır; üretimde yerel Tailwind derlemesi ve CSP tercih edilmelidir.

## Gelecek Geliştirmeler

- PNG ikonlar ve iOS uyumluluk testi
- Playwright smoke testleri
- GitHub Actions içinde otomatik JSON/fallback senkron kontrolü
- Büyük yazı ve acil durum erişilebilirlik modu
- Üretici SDS PDF bağlantıları ve periyodik doğrulama akışı
- QR kod ile doğrudan kimyasal drawer'ı açma

## Lisans ve Katkı

Proje açık kaynak geliştirme ve portföy amacıyla sürdürülmektedir. Güvenlik verisi ekleyen katkılar için üretici SDS kaynağı, doğrulama tarihi ve kapsam notu belirtilmelidir.
