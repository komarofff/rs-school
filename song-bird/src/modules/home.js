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


        homeSelector.innerHTML = `
        <img class="w-[50px] home-button absolute sm:left-2 left-1/2 -translate-x-1/2 sm:translate-x-0 top-6 cursor-pointer" src="public/images/play-button.png" alt="play-stop-button">
        <div class="h-[90%] flex justify-center items-center flex-col bg-white bg-opacity-[90%] rounded-lg shadow-xl text-xl md:text-2xl my-4 p-4 text-center">
        <h1 class="font-bold mt-12 sm:mt-0">Добро пожаловать в игру!</h1>
        <h2>Окунитесь в мир разнообразия птичьих голосов!</h2>
        <h2>Пройди увлекательную викторину и узнай сколько птичьих песен ты сможешь угадать!</h2>
        <h2 class="mt-4 text-lg">Для старта игры нажми кнопку <strong class="start-game-button">"Начать игру"</strong> </h2>
        </div>
`
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
            console.log('isAudiostart',isAudiostart)
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
            if(!homeAudio.muted) {
                homeAudio.muted = true
                homeAudio.pause()
                homeButtonPlayPause.src = 'public/images/play-button.png'
                isAudiostart = !isAudiostart
            }
        })
        document.querySelector('.go-gallery').addEventListener('click', () => {
            if(!homeAudio.muted) {
                homeAudio.muted = true
                homeAudio.pause()
                homeButtonPlayPause.src = 'public/images/play-button.png'
                isAudiostart = !isAudiostart
            }
        })
    })
}

