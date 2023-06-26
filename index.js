const skills = [
  { name: 'HTML5/CSS3', value: 95 },
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
];

const experiences = [
  { company: '盟立集團 Mirle', 
    period: '2017 ~ Present',
    contents: [
      '數據分析顯示前端 (Vue3/Chart.js)',
      '幫同事的專案編寫Test (Python)',
      '機台gRPC通訊 (.Net Core)',
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

document.getElementById('skills').innerHTML = generateSkillList(skills);

document.getElementById('experience').innerHTML = generateExperienceList(experiences);
