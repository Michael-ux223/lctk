/** Generate data/questions.json — run: node tools/gen_questions.mjs */
import fs from 'fs';
import { spawnSync } from 'child_process';

const cats = {
  android: { id: 'android', title: 'Android Versions', desc: 'Strictly codename & nomor versi saja' },
  android_pengetahuan: { id: 'android_pengetahuan', title: 'Pengetahuan Android', desc: 'APK, komponen app, Manifest, IDE, runtime — bukan versi' },
  singkatan: { id: 'singkatan', title: 'Singkatan IT', desc: 'Jebakan mirip-mirip — harus hafal yang paling tepat' },
  software_klasik: { id: 'software_klasik', title: 'Software Klasik', desc: 'Browser pertama, app map, software legendaris' },
  ai: { id: 'ai', title: 'Artificial Intelligence', desc: 'Dasar AI, ML, LLM, dan istilah modern' },
  hardware: { id: 'hardware', title: 'Hardware Komputer', desc: 'Kenali alat dari gambar — semua opsi masuk akal' },
  printer: { id: 'printer', title: 'Jenis Printer', desc: 'Inkjet, laser, dot matrix, thermal, 3D, plotter, dll.' },
  office: { id: 'office', title: 'Word · Excel · PowerPoint', desc: 'Toolbar & jalur menu mirip — pilih yang paling tepat' },
  keamanan: { id: 'keamanan', title: 'Keamanan Siber', desc: 'Malware *-ware, skenario hack, phishing, ransomware' },
};

const Q = [];
let n = 1;
const id = () => `q${String(n++).padStart(3, '0')}`;
const add = (category, question, options, answer, explanation, image = null) => {
  Q.push({ id: id(), category, question, options, answer, explanation, image });
};

// ===== ANDROID VERSIONS ONLY =====
const android = [
  ['Android 1.5 codename?', ['Cupcake', 'Donut', 'Eclair', 'Froyo'], 0, 'Android 1.5 = Cupcake.'],
  ['Android 1.6 codename?', ['Cupcake', 'Donut', 'Eclair', 'Froyo'], 1, 'Android 1.6 = Donut.'],
  ['Android 2.0–2.1 codename?', ['Eclair', 'Froyo', 'Gingerbread', 'Honeycomb'], 0, 'Android 2.0–2.1 = Eclair.'],
  ['Android 2.2 codename?', ['Eclair', 'Froyo', 'Gingerbread', 'Honeycomb'], 1, 'Android 2.2 = Froyo.'],
  ['Android 2.3 codename?', ['Froyo', 'Gingerbread', 'Honeycomb', 'Ice Cream Sandwich'], 1, 'Android 2.3 = Gingerbread.'],
  ['Android 3.x (tablet) codename?', ['Gingerbread', 'Honeycomb', 'Ice Cream Sandwich', 'Jelly Bean'], 1, 'Android 3.x = Honeycomb.'],
  ['Android 4.0 codename?', ['Honeycomb', 'Ice Cream Sandwich', 'Jelly Bean', 'KitKat'], 1, 'Android 4.0 = Ice Cream Sandwich.'],
  ['Android 4.1–4.3 codename?', ['Ice Cream Sandwich', 'Jelly Bean', 'KitKat', 'Lollipop'], 1, 'Android 4.1–4.3 = Jelly Bean.'],
  ['Android 4.4 codename?', ['Jelly Bean', 'KitKat', 'Lollipop', 'Marshmallow'], 1, 'Android 4.4 = KitKat.'],
  ['Android 5.0–5.1 codename?', ['KitKat', 'Lollipop', 'Marshmallow', 'Nougat'], 1, 'Android 5.0–5.1 = Lollipop.'],
  ['Android 6.0 codename?', ['Lollipop', 'Marshmallow', 'Nougat', 'Oreo'], 1, 'Android 6.0 = Marshmallow.'],
  ['Android 7.0–7.1 codename?', ['Marshmallow', 'Nougat', 'Oreo', 'Pie'], 1, 'Android 7.0–7.1 = Nougat.'],
  ['Android 8.0–8.1 codename?', ['Nougat', 'Oreo', 'Pie', 'Quince Tart'], 1, 'Android 8.0–8.1 = Oreo.'],
  ['Android 9 codename?', ['Oreo', 'Pie', 'Quince Tart', 'Red Velvet Cake'], 1, 'Android 9 = Pie.'],
  ['Codename internal Android 10?', ['Pie', 'Quince Tart', 'Red Velvet Cake', 'Snow Cone'], 1, 'Android 10 = Quince Tart.'],
  ['Codename internal Android 11?', ['Quince Tart', 'Red Velvet Cake', 'Snow Cone', 'Tiramisu'], 1, 'Android 11 = Red Velvet Cake.'],
  ['Codename internal Android 12?', ['Red Velvet Cake', 'Snow Cone', 'Tiramisu', 'Upside Down Cake'], 1, 'Android 12 = Snow Cone.'],
  ['Codename internal Android 13?', ['Snow Cone', 'Tiramisu', 'Upside Down Cake', 'Vanilla Ice Cream'], 1, 'Android 13 = Tiramisu.'],
  ['Codename internal Android 14?', ['Tiramisu', 'Upside Down Cake', 'Vanilla Ice Cream', 'Baklava'], 1, 'Android 14 = Upside Down Cake.'],
  ['Codename internal Android 15?', ['Upside Down Cake', 'Vanilla Ice Cream', 'Baklava', 'Cinnamon Bun'], 1, 'Android 15 = Vanilla Ice Cream.'],
  ['Codename internal Android 16?', ['Vanilla Ice Cream', 'Baklava', 'Cinnamon Bun', 'Quince Tart'], 1, 'Android 16 = Baklava.'],
  ['Codename internal Android 17?', ['Baklava', 'Cinnamon Bun', 'Chocolate Cake', 'Caramel Custard'], 1, 'Android 17 = Cinnamon Bun.'],
  ['Urutan dessert 4.0→5.0 yang benar?', ['ICS → Jelly Bean → KitKat → Lollipop', 'ICS → KitKat → Jelly Bean → Lollipop', 'Jelly Bean → ICS → KitKat → Lollipop', 'KitKat → ICS → Jelly Bean → Lollipop'], 0, '4.0 ICS → 4.1–4.3 JB → 4.4 KitKat → 5.x Lollipop.'],
  ['Versi Android pertama yang memakai nama Pie adalah...', ['Android 8', 'Android 9', 'Android 10', 'Android 7'], 1, 'Android 9 = Pie.'],
  ['Android ber-codename Oreo adalah versi...', ['7.0–7.1', '8.0–8.1', '9', '6.0'], 1, 'Oreo = Android 8.0–8.1.'],
  ['Codename dessert terakhir sebelum nomor murni (Android 10) adalah...', ['Oreo', 'Pie', 'Nougat', 'Lollipop'], 1, 'Setelah Pie (9), Android 10 memakai Quince Tart (internal).'],
  ['Android 5 dikenal sebagai...', ['KitKat', 'Lollipop', 'Marshmallow', 'Nougat'], 1, 'Android 5.x = Lollipop.'],
  ['Android 12 internal dessert name?', ['Snow Cone', 'Tiramisu', 'Red Velvet Cake', 'Upside Down Cake'], 0, 'Android 12 = Snow Cone.'],
];
android.forEach(([q, o, a, e]) => add('android', q, o, a, e));

