# MSDS-Lite Proje Bağlamı

## Proje

MSDS-Lite, kompozit/tekne imalat atölyesinde kullanılan kimyasallar için mobil odaklı hızlı İSG kartları uygulamasıdır.

Workspace:

- `index.html`
- `data/chemicals.json`

Uygulama statik bir frontend'dir. Backend, veritabanı, kullanıcı hesabı veya API anahtarı yoktur.

## Kritik Senkron Kuralı

Kimyasal verileri iki yerde tutulur ve birebir senkron kalmalıdır:

1. `data/chemicals.json`: Kanonik JSON veri dosyası.
2. `index.html` içindeki `fallbackChemicals`: `file://` üzerinden açılışta CORS sorunu yaşamamak için kullanılan JavaScript fallback dizisi.

Bir kimyasal eklenir, silinir veya değiştirilirse iki dosya aynı anda güncellenmelidir. Her iki tarafta aşağıdaki alanlar ve değerler aynı olmalıdır:

```text
id
name
chemical_name
category
risk_level
ghs_codes
flash_point
ppe.mask
ppe.eye
ppe.gloves.latex
ppe.gloves.nitrile
ppe.gloves.butyl
ppe.gloves.warning
emergency_timer_min
first_aid.eye
first_aid.skin
first_aid.inhalation
```

## Veri Şeması

Her kayıt şu yapıyı kullanır:

```json
{
  "id": "kebab-case-benzersiz-id",
  "name": "Kısa görünen ad",
  "chemical_name": "Tam kimyasal veya teknik ad",
  "category": "peroksit | recine | solvent | toz | sertlestirici | hizlandirici | ayirici",
  "risk_level": "KRİTİK | YÜKSEK | ORTA",
  "source": "Verinin kaynağı veya SDS gereklilik notu",
  "source_url": "https://... veya boş string",
  "verified_at": "YYYY-MM-DD",
  "verification_status": "Doğrulama durumu",
  "verification_note": "Kaynağın kapsamı ve sınırlamaları",
  "ghs_codes": ["GHS02", "GHS05", "GHS06", "GHS07"],
  "flash_point": "Parlama noktası veya ürün SDS doğrulama notu",
  "ppe": {
    "mask": "Maske veya filtre tipi",
    "eye": "Göz koruması",
    "gloves": {
      "latex": true,
      "nitrile": true,
      "butyl": true,
      "warning": "Spesifik eldiven uyarısı"
    }
  },
  "emergency_timer_min": 10,
  "first_aid": {
    "eye": "Göz teması talimatı",
    "skin": "Cilt teması talimatı",
    "inhalation": "Solunum maruziyeti talimatı"
  }
}
```

`emergency_timer_min` yalnızca `10` veya `15` olarak kullanılmalıdır. Yeni ID mevcut ID'lerle çakışmamalı ve kebab-case olmalıdır.

## Mevcut Veri Kapsamı

Şu anda 11 kayıt vardır:

- MEK-P
- Ortoftalik Polyester Reçine
- Teknik Aseton
- Karbon Elyaf Tozu
- KOBALT NAFTENAT
- EPOKSİ REÇİNE
- EPOKSİ SERTLEŞTİRİCİ
- Vinilester Reçine
- PVA Ayırıcı Ajan
- Kalıp Cilası/Wax
- Gelcoat

Bekleyen kayıt yoktur.

Bazı ürünler tek bir saf kimyasal değil, üreticiye göre değişen karışımlardır. Özellikle epoksi ürünleri, vinilester, PVA, kalıp wax ve gelcoat için ürün SDS'i yoksa parlama noktası veya tam GHS sınıflandırması tahmin edilmemelidir. Bunun yerine `flash_point`, `source`, `verification_status` ve `verification_note` alanlarında açık bir SDS doğrulama notu kullanılmalıdır.

`source_url` yalnızca doğrulanmış HTTPS kaynaklarında doldurulur. Ürün SDS'i olmayan kayıtlarda `verification_status` mutlaka belirsizliği açıkça belirtmelidir; ana bileşen verisi tam ürün verisi gibi sunulmamalıdır.

