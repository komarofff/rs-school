import {birdsData} from "./birdsData";

export function createBirdsCategories() {
    // формируем список заданий (типы птиц)
    let categoriesList = []
    for (let i = 0; i < birdsData.length; i++) {
        categoriesList.push(birdsData[i][0].titleRus)
    }
    let questionsBox = document.querySelector('.questions-title')
    questionsBox.innerHTML = ''
    let categoryBox = document.createElement('div')
    //categoryBox.className = 'flex justify-between items-center transition duration-300 categories text-sm'
    categoryBox.className = 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 items-center transition duration-300 categories text-sm font-bold'
    categoriesList.forEach((el, idx) => {
        let category = document.createElement('div')
        if (idx === 0) {
            category.className = 'active-tab shadow-xl rounded p-1   bg-gray-50 opacity-75    m-2  flex justify-center items-center  transition duration-300 tab'
        } else {
            category.className = 'shadow-xl rounded p-1  bg-gray-50 opacity-75  m-2  flex justify-center items-center transition duration-30 tab'
        }
        category.innerHTML = el
        categoryBox.appendChild(category)
    })
    // размещаем на странице
    questionsBox.appendChild(categoryBox)

}