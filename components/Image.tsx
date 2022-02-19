import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
  <div className="overflow-hidden rounded-lg">
    <NextImage {...rest} />
  </div>
)

export default Image
