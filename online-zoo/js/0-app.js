//open close burger menu
const burger = document.querySelector('.burger-menu')
const menu = document.querySelector('.header__nav')
const closeMenuButton = document.querySelector('.close-mobile-menu')
const modalShadow = document.querySelector('.modal-shadow')
const doc = document.querySelector('html')
const body = document.querySelector('body')
burger.addEventListener('click', () => {
    menu.classList.add('menu-open')
    setTimeout(() => {
        modalShadow.style.cssText = 'display:block !important';
        menu.style.cssText = `left:0 !important;`
        doc.style.cssText = `overflow:hidden;`
    }, 50)

    if (menu.classList.contains('menu-open')) {
        modalShadow.addEventListener('click', () => {
            closeMenu()
        })
    }

})
// if we use x for close menu
closeMenuButton.addEventListener('click', () => {
    closeMenu()
})


function closeMenu() {
    if (menu.classList.contains('menu-open')) {
        menu.style.cssText = ``
        setTimeout(() => {
            menu.classList.remove('menu-open')
            modalShadow.style.cssText = '';
            doc.style.cssText = ``
        }, 300)
    }
}

//numbers
document.addEventListener('DOMContentLoaded', () => {
    changeRange()
    listTestimonials()
    makeActiveNumbers()
})
window.addEventListener('resize', () => {
    makeActiveNumbers()
    closeMenu()
    changeRange()
    listTestimonials()
})

function makeActiveNumbers() {
    const width = document.documentElement.clientWidth
    if (width <= 992 && document.querySelector('[data-number="$100"]')) {
        document.querySelector('[data-number="$100"]').classList.add('active')
    } else if (document.querySelector('[data-number="$100"]')) {
        document.querySelector('[data-number="$100"]').classList.remove('active')
    }
}


// range block
const range = document.querySelector("#my_range");
function changeRange() {
    if (range) {
        if (document.documentElement.clientWidth <= 1280) {
            range.setAttribute('max', 8)
        } else {
            range.setAttribute('max', 7)
        }
    }
}

// testimonials
const testimonialBox = document.querySelector('.testimonials-box')
//testimonials popup
const testimonialCards = document.querySelectorAll('.testimonial-card')
testimonialCards.forEach(el => {
    el.addEventListener('click', () => {
        checkClass(el)
        modalShadow.addEventListener('click', () => {
            closeTestimonial(el)
        })
    })
})

function checkClass(el) {
    if (el.classList.contains('open-testimonial')) {
        closeTestimonial(el)
        return true
    }
    if (!el.classList.contains('open-testimonial')) {
        openTestimonialPopup(el)
        return true
    }
}

function openTestimonialPopup(el) {
    el.style.cssText = 'height: auto !important; z-index: 10;'
    modalShadow.style.cssText = 'display:block !important';
    el.classList.add('open-testimonial')
}

function closeTestimonial(elem) {
    elem.classList.remove('open-testimonial')
    modalShadow.style.cssText = '';
    doc.style.cssText = ``
    elem.style.cssText = ''
}

function listTestimonials() {
    if (range) {
        let valueStart = (range.value - range.min) / (range.max - range.min) * 100
        range.style.background = 'linear-gradient(to right, #F9804B 0%, #F9804B ' + valueStart + '%,  #F5F7F6 ' + valueStart + '%,  #F5F7F6 100%)'

        let rangeValue = 0
        let step = testimonialCards[0].getBoundingClientRect().width + parseInt(getComputedStyle(testimonialCards[0], true).marginRight)
        range.addEventListener('input', () => {
            let value = (range.value - range.min) / (range.max - range.min) * 100
            range.style.background = 'linear-gradient(to right, #F9804B 0%, #F9804B ' + value + '%,  #F5F7F6 ' + value + '%,  #F5F7F6 100%)'
            if (range.value > rangeValue) {
                rangeValue = range.value
                testimonialBox.scrollLeft = step * rangeValue
            }
            if (range.value < rangeValue) {
                rangeValue = range.value
                testimonialBox.scrollLeft = step * rangeValue
            }
        })
    }
}


