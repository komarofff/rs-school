import createMediaForGallery from './gallery-components/createMediaForGallery'

export function gallery(gallerySelector) {
    gallerySelector.innerHTML = ``
    createMediaForGallery()
}