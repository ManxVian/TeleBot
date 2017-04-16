'use strict'

const bot = require('../core/telegram')
const utils = require('../core/utils')
const scrapy = require('node-scrapy')
const escapeHtml = require('escape-html')

const kaskusForums = {
  8: 'Lounge Video',
  9: 'Jokes & Cartoon',
  10: 'Berita dan Politik',
  11: 'Movies',
  13: 'Website, Webmaster, Webdeveloper',
  14: 'CCPB - Shareware & Freeware',
  15: 'Disturbing Picture',
  16: 'Heart to Heart',
  18: 'Can You Solve This Game?',
  19: 'Computer Stuff',
  21: 'The Lounge',
  22: 'Buat Latihan Posting',
  23: 'Supranatural',
  24: 'Lifestyle',
  26: 'Anime & Manga Haven',
  28: 'Otomotif',
  29: 'Cooking & Resto Guide',
  30: 'Bisnis',
  31: 'Kritik, Saran, Pertanyaan Seputar KASKUS',
  32: 'Hewan Peliharaan',
  33: 'Music',
  34: 'All About Design',
  35: 'Sports',
  37: 'Ragnarok Online',
  38: 'Web-based Games',
  39: 'Girls & Boys Corner',
  44: 'Games',
  49: 'B-Log Collections',
  50: 'Poetry',
  51: 'Stories from the Heart',
  54: 'Photography',
  58: 'KaskusRadio.com',
  59: 'Gosip Nyok!',
  60: 'Selera Nusantara (Indonesian Food)',
  61: 'The Rest of the World (International Food)',
  62: 'Oriental Exotic (Asian food)',
  63: 'The KASKUS Bar',
  65: 'Linux dan OS Selain Microsoft & Mac',
  66: 'Buku',
  67: 'Education',
  70: 'Model Kit & R',
  73: 'Indonesia',
  74: 'Australia',
  76: 'USA',
  77: 'Singapore',
  78: 'DKI Jakarta',
  79: 'Melbourne',
  80: 'Sydney',
  81: 'Palembang',
  82: 'Germany',
  83: 'Canada',
  84: 'Yogyakarta',
  85: 'Netherlands',
  87: 'Music Review',
  88: 'Help, Tips & Tutorial',
  89: 'Bandung',
  90: 'Malaysia',
  91: 'Kalimantan Timur - Kalimantan Utara',
  92: 'Surabaya',
  93: 'Medan',
  94: 'Health',
  96: 'East USA',
  97: 'Bangka - Belitung',
  98: 'Outdoor Adventure & Nature Clubs',
  100: 'Online Games',
  103: 'Welcome to KASKUS',
  104: 'Soccer & Futsal Room',
  105: 'Ask da Girls',
  106: 'Perth',
  107: 'Bogor',
  108: 'Japan',
  109: 'Asia',
  111: 'Semarang',
  112: 'Kendaraan Roda 2',
  113: 'English',
  114: 'Ask da Boys',
  115: 'China',
  116: 'AMHelpdesk',
  117: 'Riau Raya',
  119: 'Console & Handheld Games',
  122: 'Western Comic',
  123: 'Mamalia',
  124: 'Burung',
  125: 'Reptil',
  126: 'Saltwater Fish',
  127: 'Freshwater Fish',
  129: 'United Kingdom',
  133: 'Malang',
  136: 'Feedback & Testimonial',
  137: 'Music Corner',
  140: 'Militer',
  144: 'Martial Arts',
  145: 'Lampung',
  146: 'Kalimantan Selatan',
  151: 'Gratisan',
  156: 'Minangkabau',
  157: 'Europe',
  158: 'Regional Lainnya',
  160: 'Solo',
  161: 'Aceh',
  162: 'Kalimantan Barat',
  164: 'Banten',
  166: 'Palu',
  167: 'Bali',
  170: 'Makassar',
  171: 'TV',
  173: 'Spiritual',
  176: 'Programmer Forum',
  177: 'KASKUS Plus Lounge',
  179: 'Manado',
  181: 'Banyumas',
  183: 'Internet Service & Networking',
  186: 'Lounge Pictures',
  187: 'Airsoft Indonesia',
  188: 'Surat Pembaca',
  191: 'Debate Club',
  192: 'Tanaman',
  193: 'Wedding & Family',
  194: 'Timur Tengah',
  195: 'Elektronik',
  196: 'Fashion & Mode',
  197: 'Flora & Fauna',
  198: 'Koleksi, Hobi & Mainan',
  199: 'Properti',
  200: 'CD & DVD',
  201: 'Makanan & Minuman',
  202: 'Jasa',
  204: 'Jual Beli Feedback & Testimonials',
  205: 'Otomotif',
  210: 'Handphone & Gadget',
  220: 'Alat-Alat Olahraga',
  221: 'Alat-Alat Musik',
  227: 'Buku',
  229: 'Obat-obatan',
  234: 'Arsitektur',
  235: 'Travellers',
  236: 'Muscle Building',
  239: 'KASKUS Corner',
  240: 'KASKUS Peduli',
  243: 'Hardware Computer',
  244: 'Latest Release',
  246: 'Sejarah & Xenology',
  247: 'Civitas Academica',
  248: 'Restaurant Review',
  249: 'Inspirasi',
  250: 'Berita Luar Negeri',
  251: 'Plamo',
  252: 'Figures',
  253: 'Gallery & Tutorial',
  263: 'KASKUS Celeb',
  270: 'Blacklist Jual Beli',
  271: 'Official Testimonials Jual Beli',
  272: 'Tips & Tutorial Jual Beli',
  273: 'Product Review',
  274: 'Fat-loss,Gain-Mass,Nutrisi Diet & Suplementasi Fitness',
  275: 'Nightlife & Events',
  276: 'Grappling',
  277: 'Entrepreneur Corner',
  278: 'Lowongan Kerja',
  279: 'Forex, Option, Saham, & Derivatifnya',
  280: 'HYIP',
  281: 'Electronics',
  282: 'Audio & Video',
  283: 'Antik',
  284: 'Karya Seni & Desain',
  286: 'Industri & Supplier',
  293: 'Kamera & Aksesoris',
  295: 'Perawatan Tubuh & Wajah',
  296: 'Furniture',
  297: 'Video Games',
  298: 'Perkakas',
  299: 'Kerajinan Tangan',
  300: 'Perlengkapan Kantor',
  303: 'Perlengkapan Rumah Tangga',
  304: 'Tur & Paket Perjalanan',
  305: 'Perlengkapan Anak & Bayi',
  306: 'Fashion',
  316: 'Tiket',
  317: 'Komputer',
  331: 'Pictures',
  332: 'Racing',
  382: 'KASKUS Theater',
  383: 'Macintosh',
  384: 'Brisbane',
  385: 'Kalimantan Tengah',
  386: 'Music Event',
  387: 'Ilmu Marketing',
  388: 'Ilmu Marketing & Research',
  389: 'Budaya',
  390: 'TokuSenKa',
  391: 'REQUEST @ CCPB',
  392: 'Hobby & Community',
  393: 'Pisau',
  394: 'Sepeda',
  395: 'Mancing',
  397: 'ISP',
  398: 'Kepulauan Riau',
  402: 'Tegal',
  403: 'Karesidenan Besuki',
  405: 'Bekasi',
  407: 'Depok',
  411: 'Karesidenan Madiun',
  412: 'Cirebon',
  419: 'Taman Bacaan CCPB',
  421: 'Visit USA',
  423: 'West USA',
  425: 'Central USA',
  427: 'Papua',
  429: 'Kids & Parenting',
  431: 'Anime',
  433: 'Manga, Manhua, & Manhwa',
  435: 'KASKUS Promo',
  437: 'Domestik',
  439: 'Mancanegara',
  440: 'Basketball',
  442: 'Templates & Scripts Stuff',
  443: 'Hosting Stuff',
  452: 'Karesidenan Kediri',
  457: 'Jawa Tengah & Yogyakarta',
  458: 'Jawa Barat, Jakarta & Banten',
  459: 'Jawa Timur & Bali',
  460: 'Sumatera',
  461: 'Kalimantan',
  462: 'Sulawesi',
  463: 'Indonesia Timur',
  464: 'English Education & Literature',
  465: 'Fun with English',
  466: 'Penawaran Kerjasama & Investasi',
  467: 'Forex',
  468: 'Options',
  469: 'Saham',
  470: 'Forex Broker',
  471: 'The Online Business',
  472: 'MLM, Member Get Member, & Sejenisnya',
  473: 'Gathering, Event Report & Bakti Sosial',
  474: 'Event from Kaskuser',
  475: 'Others',
  476: 'Others',
  477: 'Others',
  478: 'Others',
  479: 'Cinta Indonesiaku',
  480: 'Arsitektur',
  481: 'Kuliner',
  482: 'Pakaian',
  483: 'Lagu, Tarian & Alat Musik',
  484: 'Kerajinan & Ukiran',
  485: 'Kekayaan Alam, Flora & Fauna',
  486: 'Kesusastraan, Bahasa & Dongeng',
  487: 'Tata Cara Adat, Upacara & Ritual',
  488: 'Permainan Rakyat',
  489: 'Seni Peran',
  490: 'Properti Sejarah Nasional',
  491: 'Mobile Broadband',
  528: 'PC Games',
  537: 'Sport Games',
  538: 'Racket',
  539: 'Badminton',
  540: 'Korea Selatan',
  542: 'Pahlawan & Tokoh Nasional',
  543: 'Batam',
  544: 'Young on Top KASKUS Community (YOTKC)',
  545: 'Pro Wrestling',
  546: 'Dunia Kerja & Profesi',
  548: 'Jambi',
  552: 'Fanstuff',
  555: 'Jember',
  557: 'Hardware Review Lab',
  558: 'Fitness & Healthy Body',
  559: 'Quit Smoking, Alcohol & Drugs',
  561: 'Kendari',
  564: 'Karesidenan Pati',
  565: 'FutSal',
  566: 'Surat Terbuka Jual Beli',
  567: 'Gresik',
  568: 'Mac OSX Info & Discussion',
  569: 'Mac Applications & Games',
  570: 'Kendaraan Roda 4',
  571: 'The Exclusive Business Club (ExBC)',
  572: 'Penawaran Kerjasama, BO, Distribusi, Reseller, & Agen',
  575: 'Militer dan Kepolisian',
  576: 'Kepolisian',
  578: 'Teknik',
  579: 'Sipil',
  580: 'Radio Komunikasi',
  581: 'Lampu Senter',
  583: 'Mojokerto',
  584: 'Gorontalo',
  585: 'Sukabumi',
  586: 'Bengkulu',
  587: 'Bromo',
  588: 'Online Gaming',
  591: 'Jam',
  594: 'Melek Hukum',
  595: 'UKM',
  596: 'Catatan Perjalanan OANC',
  597: 'Sains & Teknologi',
  598: 'Klaten',
  599: 'Tasikmalaya',
  614: 'Serba Serbi',
  615: 'Bisnis',
  617: 'America',
  619: 'Indie Filmmaker',
  620: 'Perencanaan Keuangan',
  621: 'Film Indonesia',
  626: 'Karawang',
  627: 'Karesidenan Kedu',
  628: 'Sidoarjo',
  629: 'KASKUS Playground',
  630: 'Green Lifestyle',
  633: 'Pemilu & Pilkada',
  651: 'Karesidenan Bojonegoro',
  652: 'Madura',
  653: 'Cilacap',
  654: 'Garut',
  655: 'Komik & Ilustrasi',
  662: 'Jual Beli Latihan Posting',
  663: 'Jual Beli Zone',
  668: 'Suara KASKUSers',
  669: 'Cerita Pejalan Domestik',
  670: 'Cerita Pejalan Mancanegara',
  671: 'Animasi',
  673: 'Home Appliance',
  674: 'Vaporizer',
  675: 'Ngampus di KASKUS',
  677: 'KASKUS Online Bazaar',
  678: 'Gemstone',
  679: 'Gemstone',
  683: 'Koleksi Idola',
  684: 'MotoGP',
  685: 'F1',
  689: 'Stand Up Comedy',
  708: 'Indonesia Pusaka',
  709: 'Private Servers',
  710: 'Moba',
  711: 'Dota 2',
  712: 'Pilkada',
  713: 'Deals',
  715: 'Sista',
  716: 'Fashionista',
  717: 'Beauty',
  718: 'Women’s Health',
  723: 'Liga Mahasiswa ( Lima )',
  724: 'Health Consultation',
  725: 'Healthy Lifestyle',
  726: 'Liga Mahasiswa ( Lima )',
  727: 'Deals',
  729: 'Official Merchandise',
  730: 'Metrotvnews.com',
  731: 'Berita Olahraga',
  732: 'Berita Dunia Hiburan',
  733: 'Citizen Journalism',
  734: 'B-Log Personal',
  735: 'B-Log Community',
  736: 'Series & Film Asia',
  737: 'Reksa Dana'
}

