export function createPlayer(data = null, selector = 'player') {
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
            species = `<span class="w-full sm:w-[unset] ml-2 text-lg"> ${speciesText}</span>`
        }
    }
    let boxHtml = `
    <div class="flex flex-col items-center ${selector} min-h-full fade-in">
    <div class="w-full flex flex-wrap sm:flex-nowrap flex-col sm:flex-row items-center ">
                <div class="no-image mt-2 mr-4 h-[150px] w-[200px] overflow-hidden rounded-xl shadow-xl">
                    <img class="object-cover  w-full h-full bird-image transition duration-300 fade-in" src="${image}" alt="name">
                </div>
                <div class="flex flex-col w-full items-start">
                    <p class="title text-2xl font-bold mb-0 flex items-center  sm:items-start  justify-center w-full sm:w-[unset] my-2 sm:my-0">
                      <span class="w-full sm:w-[unset] text-center">${name}</span>  
                      ${species}
                    </p>
                    <div class="player-box w-full">
                        <div class="bg-blue-500 bg-opacity-75 rounded-lg shadow-lg w-full px-2 py-4 ">
                            <div class="w-full flex items-center relative">
                                <img class="play-stop-button w-[40px] mr-6 cursor-pointer" src="public/images/play-button.png"
                                     alt="play button">
                                <input class="w-full time-line" type="range" min="0" max="100" step="0" value="0">
                                <div class="absolute right-0 top-7  media-time"></div>
                            </div>
                            <div class="flex ">
                                <div class="relative w-[50px] h-[30px]">
                                    <div class="absolute  play-time">0:00</div>
                                </div>
                                <img class="ml-4 mr-2 speaker w-[30px] cursor-pointer" src="public/images/speaker.png" alt="speaker">
                                <input class="volume w-[100px]" type="range" min="0" max="10" value="10">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="bird-description mt-3 text-sm">${description}</div>
      </div>
            
    `
    return boxHtml
}