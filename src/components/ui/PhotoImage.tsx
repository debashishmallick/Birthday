import type { ImgHTMLAttributes } from 'react'

type PhotoImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  alt: string
  objectPosition?: string
  priority?: boolean
}

/** Sharp photo display — no blur filters on the image itself. */
export function PhotoImage({
  src,
  alt,
  objectPosition = '50% 30%',
  priority = false,
  className = '',
  ...rest
}: PhotoImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={`photo-sharp h-full w-full object-cover ${className}`}
      style={{ objectPosition }}
      {...rest}
    />
  )
}
