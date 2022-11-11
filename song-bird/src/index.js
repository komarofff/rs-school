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

let isHomePage = true
let isGamePage = false
let isResultPage = false

const body = document.querySelector('body')
const homePage = document.querySelector('.home-page')
const gamePage = document.querySelector('.game-page')
const resultPage = document.querySelector('.results-page')
const goHome = document.querySelector('.go-home')
const goGame = document.querySelector('.go-game')
const gameResultBox = document.querySelector('.game-result-box')

goHome.addEventListener('click', startHomePage)

function startHomePage() {
    goHome.classList.add('active-header-tab')
    goGame.classList.remove('active-header-tab')
    goGame.classList.remove('hidden')
    homePage.classList.remove('hidden')
    gameResultBox.classList.add('hidden')
    isHomePage = true
    isGamePage = false
    isResultPage = false
    app()
}

goGame.addEventListener('click', startGamePage)

function startGamePage() {
    goGame.classList.add('active-header-tab')
    goGame.classList.add('hidden')
    goHome.classList.remove('active-header-tab')
    gamePage.classList.remove('hidden')
    gameResultBox.classList.remove('hidden')
    isHomePage = false
    isGamePage = true
    isResultPage = false
    app()
}

app()

function app() {
    if (isGamePage) {

        game()

    } else {
        gamePage.classList.add('hidden')
    }
    if (isHomePage) {
        body.classList.remove('game-body')
        body.classList.add('home-body')
        home(homePage)
    } else {
        homePage.classList.add('hidden')
    }
    if (isResultPage) {
        result()
    } else {
        resultPage.classList.add('hidden')
    }
}







