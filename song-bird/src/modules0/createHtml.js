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
    language ? homeBtn = 'Home' : homeBtn = 'Главная'
    language ? resultatBtn = 'Result' : resultatBtn = 'Результат'
    language ? yourResultsBtn = 'Your results' : yourResultsBtn = 'Ваши результаты'
    language ? gameResultsBtn = 'Game results' : gameResultsBtn = 'Результат'
    language ? galleryBtn = 'Birds gallery' : galleryBtn = 'Галерея птиц'
    language ? startGameBtn = 'Start game' : startGameBtn = 'Начать игру'
    language ? langBtn = 'Language' : langBtn = 'Язык'
    language ? nextLevel  = 'Next level' : nextLevel = 'Следующий уровень'

    let pageHtml = `
<header class="py-2 container-fluid  border-3 border-gray-200  drop-shadow-lg header backdrop-blur-sm bg-white/30">
    <nav class="container mx-auto px-2">
        <div class="logo-button  w-full flex justify-between mb-2">
            <div class="logo"><img class="h-[70px] drop-shadow-[0_5px_5px_rgba(255,255,255,0.75)] " src="public/images/logo.png" alt="song bird application logo"></div>
            <div class="flex items-center  text-xs">
              <!-- <label for="language">${langBtn}</label>-->
              <select class="select ml-1  outline-none text-xs" id="language" name="language">
              <option value="RU" selected>RU</option>
              <option value="Engl">ENGL</option>
              </select>
            </div>
            
        </div>
        <ul class="flex justify-between items-center items-stretch text-blue-900 font-bold text-sm flex-wrap sm:flex-nowrap">
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-home  active-header-tab cursor-pointer  bg-gray-50 bg-opacity-75 rounded  min-h-full  shadow-lg  p-2  flex items-center justify-center  transition duration-300 relative hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${homeBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 hidden game-result-box  bg-white rounded  min-h-full shadow-lg  py-2 px-4 text-xl flex items-center justify-center ">
                <span class="mr-2">${resultatBtn}:</span> <span class="result">0</span>
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-result hidden  bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${yourResultsBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-previously-result hidden  bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${gameResultsBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 gallery-button hidden  bg-blue-50 bg-opacity-75 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center  transition duration-300 hover:bg-width hover:bg-opacity-100 hover:text-gray-900 cursor-pointer  hover:shadow-blue-700/50">
                ${galleryBtn}
            </li>
            <li class="w-full sm:w-[unset] my-1 sm:my-0 go-game  bg-blue-700 text-white border border-blue-700 rounded  min-h-full shadow-lg  p-2  flex items-center justify-center   transition duration-300 cursor-pointer hover:bg-white  hover:text-blue-700  ">
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
<footer class="p-2  container-fluid  backdrop-blur-sm bg-white/30">
    <div class="container mx-auto flex justify-between items-center font-bold text-blue-900 flex-wrap md:flex-nowrap">
        <p class="w-full md:w-[unset] mb-0 bg-gray-50 bg-opacity-75 p-2 hover:bg-opacity-100 transition duration-300 text-center ">
            <span class="mr-2">© 2022.</span>
            <a target="_blank" href="https://github.com/komarofff"
               class="text-blue-900 hover:text-gray-900 transition duration-300 ">Github - Anatoliy Komarov</a>
        </p>
        <p class="go-gallery mt-2 md:mt-0 w-full rounded cursor-pointer md:w-[unset] mb-0 bg-gray-50 bg-opacity-75 p-2 hover:bg-blue-700  hover:text-white transition duration-300 text-center  font-bold ">
            ${galleryBtn}
        </p>
        <a target="_blank" href="https://rs.school/js/"
           class=" mt-2 md:mt-0 w-full md:w-[unset]  flex items-center justify-center  font-bold group bg-gray-50 bg-opacity-75  p-2 hover:bg-opacity-100 transition duration-300">
            <img class="w-[50px] mr-2 transition duration-300 " src="public/images/rs_school_js.svg" alt="rs_school">
            <span class="group-hover:text-gray-900 transition duration-300 "> «JavaScript/Front-end»</span>
        </a>
    </div>
</footer>
   `
    let body = document.querySelector('body')
    body.innerHTML = ''
    body.innerHTML =  pageHtml

    // document.querySelector('.select').addEventListener('change',()=>{
    //     language = !language
    //     createHeader()
    // })
}