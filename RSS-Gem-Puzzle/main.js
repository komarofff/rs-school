class Game {
    constructor() {
        this.isFirstStart = true
        this.body = document.querySelector('body')
        this.gameBoard = ''
        this.gameResults = JSON.parse(localStorage.getItem('GameResults')) || []
        this.saveMyGame = []
        this.moves = 0
        this.COMMON_GRID = 4
        this.boardSize = 4
        this.numbersArr = []
        this.board = ''
        this.isShuffle = true
        this.isMove = false
        this.isFinishGame = false
        this.isStopped = true
        // timer
        this.time = '00:00'
        this.timeCounter = 0
        this.timer = null
        this.isTimerStart = false

        this.startSavedGameButtton = false
        this.savedGameButton = ''
        this.deleteAllResults = ''
        this.isSound = true
        this.soundBeep = new Audio("sound.mp3")

        this.xStart = null
        this.YStart = null
        this.congratulation = document.createElement('div')

    }

    init() {

        this.changeTablesGrid(this.boardSize)
        this.paintBoard()
        this.isFirstStart = false
    }

    makeBoardNumbers() {

        this.board = ''
        let indexOfDropZone = this.numbersArr.indexOf('drop_zone')

        for (let i = 0; i < this.numbersArr.length; i++) {
            if (typeof this.numbersArr[i] === "number") {
                if (i === indexOfDropZone - 1) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-right" draggable="true"></div>`
                } else if (i === indexOfDropZone + 1) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-left" draggable="true"></div>`
                } else if (i === indexOfDropZone - this.boardSize) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-down" draggable="true"></div>`
                } else if (i === indexOfDropZone + this.boardSize) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-up" draggable="true"></div>`
                } else {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item"></div>`
                }
            } else {
                this.board += `<div data-index="${i}" class="drop-zone-item"></div>`
            }

        }

    }

    paintBoard() {
        this.makeBoardNumbers()

        if (this.startSavedGameButtton) {
            this.savedGameButton = '<div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="fw-normal btn btn-primary start-saved-game w-100 w-md-unset text-nowrap">Start saved game</button></div>'
            this.deleteAllResults = '<div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="fw-normal btn btn-danger delete-saved-game w-100 w-md-unset text-nowrap">Delete saved game</button></div>'
        } else {
            this.savedGameButton = ''
            this.deleteAllResults = ''
        }
        this.body.innerHTML = ''
        this.gameBoard = document.createElement('div')
        this.gameBoard.setAttribute('id', 'gameBoard')
        this.gameBoard.innerHTML = `
        <div class="container mx-auto">
         <div class="d-flex  justify-content-center flex-md-nowrap flex-wrap mobile-menu pt-3 pt-md-1">
         <p class="close-mobile-menu d-md-none">X</p>
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="fw-normal btn btn-success shuffle-start-game w-100  w-md-unset text-nowrap">Shuffle and Start</button></div>
         ${this.savedGameButton}
          
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="fw-normal btn btn-success save-game w-100  w-md-unset text-nowrap">Save</button></div>
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="fw-normal btn btn-success show-results w-100  w-md-unset text-nowrap">Results</button></div>
<!--         <div class="mx-2"><button class="btn btn-success save-results" ">save Results</button></div>-->
          ${this.deleteAllResults}
         </div>
         <div class="d-flex w-fit-content justify-content-evenly align-items-center position-relative mx-auto">
         <p class="open-mobile-menu d-md-none">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
           </svg>
          </p>
          <div class="mt-5  mt-md-2 d-grid results-box">
          <div class= "d-flex flex-nowrap align-items-center "><button class="fw-normal btn btn-warning stop-game  text-nowrap py-1 px-4">Play</button></div>
          <div class="d-flex flex-nowrap align-items-center fs-6 fw-normal ">Moves:<span class="ms-1 moves fs-5 fw-bolder"> ${this.moves}</span></div>
          <div class=" d-flex flex-nowrap align-items-center fs-6 fw-normal">Time:<span class="ms-1 time fs-5 fw-bolder"> ${this.time}</span></div> 
          </div>           
         </div>
         <div class="d-flex w-fit-content justify-content-center align-items-center mx-auto my-2">
            <div class="display-grid grid-${this.boardSize}-column gameBoard ">
                        
            </div>
         </div>
         <div class="my-2 w-fit-content mx-auto bottom-info">
            <p class="text-center mb-0"><span class="fw-normal">Frame size:</span>  ${this.boardSize}x${this.boardSize}</p>
            <p class="d-flex align-items-center justify-content-center mb-0">
            <span class="fw-normal me-2 me-md-3 text-nowrap">Other sizes:</span>  
            <a class="change-tables-size me-2"  href="#" data-grid="3">3x3</a> 
            <a class="change-tables-size me-2"  href="#" data-grid="4">4x4</a> 
            <a class="change-tables-size me-2"  href="#" data-grid="5">5x5</a> 
            <a class="change-tables-size me-2"  href="#" data-grid="6">6x6</a> 
            <a class="change-tables-size me-2"  href="#" data-grid="7">7x7</a> 
            <a class="change-tables-size me-2"  href="#" data-grid="8">8x8</a></p>
         </div>
         <div class="d-flex justify-content-center my-2 text-center"><button class="btn btn-info sound-toggle">Sound OFF</button></div>
        </div>
        `
        this.body.appendChild(this.gameBoard)
        this.eventsOnBoard()


    }

    eventsOnBoard() {
        // mobile menu  start
        let openMenu = document.querySelector('.open-mobile-menu')
        let mobileMenu = document.querySelector('.mobile-menu')
        let closeMenu = document.querySelector('.close-mobile-menu')
        openMenu.addEventListener('click', () => {
            mobileMenu.style.cssText = 'transform: translateY(0%);'
        })
        closeMenu.addEventListener('click', () => {
            mobileMenu.style.cssText = ''
        })
        // mobile menu end

        // shuffle numbers
        document.querySelector('.shuffle-start-game').addEventListener('click', () => {
            this.startShuffleGame()
        })
        //start saved game
        if (document.querySelector('.start-saved-game')) {
            document.querySelector('.start-saved-game').addEventListener('click', () => {
                this.startSavedGame()
            })
        }
        //stop game
        document.querySelector('.stop-game').addEventListener('click', () => {

            if (this.isStopped === true) {
                this.isMove = true
                document.querySelector('.stop-game').innerHTML = 'Stop'
                this.isStopped = false
                this.isTimerStart = true
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.timerStart.call(this)
                }, 1000)

            } else {
                this.stopGame()
            }

        })
        //save game
        document.querySelector('.save-game').addEventListener('click', () => {
            this.saveGame()
        })
        //show results
        document.querySelector('.show-results').addEventListener('click', () => {
            this.showResults()
        })
        // save results ( only for development mode )
        // document.querySelector('.save-results').addEventListener('click', () => {
        //     this.saveResult()
        // })
        // delete saved game
        if (document.querySelector('.delete-saved-game')) {
            document.querySelector('.delete-saved-game').addEventListener('click', () => {
                localStorage.removeItem('SavedGames')
                this.startSavedGameButtton = false
                this.buildNumbersArray(this.COMMON_GRID)
                this.paintBoard()
                this.stopGame()
            })
        }
        //change board size
        const newGrid = document.querySelectorAll('.change-tables-size')
        newGrid.forEach(el => {
            el.addEventListener('click', () => {
                // this.stopTime()
                this.buildNumbersArray(Number(el.dataset.grid))
                this.paintBoard()
                this.stopGame()
            })
        })
        // on/off sound
        const soundButton = document.querySelector('.sound-toggle')
        soundButton.addEventListener('click', () => {
            this.isSound ? soundButton.innerHTML = 'Sound ON' : soundButton.innerHTML = 'Sound OFF'
            this.isSound = !this.isSound
        })
        document.querySelector('.gameBoard').innerHTML = this.board

        // mouse events start
        let context = this
        const clickedGameBoard = document.querySelector('.gameBoard')
        clickedGameBoard.addEventListener('mousedown', mouseDown)
        clickedGameBoard.addEventListener('mouseup', mouseUp)

        function mouseDown(el) {

            if (context.isMove && (el.target.classList.contains('to-right') || el.target.classList.contains('to-left') || el.target.classList.contains('to-up') || el.target.classList.contains('to-down'))) {
                context.xStart = el.pageX
                context.yStart = el.offsetY
                document.addEventListener('mousemove', startMove)
            }
        }

        function startMove(el) {
            let x = el.pageX
            let y = el.offsetY
            if (x > context.xStart) {
                if (el.target.classList.contains('to-right')) {
                    document.removeEventListener('mousemove', startMove)
                    context.moveRight(el.target)
                }
            }
            if (x < context.xStart) {
                if (el.target.classList.contains('to-left')) {
                    document.removeEventListener('mousemove', startMove)
                    context.moveLeft(el.target)
                }
            }
            if (y < context.yStart) {
                if (el.target.classList.contains('to-up')) {
                    document.removeEventListener('mousemove', startMove)
                    context.moveTop(el.target)
                }
            }
            if (y > context.yStart) {
                if (el.target.classList.contains('to-down')) {
                    document.removeEventListener('mousemove', startMove)
                    context.moveDown(el.target)
                }
            }

        }

        function mouseUp(el) {
            document.removeEventListener('mousemove', startMove)
            let x = el.pageX
            let y = el.offsetY
            if (x === context.xStart && y === context.yStart) {
                document.removeEventListener('mousemove', startMove)
                if (el.target.classList.contains('to-right')) {
                    context.moveRight(el.target)
                }
                if (el.target.classList.contains('to-left')) {
                    context.moveLeft(el.target)
                }
                if (el.target.classList.contains('to-up')) {
                    context.moveTop(el.target)
                }
                if (el.target.classList.contains('to-down')) {
                    context.moveDown(el.target)
                }
            }
        }

        clickedGameBoard.addEventListener('touchstart', touchStart)

        function touchStart(el) {
            if (context.isMove && (el.target.classList.contains('to-right') || el.target.classList.contains('to-left') || el.target.classList.contains('to-up') || el.target.classList.contains('to-down'))) {
                context.xStart = el.changedTouches[0].screenX
                context.yStart = el.changedTouches[0].screenY
                document.addEventListener('touchmove', startMoveTouch)
            }
        }

        function startMoveTouch(el) {
            let x = el.changedTouches[0].screenX
            let y = el.changedTouches[0].screenY
            if (x > context.xStart) {
                if (el.target.classList.contains('to-right')) {
                    document.removeEventListener('touchmove', startMoveTouch)
                    context.moveRight(el.target)
                }
            }
            if (x < context.xStart) {
                if (el.target.classList.contains('to-left')) {
                    document.removeEventListener('touchmove', startMoveTouch)
                    context.moveLeft(el.target)
                }
            }
            if (y < context.yStart) {
                if (el.target.classList.contains('to-up')) {
                    document.removeEventListener('touchmove', startMoveTouch)
                    context.moveTop(el.target)
                }
            }
            if (y > context.yStart) {
                if (el.target.classList.contains('to-down')) {
                    document.removeEventListener('touchmove', startMoveTouch)
                    context.moveDown(el.target)
                }
            }

        }

        //// mouse events end
    }

    moveRight(el) {
        el.ondragstart = function() {
                return false
            }
        let width = el.getBoundingClientRect().width
        el.style.cssText = `transform: translateX(${width + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveLeft(el) {
        el.ondragstart = function() {
                return false
            }
        let width = el.getBoundingClientRect().width
        el.style.cssText = `transform: translateX(-${width + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveTop(el) {
        el.ondragstart = function() {
                return false
            }
        let height = el.getBoundingClientRect().height
        el.style.cssText = `transform: translateY(-${height + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveDown(el) {
        el.ondragstart = function() {
                return false
            }
        let height = el.getBoundingClientRect().height
        el.style.cssText = `transform: translateY(${height + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveNumbersForClick(el) {
        this.isMove = false
        if (!this.isTimerStart) {
            clearInterval(this.timer)
            this.isTimerStart = true
            this.timer = setInterval(() => {

                this.timerStart.call(this)
            }, 1000)
        }
        this.moves++
        document.querySelector('.moves').innerHTML = this.moves
        let elemIdx = el.dataset.index
        let elemValue = el.dataset.number
        let dropZone = document.querySelector('.drop-zone-item')
        let dropZoneIndex = dropZone.dataset.index
        this.numbersArr[elemIdx] = 'drop_zone'
        this.numbersArr[dropZoneIndex] = Number(elemValue)

        if (this.isSound) {
            this.sound()
        }

        setTimeout(() => {
            this.makeBoardNumbers()
            document.querySelector('.gameBoard').innerHTML = this.board
            let counterFinish = 1
            for (let i = 0; i < this.numbersArr.length - 1; i++) {
                if (this.numbersArr[i] === i + 1) {
                    counterFinish++
                }
            }
            // console.log('counterFinish',counterFinish)
            if (counterFinish === this.numbersArr.length) {
                this.finishGame()
            }
            this.isMove = true
        }, 300)

    }

    startSavedGame() {

        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.timerStart.call(this)
        }, 1000)
        let storage = JSON.parse(localStorage.getItem('SavedGames'))

        this.startSavedGameButtton = true
        this.numbersArr = storage[0].numbers
        this.time = storage[0].time
        this.moves = storage[0].moves
        this.timeCounter = storage[0].timeCounter
        this.boardSize = storage[0].boardSize
        this.paintBoard()

        this.isMove = true
        document.querySelector('.stop-game').innerHTML = 'Stop'
        this.isStopped = false


    }

    startShuffleGame() {
        this.moves = 0
        this.time = '00:00'
        this.timeCounter = 0
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.timerStart.call(this)
        }, 1000)

        this.buildNumbersArray(this.boardSize)
        this.paintBoard()

        this.isMove = true
        document.querySelector('.stop-game').innerHTML = 'Stop'
        this.isStopped = false


    }

    stopGame() {
        //alert('stop game')
        this.isTimerStart = false
        this.isMove = false
        document.querySelector('.stop-game').innerHTML = 'Play'
        this.isStopped = true
        this.stopTime()
    }

    finishGame() {
        this.saveResult()
        this.stopGame()
        this.congratulation.innerHTML = `<div class="congratulation">Hooray! You solved the puzzle in ${this.time} and ${this.moves} moves!</div>`
        this.body.appendChild(this.congratulation)
        setTimeout(() => {
            //this.isTimerStart = true
            this.congratulation.innerHTML = ''
            //this.startShuffleGame()
            this.changeTablesGrid(this.boardSize)
            this.paintBoard()
            this.time = '00:00'
            this.moves = 0
            this.isMove = false
            this.timeCounter = 0
            document.querySelector('.moves').innerHTML = this.moves
            document.querySelector('.time').innerHTML = this.time
        }, 5000)
    }

    saveGame() {
        this.saveMyGame = []
        let result = {
            numbers: this.numbersArr,
            moves: this.moves,
            time: this.time,
            timeCounter: this.timeCounter,
            boardSize: this.boardSize
        }
        this.saveMyGame.push(result)
        localStorage.setItem('SavedGames', JSON.stringify(this.saveMyGame))
        this.init()
        this.stopGame()
    }

    saveResult() {
        let result = {
            numbers: this.numbersArr,
            moves: this.moves,
            time: this.time,
            timeCounter: this.timeCounter,
            boardSize: this.boardSize
        }
        if (this.gameResults.length > 0) {
            let maxInArray = this.gameResults.sort((a, b) => a.moves - b.moves)

            if (maxInArray[0].moves >= this.moves && maxInArray[0].timeCounter > this.timeCounter && maxInArray[0].boardSize === this.boardSize) {
                if (this.gameResults.length < 10) {
                    this.gameResults.unshift(result)
                    localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
                } else {
                    this.gameResults.pop()
                    this.gameResults.unshift(result)
                    localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
                }
            } else if (maxInArray[0].boardSize !== this.boardSize) {
                if (this.gameResults.length < 10) {
                    this.gameResults.unshift(result)
                    localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
                } else {
                    this.gameResults.pop()
                    this.gameResults.unshift(result)
                    localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
                }
            }
        } else {
            this.gameResults.unshift(result)
            localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
        }

    }

    showResults() {
        let modal = document.createElement('div')
        modal.setAttribute('class', 'modal-window')
        modal.innerHTML = `<div class="close-window">x</div>`
        modal.innerHTML += '<h3 class="text-center fw-bold mb-3">Your results:</h3>'
        let data = JSON.parse(localStorage.getItem('GameResults'))
        if (data) {
            data = data.sort((a, b) => a.boardSize - b.boardSize && a.moves - b.moves)
            let message = ``
            for (let i = 0; i < data.length; i++) {
                message += `<p> ${i + 1}) <span class="ms-1 me-3">Moves - ${data[i].moves}</span> <span> Time: ${data[i].time}</span> <span class="ms-3">Board  ${data[i].boardSize}x${data[i].boardSize}</span> </p>`
            }
            modal.innerHTML += message
        }
        this.body.appendChild(modal)
        let dataFromStorage = JSON.parse(localStorage.getItem('GameResults'))
        document.querySelector('.close-window').addEventListener('click', () => {
            this.body.removeChild(modal)
        })
    }


    shuffleArray(a) {
        let array = a
        let resultArray = []
        let boardSize = this.boardSize

        function check() {
            let indexOfZero = 0
            array.forEach((elem, idx) => elem.includes(0) && (indexOfZero = idx))
            let array2 = array.flat()
            array2.splice(array2.indexOf(0), 1)
            let sum = array2.reduce((start, elemValue, idx, arr) => (arr.slice(idx).forEach(elem => {
                elem < elemValue && (start += 1)
            }), start), 0)

            ////////////////
            let number = array.flat().map((elem, idx, arr) => {
                let sum = 0
                for (let i = idx; i < arr.length; i++) {
                    if (elem > arr[i] && arr[i] !== 0) sum++
                }
                return sum
            }).reduce((start, elem) => start + elem, 0)
            //console.log('number',number)
            let number2 = 0
            array.forEach((a, i) => {
                a.forEach((el) => {
                    if (el === 0) number2 = i + 1
                })
            })
            number += number2
            //return number % 2 === arr.length % 2


            ////////////////

            if (array.length % 2 !== 0) {
                // ???????????????? ??????????????
                if (sum % 2 === 0 && (sum + indexOfZero) % 2 !== 0) {
                    resultArray = array.flat()
                } else {
                    resultArray = []
                    array = shuff()
                    check()
                }
            }
            if (array.length % 2 === 0) {
                // ???????????? ??????????????
                if (sum % 2 !== 0 && (sum + indexOfZero) % 2 !== 0) {
                    resultArray = array.flat()
                } else {
                    resultArray = []
                    array = shuff()
                    check()
                }
            }

        }

        check()
        if (resultArray.length > 0) {
            let zeroIndex = resultArray.indexOf(0)
            resultArray[zeroIndex] = 'drop_zone'
            return resultArray
        } else {
            check()
        }

        function shuff() {
            let arr = []
            for (let i = 0; i < boardSize * boardSize + 1; i++) {
                if (i < boardSize * boardSize) {
                    arr.push(i)
                }
            }
            for (let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {
            }

            let blockArray = []
            for (let i = 0; i < boardSize; i++) {
                blockArray.push(arr.slice(i * boardSize, (i + 1) * boardSize))
            }
            return blockArray
        }
    }

    changeTablesGrid(newSize) {
        let storage = localStorage.getItem('SavedGames')
        if (storage) {
            this.startSavedGameButtton = true

        }
        if (!this.isFirstStart && storage) {
            storage = JSON.parse(localStorage.getItem('SavedGames'))
            this.numbersArr = storage[0].numbers
            this.time = storage[0].time
            this.moves = storage[0].moves
            this.timeCounter = storage[0].timeCounter
            this.boardSize = storage[0].boardSize

        } else {
            this.boardSize = newSize
            let boardSize = this.boardSize
            let arr = []
            for (let i = 0; i < newSize * newSize + 1; i++) {
                if (i < newSize * newSize) {
                    arr.push(i)
                }
            }
            for (let j, x, i = arr.length; i; j = Math.random() * i, x = arr[--i], arr[i] = arr[j], arr[j] = x) {
            }
            let blockArray = []
            for (let i = 0; i < boardSize; i++) {
                blockArray.push(arr.slice(i * boardSize, (i + 1) * boardSize))
            }
            this.numbersArr = this.shuffleArray(blockArray)
        }

    }

    buildNumbersArray(newSize) {
        this.time = '00:00'
        this.moves = 0
        this.timeCounter = 0
        this.boardSize = newSize

        // let arr = []
        // while (arr.length < Math.pow(this.boardSize, 2)) {
        //     let t = Math.floor(Math.random() * (Math.pow(this.boardSize, 2)))
        //     arr.includes(t) || arr.push(t)
        // }
        let arr = []
        for (let i = 0; i < newSize * newSize + 1; i++) {
            if (i < newSize * newSize) {
                arr.push(i)
            }
        }
        for (let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {
        }

        let blockArray = []
        for (let i = 0; i < this.boardSize; i++) {
            blockArray.push(arr.slice(i * this.boardSize, (i + 1) * this.boardSize))
        }
        this.numbersArr = this.shuffleArray(blockArray)
    }

    stopTime() {
        clearInterval(this.timer)
    }

    timerStart() {
        this.timeCounter++
        let hours = Math.floor(this.timeCounter / 60 / 60)
        let minutes = Math.floor(this.timeCounter / 60) - (hours * 60)
        let seconds = this.timeCounter % 60
        this.time = [//hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')].join(':')
        document.querySelector('.time').textContent = this.time
    }

    sound() {
        // let snd = new Audio("sound.mp3")
        // snd.play()
        this.soundBeep.play()
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const newGame = new Game()
    newGame.init()
})
