import "./styles/styles.scss";
import game from './modules/gamePage'
import home from './modules/home'
import result from './modules/result'
import {gallery} from "./modules/gallery"
//todo
//

// по умолчанию язык русский
export let language = false
// кнопка переключения
// if(localStorage.getItem('language')){
//     language = false
// }

createHeader()

export let eventsObject = {
    isHomePage: true,
    isGamePage: false,
    isResultPage: false,
    isGalleryPage: false
}
export let results = {
    result: 0
}
let isPreviousResult = false
if (localStorage.getItem('results')) {
    isPreviousResult = true
}

let canSave = false
const body = document.querySelector('body')

const homePage = document.querySelector('.home-page')
const gamePage = document.querySelector('.game-page')
const resultPage = document.querySelector('.results-page')
const galleryPage = document.querySelector('.gallery-page')
const galleryButton = document.querySelector('.gallery-button')

const logoButton = document.querySelector('.logo-button')

const goHome = document.querySelector('.go-home')
const goGame = document.querySelector('.go-game')
const goGallery = document.querySelector('.go-gallery')
const goResult = document.querySelector('.go-result')

const goPreviousResult = document.querySelector('.go-previously-result')
const gameResultBox = document.querySelector('.game-result-box')

goHome.addEventListener('click', startHomePage)
logoButton.addEventListener('click', startHomePage)

if (isPreviousResult) {
    goPreviousResult.classList.remove('hidden')
}

function startHomePage() {
    results.result = 0
    goHome.classList.add('active-header-tab')
    goResult.classList.add('hidden')
    goResult.classList.remove('active-header-tab')
    if (isPreviousResult) {
        goPreviousResult.classList.remove('hidden')
    }
    resultPage.classList.add('hidden')
    resultPage.innerHTML = ''
    goGame.classList.remove('active-header-tab')
    goGame.classList.remove('hidden')
    homePage.classList.remove('hidden')
    gameResultBox.classList.add('hidden')
    galleryButton.classList.add('hidden')
    galleryPage.classList.add('hidden')
    galleryPage.innerHTML = ''
    eventsObject.isHomePage = true
    eventsObject.isGamePage = false
    eventsObject.isResultPage = false
    app()
}

goGame.addEventListener('click', startGamePage)

export function startGamePage() {
    results.result = 0
    goGame.classList.add('active-header-tab')
    goGame.classList.add('hidden')
    galleryButton.classList.add('hidden')
    gamePage.classList.remove('hidden')
    galleryPage.classList.add('hidden')
    galleryPage.innerHTML = ''
    goHome.classList.remove('active-header-tab')
    homePage.classList.add('hidden')

    goPreviousResult.classList.add('hidden')

    gameResultBox.classList.remove('hidden')

    resultPage.classList.add('hidden')
    resultPage.innerHTML = ''
    goResult.classList.add('hidden')
    goResult.classList.remove('active-header-tab')

    eventsObject.isHomePage = false
    eventsObject.isGamePage = true
    eventsObject.isResultPage = false
    eventsObject.isGalleryPage = false
    app()
}

goPreviousResult.addEventListener('click', () => {
    startResultPage(false)
})

export function startResultPage(canSaveResults) {
    if (canSaveResults) {
        canSave = true
        isPreviousResult = true
    } else {
        canSave = false
    }
    goGame.classList.remove('active-header-tab')
    goGame.classList.add('hidden')
    goHome.classList.remove('active-header-tab')
    goResult.classList.remove('hidden')
    goResult.classList.add('active-header-tab')
    gamePage.classList.add('hidden')
    galleryButton.classList.add('hidden')
    galleryPage.classList.add('hidden')
    galleryPage.innerHTML = ''
    gameResultBox.classList.remove('hidden')
    goPreviousResult.classList.add('hidden')

    homePage.classList.add('hidden')
    resultPage.classList.remove('hidden')
    gameResultBox.classList.add('hidden')
    eventsObject.isHomePage = false
    eventsObject.isGamePage = false
    eventsObject.isResultPage = true
    eventsObject.isGalleryPage = false
    app()
}

goGallery.addEventListener('click', startGallery)