Kobalt naftenat kaydında MEKP/peroksitlerle doğrudan temas veya aynı kapta karıştırma yasağı ve ayrı depolama uyarısı korunmalıdır.

## Arayüz Özellikleri

`index.html` şu özellikleri içerir:

- Tailwind CSS CDN
- Koyu, mobil odaklı `max-w-md` tasarım
- Kimyasal arama
- Kategori filtreleri
- Risk seviyesine göre renkli badge
- GHS kodlarının piktogram benzeri gösterimi
- Parlama noktası ve acil yıkama süresi
- KKD kartı ve lateks/nitril/bütil uyumluluk matrisi
- Göz, cilt ve solunum ilk yardım protokolü
- Kaynak, doğrulama durumu, doğrulama tarihi ve kapsam notu
- Daha yoğun atölye kontrol paneli görsel dili
- Acil yıkama sayacı
- Sayaç başlatma, durdurma/devam ettirme ve sıfırlama

Kategori etiketleri `categoryLabels` içinde tanımlıdır:

```js
all: 'Tümü'
peroksit: 'Peroksit'
recine: 'Reçine'
solvent: 'Solvent'
toz: 'Toz'
sertlestirici: 'Sertleştirici'
hizlandirici: 'Hızlandırıcı'
ayirici: 'Ayırıcı Ajan'
```

Yeni kategori eklenirse hem `categoryLabels` hem de veri kayıtları güncellenmelidir.

## Veri Yükleme Davranışı

- Sayfa `file://` ile açılırsa `fallbackChemicals` kullanılır.
- HTTP/Live Server ile açılırsa `data/chemicals.json` yüklenir.
- JSON yüklenmeden önce şema doğrulaması yapılır.
- JSON geçersizse fallback veri kullanılır.

## Güvenlik Kuralları

- Kullanıcı veya JSON kaynaklı metinler HTML'e basılmadan önce `escapeHtml()` ile kaçışlanmalıdır.
- GHS kodları doğrulanmış formatta olmalıdır: `GHS` + iki rakam.
- Dış JSON doğrudan kullanılmadan önce şema doğrulamasından geçmelidir.
- Yeni `innerHTML` kullanımı eklenirse dinamik değerlerin tamamı kaçışlanmalıdır.
- Tailwind CDN prototip için kabul edilmiştir; üretimde yerel derlenmiş Tailwind ve Content-Security-Policy tercih edilmelidir.
- Kimyasal ve ilk yardım bilgileri gerçek atölye kullanımı öncesinde üretici SDS'i ve İSG uzmanı tarafından doğrulanmalıdır.

## Değişiklik Yapmadan Önce

1. Hem `index.html` hem `data/chemicals.json` dosyasını oku.
2. Mevcut kayıtları silme veya yeniden adlandırma.
3. İki veri kaynağına aynı kaydı aynı değerlerle ekle.
4. Ürün SDS'i yoksa teknik değer tahmin etme.
5. Mevcut şemayı ve arayüz API'sini değiştirme.

## Değişiklikten Sonra Kontrol Listesi

PowerShell ile JSON ve temel şema kontrolü:

```powershell
$data = Get-Content -Raw -Encoding UTF8 .\data\chemicals.json | ConvertFrom-Json
$data.Count
$data | ForEach-Object { $_.id }
```

Kontrol edilmesi gerekenler:

- JSON parse ediliyor mu?
- ID'ler benzersiz mi?
- `index.html` ve JSON aynı sayıda kayıt içeriyor mu?
- Yeni kategoriler filtrelerde görünüyor mu?
- Yeni kart tarayıcıda açılıyor mu?
- Sayaç başlat/durdur/devam/sıfırla akışı bozuldu mu?
- HTML/JavaScript diagnostic hatası var mı?

## Çalışma İlkesi

Güvenlik açısından kritik kimyasal bilgisinde emin olunmayan değerleri uydurma. Kaynak veya ürün SDS'i yoksa bunu kullanıcıya açıkça belirt ve doğrulama placeholder'ı kullan. UI değişikliklerini mevcut sade, koyu ve mobil tasarımla uyumlu tut.
