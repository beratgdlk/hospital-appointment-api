# Hastane Randevu Sistemi API

## Proje Hakkında
Bu proje, bir hastane randevu sistemi için geliştirilmekte olan bir REST API'dir. TypeScript ve Node.js teknolojileri kullanılarak geliştirilmektedir.

## Teknik Altyapı
- **Programlama Dili:** TypeScript
- **Framework:** Express.js
- **Veritabanı:** Prisma ORM ile yönetilen bir veritabanı
- **Doğrulama:** Zod şeması doğrulama kütüphanesi
- **Güvenlik:** Bcrypt şifreleme

## Proje Yapısı
```
src/
├── config/         # Yapılandırma dosyaları
├── controllers/    # İş mantığı kontrolcüleri
├── middlewares/    # Ara yazılımlar
├── models/         # Veritabanı modelleri
├── routes/         # API rotaları
├── services/       # İş mantığı servisleri
├── types/          # TypeScript tip tanımlamaları
├── validations/    # Veri doğrulama şemaları
└── index.ts        # Ana uygulama dosyası
```

## Hedef Kullanıcılar
1. Hastalar
   - Randevu alabilir
   - Randevularını görüntüleyebilir
   - Randevularını düzenleyebilir veya iptal edebilir

2. Doktorlar
   - Randevu listelerini görüntüleyebilir
   - Randevu durumlarını güncelleyebilir

3. Hastane Yöneticileri
   - Sistem üzerinde yönetim yapabilir
   - Doktor ve hasta kayıtlarını yönetebilir

## Geliştirme Aşaması
Proje şu anda geliştirme aşamasındadır ve temel randevu sistemi özellikleri üzerinde çalışılmaktadır. İlerleyen aşamalarda aşağıdaki özellikler eklenebilir:
- Online görüşme entegrasyonu
- Reçete yönetimi
- Hasta geçmişi takibi
- Bildirim sistemi

## Kurulum ve Çalıştırma
```bash
# Bağımlılıkları yükleme
npm install

# Geliştirme modunda çalıştırma
npm run dev

# Prodüksiyon için derleme
npm run build

# Prodüksiyon modunda çalıştırma
npm start
```

## Güvenlik
- Kullanıcı şifreleri bcrypt ile şifrelenmektedir
- API istekleri için doğrulama ve yetkilendirme kontrolleri mevcuttur
- Hassas veriler .env dosyasında saklanmaktadır
