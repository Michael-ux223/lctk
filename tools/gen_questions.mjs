/** Generate data/questions.json — run: node tools/gen_questions.mjs */
import fs from 'fs';

const cats = {
  android: { id: 'android', title: 'Android Versions', desc: 'Codename & versi Android — soal & opsi diacak' },
  singkatan: { id: 'singkatan', title: 'Singkatan IT', desc: 'Jebakan mirip-mirip — harus hafal yang paling tepat' },
  software_klasik: { id: 'software_klasik', title: 'Software Klasik', desc: 'Browser pertama, app map, software legendaris' },
  ai: { id: 'ai', title: 'Artificial Intelligence', desc: 'Dasar AI, ML, LLM, dan istilah modern' },
  hardware: { id: 'hardware', title: 'Hardware Komputer', desc: 'Kenali alat dari gambar — semua opsi masuk akal' },
  office: { id: 'office', title: 'Word · Excel · PowerPoint', desc: 'Macro, rumus, shortcut, dan alur kerja Office' },
};

const Q = [];
let n = 1;
const id = () => `q${String(n++).padStart(3, '0')}`;
const add = (category, question, options, answer, explanation, image = null) => {
  Q.push({ id: id(), category, question, options, answer, explanation, image });
};

// ===== ANDROID =====
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
  ['API level Android 5.0 Lollipop?', ['API 19', 'API 21', 'API 23', 'API 24'], 1, 'Lollipop 5.0 = API 21.'],
  ['API level Android 6.0 Marshmallow?', ['API 21', 'API 22', 'API 23', 'API 24'], 2, 'Marshmallow = API 23.'],
  ['API level Android 8.0 Oreo?', ['API 24', 'API 25', 'API 26', 'API 27'], 2, 'Oreo 8.0 = API 26.'],
  ['API level Android 10?', ['API 28', 'API 29', 'API 30', 'API 31'], 1, 'Android 10 = API 29.'],
  ['Runtime default Android modern?', ['Dalvik', 'ART', 'JVM HotSpot', 'Mono'], 1, 'Android Runtime (ART) menggantikan Dalvik.'],
  ['File package aplikasi Android?', ['.exe', '.apk', '.dmg', '.msi'], 1, 'APK = Android Package.'],
  ['Urutan dessert 4.0→5.0 yang benar?', ['ICS → Jelly Bean → KitKat → Lollipop', 'ICS → KitKat → Jelly Bean → Lollipop', 'Jelly Bean → ICS → KitKat → Lollipop', 'KitKat → ICS → Jelly Bean → Lollipop'], 0, '4.0 ICS → 4.1–4.3 JB → 4.4 KitKat → 5.x Lollipop.'],
  ['Android Go dirancang untuk?', ['Server enterprise', 'Perangkat low-RAM', 'Smartwatch saja', 'TV box premium'], 1, 'Android Go untuk perangkat berspesifikasi rendah.'],
];
android.forEach(([q, o, a, e]) => add('android', q, o, a, e));

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

