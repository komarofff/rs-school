import { eventsObject, results, startGamePage} from "../index"

export default function (resultSelector) {

    let maxScore = 30
    let data = []
    let resultsSting = ''
    let resultMessage = ''
    let currentDate = new Date()
    let dd = String(currentDate.getDate()).padStart(2, '0')
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0')
    let yyyy = currentDate.getFullYear()
    let today = mm + '/' + dd + '/' + yyyy

    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
    if (JSON.parse(localStorage.getItem('results')).length > 0) {
        data = JSON.parse(localStorage.getItem('results'))
    }

    data.unshift({
        date: today,
        time: time,
        result: results.result
    })
    localStorage.removeItem('results')
    localStorage.setItem('results', JSON.stringify(data))
    for (let i = 0; i < data.length; i++) {
        if (i < 10) {

            resultsSting += `<tr  class = "border-b" >
                <td 
            class = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" >
             ${i + 1} 
             </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ${data[i].date}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ${data[i].time}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ${data[i].result}
            </td>
        </tr>
        `
        }
    }
    if (results.result < 30) {
        // формируем кнопку рестарта игры
        resultMessage = `
<p>Максимальное количество баллов за викторину - 30</p>
<p class="start-game-again font-bold transition duration-300 rounded p-2  my-3 cursor-pointer   text-xl flex justify-center items-center shadow-xl bg-blue-700 text-white border border-blue-700 hover:bg-white hover:text-blue-700">
            Играть еще раз
        </p>`
    } else {
        // все норм. юзер набрал максимум
        //выводим поздравление
        resultMessage = ` <h1>Поздравляем! Вы набрали максимальное количество баллов! Викторина закончена.</h1>`
    }


    resultSelector.innerHTML = `
        <div class="h-[90%] flex justify-center items-center flex-col bg-white bg-opacity-[90%] rounded-lg shadow-xl text-2xl my-4 p-4 text-center">
        <h1 class="font-bold">Результаты игры:</h1>
        <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                N
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Дата
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Время
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Результат
              </th>
            </tr>
          </thead>
          <tbody>
            ${resultsSting}
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        <div class="mt-2"> ${resultMessage}</div>
      
        </div>`

    if (document.querySelector('.start-game-again')) {
        document.querySelector('.start-game-again').addEventListener('click', () => {

            eventsObject.isHomePage = false
            eventsObject.isGamePage = true
            eventsObject.isResultPage = false
            results.result = 0
            startGamePage()
        })
    }
}
