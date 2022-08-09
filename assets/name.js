const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCX9NJ471o7Wie1DQe94RVIg&part=snippet%2Cid&order=date&maxResults=9";


const content = null|| document.querySelector('#content')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '26c7ff87ddmsh3a976103719e265p1e7208jsn3d797862c26b',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

//función autoejecutable
(async () => {
  try {
    const videos = await fetchData(API);

    console.log(videos);
    let view = `

        ${videos.items.map(video => `

        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>

        `
        ).slice(0,4).join('')}

        
        `;

        content.innerHTML =view; 
  } catch (error) {
    console.error(error);
    alert('api ha tenido un problema',error)
  }
})();
