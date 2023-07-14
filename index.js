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
      { name: 'EDM(Equipment data monitor) web - Frontend', skills: 'Vue3/Chart.js', anchor: 'edm'},
      { name: 'Adding tests for a colleague\'s project', skills: 'Python'},
      { name: 'AGV gRPC communication', skills: '.Net Core 6'},
      { name: 'A/C real-time monitor web', skills: 'React/.Net Core/WebSockt', anchor: 'ac'},
      { name: 'Server management web', skills: 'Angular/.Net Core', anchor: 'server'},
      { name: 'Bank mobile web', skills: 'Angular/.Net Framework'},
      { name: 'Streetlight repair web', skills: 'Angular/.Net Framework'},
      { name: 'Bank internal web SSO', skills: '.Net Framework'},
      'Employee training and technical guidance'
    ]
  }, {
    company: '東森信息科技',
    period: '2014 ~ 2017',
    contents: [
      'B2B/B2E supplier web',
      'Internal information management web',
      'Photo management web',
      'Researching new technologies to find the best solution'
    ]
  }, {
    company: '多奇數位/大心數位',
    period: '2012 ~ 2014',
    contents: ['Event planning web', 'Movie social networking web']
  }, {
    company: '啟耀光電',
    period: '2007 ~ 2010',
    contents: [
      'MES(Manufacturing execution system) web',
      'Paper-based forms to web-based forms',
      'Lab Management Information web'
    ]
  }
];

const works = [
  {
    id: 'edm',
    name: 'EDM(Equipment data monitor) web - Frontend',
    photos: ['edm.gif'],
    descriptions: [
      'Displaying data analysis results.',
      'Frontend: Vue3 / Chart.js'
    ]
  },
  {
    id: 'server',
    name: 'Server management web',
    photos: ['msp/msp01.png', 'msp/msp02.png'],
    descriptions: [
      'Displaying current and historical status of machine equipment including CPU, memory, hard disk, network, and more.',
      'Frontend: Angular 7 / HightChart.js',
      'Backend: .NET Core 2.2 WebAPI / JWT / Repository / Unit Of Work',
      'Note: The database is managed by someone else and limited to MySQL and InfluxDB. Use .NET Core and Entity Framework Core to connect to the designated database.'
    ]
  },
  { 
    id: 'ac',
    name: 'A/C real-time monitor web', 
    photos: ['cu/all.png', 'cu/chart.png', 'cu/img.png'],
    descriptions: [
      'Developing an backend API using WebSocket for real-time transmission from A/C devices and display it. Users will be able to input configuration values to adjust the A/C device\'s status.',
      'Frontend: React / React-Redux / HightChart.js',
      'Backend: ASP.NET Core 2.1 / Entity Framework / MSSQL / JWT / Repository / Unit Of Work',
    ] 
  }
];

const samples = [
  { 
    name: 'Fastival List', 
    description: 'React 18 CDN, Babel CDN, Tailwind CDN, Open Data, Using localStorage to record favorite activities', 
    link: './festival.html'
  }, {
    name: 'eShop (backend)',
    description: 'Node.js rest api with Express, MongoDB, JWT', 
    link: 'https://github.com/ianSuCode/eshop.backend-nodejs'
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
          ${it.contents.map(content => {
            let htmlContent = ''
            if (typeof content === 'string') {
              htmlContent = `<span>${content}</span>`
            } else {
              if (content.anchor) {
                htmlContent = `<a href="#work-${content.anchor}">${content.name}</a>`
              } else {
                htmlContent = `<span>${content.name}</span>`
              }
              htmlContent += ` <small>(${content.skills})</small>`
            }
            return `<li>${htmlContent}</li>`;
          }).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

const generateWorkBlocks = works => {
  return works.map(it => `
    <div class="card" id="work-${it.id}">
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
