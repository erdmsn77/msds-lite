# MSDS-Lite Atölye İSG

Kompozit ve tekne imalat atölyelerinde kullanılan kimyasallar için hızlı güvenlik kartları sunan mobil odaklı bir Progressive Web App (PWA).

## Canlı Kullanım

Uygulama HTTPS üzerinden yayınlandığında telefonda tarayıcı menüsünden ana ekrana eklenebilir. Service Worker ve offline cache yalnızca `localhost` veya HTTPS üzerinde çalışır; `file://` açılışında çalışmaz.

## Özellikler

- 11 kimyasal için kompakt saha envanteri
- Sağdan açılan detay drawer'ı ve TR/EN dil geçişi
- GHS tehlike kodları ve risk seviyesi kartları
- Parlama noktası ve acil yıkama süresi
- Maske, gözlük ve lateks/nitril/bütil eldiven uyumluluk matrisi
- Göz, cilt ve solunum ilk yardım protokolleri
- Başlat/durdur/devam ettir/sıfırla özellikli acil yıkama sayacı
- Service Worker ile çevrimdışı uygulama kabuğu
- `file://` kullanımında CORS sorununu önleyen fallback veri dizisi

## Yerel Çalıştırma

Service Worker ve JSON veri yüklemesini test etmek için proje klasöründe:

```powershell
python -m http.server 4173
```

Ardından `http://localhost:4173/index.html` adresini açın.

## Veri Mimarisi

Kimyasal verisi iki yerde senkron tutulur:

- `data/chemicals.json`: HTTP/HTTPS ortamındaki kanonik veri kaynağı
- `index.html` içindeki `fallbackChemicals`: `file://` ortamı için yerel fallback

Bir kayıt değiştirildiğinde iki kaynak aynı anda güncellenmelidir. Veri şeması ve kontrol listesi için [AI_AGENT_CONTEXT.md](AI_AGENT_CONTEXT.md) dosyasına bakın.

## PWA Dosyaları

- `manifest.json`: Uygulama adı, tema ve ikon tanımları
- `sw.js`: `msds-lite-v1.1.1-language-emergency-fix` cache sürümü ve offline fallback
- `icons/`: any ve maskable SVG ikonları

## Güvenlik ve İSG Notu

Bu uygulama hızlı hatırlatma arayüzüdür; üretici SDS’inin, kurum prosedürlerinin veya yetkili İSG değerlendirmesinin yerine geçmez. Ürün formülasyonuna bağlı bilgiler ilgili üretici SDS’i ile doğrulanmalıdır.

Kullanıcı veya JSON kaynaklı metinler HTML’e basılmadan önce kaçışlanır ve dış JSON temel şema doğrulamasından geçirilir.

## Yayınlama

Repository GitHub’a gönderildikten sonra `.github/workflows/deploy-pages.yml` workflow’u GitHub Pages yayınını otomatikleştirir. Repository ayarlarında Pages kaynağı olarak **GitHub Actions** seçilmelidir.

## Gelecek Geliştirmeler

- PNG ikonlar ve iOS uyumluluk testi
- Playwright smoke testleri
- GitHub Actions içinde JSON senkronizasyon kontrolü
- Ürün/SDS kaynağı ve güncelleme tarihi alanları
- Büyük yazı ve acil durum erişilebilirlik modu
