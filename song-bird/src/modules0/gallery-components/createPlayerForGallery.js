export function createPlayerForGallery(data = null, selector = 'player',count) {
    // рисуем проигрыватель для каждой зоны свой ( определяем селектором)
    let name = '*****'
    let description = ''
    let speciesText = ''
    let species = ''
    let image = 'public/images/bird-shadow.jpg'
    if (data) {
        name = data.name
        image = data.image
        description = data.description
        if(data.species) {
            speciesText = ' (' + data.species + ')'
            species = `<span class="w-full  ml-2 text-xs"> ${speciesText}</span>`
        }
    }
    let boxHtml = `
    <div class="flex flex-col items-center ${selector} min-h-full fade-in border border-gray-50 p-2 rounded shadow-xl bg-white" data-id="${count}">
    <div class="w-full flex flex-wrap  flex-col  items-center text-xs ">
                <div class="no-image mt-2  h-[200px] w-[250px] overflow-hidden rounded-xl shadow-xl">
                    <img class="object-cover  w-full h-full bird-image transition duration-300 fade-in" src="${image}" alt="name">
                </div>
                <div class="flex flex-col w-full items-start">
                    <p class="title text-xs font-bold mb-0 flex items-center   justify-center w-full  my-2 ">
                      <span class="w-full sm:w-[unset] text-center">${name}</span>  
                      ${species}
                    </p>
                    <div class="player-box w-full mt-1">
                        <div class="bg-blue-500 bg-opacity-75 rounded-lg shadow-lg w-full px-2 py-4 ">
                            <div class="w-full flex items-center relative">
                                <img class="play-stop-button w-[40px] mr-6 cursor-pointer" data-id="${count}" src="public/images/play-button.png"
                                     alt="play button">
                                <input class="w-full time-line" type="range" min="0" max="100" step="0" value="0" data-id="${count}">
                                <div class="absolute right-0 top-6 lg:top-5  media-time"></div>
                            </div>
                            <div class="flex ">
                                <div class="relative w-[50px] h-[30px]">
                                    <div class="absolute  play-time">0:00</div>
                                </div>
                                <img class="ml-4 mr-2 speaker w-[30px] cursor-pointer" data-id="${count}" src="public/images/speaker.png" alt="speaker">
                                <input class="volume w-[100px]" type="range" min="0" max="10" value="10" data-id="${count}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="bird-description mt-3 text-xs">${description}</div>
      </div>
            
    `
    return boxHtml
}