// ===== ANDROID PENGETAHUAN (bukan versi) =====
const androidKnow = [
  ['Runtime default Android modern adalah...', ['Dalvik', 'ART (Android Runtime)', 'JVM HotSpot murni', 'Mono Runtime'], 1, 'ART menggantikan Dalvik.'],
  ['File paket installer aplikasi Android ber-ekstensi...', ['.exe', '.apk', '.dmg', '.ipa'], 1, 'APK = Android Package.'],
  ['IDE resmi Google untuk pengembangan Android adalah...', ['Eclipse ADT saja', 'Android Studio', 'NetBeans Mobile', 'Xcode'], 1, 'Android Studio adalah IDE resmi.'],
  ['Bahasa first-class yang direkomendasikan Google untuk Android modern...', ['Objective-C', 'Kotlin', 'Ruby', 'Pascal'], 1, 'Kotlin = first-class untuk Android.'],
  ['Komponen yang mewakili satu layar UI di Android disebut...', ['Service', 'Activity', 'BroadcastReceiver', 'ContentProvider'], 1, 'Activity ≈ satu layar.'],
  ['File yang mengatur permission & komponen aplikasi Android...', ['build.gradle saja', 'AndroidManifest.xml', 'proguard.cfg saja', 'res/values/colors.xml saja'], 1, 'AndroidManifest.xml mendeklarasikan app components & permissions.'],
  ['Toko aplikasi resmi Google untuk Android...', ['App Store', 'Google Play Store', 'Microsoft Store', 'Galaxy Store saja'], 1, 'Google Play Store = store resmi default Google.'],
  ['Android Go utamanya untuk...', ['Server rack', 'Perangkat low-RAM / entry-level', 'Hanya smartwatch', 'Mainframe'], 1, 'Android Go untuk spek rendah.'],
  ['Folder resource layout XML biasanya di...', ['java/', 'res/layout/', 'assets/db/', 'META-INF/ only'], 1, 'Layout UI di res/layout.'],
  ['Intent di Android dipakai untuk...', ['Mengirim/meminta aksi antar komponen (mis. buka Activity)', 'Mengganti kernel', 'Flash recovery saja', 'Mengatur DNS'], 1, 'Intent = messaging antar komponen.'],
  ['Service di Android terutama untuk...', ['UI layar penuh', 'Pekerjaan latar belakang tanpa UI utama', 'Hanya menyimpan gambar', 'Mengganti Manifest'], 1, 'Service = background component.'],
  ['Gradle pada proyek Android berfungsi sebagai...', ['Sistem build / dependency management', 'Emulator kamera', 'Play Store client', 'Kernel module'], 1, 'Gradle membangun APK/AAB.'],
  ['AAB (Android App Bundle) berbeda dari APK karena...', ['Format publishing modern yang di-optimize Play Store', 'Hanya untuk iOS', 'File virus', 'Format Word'], 0, 'AAB = publishing format ke Play.'],
  ['ContentProvider berguna untuk...', ['Berbagi data antar aplikasi secara terkontrol', 'Menggambar UI saja', 'Bootloader unlock', 'Overclock CPU'], 0, 'ContentProvider = data sharing API.'],
  ['Emulator Android biasanya dijalankan dari...', ['Android Studio Device Manager / AVD', 'Microsoft Word', 'BIOS setup', 'Photoshop'], 0, 'AVD/emulator dari Android Studio.'],
];
androidKnow.forEach(([q, o, a, e]) => add('android_pengetahuan', q, o, a, e));

