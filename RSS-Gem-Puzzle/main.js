class Game {
    constructor() {
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
        this.isMove = true
        // timer
        this.time = '00:00'
        this.timeCounter = 0
        this.timer = null
        this.isTimerStart = false

        this.startSavedGameButtton = false
        this.savedGameButton = ''
        this.deleteAllResults = ''
        this.isSound = true

        this.xStart = null
        this.YStart = null

    }

    init() {
        this.changeTablesGrid(this.boardSize)
        this.paintBoard()
    }

    makeBoardNumbers() {
        this.board = ''
        let indexOfDropZone = this.numbersArr.indexOf('drop_zone')

        for (let i = 0; i < this.numbersArr.length; i++) {
            if (typeof this.numbersArr[i] === "number") {
                if (i === indexOfDropZone - 1) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-right">${this.numbersArr[i]}</div>`
                } else if (i === indexOfDropZone + 1) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-left">${this.numbersArr[i]}</div>`
                } else if (i === indexOfDropZone - this.boardSize) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-down">${this.numbersArr[i]}</div>`
                } else if (i === indexOfDropZone + this.boardSize) {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item can-move to-up">${this.numbersArr[i]}</div>`
                } else {
                    this.board += `<div data-index="${i}" data-number="${this.numbersArr[i]}" class="number-item">${this.numbersArr[i]}</div>`
                }
            } else {
                this.board += `<div data-index="${i}" class="drop-zone-item"></div>`
            }

        }

    }

    paintBoard() {
        this.makeBoardNumbers()

        if (this.startSavedGameButtton) {
            this.savedGameButton = '<div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="btn btn-primary start-saved-game w-100 w-md-unset text-nowrap">Start saved game</button></div>'
            this.deleteAllResults = '<div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="btn btn-danger delete-saved-game w-100 w-md-unset text-nowrap">Delete saved game</button></div>'
        } else {
            this.savedGameButton = ''
            this.deleteAllResults = ''
        }
        this.body.innerHTML = ''
        this.gameBoard = document.createElement('div')
        this.gameBoard.setAttribute('id', 'gameBoard')
        this.gameBoard.innerHTML = `
        <div class="container mt-1 mx-auto">
         <div class="d-flex my-2 justify-content-center flex-md-nowrap flex-wrap mobile-menu pt-3 pt-md-none">
         <p class="close-mobile-menu d-md-none">X</p>
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="btn btn-success shuffle-start-game w-100  w-md-unset text-nowrap">Shuffle and Start</button></div>
         ${this.savedGameButton}
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="btn btn-secondary stop-game w-100  w-md-unset text-nowrap">Stop</button></div>
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="btn btn-success save-game w-100  w-md-unset text-nowrap">Save</button></div>
          <div class="mx-2 mt-3 mt-md-0 w-100  w-md-unset"><button class="btn btn-success show-results w-100  w-md-unset text-nowrap">Results</button></div>
<!--          <div class="mx-2"><button class="btn btn-success save-results" ">save Results</button></div>-->
          ${this.deleteAllResults}
         </div>
         <div class="d-flex justify-content-center align-items-center position-relative">
         <p class="open-mobile-menu d-md-none">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
           </svg>
          </p>
          <div class="fs-6 fw-semibold me-3">Moves:<span class="ms-2 moves fs-5 fw-bolder"> ${this.moves}</span></div>
          <div class="fs-6 fw-semibold">Time:<span class="ms-2 time fs-5 fw-bolder"> ${this.time}</span></div>            
         </div>
         <div class="d-flex w-fit-content justify-content-center align-items-center mx-auto my-3">
            <div class="display-grid grid-${this.boardSize}-column gameBoard ">
                        
            </div>
         </div>
         <div class="row my-2">
            <p class="col-12 text-center mb-0"><span class="fw-semibold">Frame size:</span>  ${this.boardSize}x${this.boardSize}</p>
            <p class="col-12 d-flex align-items-center justify-content-center mb-0">
            <span class="fw-semibold me-2 me-md-3 text-nowrap">Other sizes:</span>  
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

        // mobile menu  start
        let openMenu = document.querySelector('.open-mobile-menu')
        let mobileMenu = document.querySelector('.mobile-menu')
        let closeMenu = document.querySelector('.close-mobile-menu')
        openMenu.addEventListener('click',()=>{
            mobileMenu.style.cssText = 'transform: translateY(0%);'
        })
        closeMenu.addEventListener('click',()=>{
            mobileMenu.style.cssText = ''
        })
        // mobile menu end

        document.querySelector('.shuffle-start-game').addEventListener('click', () => {
            this.startShuffleGame()
        })
        if (document.querySelector('.start-saved-game')) {
            document.querySelector('.start-saved-game').addEventListener('click', () => {
                this.startSavedGame()
            })
        }
        document.querySelector('.stop-game').addEventListener('click', () => {
            this.stopGame()
        })

        document.querySelector('.save-game').addEventListener('click', () => {
            this.saveGame()
        })
        document.querySelector('.show-results').addEventListener('click', () => {
            this.showResults()
        })
        // document.querySelector('.save-results').addEventListener('click', () => {
        //     this.saveResult()
        // })
        if (document.querySelector('.start-saved-game')) {
            document.querySelector('.delete-saved-game').addEventListener('click', () => {
                localStorage.removeItem('SavedGames')
                this.startSavedGameButtton = false
                this.buildNumbersArray(this.COMMON_GRID)
                this.paintBoard()
            })
        }

        const newGrid = document.querySelectorAll('.change-tables-size')
        newGrid.forEach(el => {
            el.addEventListener('click', () => {
                this.stopTime()
                this.buildNumbersArray(Number(el.dataset.grid))
                this.paintBoard()
            })
        })

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
            if (context.isMove
                && (el.target.classList.contains('to-right')
                    || el.target.classList.contains('to-left')
                    || el.target.classList.contains('to-up')
                    || el.target.classList.contains('to-down'))) {
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
            if (context.isMove
                && (el.target.classList.contains('to-right')
                    || el.target.classList.contains('to-left')
                    || el.target.classList.contains('to-up')
                    || el.target.classList.contains('to-down'))) {
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
        let width = el.getBoundingClientRect().width
        el.style.cssText = `transform: translateX(${width + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveLeft(el) {
        let width = el.getBoundingClientRect().width
        el.style.cssText = `transform: translateX(-${width + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveTop(el) {
        let height = el.getBoundingClientRect().height
        el.style.cssText = `transform: translateY(-${height + 1}px)`
        this.moveNumbersForClick(el)
    }

    moveDown(el) {
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

        this.changeTablesGrid(this.boardSize)
        this.paintBoard()

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

    }

    stopGame() {
        //alert('stop game')
        this.isTimerStart = false
        this.stopTime()
    }

    finishGame() {
        this.saveResult()
        this.stopGame()
        let congratulation = document.createElement('div')
        congratulation.innerHTML = `<div class="congratulation">Hooray! You solved the puzzle in ${this.time} and ${this.moves} moves!</div>`
        this.body.append(congratulation)
        setTimeout(()=>{
            congratulation.innerHTML = ''
            this.body.remove(congratulation)
            //this.init()
        },5000)
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
        alert('save  game to local storage')
        this.init()

    }

    saveResult() {
        let result = {
            numbers: this.numbersArr,
            moves: this.moves,
            time: this.time,
            timeCounter: this.timeCounter,
            boardSize: this.boardSize
        }
        console.log('this.gameResults', this.gameResults)
        if (this.gameResults) {

            if (this.gameResults.length < 10) {
                this.gameResults.unshift(result)
                localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
            } else {
                this.gameResults.pop()
                this.gameResults.unshift(result)
                localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
            }
        } else {
            this.gameResults.unshift(result)
            localStorage.setItem('GameResults', JSON.stringify(this.gameResults))
        }
        //alert('save  results to local storage')
        //this.init()

    }

    showResults() {
        let modal = document.createElement('div')
        modal.setAttribute('class', 'modal-window')
        modal.innerHTML = `<div class="close-window">x</div>`
        modal.innerHTML += '<h3 class="text-center fw-bold mb-3">Your results:</h3>'
        let data = JSON.parse(localStorage.getItem('GameResults'))
        if (data) {
            data = data.sort((a, b) => a.moves - b.moves)
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

    shuffleArray(arr) {
        for (let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {
        }
        return arr
    }

    changeTablesGrid(newSize) {
        let storage = JSON.parse(localStorage.getItem('SavedGames'))
        if (storage) {
            this.startSavedGameButtton = true
            this.numbersArr = storage[0].numbers
            this.time = storage[0].time
            this.moves = storage[0].moves
            this.timeCounter = storage[0].timeCounter
            this.boardSize = storage[0].boardSize
        } else {
            this.boardSize = newSize
            let arr = []
            for (let i = 1; i < newSize * newSize + 1; i++) {
                if (i < newSize * newSize) {
                    arr.push(i)
                }
                if (i === newSize * newSize) {
                    arr.push('drop_zone')
                }
            }
            this.numbersArr = this.shuffleArray(arr)
            //console.log('this.numbersArr',this.numbersArr)
        }
    }

    buildNumbersArray(newSize) {
        this.time = '00:00'
        this.moves = 0
        this.timeCounter = 0
        this.boardSize = newSize
        let arr = []
        for (let i = 1; i < newSize * newSize + 1; i++) {
            if (i < newSize * newSize) {
                arr.push(i)
            }
            if (i === newSize * newSize) {
                arr.push('drop_zone')
            }
        }
        this.numbersArr = this.shuffleArray(arr)
    }

    stopTime() {
        clearInterval(this.timer)
    }

    timerStart() {
        this.timeCounter++
        let hours = Math.floor(this.timeCounter / 60 / 60)
        let minutes = Math.floor(this.timeCounter / 60) - (hours * 60)
        let seconds = this.timeCounter % 60
        this.time = [
            //hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':')
        document.querySelector('.time').textContent = this.time
    }

    sound() {
        let snd = new Audio("sound.mp3"); // buffers automatically when created
        snd.play()
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const newGame = new Game()
    newGame.init()
})