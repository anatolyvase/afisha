import { cn } from "@/shared/lib/utils";
import { useState } from "react";

type ImageProps = {
  src: string;
  alt: string;
  classNames?: {
    container?: string;
    image?: string;
  };
};

export function Image({ src, alt, classNames }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", classNames?.container)}>
      {(isLoading || hasError) && (
        <div
          className={cn(
            "w-full bg-gray-200 dark:bg-gray-700 h-full absolute",
            classNames?.container,
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", classNames?.image)}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
