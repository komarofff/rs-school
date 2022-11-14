import "./styles/styles.scss";
import game from './modules/gamePage'
import home from './modules/home'
import result from './modules/result'
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
// let isHomePage = true
// let isGamePage = false
// let isResultPage = false

const body = document.querySelector('body')
const homePage = document.querySelector('.home-page')
const gamePage = document.querySelector('.game-page')
const resultPage = document.querySelector('.results-page')
const logoButton = document.querySelector('.logo-button')
const goHome = document.querySelector('.go-home')
const goGame = document.querySelector('.go-game')
const goResult = document.querySelector('.go-result')
const gameResultBox = document.querySelector('.game-result-box')

goHome.addEventListener('click', startHomePage)
logoButton.addEventListener('click', startHomePage)

function startHomePage() {
    goHome.classList.add('active-header-tab')
    goResult.classList.add('hidden')
    goResult.classList.remove('active-header-tab')
    resultPage.classList.add('hidden')
    resultPage.innerHTML = ''
    goGame.classList.remove('active-header-tab')
    goGame.classList.remove('hidden')
    homePage.classList.remove('hidden')
    gameResultBox.classList.add('hidden')
    eventsObject.isHomePage = true
    eventsObject.isGamePage = false
    eventsObject.isResultPage = false
    app()
}

goGame.addEventListener('click', startGamePage)

export function startGamePage() {
    goGame.classList.add('active-header-tab')
    goGame.classList.add('hidden')
    gamePage.classList.remove('hidden')

    goHome.classList.remove('active-header-tab')
    homePage.classList.add('hidden')

    gameResultBox.classList.remove('hidden')

    resultPage.classList.add('hidden')
    resultPage.innerHTML = ''
    goResult.classList.add('hidden')
    goResult.classList.remove('active-header-tab')

    eventsObject.isHomePage = false
    eventsObject.isGamePage = true
    eventsObject.isResultPage = false
    app()
}

export function startResultPage() {
    goGame.classList.remove('active-header-tab')
    goGame.classList.add('hidden')
    goHome.classList.remove('active-header-tab')
    goResult.classList.remove('hidden')
    goResult.classList.add('active-header-tab')
    gamePage.classList.add('hidden')

    homePage.classList.add('hidden')
    resultPage.classList.remove('hidden')
    gameResultBox.classList.add('hidden')
    eventsObject.isHomePage = false
    eventsObject.isGamePage = false
    eventsObject.isResultPage = true
    app()
}

app()

export function app() {
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
        result(resultPage)
    } else {
        resultPage.classList.add('hidden')
    }
}







