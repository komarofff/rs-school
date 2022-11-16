import {birdsData} from '../game-components/birdsData'
import {createPlayerForGallery} from './createPlayerForGallery'
import {createGalleryMedia} from "./createGalleryMedia"
import {mediaControls} from "./mediaControls"
import {language} from '../../index'

export let galleryMediaObjects = {
    mediasArray: []
}
export default async function () {

    galleryMediaObjects.mediasArray = []
    let catHtml = '<div class="container mx-auto  my-2 gallery-container"><div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 items-center transition duration-300 categories-gallery text-base font-bold">'
    birdsData.forEach((element, id) => {

        let tabName = element[0].titleLat.replace(/\s/g, '-')
        let catName = language.condition ? element[0].titleLat : element[0].titleRus
        if (id === 0) {
            catName = language.condition ? 'From workout' : 'Из разминки'
            catHtml += `<div data-tab="${tabName}" class="active-tab cursor-pointer shadow-xl rounded px-1 py-2   bg-gray-50 opacity-75    flex justify-center items-center  transition duration-300 tab">${catName}</div>`
        } else {
            catHtml += `<div data-tab="${tabName}" class="cursor-pointer shadow-xl rounded px-1 py-2   bg-gray-50 opacity-75    flex justify-center items-center  transition duration-300 tab">${catName}</div>`
        }
    })
    catHtml += '</div></div>'
    document.querySelector('.gallery-page').innerHTML += catHtml
    let count = 0
    let additionalSelector = ''
    birdsData.forEach((element, id) => {
        let category = element[0].titleLat.replace(/\s/g, '-')
        if (id !== 0) {
            additionalSelector = 'hidden'
        }
        //console.log('category',category)
        element.forEach(el => {

            if (el.audio) {

                let elSelector = el.species.replace(/\s/g, '-')
                // console.log('elSelector',elSelector)
                //createPlayer(el, `${elSelector}`)
                let className = elSelector
                let source = createPlayerForGallery(el, `${elSelector}`, count, category, additionalSelector)
                document.querySelector('.gallery-page').innerHTML += source
                let mediaUrl = el.audio
                let selector1 = document.querySelector(`.${elSelector}`)
                let start = createGalleryMedia(mediaUrl, selector1, className)
                count++
            }
        })
    })


    mediaControls()

}