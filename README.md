# MSDS-Lite: Kompozit ve Tekne İmalat Atölyesi İSG Asistanı

Bu proje; kompozit tekne imalat atölyelerinde (infüzyon, el yatırması, vakum torbalama ve kalıphane) kullanılan tehlikeli kimyasallarla çalışırken hayat kurtarabilecek, mobil odaklı ve çevrimdışı (offline) çalışabilen hızlı bir iş sağlığı ve güvenliği (İSG) rehberidir.

Fiber tekne ve kompozit teknolojileri öğrencisi olarak, atölyedeki ve stajdaki kişisel deneyimlerimden yola çıkarak; sahada çalışan laminasyon ustaları, teknisyenler ve öğrencilerin kimyasal kazalarda doğru bilgiye saniyeler içinde ulaşabilmesi için bu projeyi geliştirdim.

> **Canlı Uygulama:** https://erdmsn77.github.io/msds-lite/  
> **Önemli Not:** Bu uygulama üretici güvenlik bilgi formlarının (SDS/MSDS) yerine geçmez; acil durumlarda kullanılabilecek atölye içi hızlı saha referansı niteliğindedir.

---

## Neden Geliştirildi?

Kompozit ve yat atölyelerinde çalışan kişilerin elleri çoğunlukla eldivenli, reçineli veya tozludur. Sayfalarca süren teknik SDS PDF'lerini o şartlarda cep telefonundan okumak imkansızdır. Ayrıca bir kaza anında (örneğin göze MEK-P sıçraması) saniyeler çok değerlidir.

1. **Hızlı Erişim:** Kimyasalları kategoriye (Reçine, Peroksit, Solvent vb.) göre tek dokunuşla filtreleyebilmek veya arayabilmek.
2. **GHS Piktogramları:** Kimyasalın risk seviyesini ve tehlike kodlarını (Alev, Aşındırıcı, Toksik vb.) uluslararası standart kırmızı baklava sembolleriyle görsel olarak hemen anlamak.
3. **Kritik Uyuşmazlık Uyarıları:** Atölyedeki tehlikeli hataları (MEK-P ile Kobalt hızlandırıcının asla doğrudan karıştırılmaması veya reçine bulaşan cildin asetonla yıkanmaması gibi kuralları) en başta görmek.
4. **Doğru KKD Seçimi:** Maske filtresi (A2, P3 vb.) ve eldiven tipinin (lateks, nitril, bütil) kimyasalla uyumlu olup olmadığını kontrol etmek.
5. **Sesli & Titreşimli Göz Yıkama Sayacı:** Maruziyet durumunda standart 10 veya 15 dakikalık yıkama süresini başlatıp, gürültülü atölye ortamında süre bittiğinde sesli ve titreşimli uyarı alabilmek.

---

## Öne Çıkan Özellikler

* **Karanlık & Yüksek Kontrastlı Tasarım:** Atölye ışığında ve mobil ekranda kolay okunur, sade ve göz yormayan arayüz.
* **Sıfır Dış Bağımlılık:** Harici CSS kütüphanesi veya CDN yükü yoktur; saf HTML, optimize CSS ve Vanilla JS ile anında açılır.
* **Tam Çevrimdışı Çalışma (PWA):** Service Worker sayesinde internet bağlantısı olmayan atölye veya tersane sahalarında da sorunsuz çalışır.
* **Üç Dilli Arayüz (TR / EN / DE):** Dil tercihi cihaz hafızasında tutulur. Almanya ve Avrupa'daki staj/çalışma alanları için özel olarak eklendi.
* **Doğrudan Link Desteği (Deep-Linking):** URL sonuna kimyasal ID'si eklenerek (örneğin `/#mek-p`) doğrudan ilgili kimyasal kartı açılabilir.

---

## Kimyasal Kapsamı

Şu anda atölyede en sık kullanılan 11 temel kimyasal ve malzeme yer almaktadır:

| Kimyasal Adı | Kategori | Risk Seviyesi | Kritik Önlem / İkaz |
|---|---|---|---|
| **MEK-P** | Peroksit | KRİTİK | Kobalt hızlandırıcı ile asla doğrudan karıştırılamaz (şiddetli patlama/yangın riski). |
| **Kobalt Naftenat** | Hızlandırıcı | KRİTİK | Peroksitlerden ayrı dolapta saklanmalıdır; doğrudan temasta alev alır. |
| **Ortoftalik Polyester Reçine** | Reçine | YÜKSEK | Stiren içerir; cildi reçineden arındırmak için aseton sürülmemelidir. |
| **Vinilester Reçine** | Reçine | YÜKSEK | Uygun organik buhar maskesi (A2) ve nitril eldiven gerektirir. |
| **Epoksi Reçine (DGEBA)** | Reçine | YÜKSEK | Cilt hassaslaştırıcıdır; tekrarlayan temas alerjiye yol açar. |
| **Epoksi Sertleştirici (IPDA)** | Sertleştirici | KRİTİK | Aşındırıcı amin içerir; derin kapta karıştırıldığında termal kaçak (aşırı ısınma) riski vardır. |
| **Teknik Aseton** | Solvent | ORTA | Parlama noktası çok düşüktür (-17°C); ciltteki reçineyi temizlemek için kullanılmamalıdır. |
| **Karbon Elyaf Tozu** | Toz & Elyaf | YÜKSEK | P3/FFP3 partikül maskesi ve toz gözlüğü şarttır; süpürülmemeli, emilmelidir. |
| **Gelcoat** | Reçine | YÜKSEK | Pigmentli polyester içerir; iyi havalandırma şarttır. |
| **PVA Ayırıcı Ajan** | Kalıp Ayırıcı | ORTA | Alkol taşıyıcı içerebilir; açık alevden uzak tutulmalıdır. |
| **Kalıp Cilası / Wax** | Kalıp Ayırıcı | ORTA | Petrol distilatı içerir; solvent dumanına karşı havalandırma gerekir. |

---

## Kurulum ve Yerel Çalıştırma

Uygulama statik dosyalardan oluştuğu için herhangi bir paket yöneticisi (npm/yarn) kurulumu gerektirmez.

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/erdmsn77/msds-lite.git
   cd msds-lite
   ```
2. Yerel bir HTTP sunucusu başlatın (Service Worker'ın çalışabilmesi için gereklidir):
   ```bash
   python -m http.server 4173
   ```
3. Tarayıcınızda açın:
   ```
   http://localhost:4173/index.html
   ```

---

## Telefonda Kullanım ve PWA Kurulumu

Canlı adresi açın: `https://erdmsn77.github.io/msds-lite/`

* **Android / Chrome:** Menüden (üç nokta) **"Ana ekrana ekle"** veya **"Uygulamayı yükle"** seçeneğine basın.
* **iPhone / Safari:** Paylaş menüsünden **"Ana Ekrana Ekle"** seçeneğini seçin.

---

## Veri Güvenliği ve Senkron Kuralı

* Kimyasal verileri `data/chemicals.json` dosyası ile `index.html` içerisindeki `fallbackChemicals` dizisinde birebir aynı tutulur. Bu kural, uygulamanın doğrudan `file://` üzerinden açıldığında da hatasız çalışmasını sağlar.
* Üretici SDS'i doğrulanmamış hiçbir teknik değer tahminle yazılmaz; doğrulama durumu not olarak belirtilir.

---

## Lisans

Bu proje açık kaynak olarak paylaşılmıştır. Gerçek atölye ortamında kullanmadan önce kurum içi İSG kurallarınızı kontrol ediniz.
