/**
 * Merge bank_soal_lctk_revisi.json into official data/questions.json
 * Run: node tools/merge_revisi.mjs
 */
import fs from 'fs';

const LETTER = { A: 0, B: 1, C: 2, D: 3 };

/** Classify revisi item id → category */
function classify(item) {
  const id = item.id;
  const s = String(item.soal || '').toLowerCase();

  // Explicit ranges / topics from LCTK revisi
  if (id >= 97 && id <= 104) return 'android_pengetahuan';
  if (id >= 105 && id <= 112) return 'ai';
  if ((id >= 6 && id <= 10) || (id >= 89 && id <= 96)) return 'office';
  if (id === 28) return 'tik'; // definisi teknologi informasi
  if (id === 2 || id === 42) return 'printer';

  if (
    (id >= 1 && id <= 5 && id !== 2) ||
    (id >= 26 && id <= 27) ||
    (id >= 29 && id <= 45 && id !== 42) ||
    (id >= 72 && id <= 74) ||
    id === 80 ||
    id === 84 ||
    id === 87
  ) {
    return 'hardware';
  }

  if (
    (id >= 16 && id <= 18) ||
    (id >= 53 && id <= 63) ||
    id === 75 ||
    id === 78 ||
    id === 81 ||
    id === 88 ||
    (id >= 113 && id <= 117)
  ) {
    return 'jaringan';
  }

  if (
    (id >= 13 && id <= 15) ||
    (id >= 48 && id <= 52) ||
    id === 76 ||
    id === 77 ||
    id === 82 ||
    id === 83 ||
    id === 86
  ) {
    return 'pemrograman';
  }

  if (
    (id >= 11 && id <= 12) ||
    (id >= 23 && id <= 25) ||
    (id >= 46 && id <= 47) ||
    id === 85
  ) {
    return 'sistem';
  }

  if (id === 19 || id === 20 || id === 64 || id === 116) return 'keamanan';

  if (
    (id >= 21 && id <= 22) ||
    (id >= 28 && id <= 29) ||
    (id >= 65 && id <= 71) ||
    id === 79
  ) {
    return 'tik';
  }

  // keyword fallback
  if (/codename|versi android|android \d/.test(s) && /codename|versi|dessert/.test(s)) return 'android';
  if (/android|apk|kotlin|activity|manifest|studio/.test(s)) return 'android_pengetahuan';
  if (/artificial|kecerdasan|machine learning|nlp|turing/.test(s)) return 'ai';
  if (/word|excel|powerpoint|vlookup|mail merge|slide|macro/.test(s)) return 'office';
  if (/topologi|jaringan|router|ip |lan|wan|man |switch|hub/.test(s)) return 'jaringan';
  if (/python|html|java|cobol|pemrograman|programmer|tag /.test(s)) return 'pemrograman';
  if (/windows|linux|dos|operating|utilitas|sistem operasi|task manager/.test(s)) return 'sistem';
  if (/virus|firewall|enkripsi|phishing|keamanan|malware|trojan|spyware|ransomware/.test(s)) return 'keamanan';
  if (/printer|inkjet|laserjet|plotter|dot matrix|thermal/.test(s)) return 'printer';
  if (/unbk|e-learning|cbl|brainware|teknologi informasi|keselamatan/.test(s)) return 'tik';
  if (/ram|cpu|monitor|harddisk|scanner|motherboard|sound card/.test(s)) return 'hardware';

  return 'tik';
}

function convert(item) {
  const options = ['A', 'B', 'C', 'D'].map((k) => item.opsi[k]);
  const answer = LETTER[item.jawaban];
  if (answer == null || options.some((o) => o == null)) {
    throw new Error(`Invalid item id=${item.id}`);
  }
  const correctText = options[answer];
  return {
    id: `lctk_${String(item.id).padStart(3, '0')}`,
    category: classify(item),
    question: item.soal,
    options,
    answer,
    explanation: `Jawaban yang tepat: ${item.jawaban}. ${correctText}`,
    image: null,
    source: 'lctk_revisi',
  };
}

// Load base bank (from generator output) OR current official
const basePath = 'data/questions.json';
const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));

// Drop previously merged revisi items so merge is idempotent
base.questions = (base.questions || []).filter((q) => q.source !== 'lctk_revisi' && !String(q.id).startsWith('lctk_'));

const revisi = JSON.parse(fs.readFileSync('bank_soal_lctk_revisi.json', 'utf8'));
const converted = revisi.map(convert);

const extraCats = {
  jaringan: {
    id: 'jaringan',
    title: 'Jaringan Komputer',
    desc: 'LAN/WAN, topologi, IP, router — dari bank LCTK revisi',
  },
  pemrograman: {
    id: 'pemrograman',
    title: 'Pemrograman & Web',
    desc: 'Python, HTML, generasi bahasa, brainware teknis',
  },
  sistem: {
    id: 'sistem',
    title: 'Sistem & Utilitas',
    desc: 'OS, DOS, utilitas, manajemen Windows',
  },
  keamanan: {
    id: 'keamanan',
    title: 'Keamanan Siber',
    desc: 'Malware *-ware, skenario hack, phishing, ransomware',
  },
  printer: {
    id: 'printer',
    title: 'Jenis Printer',
    desc: 'Inkjet, laser, dot matrix, thermal, plotter, 3D',
  },
  android_pengetahuan: {
    id: 'android_pengetahuan',
    title: 'Pengetahuan Android',
    desc: 'APK, komponen, Manifest, IDE — bukan nomor versi',
  },
  tik: {
    id: 'tik',
    title: 'TIK & Pendidikan',
    desc: 'Konsep TI, UNBK, e-learning, etika lab',
  },
};

const byId = new Map((base.categories || []).map((c) => [c.id, c]));
for (const c of Object.values(extraCats)) byId.set(c.id, c);

base.categories = [...byId.values()];
base.questions = [...base.questions, ...converted];
base.version = Math.max(2, base.version || 2) + 0.1;
base.updatedAt = new Date().toISOString();

fs.writeFileSync(basePath, JSON.stringify(base));

const counts = {};
for (const q of base.questions) counts[q.category] = (counts[q.category] || 0) + 1;
console.log('total', base.questions.length);
console.log('categories', base.categories.map((c) => c.id).join(', '));
for (const [k, v] of Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`  ${k}: ${v}`);
}
console.log('merged revisi:', converted.length);
