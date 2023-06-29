const skills = [
  { name: 'HTML5/CSS3/RWD', value: 95 },
  { name: 'Javascript', value: 90 },
  { name: 'Angular', value: 70 },
  { name: 'React', value: 80 },
  { name: 'Vue 3', value: 90 },
  { name: 'Chart.js', value: 90 },
  { name: 'NodeJs', value: 80 },
  { name: 'C#', value: 90 },
  { name: '.Net Framework/.Net Core', value: 80 },
  { name: 'Entity Framework/Linq', value: 80 },
  { name: 'Python', value: 70 },
  { name: 'Git', value: 90 },
  { name: 'T-SQL', value: 80 },
  { name: 'MongoDB', value: 60 },
  { name: 'TDD', value: 80 },
  { name: 'Docker', value: 50 },
];

const experiences = [
  { company: '盟立集團 Mirle', 
    period: '2017 ~ Present',
    contents: [
      '數據分析顯示前端 (Vue3/Chart.js)',
      '幫同事的專案編寫Test (Python)',
      '機台gRPC通訊 (.Net Core 6)',
      '空調即時監控網站 (React/.Net Core/WebSockt)',
      'Server設備管理監控網站 (Angular/.Net Core)',
      '網站銀行手機頁面 (Angular/.Net Framework)',
      '路燈報修網站 (Angular/.Net Framework)',
      '銀行內部網站SSO功能 (.Net Framework)',
      '員工教學，技術指導'
    ]
  }, {
    company: '東森信息科技',
    period: '2014 ~ 2017',
    contents: [
      'B2B/B2E供應商系統',
      '內部資訊管理系統',
      '照片管理系統',
      '新技術研究，尋找最佳解決方案'
    ]
  }, {
    company: '多奇數位/大心數位',
    period: '2012 ~ 2014',
    contents: ['活動企劃網站', '電影社群網站']
  }, {
    company: '啟耀光電',
    period: '2007 ~ 2010',
    contents: [
      '生產管理系統',
      '紙本表單資訊化',
      '實驗室管理資訊系統'
    ]
  }
];

const works = [
  {
    name: '數據分析顯示前端',
    photos: ['edm.gif'],
    descriptions: [
      '功能: 顯示數據分析的結果',
      '前端: Vue3 / Chart.js'
    ]
  },
  {
    name: 'Server設備管理監控網站',
    photos: ['msp/msp01.png', 'msp/msp02.png'],
    descriptions: [
      '功能: 顯示機台設備的CPU/Memory/硬碟/網路...等當前與歷史狀態',
      '前端: Angular 7 / HightChart.js',
      '後端: .NET Core 2.2 WebAPI / JWT / Repository / Unit Of Work',
      '備註: 資料庫由他人管理並限定使用MySQL與InfluxDB, 使用.NET Core/Entity Framework Core 連結指定的資料庫'
    ]
  },
  { 
    name: '空調即時監控網站', 
    photos: ['cu/all.png', 'cu/chart.png', 'cu/img.png'],
    descriptions: [
      '功能: 獨立開發使用 WebSocket 技術設計後端API, 讓空調相關設備傳送即時資料並顯示在前端頁面上; 可從前端頁面上輸入設定值讓設備在指定情況下調整狀態',
      '前端: React / React-Redux / HightChart.js',
      '後端: ASP.NET Core 2.1 / Entity Framework / MSSQL / JWT / Repository / Unit Of Work',
    ] 
  }
];

const samples = [
  { 
    name: 'Fastival List', 
    description: 'React 18 CDN, Babel CDN, Tailwind CDN, Open Data, 使用 localStorage 紀錄喜歡的活動', 
    link: './festival.html'
  }
]

const generateSkillList = skills => {
  return skills.map(it => `
    <li>
      <span>${it.name}</span>
      <div class="bar">
        <div class="bar-value" style="width: ${it.value}%"></div>
      </div>
    </li>`).join('');
}

const generateExperienceList = experiences => {
  return experiences.map(it => `
    <div>
      <span>${it.period}</span>
      <h3>${it.company}</h3>
      <div>
        <ul>
          ${it.contents.map(content => `<li>${content}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

const generateWorkBlocks = works => {
  return works.map(it => `
    <div class="card">
      <div class="card-head"><span>${it.name}</span></div>
      <div class="card-body">
        ${it.photos.map(p => `<img class="work-photo" src="./assets/${p}" />`).join('')}
      </div>
      <div class="card-foot">
        ${it.descriptions.map(d => `<p>${d}</p>`).join('')}
      </div>
    </div>
  `).join('');
}

const generateSampleList = samples => {
  return samples.map(it =>`
    <li>
      <a href="${it.link}" >${it.name}</a><br />
      <span>${it.description}</span>
    </li>
  `).join('');
}

document.getElementById('skills').innerHTML = generateSkillList(skills);
document.getElementById('experiences').innerHTML = generateExperienceList(experiences);
document.getElementById('works').innerHTML = generateWorkBlocks(works);
document.getElementById('samples').innerHTML = generateSampleList(samples);