function startGallery() {
    results.result = 0
    galleryPage.classList.remove('hidden')

    galleryButton.classList.remove('hidden')
    galleryButton.classList.add('active-header-tab')
    goGame.classList.remove('active-header-tab')
    goGame.classList.remove('hidden')
    goHome.classList.remove('active-header-tab')
    goResult.classList.add('hidden')
    goResult.classList.remove('active-header-tab')

    goPreviousResult.classList.add('hidden')

    gamePage.classList.add('hidden')
    homePage.classList.add('hidden')
    resultPage.classList.add('hidden')
    gameResultBox.classList.add('hidden')

    eventsObject.isHomePage = false
    eventsObject.isGamePage = false
    eventsObject.isResultPage = false
    eventsObject.isGalleryPage = true

    app()
}

app()

function app() {
    if (localStorage.getItem('results') && !canSave) {
        isPreviousResult = true
    }
    if (eventsObject.isGamePage) {
        game()
    } else {
        gamePage.classList.add('hidden')
    }
    if (eventsObject.isHomePage) {
        body.classList.remove('game-body')
        body.classList.add('home-body')
        home(homePage)
    } else {
        homePage.classList.add('hidden')
    }
    if (eventsObject.isResultPage) {
        result(resultPage, canSave)
    } else {
        resultPage.classList.add('hidden')
    }
    if (eventsObject.isGalleryPage) {
        gallery(galleryPage)
    } else {
        galleryPage.classList.add('hidden')
    }
}

function createHeader() {
    let homeBtn = ''
    let resultatBtn = ''
    let yourResultsBtn = ''
    let gameResultsBtn = ''
    let galleryBtn = ''
    let startGameBtn = ''
    let langBtn = ''
    language ? homeBtn = 'Home' : homeBtn = 'Главная'
    language ? resultatBtn = 'Result' : resultatBtn = 'Результат'
    language ? yourResultsBtn = 'Your results' : yourResultsBtn = 'Ваши результаты'
    language ? gameResultsBtn = 'Game results' : gameResultsBtn = 'Результаты игр'
    language ? galleryBtn = 'Birds gallery' : galleryBtn = 'Галерея птиц'
    language ? startGameBtn = 'Start game' : startGameBtn = 'Начать игру'
    language ? langBtn = 'Language' : langBtn = 'Язык'

    let headerHtml = `
    <nav class="container mx-auto ">
        <div class="logo-button  w-full flex justify-between mb-2">
            <div class="bg-gray-50 bg-opacity-75 rounded"><img class="h-[70px] " src="public/images/logo.png" alt="song bird application logo"></div>
            <div class="flex bg-gray-50 bg-opacity-75 rounded p-1 my-2">
              <label for="language">${langBtn}</label>
              <select class="select ml-1 bg-gray-50 bg-opacity-75 outline-none" id="language" name="language">
              <option value="RU" selected>RU</option>
              <option value="Engl">ENGL</option>
              </select>
            </div>
            
        </div>
        <ul class="flex justify-between items-center items-stretch text-blue-900 font-bold text-xl flex-wrap sm:flex-nowrap">
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-home  active-header-tab cursor-pointer  bg-gray-50 bg-opacity-75 rounded  min-h-full  shadow-lg md:mr-2 p-2  flex items-center justify-center  transition duration-300 relative hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${homeBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 hidden game-result-box  bg-white rounded  min-h-full shadow-lg  py-2 px-4 text-xl flex items-center justify-center ">
                <span class="mr-2">${resultatBtn}:</span> <span class="result">0</span>
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-result hidden  bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${yourResultsBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-previously-result hidden  bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${gameResultsBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 gallery-button hidden  bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${galleryBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-game  bg-blue-700 text-white border border-blue-700 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center   transition duration-300 cursor-pointer hover:bg-white  hover:text-blue-700  ">
                ${startGameBtn}
            </li>
        </ul>
    </nav>
   `
    document.querySelector('.header').innerHTML = ''
    document.querySelector('.header').innerHTML = headerHtml

    // document.querySelector('.select').addEventListener('change',()=>{
    //     language = !language
    //     createHeader()
    // })
}





