import Image, { ImageProps } from 'next/image';

type SafeImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
  fallbackSrc?: string;
  className?: string;
};

/**
 * SafeImage wraps Next.js Image component with error handling
 * and a fallback for images that fail to load
 */
export function SafeImage({
  alt,
  fallbackSrc = '/placeholder-image.svg',
  onError,
  ...props
}: SafeImageProps) {
  return (
    <Image
      alt={alt}
      onError={(error) => {
        console.warn(`Failed to load image: ${props.src}`, error);
        if (onError) {
          onError(error);
        }
      }}
      {...props}
    />
  );
}
