import {language} from "../index";

export async function createHtml() {

    let homeBtn = language.condition ? 'Home' : 'Главная'
    let resultBtn = language.condition ? 'Result' : 'Результат'
    let yourResultsBtn = language.condition ? 'Your results' : 'Ваши результаты'
    let gameResultsBtn = language.condition ? 'Game results' : 'Результат'
    let galleryBtn = language.condition ? 'Birds gallery' : 'Галерея птиц'
    let startGameBtn = language.condition ? 'Start game' : 'Начать игру'
    let langBtn = language.condition ? 'Language' : 'Язык'
    let nextLevel = language.condition ? 'Next level' : 'Следующий уровень'


    let pageHtml = `
<header class="py-2 container-fluid  border-3 border-gray-200  drop-shadow-lg header bg-blue-900 bg-opacity-25 z-50">
    <nav class="container mx-auto px-2">
        <div class="logo-button  w-full flex justify-between">
            <div class="logo"><img class="w-[50vw] sm:w-[220px]" src="public/images/logo.png" alt="song bird application logo"></div>
            <div class="flex items-center  text-xs language-section">
               <p class=" text-white mb-0 mr-2" >${langBtn}</p>
              
              <button data-lang="ru" class="ru-language mr-1 p-1 rounded  cursor-pointer active hover:bg-blue-500   transition duration-300  text-white">RU</button> 
              <span class=" text-white ">/</span>
              <button data-lang="en" class="en-language ml-1 p-1 rounded cursor-pointer   hover:bg-blue-500 transition duration-300  text-white">EN</button>
            </div>
            
        </div>
        <ul class=" text-blue-900 font-bold text-xs sm:text-sm grid grid-cols-3 gap-1 sm:gap-2">
            <li class="whitespace-nowrap w-full  my-1 sm:my-0 go-home border border-white  active-header-tab cursor-pointer  bg-white   rounded  min-h-full  shadow-lg  p-2  flex items-center justify-center  transition duration-300 relative hover:bg-blue-700 hover:text-white cursor-pointer  ">
                ${homeBtn}
            </li>
            <li class="whitespace-nowrap w-full sm:w-[unset] my-1 sm:my-0 hidden game-result-box   bg-white rounded  min-h-full shadow-lg  p-2  flex items-center justify-center ">
                <span class="mr-2">${resultBtn}:</span> <span class="result">0</span>
            </li>
            
            <li class="hidden whitespace-nowrap w-full sm:w-[unset] my-1 sm:my-0 go-previously-result   bg-white rounded min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 border border-white hover:bg-blue-700  hover:text-white    cursor-pointer  ">
                ${gameResultsBtn}
            </li>
            <li class="whitespace-nowrap w-full sm:w-[unset] my-1 sm:my-0 gallery-button hidden  bg-white rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-blue-700 border border-white  hover:text-white   cursor-pointer  ">
                ${galleryBtn}
            </li>
            <li class="whitespace-nowrap w-full sm:w-[unset] my-1 sm:my-0 go-game  bg-white  rounded  min-h-full shadow-lg  p-2  flex items-center justify-center   transition duration-300 hover:text-white  hover:bg-blue-700 cursor-pointer  border border-white      ">
                ${startGameBtn}
            </li>
        </ul>
    </nav>
</header>
<main class="container-fluid    h-full grow flex flex-col ">
    <div class="home-page active-page p-2 container mx-auto transition duration-300 min-h-full w-full grid grow relative transition duration-300 fade-in "></div>
    <div class="game-page p-2  transition duration-300 fade-in">
        <section class="questions-title container mx-auto  my-2">
        </section>
        <section class="player-section container mx-auto rounded p-2  my-2   bg-gray-50 bg-opacity-[90%] shadow-xl">
        </section>
        <section
                class="task-section container mx-auto rounded py-1 my-2 flex justify-between items-start  w-full bg-gray-50 bg-opacity-[90%] shadow-xl flex-wrap md:flex-nowrap">
            <div class="birds-list w-full  h-full p-2 border-r border-gray-200  "></div>
            <div class="solution w-full  p-2 min-h-full self-stretch p-2 "></div>

        </section>
        <p class="next-level-button container mx-auto rounded p-2  my-3   bg-gray-50 opacity-[90%] text-xl flex justify-center items-center shadow-xl">
           ${nextLevel}
        </p>
    </div>
    <div class="hidden results-page p-2  container mx-auto   transition duration-300 fade-in"></div>
    <div class="gallery-page p-2  container mx-auto px-2  min-h-full w-full grid grow relative transition duration-300 fade-in  p-2 grid my-2"></div>
</main>
<footer class="p-2  container-fluid  bg-blue-900 bg-opacity-25 z-50">
    <div class="container mx-auto flex justify-between items-center font-bold text-blue-900 flex-wrap md:flex-nowrap px-2 text-sm">
        <p class="w-full md:w-[unset] mb-0 bg-white  bg-opacity-100 px-1 py-2 hover:bg-opacity-100 transition duration-300 text-center ">
            <span class="mr-2">© 2022.</span>
            <a target="_blank" href="https://github.com/komarofff"
               class="text-blue-900  hover:text-gray-900 transition duration-300 ">Github - Anatoliy Komarov</a>
        </p>
        <p class="go-gallery mt-2 md:mt-0 w-full rounded cursor-pointer md:w-[unset] mb-0 bg-white  bg-opacity-100 p-2 hover:bg-blue-700  hover:text-white transition duration-300 text-center  font-bold ">
            ${galleryBtn}
        </p>
        <a target="_blank" href="https://rs.school/js/"
           class=" mt-2 md:mt-0 w-full md:w-[unset]  flex items-center justify-center  font-bold group bg-white  bg-opacity-100  p-2 hover:bg-opacity-100 transition duration-300">
            <img class="w-[50px] mr-2 transition duration-300 " src="public/images/rs_school_js.svg" alt="rs_school">
            <span class="group-hover:text-gray-900 transition duration-300 "> «JavaScript/Front-end»</span>
        </a>
    </div>
</footer>
   `
    let body = document.querySelector('body')
    body.innerHTML = ''
    body.innerHTML = pageHtml

    // language switcher

    let ruBtn = document.querySelector('.ru-language')
    let enBtn = document.querySelector('.en-language')
    ruBtn.addEventListener('click', changeLanguage)
    enBtn.addEventListener('click', changeLanguage)

    if (language.condition) {
        enBtn.classList.add('active')
        ruBtn.classList.remove('active')
    } else {
        enBtn.classList.remove('active')
        ruBtn.classList.add('active')
    }

    function changeLanguage(e) {
        let lang = e.target.dataset.lang
        if (lang === 'en') {
            language.condition = true
            localStorage.setItem('language', true)
            enBtn.classList.add('active')
            ruBtn.classList.remove('active')
        } else {
            language.condition = false
            localStorage.removeItem('language')
            enBtn.classList.remove('active')
            ruBtn.classList.add('active')
        }
        window.location.reload()

    }
}