import {birdsData} from './birdsData'
export function createBirdsList() {
    // фомируем список птиц в задании в зависимости от типа птиц
    const activeTab = document.querySelector('.active-tab')
    const searchElement = activeTab.innerText.trim()
    // получаем номер задания idArr
    let idArr = null
    let idSubArr = null
    birdsData.forEach((el, idx) => {
        el.forEach((elem, id) => {
            if (elem.titleRus === searchElement) {
                idArr = idx
                idSubArr = id
            }
        })
    })

    // создаем новый массив
    let askArray = JSON.parse(JSON.stringify(birdsData[idArr]))
    // запоминаем и удаляем первый элемент ( название категории птиц)
    let firstElement = askArray.shift()
    // перемешиваем массив
    askArray = shuffleArray(askArray)
    // ставим назад первый элемент ( название категории птиц)
    askArray.unshift(firstElement)
    // готовим данные к отправке
    let sendData = {
        idArr: idArr,
        idSubArr: idSubArr,
        arr: askArray
    }

    // какой список птиц сейчас на экране
    console.log(sendData.idArr, sendData.idSubArr)
    let newList = document.createElement('ul')
    newList.className = 'list grid grid-cols-2  sm:grid-cols-3 md:grid-cols-1 font-bold'
    sendData.arr.forEach(el => {
        if (el.name) {
            let li = document.createElement('li')
            li.className = 'list-item  py-2 pl-5 w-full cursor-pointer  transition duration-300 border-b border-r md:border-r-0 border-l md:border-l-0 border-t md:border-t-0  border-blue-100 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white relative text-sm'
            li.setAttribute('data-name', el.species)
            li.innerHTML = el.name
            newList.appendChild(li)
        }
    })
    document.querySelector('.birds-list').innerHTML = ''
    document.querySelector('.birds-list').appendChild(newList)


    return sendData

    // функция перемешивания массива
    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]]
        }
        return array
    }
}