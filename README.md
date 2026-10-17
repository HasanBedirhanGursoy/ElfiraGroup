# ELFIRA Group — V9

ELFIRA Group'un Apple esintili dijital ajans sitesi. Web tasarım, e-ticaret, özel yazılım, marka kimliği, teknik SEO ve bakım hizmetlerini tanıtır.

## Yayına alma — Cloudflare Pages

1. Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. GitHub reposu: `HasanBedirhanGursoy/ElfiraGroup`.
3. Production branch: `main`.
4. Framework preset: **None**.
5. Build command: boş bırakın (panel mecbur kılıyorsa `exit 0`).
6. Build output directory: **.** (depo kökü; `index.html` burada).
7. **Save and Deploy**. Çalışan `*.pages.dev` adresini kontrol edin.
8. Hazır olduğunda **Custom domains** üzerinden kendi alan adınızı bağlayın.

## Site özellikleri

- Tek dosyalı statik sürüm: `index.html` (CSS, JS, görseller dahil); npm, sunucu ya da veritabanı gerektirmez.
- Mobil uyumluluk, açık/koyu tema, proje vitrini, hizmet kartları, fiyat hesaplayıcı, WhatsApp teklif bağlantıları.
- Web paketleri ve Care ücretleri **örnek fiyatlardır**; gerçek teklif ayrıca oluşturulur.
- Yapay zekâ otomasyonu hizmeti bulunmaz.
- İletişim hedefi mevcut sürümde **+90 533 491 97 33**. Yayına açmadan önce işletme için kullanılacak WhatsApp numarasını doğrulayın.
- CRM, müşteri girişi ve admin paneli henüz yoktur. WhatsApp mesajı ancak ziyaretçi gönder düğmesine bastığında iletilir.

## Kontrol

Siteyi test ederken 390px ve 1440px ekranlarda yatay taşma, fiyat hesaplama ve özel yazılım teklif geçişleri incelendi. Bağlantı ve içeriklerin canlı Pages adresinde ayrıca kontrolü önerilir.

**Not:** Alan adı ve Cloudflare kurulumu depo sahibindedir; yalnızca bu depoya yüklemek tek başına siteyi canlıya almaz.
