# MSDS-Lite: Kompozit ve Tekne İmalat Atölyesi İSG Asistanı

> **Saha Odaklı, Çevrimdışı Çalışabilen (Offline-First) Mobil Kimyasal Güvenlik ve Acil Müdahale Asistanı**

[ Türkçe ](README.md) • [ English ](README.en.md) • [ Deutsch ](README.de.md)

[![Version](https://img.shields.io/badge/Version-v1.9.0-orange?style=flat-square)](https://github.com/erdmsn77/msds-lite/releases)
[![Deploy](https://img.shields.io/github/actions/workflow/status/erdmsn77/msds-lite/deploy-pages.yml?branch=main&style=flat-square&label=Deploy&color=success)](https://github.com/erdmsn77/msds-lite/actions/workflows/deploy-pages.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-22d3ee?style=flat-square&logo=pwa)](https://erdmsn77.github.io/msds-lite/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-emerald?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![Languages](https://img.shields.io/badge/Languages-6%20Dilli%20(TR%20%7C%20EN%20%7C%20DE%20%7C%20FR%20%7C%20ZH%20%7C%20JA)-blue?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Open-yellow?style=flat-square)](LICENSE)

---

<p align="center">
  <img src="docs/preview-mockup.jpg" alt="MSDS-Lite Saha Asistanı Önizleme" width="100%" style="border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.12);" />
</p>

<p align="center">
  <a href="https://erdmsn77.github.io/msds-lite/">
    <img src="icons/qr-code.svg" width="130" height="130" alt="MSDS-Lite Mobil Kurulum QR Kodu" style="background:#0b0f17; padding:8px; border-radius:12px; border:1px solid rgba(234, 88, 12, 0.35); box-shadow:0 4px 14px rgba(0,0,0,0.25);" />
  </a>
  <br>
  <sub>📲 <b>Telefonunuzun Kamerasıyla Okutun:</b> Canlı PWA uygulamasını doğrudan açmak veya telefonunuza yüklemek için QR kodu tarayın ya da <a href="https://erdmsn77.github.io/msds-lite/">erdmsn77.github.io/msds-lite</a> adresine dokunun.</sub>
</p>

---

## Projenin Amacı ve Çıkış Noktası

Yalova Üniversitesi Çınarcık Meslek Yüksekokulu **Fiber Tekne İmalatı ve Kompozit Teknolojileri** öğrencisi olarak, atölyedeki pratik derslerimde ve gelecekteki tersane stajlarıma hazırlık sürecimde sahadaki en büyük risklerden birinin **kimyasallarla doğrudan temas anında yaşanan panik ve bilgiye erişim zorluğu** olduğunu gözlemledim.

Kompozit tekne imalatında (vakum infüzyon, el yatırması, vakum torbalama, kalıp ayırma ve finisaj) kullanılan organik peroksitler, hızlandırıcılar ve reaktif reçineler yüksek risk taşır. Bir kaza meydana geldiğinde (örneğin göze MEK-P sıçraması durumunda):
* Çalışanların elleri eldivenli, reçineli veya tozlu olabilir.
* Sayfalarca süren teknik SDS PDF belgelerini telefon ekranından aramak ve incelemek kritik dakikaların kaybına yol açar.
* Tersane veya kalıphane hangarının kapalı bölümlerinde hücresel internet çekmeyebilir.

**MSDS-Lite**, bu ihtiyaca doğrudan çözüm sunmak amacıyla geliştirilmiştir. Harici hiçbir sunucuya veya internet bağlantısına bağımlı olmadan, mobil cihaz üzerinden **ilk 60 saniyede hayat kurtaracak acil eylem adımlarını** sahaya sunar.

---

## Mimari ve Kullanıcı Deneyimi (2 Katmanlı Bilgi Modeli)

Atölye ortamında bilgi kirliliğini önlemek ve kritik anlarda odaklanmayı kolaylaştırmak için **2 Katmanlı Kart Mimarisi** uygulanmıştır:

### 1. Katman: Saha Özet Kartı (Card View)
Ana ekranda kimyasallar yatay ve dikey kaydırmayla hızlıca taranır:
* **Kimyasal Tanımı:** Ticari/atölye adı, CAS numarası ve teknik kimyasal sınıfı.
* **Sinyal Kelimesi (Signal Tag):** Uluslararası GHS standardında kırmızı `TEHLİKE` veya amber `UYARI` etiketi.
* **GHS Piktogramları:** Tehlike türünü anında gösteren kırmızı baklava vektör sembolleri (Alev, Aşındırıcı, Sağlık Zararı, Çevre vb.).
* **Temel Risk İbaresi (H-Statement):** Kimyasalın en birincil tehlike cümlesi.
* **Renk Kodlu Acil Durum Rozetleri:** Yangın (kırmızı), Sağlık (mavi) ve Çevre (yeşil) bazında özet riskler.
* **Zorunlu Yıkama Süresi Rozeti:** Olası maruziyette uygulanması gereken asgari kesintisiz yıkama süresi (örneğin: En az 15 dakika kesintisiz yıkama).

### 2. Katman: Hızlı Acil Durum Paneli (Slide-in Drawer)
Karta dokunulduğunda sağdan kayarak açılan, sekmelerle hızlı geçiş yapılabilen 4 kritik acil eylem bölümü:
1. **İlk Yardım (İlk 60 Saniye):** Göz, cilt, solunum ve yutma maruziyetlerinde saniyeler içinde yapılması gerekenler. En üstte kırmızı zeminli **Zorunlu Kesintisiz Yıkama Süresi** uyarısı ile eşzamanlı **112 Acil Servis** ve **114 Zehir Danışma (UZMEM)** yönlendirmesi.
2. **Yangın ve Müdahale:** Sahada derhal kullanılabilecek uygun söndürücüler, **kesinlikle kullanılmayacak yöntemler** (örneğin alevi ve peroksiti dağıtan basınçlı su jeti yasağı), yangın reaksiyon riskleri ve parlama noktası (°C).
3. **KKD Donanımı (Kişisel Koruyucu Donanım):** Doğru solunum maskesi tipi (A2 organik buhar filtresi, P3 partikül filtresi vb.), göz/yüz siperi gereksinimi ve **Eldiven Uyumluluk Tablosu** (Lateks, Nitril, Bütil/Neopren için uygun / uygun değil işaretleri).
4. **Depolama ve Uyuşmazlık:** İdeal depolama sıcaklıkları ve atölyede asla yan yana getirilmemesi gereken reaktif maddeler (örneğin MEK-P ile Kobalt hızlandırıcının teması halinde ani alev alma ve patlama uyarısı).
5. **Resmî Doğrulama ve Kaynak:** Bilgilerin teyit edildiği resmî SDS dokümanına doğrudan bağlantı ve İSG kontrol notu.

---

## Öne Çıkan Teknik ve Saha Özellikleri

* **Saha ve Gece Teması:** Parlak güneş ışığı alan açık hangar ve tersane ortamlarında metinlerin net okunabilmesi için açık gri/beyaz zemin (`#F8FAFC`) ile koyu arduvaz metin (`#0F172A`) kontrastı uygulandı. Gece vardiyaları için tek dokunuşla koyu temaya geçilebilir (seçim cihaz hafızasında saklanır).
* **Mobil Geri Gitme ve Kaydırma Desteği (Native Gesture UX):** Mobil tarayıcılarda veya tam ekran PWA modunda detay çekmecesi açıkken ekranın kenarından geri kaydırıldığında veya cihazın geri tuşuna basıldığında uygulamanın kapanması engellenmiştir. Tarayıcı geçmişi (`history.pushState` ve `popstate`) ve dokunmatik sağa kaydırma hareketiyle çekmece yumuşakça kapanır ve ana menüye dönülür.
* **6 Dilli Uluslararası Altyapı (TR / EN / DE / FR / ZH / JA):** Türkçe, İngilizce, Almanca, Fransızca, Çince (Basitleştirilmiş) ve Japonca tam dil desteği. Türkiye'deki tersanelerin ve TURKCOMPOSITE gibi küresel fuarlara katılan uluslararası kompozit devlerinin yerinde güvenle kullanabileceği standart GHS kimya terminolojisi.
* **Sıfır Ağır Framework Bağımlılığı (Pure Vanilla JS ve CSS):** Hiçbir harici CSS kütüphanesi (Bootstrap, Tailwind vb.) veya JavaScript çatısı (React, Vue vb.) kullanılmamıştır. Optimize edilmiş yerel mimarisiyle en eski veya zayıf donanımlı atölye telefonlarında bile anında açılır.
* **Yüzde Yüz Çevrimdışı Çalışma (PWA):** Service Worker altyapısı sayesinde uygulama bir kez yüklendikten sonra bodrum katında, hangar içinde veya açık denizde hücresel veri olmadan tam fonksiyonla çalışır.
* **Doğrudan Bağlantı (Deep-Linking):** URL sonuna kimyasal kimliği eklenerek (örneğin `/#mek-p`) karekod veya doğrudan bağlantı üzerinden ilgili kimyasal kartı açtırılabilir.

---

## Kimyasal Kapsamı (11 Temel Atölye Malzemesi)

Atölyelerde en sık karşılaşılan ve kaza riski taşıyan 11 temel kimyasal malzeme tanımlanmıştır:

| Kimyasal Adı | Kategori | CAS No | Risk Seviyesi | Kritik Önlem / Atölye İkazı |
|---|---|---|---|---|
| **MEK-P** (Metil Etil Keton Peroksit) | Peroksit | 1338-23-4 | **KRİTİK** | Kobalt hızlandırıcı ile doğrudan karıştırılamaz (şiddetli patlama riski). Göze temasta kalıcı görme kaybı riski; tazyiksiz suyla en az 15 dk kesintisiz yıkama. |
| **Kobalt Naftenat** (%6) | Hızlandırıcı | 61789-51-3 | **KRİTİK** | Peroksitlerden ayrı dolapta tutulmalıdır. Cilt hassaslaştırıcıdır; en az 20 dk yıkama gerektirir. |
| **Ortoftalik Polyester Reçine** | Reçine | 100-42-5 (Stiren) / 25035-68-2 | **YÜKSEK** | Stiren monomeri içerir. Cilde bulaştığında aseton ile temizlenmemelidir (aseton kimyasalı gözeneklere iter). |
| **Vinilester Reçine** | Reçine | 100-42-5 (Stiren) / 36425-15-7 | **YÜKSEK** | Yüksek reaktiviteye sahiptir. A2 organik buhar filtresi ve nitril eldiven zorunludur. |
| **Epoksi Reçine (DGEBA)** | Reçine | 25068-38-6 | **YÜKSEK** | Güçlü cilt hassaslaştırıcıdır; tekrarlayan temas kalıcı mesleki dermatite yol açar. Lateks eldiven geçirgendir, nitril kullanılmalıdır. |
| **Epoksi Sertleştirici (IPDA)** | Sertleştirici | 2855-13-2 (IPDA) / 9046-10-0 | **KRİTİK** | Aşındırıcı alifatik amin. Derin kapta fazla miktarda karıştırıldığında kontrolsüz egzotermik termal kaçak (aşırı ısınma ve duman) oluşturur. |
| **Teknik Aseton** | Solvent | 67-64-1 | **ORTA** | Çok düşük parlama noktası (-17°C). Cilt temizliğinde kesinlikle kullanılmamalı; yalnızca alet ve fırça yıkamada kullanılmalıdır. Bütil kauçuk eldiven gerektirir. |
| **Karbon Elyaf Tozu** | Toz & Elyaf | 7440-44-0 (Karbon) | **YÜKSEK** | Mekanik kesim/zımparada mikro lifler korneayı çizer (göz ovuşturulmamalıdır). P3/FFP3 partikül maskesi şarttır. Toz süpürülmemeli, vakumlanmalıdır. |
| **Gelcoat (İzoftalik)** | Reçine | 100-42-5 (Stiren) | **YÜKSEK** | Pigment ve stiren içerir. Tabanca ile püskürtme sırasında A2P3 kombine filtreli tam yüz maskesi kullanılmalıdır. |
| **PVA Ayırıcı Ajan** | Kalıp Ayırıcı | 9002-89-5 (PVA) / 67-63-0 (İPA) | **ORTA** | Alkol taşıyıcı nedeniyle yanıcı buhar üretebilir. Bol su ile yıkanarak ciltten kolayca uzaklaştırılır. |
| **Kalıp Vaksu / Wax** | Kalıp Ayırıcı | 8015-86-9 (Karnauba) / 64742-48-9 | **ORTA** | Petrol distilatı ve karnauba mumu içerir. Geniş yüzeylere sürülürken yeterli havalandırma sağlanmalıdır. |

---

## Mobil Cihaza Yükleme (PWA Saha Kurulumu)

MSDS-Lite, tersane hangarları ve kompozit atölyelerindeki saha pratikleri göz önüne alınarak **doğrudan mobil cihazlar için optimize edilmiştir**. Bilgisayarınıza harici kurulum yapmaya, terminal komutlarına veya paket yöneticilerine gerek yoktur; telefonunuzun ana ekranından yerel bir mobil uygulama gibi anında çalışır:

* **Android (Chrome):** [Canlı bağlantıyı](https://erdmsn77.github.io/msds-lite/) açın, sağ üstteki üç noktaya dokunun ve **"Uygulamayı Yükle"** veya **"Ana Ekrana Ekle"** seçeneğini seçin.
* **iOS / iPhone (Safari):** Safari'de canlı adresi açın, alt kısımdaki **Paylaş** simgesine dokunun ve **"Ana Ekrana Ekle"** butonuna basın.
* **Hızlı QR Kurulum:** Akıllı telefonunuzun kamerasını aşağıdaki koda doğrultarak sahada saniyeler içinde çalıştırın:

<p align="center">
  <a href="https://erdmsn77.github.io/msds-lite/">
    <img src="icons/qr-code.svg" width="115" height="115" alt="MSDS-Lite Kurulum QR Kodu" style="background:#0b0f17; padding:6px; border-radius:10px; border:1px solid rgba(234, 88, 12, 0.35);" />
  </a>
</p>

---

## Veri Güvenliği ve Senkronizasyon İlkesi

* **İkili Veri Güvencesi (Dual-Source Sync):** Kimyasal verileri hem `data/chemicals.json` dosyasında hem de `index.html` içerisindeki `fallbackChemicals` dizisinde birebir aynı tutulur. Bu mimari, kullanıcı uygulamayı bir sunucu olmadan doğrudan `file://` protokolüyle açsa dahi tüm kartların ve detayların eksiksiz çalışmasını garanti eder.
* **Teknik Doğruluk:** Veriler uydurma veya genel geçer bilgiler içermez; üretici SDS belgeleri, OSHA, ECHA ve üretici güvenlik bültenleri baz alınarak hazırlanmıştır.

---

## Lisans ve İletişim

Bu proje açık kaynak olarak paylaşılmıştır. 

Fiber tekne imalatı, yat inşaatı, kompozit malzemeler ve iş sağlığı güvenliği (İSG) alanında staj, proje veya iş birliği konularında iletişime geçebilirsiniz.

* **Geliştirici:** Erdem Doğan ([@erdmsn77](https://github.com/erdmsn77)) — Yalova Üniversitesi Çınarcık MYO, Fiber Tekne İmalatı ve Kompozit Teknolojileri
* **Kurum:** Yalova Üniversitesi Çınarcık Meslek Yüksekokulu (Fiber Tekne İmalatı ve Kompozit Teknolojileri)
* **Canlı Proje:** [https://erdmsn77.github.io/msds-lite/](https://erdmsn77.github.io/msds-lite/)
