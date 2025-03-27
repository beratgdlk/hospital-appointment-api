# Hastane Randevu Sistemi API

## Proje Hakkında
Bu proje, bir hastane randevu sistemi için geliştirilmiş modern bir REST API'dir. TypeScript ve Express.js teknolojileri kullanılarak geliştirilmiştir. API, hastaların randevu almasını, doktorların randevuları görüntülemesini ve hastane yönetiminin sistemi yönetmesini sağlar.

## Teknik Altyapı
- **Programlama Dili:** TypeScript
- **Framework:** Express.js
- **Veritabanı:** Prisma ORM ile yönetilen bir veritabanı
- **Doğrulama:** Zod şema doğrulama kütüphanesi
- **Güvenlik:** Merkezi hata işleme ve tiplerin doğrulanması
- **API Tasarımı:** RESTful API prensipleri
- **Gerçek Zamanlı İletişim:** Socket.IO WebSocket entegrasyonu

## Geliştirme Süreci ve Güncellemeler
Proje şu güncellemeleri içermektedir:

1. **Merkezi Şema Kaydı:** Tüm validasyon şemaları `schema.registry.ts` dosyasında toplanmıştır. Bu sayede tüm projede tutarlı veri validasyonu sağlanmaktadır.

2. **Doğrulama Mekanizması Yenileme:** Validasyon işlemleri `validate.ts` middleware'i üzerinden merkezi olarak yönetilmektedir.

3. **Tip Güvenliği:** TypeScript ile tüm veri yapıları güçlü tip kontrolüne sahiptir. Zod ile çalışma zamanında da tip doğrulaması yapılmaktadır.

4. **Controller İyileştirmeleri:** Tüm controller fonksiyonları, route parametrelerini doğru tipte (number) alacak şekilde güncellenmiştir.

5. **Hata Yönetimi:** Merkezi bir hata yönetim sistemi ile tüm API genelinde tutarlı hata yanıtları sağlanmıştır.

6. **Hasta Geçmişi Takibi:** Hastaların tıbbi geçmişlerini detaylı olarak izlemek için yeni bir modül eklenmiştir. Bu sayede hastaların tüm tıbbi kayıtları ve randevu geçmişleri kronolojik olarak takip edilebilmektedir.

7. **WebSocket Entegrasyonu:** Socket.IO kütüphanesi ile gerçek zamanlı iletişim sağlanmıştır. Bu sayede hasta çağrıları ve bekleme odası durumu gibi bilgiler anlık olarak güncellenebilmektedir.

## Proje Yapısı
```
src/
├── config/         # Yapılandırma dosyaları
├── controllers/    # İş mantığı kontrolcüleri
├── middlewares/    # Ara yazılımlar
│   ├── error.middleware.ts       # Merkezi hata yönetimi
│   ├── validate.ts               # Şema doğrulama middleware'i
├── routes/         # API rotaları
│   ├── user.routes.ts            # Kullanıcı rotaları
│   ├── patient.routes.ts         # Hasta rotaları
│   ├── doctor.routes.ts          # Doktor rotaları
│   ├── appointment.routes.ts     # Randevu rotaları
│   ├── department.routes.ts      # Departman rotaları
│   ├── medical-record.routes.ts  # Tıbbi kayıt rotaları
│   ├── patient-history.routes.ts # Hasta geçmişi rotaları
├── schemas/        # Veri şemaları
│   ├── base.schema.ts            # Temel şema tanımlamaları
│   ├── schema.registry.ts        # Merkezi şema kaydı
├── services/       # İş mantığı servisleri
│   ├── socket.service.ts         # WebSocket servis katmanı
│   ├── patient-history.service.ts # Hasta geçmişi servis katmanı
├── types/          # TypeScript tip tanımlamaları
│   ├── socket.types.ts           # WebSocket tip tanımlamaları
├── validations/    # Eski validasyon şemaları (kullanım dışı)
└── index.ts        # Ana uygulama dosyası
```

## API Endpoint'leri

### Kullanıcılar
- `GET /api/users` - Tüm kullanıcıları listele
- `GET /api/users/:id` - ID'ye göre kullanıcı getir
- `GET /api/users/email/:email` - E-posta adresine göre kullanıcı getir
- `POST /api/users` - Yeni kullanıcı oluştur
- `PUT /api/users/:id` - Kullanıcı bilgilerini güncelle
- `DELETE /api/users/:id` - Kullanıcı sil

### Hastalar
- `GET /api/patients` - Tüm hastaları listele
- `GET /api/patients/:id` - ID'ye göre hasta getir
- `GET /api/patients/email/:email` - E-posta adresine göre hasta getir
- `POST /api/patients` - Yeni hasta oluştur
- `PUT /api/patients/:id` - Hasta bilgilerini güncelle
- `DELETE /api/patients/:id` - Hasta sil

