window.APP_DATA = {
  awards: [
    {
      id:'kca', short:'KCA', name:"Nickelodeon Kids' Choice Awards 2026", accent:'violet', region:'all',
      status:'open', closes:'2026-11-13', timezone:'Official regional schedule',
      summary:'BTS is nominated in multiple music categories. Complete a voting round on the official KCA website and return with the confirmation screen.',
      links:[
        {label:'Vote on KCA', url:'https://kca.nick.tv/vote/'},
        {label:'How to vote', url:'https://kca.nick.tv/how-to-vote'},
        {label:'Official voting rules', url:'https://kca.nick.tv/voting-rules'}
      ],
      nominations:['Favorite Music Group or Duo — BTS','Favorite Song — SWIM','Favorite Album — ARIRANG'],
      rules:[
        'Voting is open from 8 October to 13 November 2026; exact opening and closing times may vary by region or activity.',
        'Complete the voting journey through the site so selections are submitted at the end of the round.',
        'The official rules allow repeat voting subject to any limits shown for the user’s location or activity.',
        'Automated, scripted, robotic or macro voting is prohibited.'
      ],
      proof:'Upload the official completion or thank-you screen shown after a completed voting round.'
    },
    {
      id:'aria', short:'ARIA', name:'ARIA Awards 2026 — Most Popular International Artist', accent:'blue', region:'all',
      status:'open', closes:'2026-11-09T23:59:00+11:00', timezone:'AEDT',
      summary:'BTS — ARIRANG is nominated for Most Popular International Artist. Australian ARMY can vote daily on the ARIA website and in the Spotify mobile app. International ARMY can support the X activity used by the campaign.',
      links:[
        {label:'ARIA web voting', url:'https://www.aria.com.au/vote'},
        {label:'Open Spotify', url:'https://open.spotify.com/search/ARIA%20Awards'}
      ],
      hashtags:['#ARIASBTS'],
      rules:[
        'Official ARIA voting closes at 11:59 pm AEDT on Monday 9 November 2026.',
        'ARIA states that one vote can be cast per day on its official voting experience.',
        'For Spotify voting, use the Spotify mobile app and follow the ARIA Awards voting experience.',
        'The app should show Australian web/Spotify missions only to users whose voting region is Australia.'
      ],
      proof:'For web or Spotify voting, upload the completion/confirmation screen. For the X activity, submit the public post URL.'
    },
    {
      id:'aaa', short:'AAA', name:'Asia Artist Awards 2026 — Popularity Award', accent:'magenta', region:'all',
      status:'open', closes:'2026-11-04T23:59:00+09:00', timezone:'KST',
      summary:'The AAA Popularity Award final is running in IDOLCHAMP. Keep collecting and voting; small contributions are still useful.',
      links:[
        {label:'Official AAA notice', url:'https://www.asiaartistawards.com/notice'},
        {label:'Open IDOLCHAMP vote', url:'https://link.idolchamp.com/s/szurqCKtRv'}
      ],
      rules:[
        'The official AAA notice lists the final voting period as 8 October to 4 November 2026 in IDOLCHAMP.',
        'The final result combines preliminary voting at 30% and final voting at 70%.',
        'Current campaign target: add 20–30 votes when possible; 5 votes or even 1 vote still counts as participation.',
        'Always follow IDOLCHAMP’s current per-account and in-app voting limits.'
      ],
      proof:'Upload the official vote completion screen. If it visibly shows the number of votes cast, enter that quantity with the submission.'
    },
    {
      id:'mama', short:'MAMA', name:"2026 MAMA Awards — Fans’ Choice", accent:'cyan', region:'all',
      status:'open', closes:'2026-10-22T23:59:00+09:00', timezone:'KST',
      summary:'Complete the Mnet Plus vote and the X vote when available. The first voting round resets daily at 00:00 KST.',
      links:[
        {label:'MAMA on Mnet Plus', url:'https://www.mnetplus.world/event/ja/2026-mama'},
        {label:'2026 MAMA Awards', url:'https://www.mnetplus.world/contents/ko/shows/6a85550be99fb5128ae1d76f/videos'}
      ],
      hashtags:['#2026MAMAVOTE','#BTS'],
      rules:[
        'First Vote: 12 October 19:00 to 22 October 23:59 KST.',
        'Mnet Plus voting resets at 00:00 KST. Complete the required categories and final submission flow shown in the app.',
        'For the X component, use the official MAMA voting hashtag together with BTS’s official voting hashtag and keep the post public.',
        'Do not automate votes or submit abnormal access/voting activity.'
      ],
      proof:'Upload the Mnet Plus completion screen for the app mission. Submit the public X post URL for the X mission.'
    }
  ],
  missions:[
    {id:'kca-web',awardId:'kca',title:'Complete one KCA voting round',kind:'image',reset:'local',regions:['AU','INTL'],points:1},
    {id:'aria-web',awardId:'aria',title:'ARIA web vote',kind:'image',reset:'aedt',regions:['AU'],points:1},
    {id:'aria-spotify',awardId:'aria',title:'ARIA Spotify vote',kind:'image',reset:'aedt',regions:['AU'],points:1},
    {id:'aria-x',awardId:'aria',title:'ARIA X support',kind:'url',reset:'local',regions:['INTL'],points:1},
    {id:'aaa-vote',awardId:'aaa',title:'AAA final vote',kind:'image-quantity',reset:'kst',regions:['AU','INTL'],points:1},
    {id:'mama-mnet',awardId:'mama',title:'MAMA Mnet Plus vote',kind:'image',reset:'kst',regions:['AU','INTL'],points:1},
    {id:'mama-x',awardId:'mama',title:'MAMA X vote',kind:'url',reset:'kst',regions:['AU','INTL'],points:1}
  ],
  badges:[
    {id:'first-vote',name:'First Vote',description:'Your first verified voting mission.',icon:'01',rule:{verified:1}},
    {id:'streaker',name:'Streaker',description:'Three consecutive mission days.',icon:'03',rule:{streak:3}},
    {id:'seven-day',name:'Seven-Day Streaker',description:'Seven consecutive mission days.',icon:'07',rule:{streak:7}},
    {id:'double-attack',name:'Double Attack Warrior',description:'Two different award campaigns verified on one mission day.',icon:'2X',rule:{awardsSameDay:2}},
    {id:'triple-attack',name:'Triple Attack Warrior',description:'Three different award campaigns verified on one mission day.',icon:'3X',rule:{awardsSameDay:3}},
    {id:'full-attack',name:'Full Attack Warrior',description:'All four current campaigns verified on one mission day.',icon:'4X',rule:{awardsSameDay:4}},
    {id:'collector-10',name:'Vote Collector I',description:'10 verified AAA votes.',icon:'10',rule:{aaaVotes:10}},
    {id:'collector-50',name:'Vote Collector II',description:'50 verified AAA votes.',icon:'50',rule:{aaaVotes:50}},
    {id:'collector-100',name:'Vote Collector III',description:'100 verified AAA votes.',icon:'100',rule:{aaaVotes:100}},
    {id:'all-rounder',name:'All-Rounder',description:'Verified participation across all four campaigns.',icon:'ALL',rule:{uniqueAwards:4}}
  ]
};
