import { Playlist } from '../models/index.js';
// import { Playlist } from '../models/playlist.js';

export const seedPlaylist = async () => {
  await Playlist.bulkCreate(
    [
      {
        title: 'Melow Play',
        songList: [
  {
    "title": "GloRilla - TGIF (Official Music Video)",
    "artist": "GloRillaVEVO",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Kendrick Lamar - Not Like Us",
    "artist": "KendrickLamarVEVO",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Future - BRAZZIER (Official Music Video)",
    "artist": "FutureVEVO",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "DaBaby - BOP on Broadway (Hip Hop Musical)",
    "artist": "DaBaby",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "90&#39;s Hip Hop Mix #01 | Best of Old School Rap Songs | Throwback Rap Classics | Westcoast | Eastcoast",
    "artist": "DJ Noize",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Best of lofi hip hop 2021 ✨ [beats to relax/study to]",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Ｓｍｏｋｅ　Ａｎｄ　Ｃｈｉｌｌ 🚬 Lofi Hip Hop 🎵 [ Beats To Smoke / Chill / Relax / Stress Relief ]",
    "artist": "Chill Melodies",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Chill out lofi music 🍀 lofi hip hop mix makes you feel positive ~ Rainy Lofi vibes for a calm night",
    "artist": "Lofi on the Rooftop",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "lofi hip hop radio - beats to study/relax to 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Twista - Hope (Lyrics) &quot;Though I&#39;m hopeful yes I am hopeful for today&quot; [TikTok Song]",
    "artist": "LBO Lyrics",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Bars and Melody - Hopeful (Official Video)",
    "artist": "BarsAndMelodyVEVO",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Hope",
    "artist": "Twista - Topic",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "NF - HOPE",
    "artist": "NFVEVO",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Snow Tha Product - Hopeful [Official Video]",
    "artist": "Snow Tha Product",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Chillhop Drive 90&#39;s - Lofi hip hop ~ Deep Focus, Relaxing Music | Chill Music",
    "artist": "chilli music",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Chillhop Radio - jazzy &amp; lofi hip hop beats 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Chill Study Beats 2 • Instrumental &amp; Jazz Hip Hop Music [2016]",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "lofi hip hop radio - beats to study/relax to 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  }
],
        assignedUserId: 1,
      },
      {
        title: 'My Playlist2',
        songList: [
  {
    "title": "GloRilla - TGIF (Official Music Video)",
    "artist": "GloRillaVEVO",
    "url": "https://www.youtube.com/watch?v=hAQcodpwsIA"
  },
  {
    "title": "Kendrick Lamar - Not Like Us",
    "artist": "KendrickLamarVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Future - BRAZZIER (Official Music Video)",
    "artist": "FutureVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "DaBaby - BOP on Broadway (Hip Hop Musical)",
    "artist": "DaBaby",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "90&#39;s Hip Hop Mix #01 | Best of Old School Rap Songs | Throwback Rap Classics | Westcoast | Eastcoast",
    "artist": "DJ Noize",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Best of lofi hip hop 2021 ✨ [beats to relax/study to]",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Ｓｍｏｋｅ　Ａｎｄ　Ｃｈｉｌｌ 🚬 Lofi Hip Hop 🎵 [ Beats To Smoke / Chill / Relax / Stress Relief ]",
    "artist": "Chill Melodies",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chill out lofi music 🍀 lofi hip hop mix makes you feel positive ~ Rainy Lofi vibes for a calm night",
    "artist": "Lofi on the Rooftop",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio - beats to study/relax to 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Twista - Hope (Lyrics) &quot;Though I&#39;m hopeful yes I am hopeful for today&quot; [TikTok Song]",
    "artist": "LBO Lyrics",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Bars and Melody - Hopeful (Official Video)",
    "artist": "BarsAndMelodyVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Hope",
    "artist": "Twista - Topic",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "NF - HOPE",
    "artist": "NFVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Snow Tha Product - Hopeful [Official Video]",
    "artist": "Snow Tha Product",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chillhop Drive 90&#39;s - Lofi hip hop ~ Deep Focus, Relaxing Music | Chill Music",
    "artist": "chilli music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chillhop Radio - jazzy &amp; lofi hip hop beats 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chill Study Beats 2 • Instrumental &amp; Jazz Hip Hop Music [2016]",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio - beats to study/relax to 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  }
],
        assignedUserId: 2,
      },
      {
        title: 'Howd About That',
        songList: [
  {
    "title": "GloRilla - TGIF (Official Music Video)",
    "artist": "GloRillaVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Kendrick Lamar - Not Like Us",
    "artist": "KendrickLamarVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Future - BRAZZIER (Official Music Video)",
    "artist": "FutureVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "DaBaby - BOP on Broadway (Hip Hop Musical)",
    "artist": "DaBaby",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "90&#39;s Hip Hop Mix #01 | Best of Old School Rap Songs | Throwback Rap Classics | Westcoast | Eastcoast",
    "artist": "DJ Noize",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Best of lofi hip hop 2021 ✨ [beats to relax/study to]",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Ｓｍｏｋｅ　Ａｎｄ　Ｃｈｉｌｌ 🚬 Lofi Hip Hop 🎵 [ Beats To Smoke / Chill / Relax / Stress Relief ]",
    "artist": "Chill Melodies",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chill out lofi music 🍀 lofi hip hop mix makes you feel positive ~ Rainy Lofi vibes for a calm night",
    "artist": "Lofi on the Rooftop",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio - beats to study/relax to 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Twista - Hope (Lyrics) &quot;Though I&#39;m hopeful yes I am hopeful for today&quot; [TikTok Song]",
    "artist": "LBO Lyrics",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Bars and Melody - Hopeful (Official Video)",
    "artist": "BarsAndMelodyVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Hope",
    "artist": "Twista - Topic",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "NF - HOPE",
    "artist": "NFVEVO",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Snow Tha Product - Hopeful [Official Video]",
    "artist": "Snow Tha Product",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "artist": "Lofi Girl",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chillhop Drive 90&#39;s - Lofi hip hop ~ Deep Focus, Relaxing Music | Chill Music",
    "artist": "chilli music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chillhop Radio - jazzy &amp; lofi hip hop beats 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "Chill Study Beats 2 • Instrumental &amp; Jazz Hip Hop Music [2016]",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  },
  {
    "title": "lofi hip hop radio - beats to study/relax to 🐾",
    "artist": "Chillhop Music",
    "url": "https://www.youtube.com/watch?v=NQDPx_k66w4"
  }
],
        assignedUserId: 3,
      },
    ],
    { individualHooks: true }
  );
};