### Doktorlar
- `GET /api/doctors` - Tüm doktorları listele
- `GET /api/doctors/:id` - ID'ye göre doktor getir
- `POST /api/doctors` - Yeni doktor oluştur
- `PUT /api/doctors/:id` - Doktor bilgilerini güncelle
- `DELETE /api/doctors/:id` - Doktor sil

### Departmanlar
- `GET /api/departments` - Tüm departmanları listele
- `GET /api/departments/:id` - ID'ye göre departman getir
- `POST /api/departments` - Yeni departman oluştur
- `PUT /api/departments/:id` - Departman bilgilerini güncelle
- `DELETE /api/departments/:id` - Departman sil

### Randevular
- `GET /api/appointments` - Tüm randevuları listele
- `GET /api/appointments/:id` - ID'ye göre randevu getir
- `GET /api/appointments/patient/:patientId` - Hastanın randevularını getir
- `GET /api/appointments/doctor/:doctorId` - Doktorun randevularını getir
- `POST /api/appointments` - Yeni randevu oluştur
- `PUT /api/appointments/:id` - Randevu bilgilerini güncelle
- `DELETE /api/appointments/:id` - Randevu sil

### Tıbbi Kayıtlar
- `GET /api/medical-records` - Tüm tıbbi kayıtları listele
- `GET /api/medical-records/:id` - ID'ye göre tıbbi kayıt getir
- `GET /api/medical-records/patient/:patientId` - Hastanın tıbbi kayıtlarını getir
- `POST /api/medical-records` - Yeni tıbbi kayıt oluştur
- `PUT /api/medical-records/:id` - Tıbbi kayıt bilgilerini güncelle
- `DELETE /api/medical-records/:id` - Tıbbi kayıt sil

### Hasta Geçmişi
- `GET /api/patient-history` - Tüm hasta geçmişi kayıtlarını listele
- `GET /api/patient-history/:id` - ID'ye göre hasta geçmişi kaydını getir
- `GET /api/patient-history/patient/:patientId` - Hastanın geçmiş kayıtlarını getir
- `GET /api/patient-history/patient/:patientId/type/:recordType` - Hastanın belirli tipteki geçmiş kayıtlarını getir
- `POST /api/patient-history` - Yeni hasta geçmişi kaydı oluştur
- `PUT /api/patient-history/:id` - Hasta geçmişi kaydını güncelle
- `DELETE /api/patient-history/:id` - Hasta geçmişi kaydını sil

## WebSocket Olayları

### Sunucudan İstemciye Olaylar
- `patientCall` - Doktor bir hastayı çağırdığında tetiklenir
- `patientHistoryUpdate` - Hasta geçmişinde bir güncelleme olduğunda tetiklenir
- `waitingRoomUpdate` - Bekleme odası durumu güncellendiğinde tetiklenir

### İstemciden Sunucuya Olaylar
- `callPatient` - Doktor bir hastayı çağırdığında
- `updatePatientStatus` - Hasta durumu güncellendiğinde
- `getWaitingRoomStatus` - Bekleme odası durumu talep edildiğinde

## Veri Doğrulama Şemaları
Projede Zod kütüphanesi kullanılarak güçlü bir veri doğrulama mekanizması oluşturulmuştur:

1. **Base Schemas**: Temel veri yapılarını tanımlayan şemalar
2. **Registry Schemas**: Tüm veri şemalarını merkezi olarak yöneten bir kayıt sistemi
3. **Create/Update Schemas**: Oluşturma ve güncelleme işlemleri için özelleştirilmiş şemalar

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

## Güvenlik ve Hata Yönetimi
- Tüm API istekleri Zod ile şema doğrulamasından geçmektedir
- Merkezi hata yönetimi (`error.middleware.ts`) ile tutarlı hata mesajları sağlanmaktadır
- Tip güvenliği sayesinde çalışma zamanı hataları minimize edilmiştir
- Rota parametreleri doğru tipte işlenerek tip hatalarının önüne geçilmiştir

## Son Değişiklikler ve İyileştirmeler
- Hasta geçmişi takibi için yeni API endpoint'leri ve veri modelleri eklendi
- WebSocket desteği ile gerçek zamanlı iletişim sağlandı
- Controller'lardaki ID ve diğer parametre dönüşümleri tamamlandı
- Şema kayıt sistemi basitleştirilerek döngüsel referans hataları giderildi
- Validasyon middleware'i merkezi bir yapıya dönüştürüldü
- API tutarlılığı ve tip güvenliği arttırıldı

Bu API, modern bir hastane randevu sisteminin tüm gereksinimlerini karşılayacak şekilde tasarlanmıştır ve gelecekteki özellikler için genişletilebilir bir yapıya sahiptir.
