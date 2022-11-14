import "./styles/styles.scss";
import game from './modules/gamePage'
import home from './modules/home'
import result from './modules/result'
import {gallery} from "./modules/gallery"
// todo
// подсчет результата
// на последнем уровне после окончания сразу открывать страницу результата и тем-же предложение начать заново
// когда в блоке решения проигрывается звук при выборе новой птицы медиа предыдущей птицы отключать
// при переходе на главную из игры медиа отключать
// очистить поле результата при начале новой игры
export let eventsObject = {
    isHomePage: true,
    isGamePage: false,
    isResultPage: false
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

goPreviousResult.addEventListener('click', ()=>{startResultPage(false)})

export function startResultPage(canSaveResults) {
if(canSaveResults){
    canSave  = true
    isPreviousResult = true
}else{
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







