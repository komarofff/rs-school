import {galleryMediaObjects} from './createMediaForGallery'
export async function createGalleryMedia(mediaUrl, selector,className2) {

    let className = className2
    //console.log('className',className)
    //console.log('mediaUrl',mediaUrl)
    let currentMediaInPlayer
    try {
        currentMediaInPlayer = await new Audio(mediaUrl)
        currentMediaInPlayer.muted = true
        currentMediaInPlayer.autoplay = false
    } catch (e) {
        console.log('error-', e)
    }


    // массив всех звуков для отключения
    let selectorMedia = selector
    galleryMediaObjects.mediasArray.push({
        player: currentMediaInPlayer,
        selector: selectorMedia,
        className: className
    })

}