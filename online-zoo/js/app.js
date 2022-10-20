const mShadow = document.querySelector('.modal-shadow')
const docHtml = document.querySelector('html')
const testimonialBox = document.querySelector('.testimonials-box')
const testimonialCards = document.querySelectorAll('.testimonial-card')
// range block
const range = document.querySelector("#my_range")
function changeRange() {
    if (range) {
        if (document.documentElement.clientWidth <= 1000) {
            range.setAttribute('max', 8)
            range.value = 0
            let valueRange = (range.value - range.min) / (range.max - range.min) * 100
            range.style.background = 'linear-gradient(to right, #F9804B 0%, #F9804B ' + valueRange + '%,  #F5F7F6 ' + valueRange + '%,  #F5F7F6 100%)'
            testimonialBox.scrollLeft = 0
        } else {
            range.setAttribute('max', 7)
        }
    }
}

//testimonials popup
testimonialCards.forEach(el => {
    el.addEventListener('click', () => {
        checkClass(el)
        mShadow.addEventListener('click', () => {
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

//open close testimonials
function openTestimonialPopup(el) {
    const documentBottom = document.documentElement.clientHeight
    let cloneElem = el.cloneNode(true)
    let newElCoordinateTop = el.getBoundingClientRect().top
    let newElCoordinateX = el.getBoundingClientRect().left
    let newElWidth = el.getBoundingClientRect().width
    let newElBottom = 0
    let newElTop = 0
    let newElHeight = 0
    let difference = 0

    cloneElem.classList.add('open-testimonial')
    cloneElem.classList.add('need-to-delete')
    cloneElem.style.cssText = `height: auto !important; z-index: 10; top: ${newElCoordinateTop}px;left: ${newElCoordinateX}px; width: ${newElWidth}px`
    el.append(cloneElem)
    mShadow.style.cssText = 'display:block !important';
    el.classList.add('open-testimonial')
    docHtml.style.cssText = `overflow:hidden;`

    setTimeout(()=>{
        const appendElement = document.querySelector('.need-to-delete')
        if(appendElement){
            newElBottom = appendElement.getBoundingClientRect().bottom
            newElTop = appendElement.getBoundingClientRect().top
            newElHeight = appendElement.getBoundingClientRect().height

            if(newElTop < 0){
                difference = -(newElTop)
                appendElement.style.cssText = `height: auto !important; z-index: 10; top: ${newElCoordinateTop+difference+20}px;left: ${newElCoordinateX}px; width: ${newElWidth}px`
            }

            if(newElBottom > documentBottom){
                difference =  newElBottom -documentBottom
                appendElement.style.cssText = `height: auto !important; z-index: 10; top: ${newElCoordinateTop-difference-20}px;left: ${newElCoordinateX}px; width: ${newElWidth}px`
            }
            if(newElBottom > documentBottom && newElTop < 0){
                appendElement.querySelector('.testimonial-card-text').style.cssText = 'overflow-y: scroll;'
                appendElement.style.cssText = `height: 98vh !important; z-index: 10; top: 1vh;left: ${newElCoordinateX}px; width: ${newElWidth}px;`

            }
            if(newElHeight > documentBottom){
                appendElement.querySelector('.testimonial-card-text').style.cssText = 'overflow-y: scroll;'
                appendElement.style.cssText = `height: 98vh !important; z-index: 10; top: 1vh;left: ${newElCoordinateX}px; width: ${newElWidth}px;`

            }
        }
    },50)

}
function closeTestimonial(elem) {
    if(elem.querySelector('.need-to-delete'))elem.querySelector('.need-to-delete').remove()
    elem.classList.remove('open-testimonial')
    elem.style.cssText = ''
    mShadow.style.cssText = '';
    docHtml.style.cssText = ``

}

//list testimonials (scroll)
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

document.addEventListener('DOMContentLoaded', () => {
    changeRange()
    listTestimonials()
})
window.addEventListener('resize', () => {
    changeRange()
    listTestimonials()
})