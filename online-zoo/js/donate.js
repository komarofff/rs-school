//numbers
const numbers = document.querySelectorAll('.numbers')
const inputBox = document.querySelector('#number-amount')
let numbersValues =[]
 numbers.forEach(el=>{
     numbersValues.push(parseInt(el.dataset.number.replace('$','')))
})

// dont need on stage 3 . it is only for student 1 :)
// function makeActiveNumbers() {
//     const width = document.documentElement.clientWidth
//     if (width <= 992 && document.querySelector('[data-number="$100"]')) {
//         document.querySelector('[data-number="$100"]').classList.add('active')
//     } else if (document.querySelector('[data-number="$100"]')) {
//         document.querySelector('[data-number="$100"]').classList.remove('active')
//     }
// }
//
numbers.forEach(el=>{
    el.addEventListener('click',()=>{
        numbers.forEach(el=> el.classList.remove('active'))
        let currentValue = parseInt(el.dataset.number.replace('$',''))
        inputBox.value = currentValue
        el.classList.add('active')
    })
})
if(inputBox) {
    inputBox.addEventListener('input', () => {
        let inputNumber = inputBox.value
        if (inputNumber > 9999) inputBox.value = 9999
        if (inputNumber < 0) inputBox.value = 0
        if (numbersValues.includes(parseInt(inputNumber))) {
            numbers.forEach(el => el.classList.remove('active'))
            document.querySelector(`[data-number="$${inputNumber}"]`).classList.add('active')
        }else{
            numbers.forEach(el => el.classList.remove('active'))
        }
    })
}



document.addEventListener('DOMContentLoaded', () => {
    makeActiveNumbers()
})
window.addEventListener('resize', () => {
    makeActiveNumbers()

})