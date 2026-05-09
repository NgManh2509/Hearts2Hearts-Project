import { useEffect } from 'react'
import imgCnt from '../data/imgCnt.json'

const images = Array.from({ length: imgCnt.count }, (_, i) => {
  return new URL(`../assets/galleryImg/h2h (${i + 1}).webp`, import.meta.url).href;
});

const ImagePreloader = () => {
    useEffect(() => {
        images.forEach(src => {
            const image = new Image()
            image.src = src
        })
    }, [])
  return null   
}

export default ImagePreloader