function getKaskus (msg, forumId) {
  const url = 'https://m.kaskus.co.id/forum/' + forumId
  let model = {
    forum: 'title',
    tautan: {
      selector: '.list-entry a.link_thread_title',
      get: 'href',
      prefix: '• <a href="https://m.kaskus.co.id',
      suffix: '">'
    },
    judul: {
      selector: '.list-entry a.link_thread_title',
      get: 'text'
    }
  }

  if (forumId === 'hotthread') {
    model = {
      forum: 'title',
      tautan: {
        selector: '.list-entry a',
        get: 'href',
        prefix: '• <a href="https://m.kaskus.co.id',
        suffix: '">'
      },
      judul: {
        selector: '.detail a',
        get: 'text'
      }
    }
  }

  scrapy.scrape(url, model, function (err, data) {
    if (err) return console.error(err) // Handle error
    if (!data.tautan) {
      bot.sendMessage(msg.chat.id, 'Invalid Forum specified', utils.optionalParams(msg))
      return
    }

    let threads = []

    if (forumId === 'hotthread') {
      for (let i = 0; i < data.tautan.length; i += 3) {
        if (!data.judul[i].match(/sticky/)) {
          threads.push(data.tautan[i] + escapeHtml(data.judul[i]) + '</a>')
        }
      }
    } else {
      for (let i = 0; i < data.tautan.length; i++) {
        if (!data.judul[i].match(/sticky/)) {
          threads.push(data.tautan[i] + escapeHtml(data.judul[i]) + '</a>')
        }
      }
    }

    let kaskus = threads.join('\n')

    bot.sendMessage(msg.chat.id, '<b>' + data.forum + '</b>\n' + kaskus, utils.optionalParams(msg))
  })
}

bot.onText(/^[/!#](k|kaskus) (\d+)/, (msg, match) => {
  getKaskus(msg, `${match[2]}`)
})

bot.onText(/^[/!#](k|kaskus) (\D+)/, (msg, match) => {
  const regexp = `${match[2]}`

  if (`${match[2]}` === 'ht') {
    getKaskus(msg, 'hotthread')
  } else {
    let ids = []
    let fid

    for (let key in kaskusForums) {
      if (new RegExp(regexp, 'i').test(kaskusForums[key])) {
        ids.push('• [<code>' + key + '</code>] ' + kaskusForums[key])
        fid = key
      }
    }

    if (ids.length == 0) {
      bot.sendMessage(msg.chat.id, 'Invalid Forum specified.', utils.optionalParams(msg))
    } else if (ids.length == 1) {
      getKaskus(msg, fid)
    } else {
      const mirip = ids.join('\n')
      const title = `Berikut daftar forum dengan kata kunci "<b>${match[2]}</b>":\n`

      bot.sendMessage(msg.chat.id, title + mirip, utils.optionalParams(msg))
    }
  }
})