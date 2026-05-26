import { extractContentId } from "@/utils/formatters/extractContentID"

interface UseMusicImageProps {
    baseImage: (string | null),
    imageSize: ('150x150' | '480x480' | '1000x1000')
}

const useMusicImage = ({ baseImage, imageSize }: UseMusicImageProps) => {

    if (!baseImage) return null

    const imageBaseUrl = `https://audius-standardvc-1-validator-3.figment.io/content`

    const extracedID = baseImage && extractContentId(baseImage)

    const imageUrl = `${imageBaseUrl}/${extracedID}/${imageSize}`

    return imageUrl
}

export default useMusicImage