// ===== SINGKATAN (tricky near-miss options) =====
const singkatan = [
  ['CPU merupakan singkatan yang paling tepat dari...', ['Central Processing Unit', 'Central Processor Utility', 'Computer Processing Unit', 'Central Program Unit'], 0, 'Yang standar industri: Central Processing Unit.'],
  ['GPU merupakan singkatan yang paling tepat dari...', ['Graphics Processing Unit', 'Graphic Processor Utility', 'General Processing Unit', 'Graphics Program Unit'], 0, 'GPU = Graphics Processing Unit.'],
  ['RAM merupakan singkatan yang paling tepat dari...', ['Random Access Memory', 'Rapid Access Memory', 'Read Access Memory', 'Random Application Memory'], 0, 'RAM = Random Access Memory.'],
  ['ROM merupakan singkatan yang paling tepat dari...', ['Read-Only Memory', 'Random-Only Memory', 'Read Operating Memory', 'Run-Only Memory'], 0, 'ROM = Read-Only Memory.'],
  ['SSD merupakan singkatan yang paling tepat dari...', ['Solid State Drive', 'Solid Storage Drive', 'System State Drive', 'Secure State Disk'], 0, 'SSD = Solid State Drive.'],
  ['HDD merupakan singkatan yang paling tepat dari...', ['Hard Disk Drive', 'High Density Drive', 'Hard Data Drive', 'Hardware Disk Device'], 0, 'HDD = Hard Disk Drive.'],
  ['BIOS merupakan singkatan yang paling tepat dari...', ['Basic Input/Output System', 'Binary Input/Output System', 'Basic Internal Operating System', 'Board Input/Output Service'], 0, 'BIOS = Basic Input/Output System.'],
  ['UEFI merupakan singkatan yang paling tepat dari...', ['Unified Extensible Firmware Interface', 'Universal Extensible Firmware Interface', 'Unified External Firmware Interface', 'Universal Electronic Firmware Interface'], 0, 'UEFI = Unified Extensible Firmware Interface.'],
  ['USB merupakan singkatan yang paling tepat dari...', ['Universal Serial Bus', 'Universal System Bus', 'United Serial Bus', 'Universal Storage Bus'], 0, 'USB = Universal Serial Bus.'],
  ['HDMI merupakan singkatan yang paling tepat dari...', ['High-Definition Multimedia Interface', 'High-Data Multimedia Interface', 'High-Definition Media Input', 'High-Digital Multimedia Interface'], 0, 'HDMI = High-Definition Multimedia Interface.'],
  ['LAN merupakan singkatan yang paling tepat dari...', ['Local Area Network', 'Large Area Network', 'Logical Area Network', 'Local Access Network'], 0, 'LAN = Local Area Network.'],
  ['WAN merupakan singkatan yang paling tepat dari...', ['Wide Area Network', 'Wireless Area Network', 'World Area Network', 'Web Access Network'], 0, 'WAN = Wide Area Network.'],
  ['SSID merupakan singkatan yang paling tepat dari...', ['Service Set Identifier', 'Secure Set Identifier', 'System Service Identifier', 'Signal Set Identifier'], 0, 'SSID = Service Set Identifier.'],
  ['WPA merupakan singkatan yang paling tepat dari...', ['Wi-Fi Protected Access', 'Wireless Protected Access', 'Wi-Fi Protocol Authentication', 'Wireless Protocol Access'], 0, 'WPA = Wi-Fi Protected Access.'],
  ['DNS merupakan singkatan yang paling tepat dari...', ['Domain Name System', 'Domain Network Service', 'Digital Name System', 'Domain Node System'], 0, 'DNS = Domain Name System.'],
  ['DHCP merupakan singkatan yang paling tepat dari...', ['Dynamic Host Configuration Protocol', 'Dynamic Host Control Protocol', 'Digital Host Configuration Protocol', 'Dynamic Hardware Configuration Protocol'], 0, 'DHCP = Dynamic Host Configuration Protocol.'],
  ['HTTP merupakan singkatan yang paling tepat dari...', ['Hypertext Transfer Protocol', 'Hyperlink Transfer Protocol', 'Hypertext Transmission Protocol', 'Hyper Transfer Text Protocol'], 0, 'HTTP = Hypertext Transfer Protocol.'],
  ['HTTPS menambahkan keamanan pada HTTP terutama lewat...', ['TLS', 'FTP', 'DHCP', 'ICMP'], 0, 'HTTPS = HTTP over TLS.'],
  ['FTP merupakan singkatan yang paling tepat dari...', ['File Transfer Protocol', 'File Transmission Protocol', 'Fast Transfer Protocol', 'File Transport Program'], 0, 'FTP = File Transfer Protocol.'],
  ['TCP merupakan singkatan yang paling tepat dari...', ['Transmission Control Protocol', 'Transfer Control Protocol', 'Transmission Communication Protocol', 'Transport Control Program'], 0, 'TCP = Transmission Control Protocol.'],
  ['UDP merupakan singkatan yang paling tepat dari...', ['User Datagram Protocol', 'Universal Datagram Protocol', 'User Data Protocol', 'Unified Datagram Program'], 0, 'UDP = User Datagram Protocol.'],
  ['HTML merupakan singkatan yang paling tepat dari...', ['HyperText Markup Language', 'Hyperlink Text Markup Language', 'HighText Markup Language', 'Hyper Transfer Markup Language'], 0, 'HTML = HyperText Markup Language.'],
  ['CSS merupakan singkatan yang paling tepat dari...', ['Cascading Style Sheets', 'Computer Style Sheets', 'Cascading System Styles', 'Creative Style Sheets'], 0, 'CSS = Cascading Style Sheets.'],
  ['API merupakan singkatan yang paling tepat dari...', ['Application Programming Interface', 'Application Protocol Interface', 'Advanced Programming Interface', 'Application Program Integration'], 0, 'API = Application Programming Interface.'],
  ['IDE merupakan singkatan yang paling tepat dari...', ['Integrated Development Environment', 'Internet Development Environment', 'Integrated Developer Engine', 'Internal Development Environment'], 0, 'IDE = Integrated Development Environment.'],
  ['SDK merupakan singkatan yang paling tepat dari...', ['Software Development Kit', 'System Development Kit', 'Software Design Kit', 'Source Development Kit'], 0, 'SDK = Software Development Kit.'],
  ['VPN merupakan singkatan yang paling tepat dari...', ['Virtual Private Network', 'Virtual Public Network', 'Verified Private Network', 'Virtual Protected Node'], 0, 'VPN = Virtual Private Network.'],
  ['OTP merupakan singkatan yang paling tepat dari...', ['One-Time Password', 'One-Token Password', 'Online Temporary Password', 'One-Time Protocol'], 0, 'OTP = One-Time Password.'],
  ['DDoS merupakan singkatan yang paling tepat dari...', ['Distributed Denial of Service', 'Digital Denial of Service', 'Distributed Data of Service', 'Direct Denial of System'], 0, 'DDoS = Distributed Denial of Service.'],
  ['OLED merupakan singkatan yang paling tepat dari...', ['Organic Light-Emitting Diode', 'Optical Light-Emitting Display', 'Organic LED Emission Device', 'Output Light-Emitting Diode'], 0, 'OLED = Organic Light-Emitting Diode.'],
];
singkatan.forEach(([q, o, a, e]) => add('singkatan', q, o, a, e));

