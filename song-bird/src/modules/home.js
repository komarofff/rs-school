import {language} from "../index";
export default function (homeSelector) {

    document.addEventListener('DOMContentLoaded', async () => {

        let homeAudio
        try {
            homeAudio = await new Audio('public/audio/home.mp3')
            homeAudio.muted = true
            homeAudio.autoplay = true
            homeAudio.volume = .5
            homeAudio.loop = true
        } catch (e) {
            console.log(e)
        }
let homeTitle= ''
let homeSubtitle= ''
let homeInviting= ''

language.condition ? homeTitle = 'Welcome to game!' : homeTitle = 'Добро пожаловать в игру!'
language.condition ? homeSubtitle = '<h2>Immerse yourself in the world of a variety of bird voices!</h2>\n  <h2>Take an exciting quiz and find out how many bird songs you can guess!</h2>' : homeSubtitle = '<h2>Окунитесь в мир разнообразия птичьих голосов!</h2>\n          <h2>Пройди увлекательную викторину и узнай сколько птичьих песен ты сможешь угадать!</h2>'
language.condition ? homeInviting = 'For starting game press button <strong class="start-game-button">"Start game"</strong>' : homeInviting = 'Для старта игры нажми кнопку <strong class="start-game-button">"Начать игру"</strong>'

        homeSelector.innerHTML = `
<div class="rounded-lg sm:pt-4 my-4 relative sm:overflow-hidden h-full sm:h-[60vh] ">
     <video class="video-box z-10 relative rounded-lg"  width="100%" height="100%"  preload="auto" autoplay loop muted>
        <source class=" rounded-lg " src="public/video/birds.mp4" type="video/mp4">
     </video>     
     
      <div class="video-div z-20 relative sm:absolute left-0 top-0 right-0 bottom-0 w-full   flex justify-start items-center flex-col bg-white bg-opacity-[90%] sm:bg-opacity-[70%] rounded-lg shadow-xl text-xl md:text-2xl mt-4 p-4 text-center">
          <h1 class="font-bold mt-8 sm:mt-0">${homeTitle}</h1>
          ${homeSubtitle}
          <h2 class="mt-4 text-lg">${homeInviting} </h2>
          
      </div>
      
      <img class="absolute w-[50px]   home-button z-30 left-2   top-6   cursor-pointer" src="public/images/play-button.png" alt="play-stop-button">
      
</div>
        
`
        let videoHeight = document.querySelector('.video-box').getBoundingClientRect().height
        // document.querySelector('.video-div').style.cssText = `height: ${videoHeight}px`
        window.onresize = () => {
            if (document.documentElement.clientWidth > 639 ) {
                videoHeight = document.querySelector('.video-box').getBoundingClientRect().height
                if(videoHeight !== 0) {
                    document.querySelector('.video-div').style.cssText = `height: ${videoHeight}px`
                }
            } else {
                document.querySelector('.video-div').style.cssText = ``
            }
        }

        document.querySelector('.start-game-button').addEventListener('mousemove', () => {
            document.querySelector('.go-game').style.cssText = 'transition: .15s ease-in-out ;transform: scale(.8)'
            setTimeout(() => {
                document.querySelector('.go-game').style.cssText = ''
            }, 150)
        })


        let isAudiostart = false
        let isUserMakeActivity = false
        let homeButtonPlayPause = document.querySelector('.home-button')
        homeButtonPlayPause.src = 'public/images/play-button.png'
        let homeBody = document.querySelector('.home-body')
        // if (!isUserMakeActivity) {
        //     homeSelector.addEventListener('click', startHomeAudio)
        //     function startHomeAudio() {
        //         console.log('start move')
        //         homeAudio.muted = false
        //         homeAudio.play()
        //         document.querySelector('.home-button').src = 'public/images/pause-button.png'
        //         isAudiostart = !isAudiostart
        //         isUserMakeActivity = true
        //         homeSelector.removeEventListener('click', startHomeAudio)
        //     }
        // }

        homeButtonPlayPause.addEventListener('click', (e) => {
            console.log('isAudiostart', isAudiostart)
            if (!isAudiostart) {
                homeAudio.muted = false
                homeAudio.play()
                e.target.src = 'public/images/pause-button.png'
            } else {
                homeAudio.muted = true
                homeAudio.pause()
                e.target.src = 'public/images/play-button.png'
            }
            isAudiostart = !isAudiostart
        })

        document.querySelector('.go-game').addEventListener('click', () => {
            if (!homeAudio.muted) {
                homeAudio.muted = true
                homeAudio.pause()
                homeButtonPlayPause.src = 'public/images/play-button.png'
                isAudiostart = !isAudiostart
            }
        })
        document.querySelector('.go-gallery').addEventListener('click', () => {
            if (!homeAudio.muted) {
                homeAudio.muted = true
                homeAudio.pause()
                homeButtonPlayPause.src = 'public/images/play-button.png'
                isAudiostart = !isAudiostart
            }
        })
    })
}

