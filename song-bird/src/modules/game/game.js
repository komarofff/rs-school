import {birdsData} from '../birdsData'

export function createTitles() {
    // формируем список заданий (типы птиц)
    let categoriesList = []
    for (let i = 0; i < birdsData.length; i++) {
        categoriesList.push(birdsData[i][0].titleRus)
    }
    let questionsBox = document.querySelector('.questions-title')
    questionsBox.innerHTML = ''
    let categoryBox = document.createElement('div')
    //categoryBox.className = 'flex justify-between items-center transition duration-300 categories text-sm'
    categoryBox.className = 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 items-center transition duration-300 categories text-sm'
    categoriesList.forEach((el, idx) => {
        let category = document.createElement('div')
        if (idx === 0) {
            category.className = 'active-tab shadow-xl rounded p-1  bg-gray-50 bg-opacity-75  m-2  flex justify-center items-center  transition duration-300 tab'
        } else {
            category.className = 'shadow-xl rounded p-1  bg-gray-50 opacity-75  m-2  flex justify-center items-center transition duration-30 tab'
        }
        category.innerHTML = el
        categoryBox.appendChild(category)
    })
    // размещаем на странице
    questionsBox.appendChild(categoryBox)

}

export function createBirdsList() {
    // фомируем список птиц в задании в зависимости от типа птиц
    const activeTab = document.querySelector('.active-tab')
    const searchElement = activeTab.innerText.trim()
    // получаем номер задания idArr
    let idArr = null
    let idSubArr = null
    birdsData.forEach((el, idx) => {
        el.forEach((elem, id) => {
            if (elem.titleRus === searchElement) {
                idArr = idx
                idSubArr = id
            }
        })
    })

    // создаем новый массив
    let askArray = JSON.parse(JSON.stringify(birdsData[idArr]))
    // запоминаем и удаляем первый элемент ( название категории птиц)
    let firstElement = askArray.shift()
    // перемешиваем массив
    askArray = shuffleArray(askArray)
    // ставим назад первый элемент ( название категории птиц)
    askArray.unshift(firstElement)
    // готовим данные к отправке
    let sendData = {
        idArr: idArr,
        idSubArr: idSubArr,
        arr: askArray
    }
    return sendData

    // функция перемешивания массива
    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]]
        }
        return array
    }
}

export function writeBox(data = null, selector = 'player') {
    // рисуем проигрыватель для каждой зоны свой ( определяем селектором)
    let name = '*****'
    let description = ''
    let species = ''
    let image = 'public/images/bird-shadow.jpg'
    if (data) {
        name = data.name
        image = data.image
        description = data.description
        species = ' - ' + data.species
    }
    let boxHtml = `
    <div class="flex flex-col items-center ${selector} min-h-full fade-in">
    <div class="w-full flex">
                <div class="no-image mt-2 mr-4 h-[150px] w-[200px] overflow-hidden rounded-xl shadow-xl">
                    <img class="object-cover  w-full h-full bird-image transition duration-300 fade-in" src="${image}" alt="name">
                </div>
                <div class="flex flex-col w-full">
                    <p class="title text-2xl font-bold mb-0 flex items-center ">${name}  <span class="ml-2 text-lg"> ${species}</span></p>
                    <div class="player-box">
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
                <div class="bird-description mt-2 text-sm">${description}</div>
      </div>
            
    `
    return boxHtml
}
