const { useState, useEffect } = React;

const App = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [likes, setLikes] = useState(JSON.parse(localStorage.getItem('festival-likes')) || []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindFestivalTypeJ'
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleView = item => {
    setSelectedItem(item);
  }

  const handleLike = actId => {
    let nextLikes;
    if (likes.includes(actId)) {
      nextLikes = likes.filter(it => it !== actId)
    } else {
      nextLikes = [...likes, actId]
    }
    setLikes(nextLikes);
    localStorage.setItem('festival-likes', JSON.stringify(nextLikes));
  }

  return (
    <div>
      {selectedItem && <Modal item={selectedItem} onModalclose={() => setSelectedItem(null)}/>}
      <h1 className="text-3xl font-bold underline">Festival</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {data.map(item => (
          <li className="flex justify-between gap-x-6 py-5" key={item.actId}>
            <div className="flex gap-x-4 ml-2">
              {item.imageUrl && <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://cloud.culture.tw/${item.imageUrl}`}/>}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{item.actName}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.address}</p>
              </div>
            </div>
            <div className="flex mr-2">
              <button
                className="px-2"
                onClick={() => handleLike(item.actId)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`text-${(likes.includes(item.actId) ? 'rose-700' : 'zinc-200')} w-6 h-6`}>
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
              <button 
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleView(item)}>
                More
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Modal = ({item, onModalclose}) => {
  const tags = [];
  if (item.levelName) tags.push(item.levelName);
  if (item.grade1) tags.push(item.grade1);
  if (item.grade2) tags.push(item.grade2);
  if (item.grade3) tags.push(item.grade3);
  if (item.grade4) tags.push(item.grade4);
  if (item.grade5) tags.push(item.grade5);
  if (item.grade6) tags.push(item.grade6);
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {item.actName}
              </h3>
              <h4>{item.address}</h4>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">{item.description}</p>
              {item.imageUrl && <img className="object-contain h-48 w-96" src={`https://cloud.culture.tw/${item.imageUrl}`}/>}
              {tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{tag}</span>)}
              <p>{item.startTime} ~ {item.endTime}</p>
              {item.website && <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={item.website}>Link</a>}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onModalclose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
