export default async function (homeSelector) {
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
        <img class="w-[50px] home-button absolute left-2 top-6 cursor-pointer" src="public/images/play-button.png" alt="play-stop-button">
        <div class="h-[90%] flex justify-center items-center flex-col bg-white bg-opacity-[90%] rounded-lg shadow-xl text-2xl my-4 p-4 text-center">
        <h1 class="font-bold">Добро пожаловать в игру!</h1>
        <h2>Окунитесь в мир разнообразия птичьих голосов!</h2>
        <h2>Пройди увлекательную викторину и узнай сколько птичьих голосов ты знаешь!</h2>
        <h2 class="mt-4 text-lg">Для старта игры нажми кнопку <strong class="start-game-button">"Начать игру"</strong> в правом верхнем углу</h2>
        </div>
`
    document.querySelector('.start-game-button').addEventListener('mousemove',()=>{
        document.querySelector('.go-game').style.cssText = 'transition: .15s ease-in-out ;transform: scale(.8)'
        setTimeout(()=>{
            document.querySelector('.go-game').style.cssText = ''
        },150)
    })

    let isAudiostart = false
    document.querySelector('.home-button').addEventListener('click', (e) => {
        if(!isAudiostart) {
            homeAudio.muted = false
            homeAudio.play()
            e.target.src= 'public/images/pause-button.png'
        }else{
            homeAudio.muted = true
            homeAudio.pause()
            e.target.src= 'public/images/play-button.png'
        }
        isAudiostart = !isAudiostart
    })

    document.querySelector('.go-game').addEventListener('click',()=>{
        homeAudio.muted = true
        homeAudio.pause()
    })

}

