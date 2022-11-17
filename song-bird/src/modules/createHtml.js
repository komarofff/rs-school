import {language} from "../index";

export async function createHtml() {

    let homeBtn = ''
    let resultatBtn = ''
    let yourResultsBtn = ''
    let gameResultsBtn = ''
    let galleryBtn = ''
    let startGameBtn = ''
    let langBtn = ''
    let nextLevel = ''
    language.condition ? homeBtn = 'Home' : homeBtn = 'Главная'
    language.condition ? resultatBtn = 'Result' : resultatBtn = 'Результат'
    language.condition ? yourResultsBtn = 'Your results' : yourResultsBtn = 'Ваши результаты'
    language.condition ? gameResultsBtn = 'Game results' : gameResultsBtn = 'Результат'
    language.condition ? galleryBtn = 'Birds gallery' : galleryBtn = 'Галерея птиц'
    language.condition ? startGameBtn = 'Start game' : startGameBtn = 'Начать игру'
    language.condition ? langBtn = 'Language' : langBtn = 'Язык'
    language.condition ? nextLevel = 'Next level' : nextLevel = 'Следующий уровень'

    let pageHtml = `
<header class="py-2 container-fluid  border-3 border-gray-200  drop-shadow-lg header bg-blue-900 bg-opacity-25">
    <nav class="container mx-auto px-2">
        <div class="logo-button  w-full flex justify-between mb-2">
            <div class="logo"><img class="w-[50vw] sm:w-[220px]" src="public/images/logo.png" alt="song bird application logo"></div>
            <div class="flex items-center  text-xs language-section">
               <p class=" text-white mb-0 mr-2" >${langBtn}</p>
              
              <button data-lang="ru" class="ru-language mr-1 p-1 rounded  cursor-pointer active hover:bg-blue-500   transition duration-300  text-white">RU</button> 
              <span class=" text-white ">/</span>
              <button data-lang="en" class="en-language ml-1 p-1 rounded cursor-pointer   hover:bg-blue-500 transition duration-300  text-white">EN</button>
            </div>
            
        </div>
        <ul class="flex justify-between items-center items-stretch text-blue-900 font-bold text-sm flex-wrap sm:flex-nowrap">
            <li class="w-full sm:w-[unset] min-w-[100px] my-1 sm:my-0 go-home border border-blue-700 hover:border-white hover:border  active-header-tab cursor-pointer  bg-white  bg-opacity-100 rounded  min-h-full  shadow-lg  p-2  flex items-center justify-center  transition duration-300 relative hover:bg-blue-700 hover:bg-opacity-100 hover:text-white cursor-pointer  hover:shadow-blue-700/50">
                ${homeBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 hidden game-result-box   bg-white rounded  min-h-full shadow-lg  py-2 px-4 text-xl flex items-center justify-center ">
                <span class="mr-2">${resultatBtn}:</span> <span class="result">0</span>
            </li>
            <!--<li class="w-full sm:w-[unset] my-1 sm:my-0 go-result   bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${yourResultsBtn}
            </li>-->
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-previously-result   bg-white rounded border border-blue-700 min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-blue-700 hover:bg-opacity-100 hover:text-white  hover:border-white hover:border cursor-pointer  ">
                ${gameResultsBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 gallery-button hidden  bg-white rounded border border-blue-700 min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-blue-700 hover:bg-opacity-100 hover:text-white  hover:border-white hover:border cursor-pointer  ">
                ${galleryBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-game  bg-blue-700 text-white border border-blue-700 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center   transition duration-300 cursor-pointer hover:bg-white     hover:text-blue-700  ">
                ${startGameBtn}
            </li>
        </ul>
    </nav>
</header>
<main class="container-fluid    h-full grow flex flex-col ">
    <div class="home-page p-2 container mx-auto transition duration-300 min-h-full w-full grid grow relative transition duration-300 fade-in "></div>
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
    <div class="gallery-page p-2  container mx-auto transition duration-300 min-h-full w-full grid grow relative transition duration-300 fade-in bg-white bg-opacity-[95%] rounded-lg p-2 grid my-2"></div>
</main>
<footer class="p-2  container-fluid  bg-blue-900 bg-opacity-25">
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

    if(language.condition){
        enBtn.classList.add('active')
        ruBtn.classList.remove('active')
    }else{
        enBtn.classList.remove('active')
        ruBtn.classList.add('active')
    }

    function changeLanguage(e)  {
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