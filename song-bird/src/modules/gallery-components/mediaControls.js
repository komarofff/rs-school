import {galleryMediaObjects} from "./createMediaForGallery";

export function mediaControls() {
    let mediasArray = galleryMediaObjects.mediasArray
    console.log('mediasArray', mediasArray)
    let gallery = document.querySelector('.gallery-page')
    gallery.addEventListener('click', findSelector)
    gallery.addEventListener('change', findSelector)
    // gallery.addEventListener('input', findSelector)

    let isSound = true
    let isPlay = false
    let isPlayQuestionPlayer = false
    let isPlayAnswerPlayer = false


    function findSelector(ell) {

        //gallery.removeEventListener('click', findSelector)
        //checkQuestionMedia()


        let id = ell.target.dataset.id
        let player = mediasArray[id].player
        let selector = mediasArray[id].selector
        console.log('id', id)
        console.log('mediasArray[id].player', mediasArray[id].player)
        let playTime = document.querySelector(`.${mediasArray[id].className}`).querySelector('.play-time')
        let mediaTime = document.querySelector(`.${mediasArray[id].className}`).querySelector('.media-time')
        let timeLine = document.querySelector(`.${mediasArray[id].className}`).querySelector('.time-line')
        let playStopButton = document.querySelector(`.${mediasArray[id].className}`).querySelector('.play-stop-button')
        let volume = document.querySelector(`.${mediasArray[id].className}`).querySelector('.volume')
        let speaker = document.querySelector(`.${mediasArray[id].className}`).querySelector('.speaker')
        let currentMediaInPlayer = mediasArray[id].player
        let rangeMax = null

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
            console.log('update')
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
            console.log('change timeline')
            player.currentTime = timeLine.value
            getDataForRange()
            colorRange(timeLine)
        }

        //volume
        volume.addEventListener('change', (e) => {
            if (volume.value === '0') {
                e.target.previousElementSibling.src = 'public/images/speaker-off.png'

            }
            if (volume.value > '0') {
                e.target.previousElementSibling.src = 'public/images/speaker.png'

            }
            //console.log(volume.value,e.target.previousElementSibling.src)
            player.volume = volume.value / 10
        })

        // sound on-off
        if (ell.target.classList.contains('speaker')) {
            if (player.volume > 0) {
                ell.target.src = 'public/images/speaker-off.png'
                player.volume = 0
                volume.value = 0
            } else {
                ell.target.src = 'public/images/speaker.png'
                player.volume = 1
                volume.value = 10
            }

        }

        // play-stop button


        function colorRange(timeLine) {
            // console.log('timeLine', timeLine)
            let valueRange = (timeLine.value - timeLine.min) / (timeLine.max - timeLine.min) * 100
            timeLine.style.cssText = `background: linear-gradient(to right, rgba(234,247,5,1) 0%, rgba(139,5,255,1) ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`

        }


    }

// mediasArray.forEach(el => {

// console.log('el-',el)
// let playTime = el.selector.querySelector('.play-time')
// let mediaTime = el.selector.querySelector('.media-time')
// let timeLine = el.selector.querySelector('.time-line')
// let playStopButton = el.selector.querySelector('.play-stop-button')
// let volume = el.selector.querySelector('.volume')
// let speaker = el.selector.querySelector('.speaker')
// let isSound = true
// let isPlay = false
// let isPlayQuestionPlayer = false
// let isPlayAnswerPlayer = false
//
// let rangeMax = null
//
// el.player.addEventListener('loadedmetadata', () => {
//     timeLine.max = Math.round(el.player.duration)
//     rangeMax = Math.round(el.player.duration)
//     let calculatedTime = calculateTime(rangeMax)
//     mediaTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds
// })
// el.player.addEventListener('timeupdate', () => {
//     let mediaTimeInSeconds = el.player.currentTime
//     let calculatedTime = calculateTime(mediaTimeInSeconds)
//     playTime.innerHTML = calculatedTime.minutes + ':' + calculatedTime.seconds
//
//     if (isPlay) {
//         timeLine.value = el.player.currentTime
//         colorRange(timeLine)
//     } else {
//         timeLine.value = el.player.currentTime
//         colorRange(timeLine)
//     }
//
//
// })
//
// function calculateTime(val) {
//     let hours = Math.floor(val / 3600)
//     let minutes = Math.floor((val - (hours * 3600)) / 60)
//     let seconds = val - (hours * 3600) - (minutes * 60)
//     seconds = Math.round(seconds)
//
//     if (hours < 10) {
//         hours = "0" + hours
//     }
//     if (minutes < 10) {
//         minutes = "0" + minutes
//     }
//     if (seconds < 10) {
//         seconds = "0" + seconds
//     }
//     return {hours: hours, minutes: minutes, seconds: seconds}
// }
//
//
// //change timeline and color range
// timeLine.addEventListener('change', changeTimeLineQuestion)
// timeLine.addEventListener('input', changeTimeLineQuestion)
//
//
// function changeTimeLineQuestion() {
//
//     if (isPlayQuestionPlayer) {
//         el.player.currentTime = timeLine.value
//         //galleryMediaObjects.startMedia.play()
//         colorRange(timeLine)
//     } else {
//         el.player.currentTime = timeLine.value
//         colorRange(timeLine)
//     }
// }
//
//
// //volume
// volume.addEventListener('change', (e) => {
//     if (volume.value === '0') {
//         e.target.previousElementSibling.src = 'public/images/speaker-off.png'
//         isSound = false
//     }
//     if (volume.value > '0') {
//         e.target.previousElementSibling.src = 'public/images/speaker.png'
//         isSound = true
//     }
//     //console.log(volume.value,e.target.previousElementSibling.src)
//     currentMediaInPlayer.volume = volume.value / 10
// })
//
// // sound on-off
// speaker.addEventListener('click', (e) => {
//     if (isSound) {
//         e.target.src = 'public/images/speaker-off.png'
//         volume.value = 0
//         currentMediaInPlayer.volume = 0
//     } else {
//         e.target.src = 'public/images/speaker.png'
//         volume.value = 10
//         currentMediaInPlayer.volume = 1
//     }
//     isSound = !isSound
// })
//
// // play-stop button
// playStopButton.addEventListener("click", checkQuestionMedia)
//
//
// function checkQuestionMedia() {
//     alert('press button')
//     if (isPlay) {
//         galleryMediaObjects.mediasArray.forEach(el => {
//             el.player.pause()
//             el.selector.querySelector('.play-stop-button').src = "public/images/play-button.png"
//         })
//         isPlay = false
//         playStopButton.src = "public/images/play-button.png"
//         // if (galleryMediaObjects.answerPlayStopButton) {
//         //     galleryMediaObjects.answerPlayStopButton.src = "public/images/play-button.png"
//         // }
//     } else {
//         galleryMediaObjects.mediasArray.forEach(el => {
//             el.player.pause()
//             el.selector.querySelector('.play-stop-button').src = "public/images/play-button.png"
//         })
//         isPlay = true
//         currentMediaInPlayer = el.player
//         el.player.play()
//         playStopButton.src = "public/images/pause-button.png"
//
//     }
//
//
// }
//
// function colorRange(timeLine) {
//     //  console.log('timeLine', timeLine)
//     let valueRange = (timeLine.value - timeLine.min) / (timeLine.max - timeLine.min) * 100
//     timeLine.style.cssText = `background: linear-gradient(to right, rgba(234,247,5,1) 0%, rgba(139,5,255,1) ${valueRange}%,  #F5F7F6 ${valueRange}%,  #F5F7F6 ${rangeMax}%)`
//
// }


//})
}