// ===== OFFICE =====
const office = [
  ['Di Microsoft Word, jalur klasik untuk membuka editor VBA/Macro adalah...', ['File → Options → Customize Ribbon (centang Developer) lalu Developer → Visual Basic / Macros', 'Insert → Chart → Macro', 'Layout → Margins → Macro', 'References → Mailings → Macro'], 0, 'Aktifkan tab Developer, lalu Visual Basic/Macros.'],
  ['Shortcut rekam macro di Word (umum) mendekati...', ['Alt + T, M, R (versi lama) / lewat tab Developer → Record Macro', 'Ctrl + P langsung merekam', 'F1 otomatis rekam', 'Alt + F4 merekam'], 0, 'Rekam macro dari tab Developer (atau menu legacy Tools).'],
  ['Di Excel, rumus penjumlahan rentang A1:A10 yang benar...', ['=SUM(A1:A10)', '=ADD(A1:A10)', '=TOTAL(A1:A10)', '=PLUS(A1:A10)'], 0, 'SUM adalah fungsi agregasi standar.'],
  ['Rumus Excel untuk rata-rata B1:B5...', ['=AVERAGE(B1:B5)', '=AVG(B1:B5)', '=MEAN(B1:B5)', '=MEDIAN(B1:B5)'], 0, 'AVERAGE = mean aritmetika.'],
  ['VLOOKUP mencari nilai berdasarkan...', ['Kunci di kolom kiri tabel lalu ambil kolom ke-n', 'Selalu baris paling bawah saja', 'Nama file workbook lain wajib', 'Hanya chart'], 0, 'VLOOKUP vertical lookup.'],
  ['XLOOKUP (Excel modern) keunggulan umum dibanding VLOOKUP...', ['Lebih fleksibel (kiri/kanan, default exact, dll.)', 'Hanya jalan di Word', 'Tidak bisa exact match', 'Wajib macro'], 0, 'XLOOKUP lebih powerful & fleksibel.'],
  ['Di Excel, absolut reference untuk sel A1 ditulis...', ['$A$1', '#A#1', 'A1$', '&A&1'], 0, '$ mengunci kolom/baris.'],
  ['Shortcut bold di Word/Excel umum...', ['Ctrl + B', 'Ctrl + Shift + L', 'Alt + B', 'Ctrl + Alt + B'], 0, 'Ctrl+B = bold.'],
  ['Di PowerPoint, mode untuk melihat slide berurutan saat presentasi...', ['Slide Show', 'Notes Master saja', 'Handout Master saja', 'Backstage Info saja'], 0, 'Slide Show = presentasi.'],
  ['Shortcut mulai slideshow dari slide pertama di PowerPoint...', ['F5', 'F2', 'Ctrl + Enter', 'Alt + F4'], 0, 'F5 memulai dari awal; Shift+F5 dari slide aktif.'],
  ['Mail Merge di Word dipakai untuk...', ['Membuat dokumen massal dari data sumber (mis. Excel)', 'Mengompres gambar saja', 'Membuat pivot chart', 'Virtualisasi OS'], 0, 'Mail Merge = surat/label massal.'],
  ['PivotTable di Excel paling tepat untuk...', ['Meringkas & menganalisis data secara interaktif', 'Menulis macro Word', 'Animasi slide', 'Enkripsi BIOS'], 0, 'PivotTable = ringkasan data.'],
  ['Di Word, Page Break cepat umumnya...', ['Ctrl + Enter', 'Ctrl + Space', 'Alt + P', 'Shift + Space'], 0, 'Ctrl+Enter = page break.'],
  ['Fungsi IF di Excel berbentuk...', ['=IF(kondisi, nilai_benar, nilai_salah)', '=IF(kondisi) hanya satu argumen wajib', '=WHEN(...)', '=CASEOF(...)'], 0, 'IF punya logical_test, value_if_true, value_if_false.'],
  ['Di PowerPoint, Transitions berbeda dari Animations karena...', ['Transitions antar-slide; Animations pada objek di dalam slide', 'Transitions hanya untuk teks; Animations hanya untuk audio', 'Keduanya identik total', 'Transitions hanya di Word'], 0, 'Transition = pindah slide; Animation = objek.'],
  ['Di Excel, COUNTIF menghitung sel yang...', ['Memenuhi satu kriteria', 'Selalu semua sel numerik tanpa kriteria', 'Hanya sel kosong', 'Hanya chart title'], 0, 'COUNTIF(range, criteria).'],
  ['Untuk menampilkan rumus di sel Excel (toggle) umum memakai...', ['Ctrl + ` (grave accent)', 'Ctrl + Shift + F', 'Alt + Enter', 'F12'], 0, 'Ctrl+` menampilkan rumus di sheet.'],
  ['Di Word, Styles berguna untuk...', ['Konsistensi format & outline/heading terstruktur', 'Mengganti PSU', 'Mengatur IP statis', 'Flash BIOS'], 0, 'Styles = formatting terpusat.'],
  ['Chart di Excel dibuat cepat lewat...', ['Insert → Charts (atau Recommended Charts)', 'Review → Spelling → Chart', 'Data → Connections wajib dulu', 'File → Account'], 0, 'Insert Charts.'],
  ['Macro yang disimpan di Personal.xlsb berguna agar...', ['Tersedia di hampir semua workbook Excel user tersebut', 'Hanya jalan di PowerPoint', 'Otomatis jadi add-in Word', 'Menghapus VBA'], 0, 'Personal Macro Workbook = global macros Excel.'],
];
office.forEach(([q, o, a, e]) => add('office', q, o, a, e));

const out = {
  version: 2,
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