// ===== SOFTWARE KLASIK =====
const klasik = [
  ['Browser web yang sering disebut sebagai browser grafis pertama yang populer di awal WWW adalah...', ['Mosaic', 'Netscape Navigator', 'Internet Explorer', 'Opera'], 0, 'NCSA Mosaic (1993) mempopulerkan browsing grafis.'],
  ['Netscape Navigator terutama dikenal sebagai...', ['Browser web era 1990-an', 'Editor spreadsheet', 'Database server', 'Antivirus'], 0, 'Netscape Navigator adalah browser legendaris.'],
  ['Internet Explorer dikembangkan oleh...', ['Microsoft', 'Netscape', 'Sun Microsystems', 'IBM'], 0, 'IE adalah browser Microsoft.'],
  ['Aplikasi desktop pemetaan yang sangat berpengaruh di dunia GIS adalah...', ['ArcView / ArcGIS (ESRI)', 'Notepad', 'Winamp', 'Paint'], 0, 'ESRI ArcView/ArcGIS mendominasi GIS klasik.'],
  ['Google Earth (awalnya Keyhole Earth Viewer) berguna untuk...', ['Eksplorasi peta & citra satelit', 'Menulis dokumen', 'Kompilasi C++', 'Editing audio'], 0, 'Google Earth untuk eksplorasi bumi secara visual.'],
  ['Winamp paling dikenal sebagai...', ['Pemutar media/audio', 'Browser', 'Spreadsheet', 'Email client'], 0, 'Winamp = media player ikonik.'],
  ['Adobe Photoshop terutama untuk...', ['Editing gambar raster', 'Database relasional', 'Virtualisasi OS', 'Routing jaringan'], 0, 'Photoshop = editor gambar.'],
  ['Microsoft Paint adalah...', ['Aplikasi gambar sederhana bawaan Windows', 'Compiler Java', 'Web server', 'FTP client'], 0, 'Paint = drawing tool sederhana.'],
  ['HyperCard (Apple) terkenal karena...', ['Hypermedia / stack kartu interaktif', 'Browser Chrome', 'Kernel Linux', 'Protocol TCP'], 0, 'HyperCard memengaruhi ide hypermedia & authoring.'],
  ['Lotus 1-2-3 adalah...', ['Spreadsheet populer sebelum Excel mendominasi', 'Browser pertama', 'Sistem operasi', 'Bahasa assembly'], 0, 'Lotus 1-2-3 = spreadsheet klasik PC.'],
  ['WordPerfect di era DOS/Windows awal adalah...', ['Pengolah kata kompetitor Word', 'Database', 'Game engine', 'Mail server'], 0, 'WordPerfect = word processor klasik.'],
  ['VisiCalc sering disebut sebagai...', ['Spreadsheet “killer app” awal untuk PC', 'Browser pertama', 'Antivirus pertama', 'Bahasa HTML'], 0, 'VisiCalc mendorong adopsi personal computer.'],
  ['ICQ adalah contoh awal dari...', ['Instant messaging', 'Spreadsheet', 'CAD', 'Compiler'], 0, 'ICQ = IM populer akhir 1990-an.'],
  ['Napster paling dikenal karena...', ['Berbagi file musik peer-to-peer', 'Membuat peta GIS', 'Editing video pro', 'Virtualisasi'], 0, 'Napster = P2P music sharing.'],
  ['Yahoo! Maps / MapQuest di awal web terutama untuk...', ['Navigasi & peta online', 'Coding IDE', 'Email hanya offline', 'Desain PCB'], 0, 'MapQuest/Yahoo Maps = peta web awal.'],
];
klasik.forEach(([q, o, a, e]) => add('software_klasik', q, o, a, e));

// ===== AI =====
const ai = [
  ['AI (Artificial Intelligence) secara umum berarti...', ['Kemampuan mesin meniru aspek kecerdasan manusia', 'Hanya robot fisik', 'Hanya spreadsheet otomatis', 'Antivirus saja'], 0, 'AI = kecerdasan artifisial pada sistem.'],
  ['Machine Learning adalah...', ['Cabang AI di mana model belajar dari data', 'Bahasa pemrograman', 'Jenis RAM', 'Protocol jaringan'], 0, 'ML belajar pola dari data.'],
  ['LLM kepanjangan yang tepat...', ['Large Language Model', 'Linear Learning Machine', 'Local Logic Module', 'Long Latency Model'], 0, 'LLM = Large Language Model.'],
  ['Supervised learning membutuhkan...', ['Data berlabel', 'Hanya reward tanpa label', 'Tanpa data sama sekali', 'Hanya CPU tanpa dataset'], 0, 'Supervised = input + label target.'],
  ['Unsupervised learning biasanya untuk...', ['Clustering / menemukan struktur tanpa label', 'Hanya klasifikasi dengan label lengkap', 'Menghapus virus', 'Routing paket'], 0, 'Unsupervised tanpa label eksplisit.'],
  ['Neural network terinspirasi kasar dari...', ['Jaringan saraf biologis', 'Hard disk mechanik', 'Protocol SMTP', 'BIOS firmware'], 0, 'Artificial neural nets meniru struktur saraf secara abstrak.'],
  ['Overfitting terjadi ketika model...', ['Terlalu hafal data latih, generalisasi buruk', 'Selalu under-capacity', 'Tidak pernah dilatih', 'Hanya jalan di CPU Intel'], 0, 'Overfit = performa val/test jelek meski train bagus.'],
  ['Prompt dalam konteks GenAI adalah...', ['Instruksi/teks masukan ke model', 'Jenis GPU', 'Format file Excel', 'Port USB'], 0, 'Prompt = input ke model generatif.'],
  ['Training vs Inference: inference adalah...', ['Menjalankan model untuk prediksi', 'Mengumpulkan dataset mentah saja', 'Menginstall Windows', 'Menulis macro Word'], 0, 'Inference = pakai model yang sudah dilatih.'],
  ['Tokenisasi pada LLM berarti...', ['Memecah teks jadi unit (token) untuk diproses model', 'Enkripsi hard disk', 'Kompresi ZIP', 'Virtualisasi OS'], 0, 'Tokenizer memecah teks ke token.'],
  ['Computer Vision fokus pada...', ['Memahami gambar/video', 'Hanya audio speech', 'Hanya spreadsheet', 'Routing BGP'], 0, 'CV = persepsi visual.'],
  ['NLP (Natural Language Processing) fokus pada...', ['Bahasa manusia (teks/suara)', 'Pendinginan CPU', 'Desain motherboard', 'Power supply'], 0, 'NLP = pemrosesan bahasa alami.'],
  ['Hallucination pada LLM berarti...', ['Model menghasilkan info yang terdengar yakin tapi salah', 'GPU overheat', 'RAM full', 'DNS gagal'], 0, 'Hallucination = output fiktif/tidak akurat.'],
  ['Dataset training yang bias dapat menyebabkan...', ['Model menghasilkan keputusan/output bias', 'Monitor lebih cerah', 'SSD lebih cepat', 'USB jadi Thunderbolt'], 0, 'Bias data → bias model.'],
  ['GPU sering dipakai di AI karena...', ['Paralelisme tinggi untuk operasi tensor/matriks', 'Lebih cocok mengetik dokumen', 'Menggantikan router', 'Menyimpan email'], 0, 'GPU unggul di komputasi paralel ML.'],
];
ai.forEach(([q, o, a, e]) => add('ai', q, o, a, e));

