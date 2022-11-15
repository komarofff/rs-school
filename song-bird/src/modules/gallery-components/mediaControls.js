import {galleryMediaObjects} from "./createMediaForGallery";

export function mediaControls() {
    let mediasArray = galleryMediaObjects.mediasArray
   // console.log('mediasArray', mediasArray)
    let gallery = document.querySelector('.gallery-page')
    gallery.addEventListener('click', findSelector)
    gallery.addEventListener('change', findSelector)
    gallery.addEventListener('input', findSelector)
    let rangeMax = null
    let isSound = true
    let isPlay = false
    let isPlayQuestionPlayer = false
    let isPlayAnswerPlayer = false


    function findSelector(ell) {

        let id = ell.target.dataset.id
        let player = mediasArray[id].player
        let selector = mediasArray[id].selector
        let playTime = document.querySelector(`.${mediasArray[id].className}`).querySelector('.play-time')
        let mediaTime = document.querySelector(`.${mediasArray[id].className}`).querySelector('.media-time')
        let timeLine = document.querySelector(`.${mediasArray[id].className}`).querySelector('.time-line')
        let playStopButton = document.querySelector(`.${mediasArray[id].className}`).querySelector('.play-stop-button')
        let volume = document.querySelector(`.${mediasArray[id].className}`).querySelector('.volume')
        let speaker = document.querySelector(`.${mediasArray[id].className}`).querySelector('.speaker')
        let currentMediaInPlayer = mediasArray[id].player


        // play-stop
        if (ell.target.classList.contains('play-stop-button')) {

            if (player.paused) {
                stopAllPlayers()
                player.play()
                ell.target.src = "public/images/pause-button.png"

                getDataForRange()

            } else {
                stopAllPlayers()
                ell.target.src = "public/images/play-button.png"
                getDataForRange()
            }


        }

        function getDataForRange() {
            timeLine.max = Math.round(player.duration)
            rangeMax = Math.round(player.duration)
            let calculatedTime = calculateTime(rangeMax)
            mediaTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds
            player.currentTime = timeLine.value
            colorRange(timeLine)
        }

        function stopAllPlayers() {
            mediasArray.forEach(el => {
                el.player.pause()
                document.querySelector(`.${el.className}`).querySelector('.play-stop-button').src = "public/images/play-button.png"
            })
        }


        player.addEventListener('timeupdate', () => {
           // console.log('update')
            let mediaTimeInSeconds = player.currentTime
            let calculatedTime = calculateTime(mediaTimeInSeconds)
            playTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds
            timeLine.value = player.currentTime
            colorRange(timeLine)
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
        if (ell.target.classList.contains('time-line')) {
          // console.log('change timeline')
            player.currentTime = timeLine.value
            getDataForRange()
            //colorRange(timeLine)
        }

        //volume
        volume.addEventListener('change', (e) => {
           // console.log('volume changed')
            if (volume.value === '0') {
                document.querySelector(`.${mediasArray[id].className}`).querySelector('.speaker').src = 'public/images/speaker-off.png'
            }
            if (volume.value > '0') {
                document.querySelector(`.${mediasArray[id].className}`).querySelector('.speaker').src = 'public/images/speaker.png'

            }

            player.volume = volume.value / 10

        })

        // sound on-off
        if (ell.target.classList.contains('speaker')) {

            if (player.volume > 0) {
                document.querySelector(`.${mediasArray[id].className}`).querySelector('.speaker').src = 'public/images/speaker-off.png'
                player.volume = 0
                volume.value = 0
            } else {
                document.querySelector(`.${mediasArray[id].className}`).querySelector('.speaker').src = 'public/images/speaker.png'
                player.volume = 1
                volume.value = 10
            }

        }

        // play-stop button


        function colorRange(timeLine) {
            let valueRange = (timeLine.value - timeLine.min) / (timeLine.max - timeLine.min) * 100
            document.querySelector(`.${mediasArray[id].className}`).querySelector('.time-line').style.cssText = `background: linear-gradient(to right, rgba(234,247,5,1) 0%, rgba(139,5,255,1) ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`

        }


    }

}