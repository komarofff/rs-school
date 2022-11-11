import {createBirdsList, createTitles, writeBox} from './game/game'

// разобраться с  isPlay для запуска аудио главного вопроса остановленного после нажатия плай  на ответном плеере
// при переходе на главную все звуки ОСТАНОВЛЕНЫ !!! - решено
// result ???? при переходе на новый этап
// mediaUrl-send-главный плеер',mediaUrl  - отправляет иногда undefined !!!!!
export default function () {

    let mediasArray = []
    let result = 0
    let startLevel = 0
    let categories, tabsInCategories
    const goToHome = document.querySelector('.go-home')
    const gameResultBox = document.querySelector('.game-result-box')
    let resultPlace = gameResultBox.querySelector('.result')
    resultPlace.innerHTML = 0

    // запускаем только один раз . меняем активный класс на вкладках при завершении задания
    createTitles(startLevel)
    categories = document.querySelector('.categories')
    tabsInCategories = categories.querySelectorAll('.tab')

    startGame()


    async function startGame() {
        const body = document.querySelector('body')
        body.classList.remove('home-body')
        body.classList.add('game-body')

        goToHome.addEventListener('click', () => {
            mediasArray.forEach(el => el.pause())
        })

        mediasArray = []
        let startMedia = null
        let answerMedia = null
        let startPlayStopButton = null
        let answerPlayStopButton = null
        let startMediaSelector = null
        let answerMediaSelector = null
        let counter = 5
        let birdsList = null


        const playerSection = document.querySelector('.player-section')
        const solutionSection = document.querySelector('.solution')
        solutionSection.innerHTML = '<p>Послушайте плеер. Выберите птицу из списка</p>'
        const successAudio = new Audio('public/audio/success.mp3')
        const wrongAudio = new Audio('public/audio/wrong.mp3')
        let isFinishStage = false
        const nextLevelButton = document.querySelector('.next-level-button')
        nextLevelButton.classList.remove('active')
        nextLevelButton.addEventListener('click', goNextLevel)

        function goNextLevel() {
            //result += 5
            if (nextLevelButton.classList.contains('active')) {
                let currentIdx = 0
                let tabsInCategories = categories.querySelectorAll('.tab')
                tabsInCategories.forEach((el, id) => {
                    if (el.classList.contains('active-tab')) {
                        currentIdx = id + 1
                    }
                    el.classList.remove('active-tab')
                })
                if (currentIdx <= tabsInCategories.length - 1) {
                    tabsInCategories[currentIdx].classList.add('active-tab')
                    nextLevelButton.removeEventListener('click', goNextLevel)
                    mediasArray.forEach(el => el.pause())
                    startGame()
                } else {
                    // здесь уходим на страницу результата
                    alert('go to result page')
                }

            }
        }

        //  формируем список птиц  это  зависит от того, какая вкладка активна автоматом список
        let randomElement = 0
        birdsList = createBirdsList()
        // какой список птиц сейчас на экране
        console.log(birdsList.idArr, birdsList.idSubArr)
        let newList = document.createElement('ul')
        newList.className = 'list grid grid-cols-2  sm:grid-cols-3 md:grid-cols-1'
        birdsList.arr.forEach(el => {
            if (el.name) {
                let li = document.createElement('li')
                li.className = 'list-item  py-2 pl-5 w-full cursor-pointer  transition duration-300 border-b border-r md:border-r-0 border-l md:border-l-0 border-t md:border-t-0  border-blue-100 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white relative text-sm'
                li.setAttribute('data-name', el.species)
                li.innerHTML = el.name
                newList.appendChild(li)
            }
        })
        document.querySelector('.birds-list').innerHTML = ''
        document.querySelector('.birds-list').appendChild(newList)

        // get random from our array
        randomElement = await getRandomInt(1, birdsList.arr.length - 1)
        const finishData = birdsList.arr[randomElement]
       // console.log(randomElement,finishData)
// let listArea = document.querySelector('.list')
//         listArea.addEventListener('click',(e)=>{
//             if(e.target.classList.contains('list-item')){
//                 mediasArray.forEach((el,idx) => {
//                     if(idx>0)el.pause()
//                 })
//             }
//     })

////////////////////
// формируем плееры. отправляем селектор для прорисовки в разных местах и управлением плеером
//плеер главного вопроса. вопрос бокс отправляем его селектор запоминаем данные вопроса для сравнения с ответами

        playerSection.innerHTML = writeBox(null, 'player')
        //mediasArray.forEach(el => el.pause())
        let selector = document.querySelector('.player')
        let mediaUrl = birdsList.arr[randomElement].audio
        //console.log('mediaUrl-send-главный плеер', mediaUrl)
        let start = await createQuestionMedia(mediaUrl, selector)

//ждем нажатия на список для сравнения
        const taskList = document.querySelector('.list')
        let resultId = null
        taskList.addEventListener('click', (e) => {
            // console.log(e.target)
            if (e.target.dataset.name) {
                if (e.target.dataset.name === finishData.species && !isFinishStage) {
                    console.log('правильно')

                    result += counter
                    resultPlace.innerHTML = result
                    e.target.classList.add('success')
                    // если правильно ответили
                    showSolutionPlayer(finishData)
                    successAudio.volume = 1
                    successAudio.play()

                    // останавливаем все аудио и на кнопках рисуем play
                    startMedia.pause()
                    startPlayStopButton.src = "public/images/play-button.png"
                    if (answerMedia) {
                        answerMedia.pause()
                    }
                    if (answerPlayStopButton) answerPlayStopButton.src = "public/images/play-button.png"
                    mediasArray.forEach(el => el.pause())


                    playerSection.querySelector('.bird-image').src = finishData.image
                    playerSection.querySelector('.title').innerHTML = finishData.name
                    isFinishStage = !isFinishStage
                    if (birdsList.idArr === 5) {
                        mediasArray.forEach(el => el.pause())
                        alert('go to result page')
                    }
                    // включаем переход на новую вкладку
                    nextLevelButton.classList.add('active')
                } else {
                    // включаем плеер для выбранного значения

                    birdsList.arr.forEach((el, id) => {
                        if (el.species === e.target.dataset.name) {
                            if (isFinishStage) {
                                console.log('не правильно и игра  закончена ')
                                console.log('если играет птица, остановить плеер  ')

                                mediasArray.forEach(el => el.pause())
                                startPlayStopButton.src = "public/images/play-button.png"
                                if (answerPlayStopButton) answerPlayStopButton.src = "public/images/play-button.png"
                            }
                            resultId = id
                            if (!isFinishStage) {
                                mediasArray.forEach((element, idx) => {
                                    if (idx > 0) element.pause()

                                })
                                console.log('не правильно и игра не закончена || здесь отнимаем 1 балл за неправильный ответ')
                                if (counter > 0) {
                                    counter--
                                    console.log('counter', counter)
                                    if (result > 0) {
                                        result--
                                        resultPlace.innerHTML = result
                                    }
                                }
                                //result += counter


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
        })

        async function showSolutionPlayer(data) {
            // плеер зоны решения
            solutionSection.innerHTML = await writeBox(data, 'solution-media')
            // mediasArray.forEach((element,idx) => {
            //     if(idx>0)element.pause()
            //
            // })
            let mediaUrl2 = data.audio
            let selector2 = document.querySelector('.solution-media')
            let start2 = await createQuestionMedia(mediaUrl2, selector2)
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        async function createQuestionMedia(mediaUrl, selector) {
            //console.log('mediaUrl', mediaUrl)

            let questionMedia
            try {
                questionMedia = await new Audio(mediaUrl)
                //console.log(response)
            } catch (e) {
                console.log('error-', e)
            }

            // массив всех звуков для отключения
            await mediasArray.push(questionMedia)
            let dataFromMedia = mediasArray[0].getAttribute('src')
            //console.log('dataFromMedia - ', dataFromMedia)


            if (selector.classList.contains('player')) {
                startMedia = questionMedia
                startMediaSelector = 'player'
                startPlayStopButton = selector.querySelector('.play-stop-button')


            }
            if (selector.classList.contains('solution-media')) {
                answerMedia = questionMedia
                answerMediaSelector = 'solution-media'
                answerPlayStopButton = selector.querySelector('.play-stop-button')
            }


            const playTime = selector.querySelector('.play-time')
            const mediaTime = selector.querySelector('.media-time')
            const playStopButton = selector.querySelector('.play-stop-button')
            const timeLine = selector.querySelector('.time-line')
            const volume = selector.querySelector('.volume')
            const speaker = selector.querySelector('.speaker')
            let isSound = true
            let isPlay = false
            let isQuestionMediaPlay = false
            let rangeMax = null

            questionMedia.addEventListener('loadedmetadata', async () => {
                timeLine.max = await Math.round(questionMedia.duration)
                rangeMax = await Math.round(questionMedia.duration)
                let calculatedTime = calculateTime(rangeMax)
                mediaTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds


            })
            questionMedia.addEventListener('timeupdate', async () => {
                let mediaTimeInSeconds = await questionMedia.currentTime
                let calculatedTime = calculateTime(mediaTimeInSeconds)
                playTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds

                if (isPlay) {
                    timeLine.value = questionMedia.currentTime
                    colorRange(timeLine)
                }
            })

            function calculateTime(val) {
                let hours = Math.floor(val / 3600)
                let minutes = Math.floor((val - (hours * 3600)) / 60)
                let seconds = val - (hours * 3600) - (minutes * 60)
                seconds = Math.round(seconds)

                if (hours < 10) {
                    hours = "0" + hours
                }
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                return {hours: hours, minutes: minutes, seconds: seconds}
            }

            //volume
            volume.addEventListener('change', () => {
                questionMedia.volume = volume.value / 10
            })

            //change timeline and color range
            timeLine.addEventListener('change', changeTimeLine)
            timeLine.addEventListener('input', changeTimeLine)

            function changeTimeLine() {
                if (isPlay) {
                    // questionMedia.pause()
                    questionMedia.currentTime = timeLine.value
                    questionMedia.play()
                    colorRange()
                } else {
                    questionMedia.currentTime = timeLine.value
                    colorRange()
                }
            }

            // sound on-off
            speaker.addEventListener('click', (e) => {
                if (isSound) {
                    e.target.src = 'public/images/speaker-off.png'
                    volume.value = 0
                    questionMedia.volume = 0
                } else {
                    e.target.src = 'public/images/speaker.png'
                    volume.value = 10
                    questionMedia.volume = 1
                }
                isSound = !isSound
            })

            // play-stop button
            playStopButton.addEventListener("click", () => {
                /// console.log('press play-stop button')
                if (isPlay) {
                    console.log('stop', isPlay)
                    console.log('questionMedia', questionMedia)
                    mediasArray.forEach(el => el.pause())
                    questionMedia.pause()

                    //console.log('selectors', startMediaSelector, answerMediaSelector)
                    //console.log('start-media-paused:', startMedia.paused)
                   // if (answerMedia) console.log('answer-media-paused:', answerMedia.paused)

                        //startMedia.pause()
                        //if(answerMedia) answerMedia.pause()

                        isPlay = false
                    playStopButton.src = "public/images/play-button.png"
                    if (answerPlayStopButton) answerPlayStopButton.src = "public/images/play-button.png"
                } else {

                    console.log('play', isPlay)
                    console.log('questionMedia', questionMedia)
                    mediasArray.forEach(el => el.pause())
                    startPlayStopButton.src = "public/images/play-button.png"
                    //if (answerPlayStopButton) answerPlayStopButton.src = "public/images/play-button.png"
                    questionMedia.play()
                    // startMedia.play()

                    //console.log('selectors', startMediaSelector, answerMediaSelector)
                    //console.log('start-media-paused:', startMedia.paused)
                   // if (answerMedia) console.log('answer-media-paused:', answerMedia.paused)
                        //if(answerMedia) answerMedia.pause()
                        isPlay = true
                    playStopButton.src = "public/images/pause-button.png"
                }

            })

            function colorRange() {
                let valueRange = (timeLine.value - timeLine.min) / (timeLine.max - timeLine.min) * 100
                //timeLine.style.cssText = `background: linear-gradient(to right, #F9804B 0%, #F9804B ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`
                timeLine.style.cssText = `background: linear-gradient(to right, rgba(234,247,5,1) 0%, rgba(139,5,255,1) ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`

            }

        }
    }
}