// ===== HARDWARE (with images) =====
const hardware = [
  ['Alat pena pada gambar paling tepat disebut...', ['Stylus (digital pen)', 'Trackball', 'Joystick', 'Light pen generik tanpa konteks tablet'], 0, 'Ini stylus/digital pen untuk input tulis/gambar.', 'assets/images/stylus.svg'],
  ['Perangkat pada gambar adalah...', ['Graphics tablet (digitizer tablet)', 'Scanner flatbed', 'Optical drive', 'UPS'], 0, 'Graphics tablet + stylus untuk input gambar presisi.', 'assets/images/graphics-tablet.svg'],
  ['Modul pada gambar adalah...', ['RAM (DIMM)', 'SSD M.2', 'GPU fan', 'CMOS battery'], 0, 'Bentuk PCB panjang dengan chip & contact = RAM DIMM.', 'assets/images/ram.svg'],
  ['Komponen kotak dengan banyak pin/kaki pada gambar adalah...', ['CPU (processor)', 'PSU', 'HDD platter', 'Speaker'], 0, 'Package persegi dengan pin/pads = CPU.', 'assets/images/cpu.svg'],
  ['Kartu ekspansi berkipas pada gambar adalah...', ['GPU / graphics card', 'NIC sederhana tanpa cooler', 'Sound card ISA', 'TV tuner USB'], 0, 'PCB panjang + cooler tipikal VGA/GPU.', 'assets/images/gpu.svg'],
  ['Kotak metal dengan kipas & konektor power pada gambar adalah...', ['PSU (Power Supply Unit)', 'UPS eksternal', 'Chassis fan saja', 'HDD enclosure'], 0, 'PSU mensuplai daya ke komponen PC.', 'assets/images/psu.svg'],
  ['Perangkat putar dengan platter pada gambar adalah...', ['HDD (Hard Disk Drive)', 'SSD NVMe', 'Optical tray saja', 'Floppy tanpa casing'], 0, 'Platter + actuator arm = HDD.', 'assets/images/hdd.svg'],
  ['Modul tanpa bagian bergerak pada gambar adalah...', ['SSD (Solid State Drive)', 'HDD 3.5"', 'CD-ROM mechanik', 'Tape drive'], 0, 'SSD menyimpan data di flash memory.', 'assets/images/ssd.svg'],
  ['Pointer device dengan bola di atas pada gambar adalah...', ['Trackball', 'Stylus', 'Touchpad biasa', 'Graphics tablet'], 0, 'Trackball: bola digulirkan, badan tetap.', 'assets/images/trackball.svg'],
  ['Perangkat cadangan daya pada gambar adalah...', ['UPS (Uninterruptible Power Supply)', 'PSU internal saja', 'Power strip biasa', 'Inverter laptop charger'], 0, 'UPS memberi daya saat listrik padam (sementara).', 'assets/images/ups.svg'],
  ['Sirip logam di atas prosesor pada gambar adalah...', ['Heatsink', 'RAM heat spreader saja', 'GPU shroud', 'PSU grille'], 0, 'Heatsink membuang panas CPU/GPU.', 'assets/images/heatsink.svg'],
  ['Drive dengan tray cakram pada gambar adalah...', ['Optical disc drive (CD/DVD/Blu-ray)', 'SSD 2.5"', 'Card reader saja', 'Floppy 3.5"'], 0, 'Optical drive membaca cakram optik.', 'assets/images/optical-drive.svg'],
  ['Alat genggam yang membaca garis hitam-putih pada gambar adalah...', ['Barcode scanner', 'OCR pen khusus teks', 'Stylus tablet', 'Webcam'], 0, 'Barcode scanner membaca barcode.', 'assets/images/barcode-scanner.svg'],
  ['Fungsi utama RAM adalah...', ['Menyimpan data aktif sementara untuk diproses CPU', 'Menyimpan OS secara permanen saja', 'Mensuplai listrik', 'Pendinginan GPU'], 0, 'RAM = memori volatil akses cepat.'],
  ['Fungsi utama SSD dibanding HDD umumnya...', ['Akses data lebih cepat, tanpa platter berputar', 'Selalu lebih murah per GB di semua era', 'Hanya untuk audio', 'Menggantikan PSU'], 0, 'SSD flash biasanya jauh lebih responsif.'],
  ['Input device untuk menulis langsung di permukaan tablet digitizer disebut...', ['Stylus / digital pen', 'Trackball', 'Dot-matrix head', 'CRT yoke'], 0, 'Stylus = pena digital.'],
  ['Komponen yang mengubah AC ke DC untuk motherboard adalah...', ['PSU', 'UPS saja tanpa konversi ke rail PC', 'GPU', 'NIC'], 0, 'PSU menyediakan rail DC (12V, 5V, dll).'],
  ['Port yang umum untuk monitor digital modern adalah...', ['HDMI / DisplayPort', 'PS/2 saja', 'RJ11 telepon', 'Parallel LPT saja'], 0, 'HDMI/DP umum untuk display modern.'],
  ['NIC berfungsi untuk...', ['Menghubungkan komputer ke jaringan', 'Pendinginan CPU', 'Menyimpan file permanen', 'Mensuplai daya GPU'], 0, 'NIC = Network Interface Card.'],
  ['CMOS battery pada motherboard terutama untuk...', ['Menjaga pengaturan BIOS/UEFI & clock saat mati listrik', 'Menjalankan GPU gaming', 'Mengisi daya UPS', 'Menyalakan SSD'], 0, 'Baterai CMOS menjaga RTC & partial settings.'],
];
hardware.forEach(([q, o, a, e, img]) => add('hardware', q, o, a, e, img || null));

