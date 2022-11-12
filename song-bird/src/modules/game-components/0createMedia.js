import {mediaObject} from '../gamePage'

export async function createMedia(mediaUrl, selector) {
    //console.log('mediaUrl', mediaUrl)

    let currentMediaInPlayer
    try {
        currentMediaInPlayer = await new Audio(mediaUrl)
    } catch (e) {
        console.log('error-', e)
    }

    // массив всех звуков для отключения
    mediaObject.mediasArray.push(currentMediaInPlayer)
    // let dataFromMedia = mediaObject.mediasArray[0].getAttribute('src')

    if (selector.classList.contains('player')) {
        mediaObject.startMedia = currentMediaInPlayer
        mediaObject.startMediaSelector = 'player'
        mediaObject.startPlayStopButton = selector.querySelector('.play-stop-button')
        mediaObject.startTimeLine = selector.querySelector('.time-line')


    }
    if (selector.classList.contains('solution-media')) {
        mediaObject.answerMedia = currentMediaInPlayer
        mediaObject.answerMediaSelector = 'solution-media'
        mediaObject.answerPlayStopButton = selector.querySelector('.play-stop-button')
        mediaObject.answerTimeLine = selector.querySelector('.time-line')
    }


    const playTime = selector.querySelector('.play-time')
    const mediaTime = selector.querySelector('.media-time')
    // const playStopButton = selector.querySelector('.play-stop-button')
    const timeLine = selector.querySelector('.time-line')
    const volume = selector.querySelector('.volume')
    const speaker = selector.querySelector('.speaker')
    let isSound = true
    let isPlay = false
    let isPlayQuestionPlayer = false
    let isPlayAnswerPlayer = false

    let rangeMax = null

    currentMediaInPlayer.addEventListener('loadedmetadata', () => {
        timeLine.max = Math.round(currentMediaInPlayer.duration)
        rangeMax = Math.round(currentMediaInPlayer.duration)
        let calculatedTime = calculateTime(rangeMax)
        mediaTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds
    })
    currentMediaInPlayer.addEventListener('timeupdate', () => {
        let mediaTimeInSeconds = currentMediaInPlayer.currentTime
        let calculatedTime = calculateTime(mediaTimeInSeconds)
        playTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds

        if (isPlayQuestionPlayer) {
            mediaObject.startTimeLine.value = mediaObject.startMedia.currentTime
            colorRange(mediaObject.startTimeLine)
        }
        if (mediaObject.answerTimeLine) {
            if (isPlayAnswerPlayer) {
                mediaObject.answerTimeLine.value = mediaObject.answerMedia.currentTime
                colorRange(mediaObject.answerTimeLine)
            }
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
    mediaObject.startTimeLine.addEventListener('change', changeTimeLineQuestion)
    mediaObject.startTimeLine.addEventListener('input', changeTimeLineQuestion)
    if (mediaObject.answerTimeLine) {
        mediaObject.answerTimeLine.addEventListener('change', changeTimeLineAnswer)
        mediaObject.answerTimeLine.addEventListener('input', changeTimeLineAnswer)
    }

    function changeTimeLineQuestion() {
        if (isPlayQuestionPlayer) {
            mediaObject.startMedia.currentTime = mediaObject.startTimeLine.value
           // mediaObject.startMedia.play()
            colorRange(mediaObject.startTimeLine)
        } else {
            mediaObject.startMedia.currentTime = mediaObject.startTimeLine.value
            colorRange(mediaObject.startTimeLine)
        }
    }
    function changeTimeLineAnswer(e) {
        if (mediaObject.answerMedia) {
            if (isPlayAnswerPlayer) {
                mediaObject.answerMedia.currentTime = mediaObject.answerTimeLine.value
               // mediaObject.answerMedia.play()
                colorRange(mediaObject.answerTimeLine)
            } else {
                mediaObject.answerMedia.currentTime = mediaObject.answerTimeLine.value
                colorRange(mediaObject.answerTimeLine)
            }
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
    mediaObject.startPlayStopButton.addEventListener("click", checkQuestionMedia)
    if (mediaObject.answerPlayStopButton) {
        mediaObject.answerPlayStopButton.addEventListener("click", checkAnswerMedia)
    }

    function checkQuestionMedia() {
        if (isPlayQuestionPlayer) {
            mediaObject.mediasArray.forEach(el => el.pause())
            mediaObject.startMedia.pause()
            isPlayQuestionPlayer = false
            mediaObject.startPlayStopButton.src = "public/images/play-button.png"
            if (mediaObject.answerPlayStopButton) {
                mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
            }
        } else {
            isPlayQuestionPlayer = true
            mediaObject.mediasArray.forEach(el => el.pause())
            mediaObject.startPlayStopButton.src = "public/images/play-button.png"
            mediaObject.startMedia.play()
            currentMediaInPlayer = mediaObject.startMedia
            if (!mediaObject.answerMedia) {
            } else {
                mediaObject.answerMedia.pause()
                isPlayAnswerPlayer = false
                mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
            }
            mediaObject.startPlayStopButton.src = "public/images/pause-button.png"
        }


    }

    function checkAnswerMedia() {
        if (isPlayAnswerPlayer) {
            isPlayAnswerPlayer = false
            mediaObject.mediasArray.forEach(el => el.pause())
            mediaObject.answerMedia.pause()
            mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
            if (mediaObject.startPlayStopButton) {
                mediaObject.startPlayStopButton.src = "public/images/play-button.png"
            }

        } else {
            isPlayAnswerPlayer = true
            mediaObject.mediasArray.forEach(el => el.pause())
            mediaObject.answerMedia.play()
            currentMediaInPlayer = mediaObject.answerMedia
            mediaObject.answerPlayStopButton.src = "public/images/pause-button.png"
            mediaObject.startMedia.pause()
            isPlayQuestionPlayer = false
            mediaObject.startPlayStopButton.src = "public/images/play-button.png"
        }


    }

    function colorRange(timeLine) {
       // console.log('timeLine',timeLine)
        let valueRange = (timeLine.value - timeLine.min) / (timeLine.max - timeLine.min) * 100
        timeLine.style.cssText = `background: linear-gradient(to right, rgba(234,247,5,1) 0%, rgba(139,5,255,1) ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`

    }

}