const ID = "UCX9NJ471o7Wie1DQe94RVIg";

const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCX9NJ471o7Wie1DQe94RVIg&part=snippet%2Cid&order=date&maxResults=9";

const CHANEL_API = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${ID}`;

const content = null || document.querySelector("#content");
const imgBanner = null || document.querySelector("#banner");
const nombre = null || document.querySelector("#name");
const chanel = null || document.querySelector("#chanel");
const description = null || document.querySelector("#description");
const imgLogo = null || document.querySelector('#img-logo')

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "26c7ff87ddmsh3a976103719e265p1e7208jsn3d797862c26b",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

/**
 * id
 
*/

async function fetchData2(urlAPI) {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

//función autoejecutable
(async () => {
  try {
    const videos = await fetchData(API);
    const chanelInfo = await fetchData(CHANEL_API);

    imgBanner.src =
      chanelInfo.items[0].brandingSettings.image.bannerExternalUrl;
    

    imgLogo.src = chanelInfo.items[0].snippet.thumbnails.default.url

    console.log(3,chanelInfo.items[0].snippet.thumbnails.default.url);
    console.log(2, videos);

    let valor = videos.items.map((el) => {
      return el.id.videoId;
    });

    const APIID = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${valor}`;

    const videosId = await fetchData(APIID);


    let estadisticas = videosId.items.map((el) => el.statistics);
    console.log('estadisticas',estadisticas);
    //let nameChanel = videosId.items.map((el) => el.brandingSettings.channel);

    let arr_chanelInfo = chanelInfo.items.map(el=> el.brandingSettings.channel)

    console.log(arr_chanelInfo);

    nombre.innerText = arr_chanelInfo[0].title
    description.innerText = arr_chanelInfo[0].description

    let view = `

        ${videos.items
          .map(
            (video, index) => `

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
          <h3 class="text-m text-gray-1000 border-black">
            <span aria-hidden="true" class=" relative top-7"></span>
            Views: ${estadisticas[0].viewCount}
          </h3>
        </div>
      </div>

        `
          )
          .slice(0, 8)
          .join("")}

        
        `;

    content.innerHTML = view;
  } catch (error) {
    console.error(error);
    alert("api ha tenido un problema", error);
  }
})();
