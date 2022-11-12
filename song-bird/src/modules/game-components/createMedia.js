import { mediaObject } from '../gamePage'

export async function createMedia(mediaUrl, selector) {
    //console.log('mediaUrl', mediaUrl)

    let currentMediaInPlayer
    try {
        currentMediaInPlayer = await new Audio(mediaUrl)
        //console.log(response)
    } catch (e) {
        console.log('error-', e)
    }

    // массив всех звуков для отключения
     mediaObject.mediasArray.push(currentMediaInPlayer)
    let dataFromMedia = mediaObject.mediasArray[0].getAttribute('src')
    //console.log('dataFromMedia - ', dataFromMedia)


    if (selector.classList.contains('player')) {
        mediaObject.startMedia = currentMediaInPlayer
        mediaObject.startMediaSelector = 'player'
        mediaObject.startPlayStopButton = selector.querySelector('.play-stop-button')


    }
    if (selector.classList.contains('solution-media')) {
        mediaObject.answerMedia = currentMediaInPlayer
        mediaObject.answerMediaSelector = 'solution-media'
        mediaObject.answerPlayStopButton = selector.querySelector('.play-stop-button')
    }


    const playTime = selector.querySelector('.play-time')
    const mediaTime = selector.querySelector('.media-time')
    const playStopButton = selector.querySelector('.play-stop-button')
    const timeLine = selector.querySelector('.time-line')
    const volume = selector.querySelector('.volume')
    const speaker = selector.querySelector('.speaker')
    let isSound = true
    let isPlay = false
    let iscurrentMediaInPlayerPlay = false
    let rangeMax = null

    currentMediaInPlayer.addEventListener('loadedmetadata', async () => {
        timeLine.max = await Math.round(currentMediaInPlayer.duration)
        rangeMax = await Math.round(currentMediaInPlayer.duration)
        let calculatedTime = calculateTime(rangeMax)
        mediaTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds


    })
    currentMediaInPlayer.addEventListener('timeupdate', async () => {
        let mediaTimeInSeconds = await currentMediaInPlayer.currentTime
        let calculatedTime = calculateTime(mediaTimeInSeconds)
        playTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds

        if (isPlay) {
            timeLine.value = currentMediaInPlayer.currentTime
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
        currentMediaInPlayer.volume = volume.value / 10
    })

    //change timeline and color range
    timeLine.addEventListener('change', changeTimeLine)
    timeLine.addEventListener('input', changeTimeLine)

    function changeTimeLine() {
        if (isPlay) {
            // currentMediaInPlayer.pause()
            currentMediaInPlayer.currentTime = timeLine.value
            currentMediaInPlayer.play()
            colorRange()
        } else {
            currentMediaInPlayer.currentTime = timeLine.value
            colorRange()
        }
    }

    // sound on-off
    speaker.addEventListener('click', (e) => {
        if (isSound) {
            e.target.src = 'public/images/speaker-off.png'
            volume.value = 0
            currentMediaInPlayer.volume = 0
        } else {
            e.target.src = 'public/images/speaker.png'
            volume.value = 10
            currentMediaInPlayer.volume = 1
        }
        isSound = !isSound
    })

    // play-stop button
    playStopButton.addEventListener("click", () => {
        /// console.log('press play-stop button')
        if (isPlay) {
            console.log('stop', isPlay)
            console.log('currentMediaInPlayer', currentMediaInPlayer)
            mediaObject.mediasArray.forEach(el => el.pause())
            currentMediaInPlayer.pause()

            //console.log('selectors', mediaObject.startMediaSelector, mediaObject.answerMediaSelector)
            //console.log('start-media-paused:', mediaObject.startMedia.paused)
            // if (mediaObject.answerMedia) console.log('answer-media-paused:', mediaObject.answerMedia.paused)

            //mediaObject.startMedia.pause()
            //if(mediaObject.answerMedia) mediaObject.answerMedia.pause()

            isPlay = false
            playStopButton.src = "public/images/play-button.png"
            if (mediaObject.answerPlayStopButton) mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
        } else {

            console.log('play', isPlay)
            console.log('currentMediaInPlayer', currentMediaInPlayer)
            mediaObject.mediasArray.forEach(el => el.pause())
            mediaObject.startPlayStopButton.src = "public/images/play-button.png"
            //if (mediaObject.answerPlayStopButton) mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
            currentMediaInPlayer.play()
            // mediaObject.startMedia.play()

            //console.log('selectors', mediaObject.startMediaSelector, mediaObject.answerMediaSelector)
            //console.log('start-media-paused:', mediaObject.startMedia.paused)
            // if (mediaObject.answerMedia) console.log('answer-media-paused:', mediaObject.answerMedia.paused)
            //if(mediaObject.answerMedia) mediaObject.answerMedia.pause()
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