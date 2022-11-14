import {mediaObject} from '../gamePage'

export async function createMedia(mediaUrl,  className) {
    //console.log('className',className)
    let currentMediaInPlayer
    try {
        currentMediaInPlayer = await new Audio(mediaUrl)
    } catch (e) {
        console.log('error-', e)
    }

    // массив всех звуков для отключения
    let selectorMedia = document.querySelector(`.${className}`)
    mediaObject.mediasArray.push({player: currentMediaInPlayer, selector: selectorMedia, className: className})
    let mediasArray = mediaObject.mediasArray
    //console.log('mediasArray',mediasArray)
    mediasArray.forEach(el => {

        let playTime = el.selector.querySelector('.play-time')
        let mediaTime = el.selector.querySelector('.media-time')
        let timeLine = el.selector.querySelector('.time-line')
        let playStopButton = el.selector.querySelector('.play-stop-button')
        let volume = el.selector.querySelector('.volume')
        let speaker = el.selector.querySelector('.speaker')
        let isSound = true
        let isPlay = false
        let isPlayQuestionPlayer = false
        let isPlayAnswerPlayer = false

        let rangeMax = null

        el.player.addEventListener('loadedmetadata', () => {
            timeLine.max = Math.round(el.player.duration)
            rangeMax = Math.round(el.player.duration)
            let calculatedTime = calculateTime(rangeMax)
            mediaTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds
        })
        el.player.addEventListener('timeupdate', () => {
            let mediaTimeInSeconds = el.player.currentTime
            let calculatedTime = calculateTime(mediaTimeInSeconds)
            playTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds

            if (isPlay) {
                timeLine.value = el.player.currentTime
                colorRange(timeLine)
            } else {
                timeLine.value = el.player.currentTime
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


        //change timeline and color range
        timeLine.addEventListener('change', changeTimeLineQuestion)
        timeLine.addEventListener('input', changeTimeLineQuestion)


        function changeTimeLineQuestion() {

            if (isPlayQuestionPlayer) {
                el.player.currentTime = timeLine.value
                //mediaObject.startMedia.play()
                colorRange(timeLine)
            } else {
                el.player.currentTime = timeLine.value
                colorRange(timeLine)
            }
        }


        //volume
        volume.addEventListener('change', (e) => {
            if (volume.value === '0') {
                e.target.previousElementSibling.src = 'public/images/speaker-off.png'
                isSound = false
            }
            if (volume.value > '0') {
                e.target.previousElementSibling.src = 'public/images/speaker.png'
                isSound = true
            }
            //console.log(volume.value,e.target.previousElementSibling.src)
            currentMediaInPlayer.volume = volume.value / 10
        })

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
        playStopButton.addEventListener("click", checkQuestionMedia)


        function checkQuestionMedia() {
            if (isPlay) {
                mediaObject.mediasArray.forEach(el => {
                    el.player.pause()
                    el.selector.querySelector('.play-stop-button').src = "public/images/play-button.png"
                })
                isPlay = false
                playStopButton.src = "public/images/play-button.png"
                // if (mediaObject.answerPlayStopButton) {
                //     mediaObject.answerPlayStopButton.src = "public/images/play-button.png"
                // }
            } else {
                mediaObject.mediasArray.forEach(el => {
                    el.player.pause()
                    el.selector.querySelector('.play-stop-button').src = "public/images/play-button.png"
                })
                isPlay = true
                currentMediaInPlayer = el.player
                el.player.play()
                playStopButton.src = "public/images/pause-button.png"

            }


        }

        function colorRange(timeLine) {
          //  console.log('timeLine', timeLine)
            let valueRange = (timeLine.value - timeLine.min) / (timeLine.max - timeLine.min) * 100
            timeLine.style.cssText = `background: linear-gradient(to right, rgba(234,247,5,1) 0%, rgba(139,5,255,1) ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`

        }


    })


}