// ===== OFFICE (opsi mirip — hafalan jalur/toolbar) =====
const office = [
  ['Di Microsoft Word, "Copy formatting from one place and apply it to another" adalah fungsi dari...', ['Format Painter (Home)', 'Format Painter (Insert)', 'Format Painter (Layout)', 'Format Painter (References)'], 0, 'Format Painter ada di tab Home.'],
  ['Select the best path for applying / running a macro on an Excel sheet...', ['Developer → Macros → pilih macro → Run', 'Insert → Sheet Options → Insert Macro', 'Layout → Arrange → Run Macro', 'Review → Protect → Insert Macro'], 0, 'Jalankan macro dari tab Developer → Macros.'],
  ['Jalur paling tepat membuka Visual Basic Editor di Word/Excel modern...', ['Developer → Visual Basic', 'Insert → Text → Visual Basic', 'File → Info → Visual Basic', 'View → Macros → Visual Basic Options → Chart'], 0, 'VBE dibuka dari Developer → Visual Basic.'],
  ['Untuk merekam macro baru di Excel, urutan paling tepat...', ['Developer → Record Macro', 'Insert → Record Macro', 'Data → Record Macro', 'Formulas → Record Macro'], 0, 'Record Macro ada di tab Developer.'],
  ['Di Word, Mail Merge wizard klasik paling tepat dimulai dari...', ['Mailings → Start Mail Merge', 'Insert → Mail Merge', 'References → Mailings Merge', 'Home → Editing → Mail Merge'], 0, 'Mail Merge di tab Mailings.'],
  ['"Find and replace text" di Word paling tepat lewat...', ['Home → Editing → Replace (Ctrl+H)', 'Insert → Text → Replace', 'Review → Language → Replace', 'Layout → Page Setup → Replace'], 0, 'Replace ada di Home → Editing.'],
  ['Mengunci heading row agar tetap terlihat saat scroll di Excel...', ['View → Freeze Panes → Freeze Top Row', 'View → Freeze Panes → Freeze First Column', 'Data → Sort → Freeze Top Row', 'Home → Format → Freeze Top Row'], 0, 'Freeze Top Row di View → Freeze Panes.'],
  ['Rumus penjumlahan A1:A10 yang paling tepat...', ['=SUM(A1:A10)', '=SUM(A1-A10)', '=ADD(A1:A10)', '=TOTAL(A1:A10)'], 0, 'Pakai SUM dengan rentang bertitik dua.'],
  ['Rata-rata B1:B5 yang paling tepat...', ['=AVERAGE(B1:B5)', '=AVG(B1:B5)', '=MEAN(B1:B5)', '=AVERAGE(B1-B5)'], 0, 'AVERAGE(range) dengan : bukan -.'],
  ['Referensi absolut sel A1 yang benar...', ['$A$1', '$A1$', 'A$1$', '#A#1'], 0, '$A$1 mengunci kolom dan baris.'],
  ['VLOOKUP mencari nilai secara...', ['Vertikal di kolom kiri tabel, kembalikan kolom ke-n', 'Horizontal di baris atas tabel saja', 'Hanya di chart title', 'Hanya antar workbook terproteksi'], 0, 'VLOOKUP = vertical lookup.'],
  ['Di PowerPoint, mulai slideshow dari slide pertama...', ['F5', 'Shift+F5', 'Ctrl+F5', 'Alt+F5'], 0, 'F5 dari awal; Shift+F5 dari slide aktif.'],
  ['Perbedaan paling tepat Transitions vs Animations...', ['Transitions: antar-slide; Animations: objek dalam slide', 'Transitions: objek dalam slide; Animations: antar-slide', 'Keduanya hanya untuk teks WordArt', 'Keduanya hanya di Notes Master'], 0, 'Transition = pindah slide; Animation = objek.'],
  ['Menambah slide baru di PowerPoint paling tepat...', ['Home → New Slide (Ctrl+M)', 'Insert → New Slide (Ctrl+N)', 'Design → New Slide', 'Slide Show → New Slide'], 0, 'New Slide di Home / Ctrl+M.'],
  ['Menggabungkan sel di Excel (Merge & Center) ada di...', ['Home → Alignment → Merge & Center', 'Insert → Text → Merge & Center', 'Layout → Arrange → Merge & Center', 'Data → Outline → Merge & Center'], 0, 'Merge & Center di Home → Alignment.'],
  ['PivotTable paling tepat dibuat lewat...', ['Insert → PivotTable', 'Data → PivotTable', 'Home → PivotTable', 'Formulas → PivotTable'], 0, 'Insert → PivotTable.'],
  ['Chart cepat di Excel paling tepat lewat...', ['Insert → Charts', 'Data → Charts', 'Review → Charts', 'View → Charts'], 0, 'Charts di tab Insert.'],
  ['Page Break di Word shortcut paling tepat...', ['Ctrl+Enter', 'Ctrl+Shift+Enter', 'Alt+Enter', 'Ctrl+Space'], 0, 'Ctrl+Enter = page break.'],
  ['Styles (Heading 1, dll.) di Word ada di tab...', ['Home', 'Insert', 'Design saja', 'Layout saja'], 0, 'Gallery Styles di Home.'],
  ['Ctrl+B di Word/Excel menerapkan...', ['Bold', 'Italic', 'Underline', 'Align Center'], 0, 'Ctrl+B = Bold.'],
  ['Di Excel, COUNTIF menghitung sel yang...', ['Memenuhi satu kriteria pada range', 'Memenuhi banyak kriteria wajib (tanpa COUNTIFS)', 'Hanya sel kosong selalu', 'Hanya sel dengan chart'], 0, 'COUNTIF(range, criteria).'],
  ['Menampilkan semua rumus di sheet Excel (toggle)...', ['Ctrl+` (grave)', 'Ctrl+Shift+`', 'Ctrl+Alt+`', 'Alt+`'], 0, 'Ctrl+` menampilkan rumus.'],
  ['Macro global Excel biasanya disimpan di...', ['Personal Macro Workbook (PERSONAL.XLSB)', 'Normal.dotm saja', 'Presentation1.pptx', 'Desktop.ini'], 0, 'PERSONAL.XLSB untuk macro Excel global.'],
  ['Justify paragraph di Word (rata kiri-kanan) shortcut umum...', ['Ctrl+J', 'Ctrl+L', 'Ctrl+R', 'Ctrl+E'], 0, 'Ctrl+J = Justify.'],
  ['Select the best description: Format Painter di Word...', ['Salin format teks/paragraf lalu tempelkan ke tempat lain', 'Salin isi teks saja tanpa format', 'Salin gambar sebagai link', 'Salin macro antar dokumen'], 0, 'Format Painter = copy formatting.'],
  ['Insert a header di Word paling tepat lewat...', ['Insert → Header & Footer → Header', 'Layout → Header & Footer → Header', 'Design → Header', 'References → Header'], 0, 'Header di Insert → Header & Footer.'],
  ['Di PowerPoint, Notes Master berbeda dari Slide Master karena...', ['Notes Master mengatur halaman notes speaker; Slide Master layout slide', 'Keduanya identik total', 'Notes Master hanya untuk animasi', 'Slide Master hanya untuk handout printer'], 0, 'Notes Master ≠ Slide Master.'],
  ['Conditional Formatting di Excel ada di...', ['Home → Styles → Conditional Formatting', 'Insert → Styles → Conditional Formatting', 'Data → Conditional Formatting', 'Formulas → Conditional Formatting'], 0, 'Conditional Formatting di Home.'],
  ['Data Validation di Excel paling tepat lewat...', ['Data → Data Tools → Data Validation', 'Home → Data Validation', 'Insert → Data Validation', 'Review → Data Validation'], 0, 'Data Validation di tab Data.'],
  ['Wrap Text di Excel (agar teks turun baris dalam sel) ada di...', ['Home → Alignment → Wrap Text', 'Insert → Text → Wrap Text', 'Layout → Wrap Text', 'View → Wrap Text'], 0, 'Wrap Text di Home → Alignment.'],
];
office.forEach(([q, o, a, e]) => add('office', q, o, a, e));

