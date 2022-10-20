const burger = document.querySelector('.burger-menu')
const menu = document.querySelector('.header__nav')
const closeMenuButton = document.querySelector('.close-mobile-menu')
const modalShadow = document.querySelector('.modal-shadow')
const doc = document.querySelector('html')

//open close burger menu
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

window.addEventListener('resize', () => {
    closeMenu()
})