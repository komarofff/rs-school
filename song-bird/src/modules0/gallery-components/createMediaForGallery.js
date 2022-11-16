import {birdsData} from '../game-components/birdsData'
import {createPlayerForGallery} from './createPlayerForGallery'
import {createGalleryMedia} from "./createGalleryMedia"
import {mediaControls} from "./mediaControls"

export let galleryMediaObjects = {
    mediasArray: []
}
export default async function () {

    galleryMediaObjects.mediasArray = []

    let count = 0
    birdsData.forEach(element => {
        element.forEach(el => {
            if (el.audio) {

                let elSelector = el.species.replace(/\s/g, '-')
                // console.log('elSelector',elSelector)
                //createPlayer(el, `${elSelector}`)
                let className = elSelector
                let source = createPlayerForGallery(el, `${elSelector}`, count)
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