// ===== KEAMANAN SIBER (malware *-ware + skenario) =====
const keamanan = [
  ['Budi HP-nya diam-diam merekam ketikan password lalu dikirim ke orang lain. Itu paling tepat...', ['Keylogger', 'Adware', 'Freeware', 'Firmware'], 0, 'Keylogger merekam ketikan.'],
  ['Siti membuka lampiran email, lalu file penting dienkripsi dan diminta bayar Bitcoin. Itu...', ['Ransomware', 'Spyware biasa tanpa enkripsi', 'Shareware', 'Middleware'], 0, 'Ransomware mengenkripsi data + tebusan.'],
  ['Andi menginstall “apk gratis game”, tapi muncul iklan agresif terus-menerus. Paling dekat dengan...', ['Adware', 'Firmware', 'Courseware', 'Groupware'], 0, 'Adware = iklan mengganggu.'],
  ['Malware yang menyamar sebagai program berguna (mis. “update Flash”) disebut...', ['Trojan horse', 'Worm murni tanpa payload', 'Freeware', 'Hardware'], 0, 'Trojan menyamar sebagai software sah.'],
  ['Malware yang menyebar sendiri antar komputer lewat jaringan tanpa perlu file “host” disebut...', ['Worm', 'Trojan saja', 'Spyware saja', 'Scareware saja'], 0, 'Worm self-replicating via network.'],
  ['Aplikasi diam-diam mengumpulkan riwayat chat & lokasi tanpa izin jelas. Ini...', ['Spyware', 'Software generik tanpa nuansa malware', 'Freeware selalu aman', 'Trialware'], 0, 'Spyware memata-matai pengguna.'],
  ['Pop-up palsu “PC Anda kena virus! Klik di sini” untuk menakut-nakuti agar beli produk. Itu...', ['Scareware', 'Ransomware (sudah enkripsi)', 'Firmware', 'Spyware keylogger saja'], 0, 'Scareware = takut-takuti palsu.'],
  ['Program yang tampak membantu tapi membajak browser / homepage disebut sering sebagai...', ['Browser hijacker (bentuk malware/PUA)', 'Just freeware', 'Compiler', 'Debugger'], 0, 'Browser hijacker mengubah setting browser.'],
  ['Serangan yang mengelabui orang agar menyerahkan password (bukan eksploit teknis murni) adalah...', ['Social engineering / phishing', 'Brute-force GPU only', 'Buffer overflow saja', 'SQL index rebuild'], 0, 'Phishing = manipulasi manusia.'],
  ['Email palsu “dari bank” meminta OTP. Teknik ini...', ['Phishing', 'Pharming saja selalu', 'Spimming', 'Vishing wajib telepon'], 0, 'Email penipuan kredensial = phishing.'],
  ['DDoS paling tepat digambarkan sebagai...', ['Banjir trafik dari banyak sumber hingga layanan down', 'Enkripsi file korban', 'Keylogging', 'Install adware'], 0, 'DDoS = distributed denial of service.'],
  ['Rootkit berbahaya karena...', ['Menyembunyikan keberadaan malware di level dalam sistem', 'Hanya menampilkan iklan', 'Hanya mempercepat RAM', 'Hanya mengubah wallpaper'], 0, 'Rootkit = stealth di sistem.'],
  ['Botnet adalah...', ['Jaringan komputer zombie yang dikendalikan attacker', 'Jenis printer', 'Lisensi Office', 'Firmware BIOS resmi'], 0, 'Botnet = jaringan bot.'],
  ['Crypto-miner gelap yang memakai CPU HP korban tanpa izin paling dekat dengan...', ['Cryptojacking', 'Ransomware klasik', 'Scareware pop-up saja', 'Freeware IDE'], 0, 'Cryptojacking = culik resource untuk mining.'],
  ['Softphone Andi tiba-tiba menelepon nomor premium sendiri. Malware tipe ini sering disebut...', ['Dialer / malware berbiaya', 'Freeware', 'Middleware', 'Courseware'], 0, 'Dialer menghubungi nomor berbayar.'],
  ['Perbedaan virus vs worm yang paling tepat...', ['Virus butuh host file; worm bisa menyebar mandiri lewat jaringan', 'Worm selalu butuh host; virus tidak', 'Keduanya identik total', 'Virus hanya di printer'], 0, 'Virus parasitic; worm self-contained spread.'],
  ['Firewall terutama berfungsi...', ['Menyaring trafik jaringan masuk/keluar menurut aturan', 'Menghapus ransomware yang sudah enkripsi otomatis selalu', 'Mengganti PSU', 'Mengompilasi APK'], 0, 'Firewall = network filter.'],
  ['2FA / MFA membantu karena...', ['Butuh faktor tambahan selain password', 'Menghapus semua trojan otomatis', 'Mengganti antivirus', 'Menonaktifkan DNS'], 0, 'Multi-factor authentication.'],
  ['PUA / Potentially Unwanted Application paling tepat...', ['Aplikasi yang tidak jelas berbahaya tapi tidak diinginkan (toolbar, bundling)', 'Selalu ransomware', 'Selalu firmware resmi OEM', 'Selalu open source aman'], 0, 'PUA = unwanted/grayware.'],
  ['Budi dikirimi USB “materi kuliah”; setelah dicolok, malware jalan otomatis. Vektor ini...', ['Removable media infection', 'SQL injection murni', 'DNS spoofing saja', 'XSS pada printer'], 0, 'Infeksi lewat media removable.'],
  ['Man-in-the-middle (MITM) berarti...', ['Attacker menyisip di antara dua pihak yang berkomunikasi', 'Malware hanya di GPU', 'Hanya adware', 'Hanya freeze panes Excel'], 0, 'MITM = intercept komunikasi.'],
  ['Zero-day exploit memanfaatkan...', ['Kerentanan yang belum ada patch publik', 'Password yang sudah diubah kemarin', 'Freeware legal', 'Update Windows resmi'], 0, 'Zero-day = belum ditambal vendor.'],
  ['Backup offline / immutable berguna melawan ransomware karena...', ['Salinan data tidak ikut terenkripsi di sistem yang sama', 'Mempercepat trojan', 'Menambah adware', 'Menonaktifkan 2FA'], 0, 'Backup terpisah = pemulihan.'],
  ['HTTPS membantu mengurangi risiko karena...', ['Mengenkripsi data antara browser dan server (TLS)', 'Menghapus worm otomatis', 'Mengganti antivirus', 'Memblokir semua USB'], 0, 'HTTPS = HTTP + TLS.'],
  ['Wiper malware bertujuan utama...', ['Menghancurkan/menghapus data, bukan tebusan', 'Hanya menampilkan iklan', 'Hanya keylogging', 'Hanya mining'], 0, 'Wiper = destroy data.'],
];
keamanan.forEach(([q, o, a, e]) => add('keamanan', q, o, a, e));

