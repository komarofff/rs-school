import {createBirdsCategories} from './game-components/createBirdsCategories'
import {createBirdsList} from './game-components/createBirdsList'
import {createPlayer} from './game-components/createPlayer'
import {createMedia} from './game-components/createMedia'
import {getRandom} from './game-components/getRandom'
import {eventsObject, language, results, startResultPage} from "../index";
//todo
// result && result при переходе на новый этап
// если уже выбран неверный результат проверять - и не отнимать баллы за нажатие на него еще раз
export let mediaObject = {
    mediasArray: [],
    startMedia: null,
    answerMedia: null,
    startPlayStopButton: null,
    answerPlayStopButton: null,
    startMediaSelector: null,
    answerMediaSelector: null,
    startTimeLine: null,
    answerTimeLine: null
}

export default function () {

    //let mediaObject.mediasArray = []
    //let result = 0
    let questionsBox = document.querySelector('.questions-title')
    let resultBtn = language.condition ? 'Result' : 'Результат'
    let resultsPlace = `<div class="whitespace-nowrap  my-2  game-result-box text-xl  w-full font-bold   p-2  flex items-center md:justify-end justify-center">\n 
     <span class="mr-2">${resultBtn}:</span> <span class="result">0</span>\n            </div>`
    questionsBox.innerHTML = resultsPlace
    let startLevel = 0
    let categories
    const goToHome = document.querySelector('.go-home')
    const goToGallery = document.querySelector('.go-gallery')

    const gameResultBox = document.querySelector('.game-result-box')
    let resultPlace = gameResultBox.querySelector('.result')
    resultPlace.innerHTML = 0

    // запускаем только один раз . меняем активный класс на вкладках при завершении задания
    createBirdsCategories(startLevel)
    startGame()

    async function startGame() {

        const body = document.querySelector('body')
        body.classList.remove('home-body')
        body.classList.add('game-body')

        goToHome.addEventListener('click', () => {
            mediaObject.mediasArray.forEach(el => el.pause())
        })
        goToGallery.addEventListener('click', () => {
            mediaObject.mediasArray.forEach(el => el.pause())
        })

        mediaObject = {
            mediasArray: [],
            startMedia: null,
            answerMedia: null,
            startPlayStopButton: null,
            answerPlayStopButton: null,
            startMediaSelector: null,
            answerMediaSelector: null,
            startTimeLine: null,
            answerTimeLine: null
        }

        let counter = 5
        let birdsList = null
        let playerMessage = language.condition ?  '<p>Listen to the player. Select a bird from the list</p>' :  '<p>Послушайте плеер. Выберите птицу из списка</p>'


        const playerSection = document.querySelector('.player-section')
        const solutionSection = document.querySelector('.solution')
        solutionSection.innerHTML = playerMessage

        const successAudio = new Audio('public/audio/success.mp3')
        const wrongAudio = new Audio('public/audio/wrong.mp3')

        let isFinishStage = false

        const nextLevelButton = document.querySelector('.next-level-button')
        nextLevelButton.classList.remove('active')
        nextLevelButton.addEventListener('click', goNextLevel)

        function goNextLevel() {
            categories = document.querySelector('.categories')
            //result += 5
            if (nextLevelButton.classList.contains('active')) {
                let currentIdx = 0
                let tabsInCategories = categories.querySelectorAll('.tab')
                tabsInCategories.forEach((el, id) => {
                    // console.log(el)
                    if (el.classList.contains('active-tab')) {
                        currentIdx = id + 1
                    }
                    el.classList.remove('active-tab')
                })
                if (currentIdx <= tabsInCategories.length - 1) {
                    tabsInCategories[currentIdx].classList.add('active-tab')
                    nextLevelButton.removeEventListener('click', goNextLevel)
                    mediaObject.mediasArray.forEach(el => el.pause())
                    startGame()
                }

            }
        }

        //  формируем список птиц  это  зависит от того, какая вкладка активна автоматом список
        let randomElement = 0
        birdsList = createBirdsList()
        // get random from our array
        randomElement = await getRandom(1, birdsList.arr.length - 1)
        const finishData = birdsList.arr[randomElement]


        ////////////////////
        // формируем плееры. отправляем селектор для прорисовки в разных местах и управлением плеером
        //плеер главного вопроса. вопрос бокс отправляем его селектор запоминаем данные вопроса для сравнения с ответами

        playerSection.innerHTML = createPlayer(null, 'player')
        //mediaObject.mediasArray.forEach(el => el.pause())
        let selector = document.querySelector('.player')
        let mediaUrl = birdsList.arr[randomElement].audio
        //console.log('mediaUrl-send-главный плеер', mediaUrl)
        let start = await createMedia(mediaUrl, selector)

        // блок проверки результатов
        //ждем нажатия на список для сравнения
        const taskList = document.querySelector('.list')
        let resultId = null

        taskList.addEventListener('click', checkTask)
        function checkTask(e){
            // console.log(e.target)
            if (e.target.dataset.name) {
                if (e.target.dataset.name === finishData.species && !isFinishStage) {
                    console.log('правильно || здесь надо подготовить очки для следующей игры')
                    console.log('results.result',results.result)
                    results.result += counter
                    console.log('results.result',results.result)

                   resultPlace = document.querySelector('.result')
                    resultPlace.innerHTML = results.result
                    e.target.classList.add('success')
                    // если правильно ответили
                    showSolutionPlayer(finishData)
                    successAudio.volume = 1
                    successAudio.play()
                    // останавливаем все аудио и на кнопках рисуем play
                    mediaObject.startMedia.pause()
                    mediaObject.startPlayStopButton.src = "public/images/play-button.png"
                    if (mediaObject.answerMedia) {
                        mediaObject.answerMedia.pause()
                    }
                    if (mediaObject.answerPlayStopButton) {
                        mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
                    }
                    mediaObject.mediasArray.forEach(el => el.pause())

                    playerSection.querySelector('.bird-image').src = finishData.image
                    playerSection.querySelector('.title').innerHTML = language.condition ? finishData.nameLat : finishData.name
                    isFinishStage = !isFinishStage
                    if (birdsList.idArr === 5) {
                        mediaObject.mediasArray.forEach(el => el.pause())
                        eventsObject.isHomePage = false
                        eventsObject.isGamePage = false
                        eventsObject.isResultPage = true
                        eventsObject.isGalleryPage = false
                        isFinishStage = false
                        taskList.removeEventListener('click', checkTask)
                        startResultPage(true)
                    }
                    // включаем переход на новую вкладку
                    nextLevelButton.classList.add('active')
                } else {
                    // включаем плеер для выбранного значения

                    birdsList.arr.forEach((el, id) => {
                        if (el.species === e.target.dataset.name) {
                            if (isFinishStage) {
                                console.log('не правильно и игра  ЗАКОНЧЕНА  ')
                                mediaObject.mediasArray.forEach(el => el.pause())
                                mediaObject.startPlayStopButton.src = "public/images/play-button.png"
                                if (mediaObject.answerPlayStopButton) {
                                    mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
                                }
                            }
                            resultId = id
                            if (!isFinishStage) {
                                mediaObject.mediasArray.forEach((element, idx) => {
                                    if (idx > 0) element.pause()

                                })
                                console.log('не правильно и игра НЕ ЗАКОНЧЕНА || здесь отнимаем 1 балл за неправильный ответ')

                                if (counter > 0 && !e.target.classList.contains('error')) {
                                    counter--
                                    console.log('counter=',counter)
                                }
                                e.target.classList.add('error')
                                // если выбрали правильно - то отключаем звук и смену значков (правильно - неправильно перед названием в списке)
                                wrongAudio.volume = 1
                                wrongAudio.play()

                            }
                            showSolutionPlayer(birdsList.arr[resultId])
                        }
                    })

                }
            }
        }

        async function showSolutionPlayer(data) {
            // плеер зоны решения
            solutionSection.innerHTML = createPlayer(data, 'solution-media')
            let mediaUrl2 = data.audio
            let selector2 = document.querySelector('.solution-media')
            let start2 = await createMedia(mediaUrl2, selector2)

        }


    }
}