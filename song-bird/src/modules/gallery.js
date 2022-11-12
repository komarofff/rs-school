import {birdsData} from './game-components/birdsData'

export class GalleryItem{
    constructor() {
    }


    makeAudioBox(data = null, selector = 'player') {
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
    <div class="flex flex-col items-center ${selector} min-h-full ">
    <div class="w-full flex">
                <div class="no-image mt-2 mr-4 h-[150px] w-[200px] overflow-hidden rounded-xl shadow-xl">
                    <img class="object-cover  w-full h-full bird-image" src="${image}" alt="name">
                </div>
                <div class="flex flex-col w-full">
                    <p class="title text-2xl font-bold mb-0 flex items-center ">${name}  <span class="ml-2 text-lg"> ${species}</span></p>
                    <div class="player-box">
                        <div class="bg-blue-500 bg-opacity-50 rounded-lg shadow-lg w-full px-2 py-4 ">
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

    makeAudio(mediaUrl, selector) {
        console.log('mediaUrl',mediaUrl)

        let questionMedia
        try {
            questionMedia =  new Audio(mediaUrl)
            //console.log(response)
        } catch (e) {
            console.log('error-',e)
        }

        // массив всех звуков для отключения
         mediasArray.push(questionMedia)
        let dataFromMedia =  mediasArray[0].getAttribute('src')
        console.log('dataFromMedia - ', dataFromMedia)


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
                mediasArray.forEach(el => el.pause())
                questionMedia.pause()

                console.log('selectors', startMediaSelector, answerMediaSelector)
                console.log('start-media-paused:', startMedia.paused)
                if (answerMedia) console.log('answer-media-paused:', answerMedia.paused)

                //startMedia.pause()
                //if(answerMedia) answerMedia.pause()

                isPlay = false
                playStopButton.src = "public/images/play-button.png"
                if (answerPlayStopButton) answerPlayStopButton.src = "public/images/play-button.png"
            } else {

                console.log('play', isPlay)
                mediasArray.forEach(el => el.pause())
                startPlayStopButton.src = "public/images/play-button.png"
                //if (answerPlayStopButton) answerPlayStopButton.src = "public/images/play-button.png"
                questionMedia.play()
                // startMedia.play()

                console.log('selectors', startMediaSelector, answerMediaSelector)
                console.log('start-media-paused:', startMedia.paused)
                if (answerMedia) console.log('answer-media-paused:', answerMedia.paused)
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