// ===== PRINTER =====
const printer = [
  ['Printer yang menyemprotkan tinta cair lewat nozzle disebut...', ['Inkjet', 'Laser', 'Dot matrix', 'Thermal transfer saja'], 0, 'Inkjet = semprot tinta.'],
  ['Printer yang memakai toner & drum elektrostatik adalah...', ['Laser printer', 'Inkjet', 'Dot matrix', 'Plotter pena saja'], 0, 'Laser memakai toner.'],
  ['Printer impact yang memukul pita tinta dengan jarum disebut...', ['Dot matrix', 'Inkjet', 'Laser', '3D FDM'], 0, 'Dot matrix = impact pin.'],
  ['Printer struk kasir yang memakai panas pada kertas sensitif umumnya...', ['Thermal printer', 'Inkjet foto', 'Laser A3', 'Plotter cutting saja'], 0, 'Thermal receipt printer.'],
  ['Printer berukuran besar untuk gambar teknik/CAD sering disebut...', ['Plotter', 'Dot matrix kecil', 'Thermal label saja', 'Inkjet portable saja'], 0, 'Plotter untuk format besar.'],
  ['Printer 3D yang melelehkan filamen plastik (FDM) termasuk...', ['3D printer (additive manufacturing)', 'Laser 2D biasa', 'Dot matrix', 'Thermal fax saja'], 0, 'FDM = jenis 3D printer umum.'],
  ['Perbedaan inkjet vs laser yang paling tepat...', ['Inkjet: tinta cair; Laser: toner bubuk + fuser', 'Keduanya wajib pita kain', 'Laser selalu lebih murah tinta per ml selalu', 'Inkjet tidak bisa warna'], 0, 'Teknologi pewarnaan berbeda.'],
  ['Multifunction printer (MFP) biasanya menggabungkan...', ['Print + scan + copy (± fax)', 'Hanya CPU + GPU', 'Hanya router + switch', 'Hanya UPS + PSU'], 0, 'MFP = all-in-one.'],
  ['Port legacy yang sering dipakai printer lama sebelum USB dominan...', ['Parallel (LPT)', 'HDMI', 'DisplayPort', 'Thunderbolt saja'], 0, 'Parallel port untuk printer lama.'],
  ['Dye-sublimation printer umum untuk...', ['Cetak foto berkualitas tinggi', 'Cetak struk kasir murah saja', 'Impact multipart form saja', 'Cutting vinyl saja'], 0, 'Dye-sub sering untuk foto.'],
  ['Solid ink printer (unik) memakai...', ['Blok tinta padat yang dilelehkan', 'Hanya toner laser standar', 'Hanya pita dot matrix', 'Hanya kertas thermal'], 0, 'Solid ink = crayon-like blocks.'],
  ['Label printer di gudang sering memakai...', ['Thermal / thermal transfer label printer', 'Plotter pena A0 saja', '3D resin saja', 'CRT printer'], 0, 'Label thermal umum di logistik.'],
  ['Printer LED mirip laser tetapi...', ['Menggunakan LED array menggantikan laser beam untuk exposure', 'Menggunakan pita kain', 'Tidak memakai toner', 'Hanya cetak 3D'], 0, 'LED printer ≈ elektrofotografi dengan LED.'],
  ['Yang BUKAN jenis printer umumnya...', ['Router Wi-Fi', 'Inkjet', 'Laser', 'Dot matrix'], 0, 'Router bukan printer.'],
  ['Keunggulan dot matrix di formulir rangkap (carbon copy)...', ['Impact bisa mencetak banyak lembar sekaligus', 'Lebih halus dari dye-sub foto', 'Tidak perlu pita', 'Selalu nirkabel wajib'], 0, 'Impact = multipart forms.'],
  ['Toner habis biasanya terjadi pada...', ['Laser / LED printer', 'Inkjet saja selalu', 'Thermal murni tanpa ribbon', 'Plotter pena tinta India saja'], 0, 'Toner = laser/LED.'],
  ['Cartridge tinta habis biasanya pada...', ['Inkjet', 'Laser enterprise saja', 'Dot matrix impact saja', 'Thermal receipt tanpa ink'], 0, 'Inkjet pakai ink cartridge/tank.'],
  ['Print spooler di OS berfungsi...', ['Mengantre & mengelola pekerjaan cetak', 'Mengenkripsi ransomware', 'Mengganti motherboard', 'Menjalankan macro Excel'], 0, 'Spooler = print queue service.'],
  ['DPI pada spesifikasi printer mengukur...', ['Resolusi cetak (dots per inch)', 'Kecepatan RAM', 'Kapasitas SSD', 'Voltase PSU'], 0, 'DPI = kerapatan titik.'],
  ['PPM pada printer biasanya berarti...', ['Pages Per Minute (kecepatan cetak)', 'Pixels Per Millimeter wajib', 'Power Per Module', 'Packet Per MAC'], 0, 'PPM = kecepatan halaman/menit.'],
];
printer.forEach(([q, o, a, e]) => add('printer', q, o, a, e));

const out = {
  version: 3,
  categories: Object.values(cats),
  questions: Q,
};

fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/questions.json', JSON.stringify(out));
console.log('categories', out.categories.length);
console.log('questions', Q.length);
for (const c of out.categories) {
  console.log(c.id, Q.filter((x) => x.category === c.id).length);
}

// Always re-merge LCTK revisi bank after regenerating base
const merge = spawnSync(process.execPath, ['tools/merge_revisi.mjs'], { stdio: 'inherit' });
if (merge.status !== 0) process.exit(merge.status ?? 1);
