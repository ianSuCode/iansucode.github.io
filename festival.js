const { useState, useEffect } = React;

const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([])
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
      const festivals = await response.json();
      setData(festivals);
      setFilterData(festivals)
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

  const handleSearch = keyword => {
    setInput(keyword);
    const k2 = keyword.replace('台', '臺');
    const newData = data.filter(it => 
      it.actName.toLowerCase().includes(keyword) || it.actName.toLowerCase().includes(k2)
      || it.address.toLowerCase().includes(keyword) || it.address.toLowerCase().includes(k2) 
      || it.description.toLowerCase().includes(keyword) || it.description.toLowerCase().includes(k2));
    setFilterData(newData);
  }

  return (
    <div>
      {selectedItem && <Modal item={selectedItem} onModalclose={() => setSelectedItem(null)}/>}
      <h1 className="text-3xl font-bold text-violet-700">Festival</h1>
      {data.length > 0 ? 
        <div>
          <div className="mb-3">
            <input
              value={input}
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              id="exampleSearch"
              placeholder="search" />
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {filterData.map(item => (
              <li className="flex items-center justify-between gap-x-6 py-5" key={item.actId}>
                {item.imageUrl && <img className="flex-none h-12 w-12 rounded-full" src={`https://cloud.culture.tw/${item.imageUrl}`}/>}
                <div className="flex-1 w-0">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item.actName}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.address}</p>
                </div>
                <div className="flex-none flex items-center mr-2">
                  <button
                    className="px-2 h-fit"
                    onClick={() => handleLike(item.actId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`text-${(likes.includes(item.actId) ? 'rose-700' : 'zinc-200')} w-6 h-6`}>
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                  <button 
                    className="h-fit text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleView(item)}>
                    More
                  </button>
                </div>
              </li>
            ))}
          </ul> 
        </div> : <span>Loading...</span>
      }
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
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10">
        <div className="flex h-screen items-end justify-center p-4 text-center sm:items-center">
          <div className="max-h-[80vh] mb-20 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
            <div className="max-h-[80vh] flex flex-col h-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="bg-gray-50 px-4 py-3" id="modal-title">
                <h3 className="text-base font-semibold leading-6 text-gray-900" >{item.actName}</h3>
                <h4 className="text-sm text-gray-500">{item.address}</h4>
              </div>
              <div className="flex-1 overflow-y-auto text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="h-full flex flex-col">
                  <p className="text-sm text-gray-500">{item.description}</p>
                  {item.imageUrl && <img className="object-contain max-h-96" src={`https://cloud.culture.tw/${item.imageUrl}`}/>}
                  <div>
                    {tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{tag}</span>)}
                  </div>
                  <p>{item.startTime} ~ {item.endTime}</p>
                  {item.website && <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={item.website}>Link</a>}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onModalclose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
