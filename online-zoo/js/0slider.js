const allCards = document.querySelectorAll('.animal-card')
const animalCardsBox = document.querySelector('.animals_cards')
let newCardsArray = []
let cloneArray = []
let step = 0
let counter = 0
let counterStep = 0

document.addEventListener('DOMContentLoaded', () => {
    getStep()
    makeItemsArray()
    startSlider()
})
window.addEventListener('resize', () => {
    animalCardsBox.innerHTML = ''
    getStep()
    makeItemsArray()
    startSlider()
})

function getStep() {
    if (document.documentElement.clientWidth > 992) {
        step = 6
    } else {
        step = 4
    }
}

function makeItemsArray() {
    newCardsArray = []
    cloneArray = []
    counter = 0
    counterStep = 0
// make new array with sorted items through step (6 or 4 )
    for (let i = 0; i < allCards.length; i++) {
        counterStep++
        let cloneElem = allCards[i].cloneNode(true)
        cloneArray.push(cloneElem.outerHTML)
        //allCards[i].remove()
        if (counterStep % step === 0 && i !== allCards.length - 1) {
            newCardsArray[counter] = cloneArray
            cloneArray = []
            counter++
        } else if (i === allCards.length - 1) {
            newCardsArray[counter] = cloneArray
            cloneArray = []
            counter++
        }

    }
    animalCardsBox.innerHTML = ''
    let newBoxActive = document.createElement('div')
    newBoxActive.setAttribute('class', "animal-card-box active")
    for (let i = 0; i < newCardsArray.length; i++) {
        if (i === 0) {
            newCardsArray[0].forEach(elem => {
                newBoxActive.insertAdjacentHTML('afterbegin', elem)
            })
        } else {
            let newBox = document.createElement('div')
            newBox.setAttribute('class', "animal-card-box ")
            newCardsArray[i].forEach(elem => {
                newBox.insertAdjacentHTML('afterbegin', elem)
            })
            animalCardsBox.append(newBox)
        }


    }
    animalCardsBox.prepend(newBoxActive)
}

function startSlider() {
// slider for animal cards
    const cards = document.querySelectorAll('.animal-card-box')
    const arrowLeft = document.querySelector('.arrow-left')
    const arrowRight = document.querySelector('.arrow-right')
    let currentItem = 0
    let isEnabled = true;

    function changeCurrentItem(n) {
        currentItem = (n + cards.length) % cards.length;
        //console.log(currentItem)
    }

    function hideItem(direction) {
        isEnabled = false;
        cards[currentItem].classList.add(direction);
        cards[currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction);
        });

    }

    function showItem(direction) {
        cards[currentItem].classList.add('next', direction);
        cards[currentItem].addEventListener('animationend', function () {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });


    }

    function nextItem(n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }

    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    }

    arrowLeft.addEventListener('click', function () {
        if (isEnabled) {
            previousItem(currentItem);
        }
    });

    arrowRight.addEventListener('click', function () {
        if (isEnabled) {
            nextItem(currentItem);
        }
    });


    const swipedetect = (el) => {

        let surface = el;
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let startTime = 0;
        let elapsedTime = 0;

        let threshold = 150;
        let restraint = 100;
        let allowedTime = 300;

        surface.addEventListener('mousedown', function (e) {
            startX = e.pageX;
            startY = e.pageY;
            startTime = new Date().getTime();
            e.preventDefault();
        }, false);

        surface.addEventListener('mouseup', function (e) {
            distX = e.pageX - startX;
            distY = e.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if ((distX > 0)) {
                        if (isEnabled) {
                            previousItem(currentItem);
                        }
                    } else {
                        if (isEnabled) {
                            nextItem(currentItem);
                        }
                    }
                }
            }
            e.preventDefault();
        }, false);

        surface.addEventListener('touchstart', function (e) {
            if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
                if (e.target.classList.contains('left')) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
            var touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime();
            e.preventDefault();
        }, false);

        surface.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

        surface.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if ((distX > 0)) {
                        if (isEnabled) {
                            previousItem(currentItem);
                        }
                    } else {
                        if (isEnabled) {
                            nextItem(currentItem);
                        }
                    }
                }
            }
            e.preventDefault();
        }, false);
    }

    var el = document.querySelector('.cards_section');
    swipedetect(el);

}