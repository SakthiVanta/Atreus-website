import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageOptimProps extends ImageProps {
    containerClassName?: string;
}

export function ImageOptim({
    src,
    alt,
    className,
    containerClassName,
    ...props
}: ImageOptimProps) {
    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            <Image
                src={src}
                alt={alt}
                className={cn("object-cover transition-opacity duration-300", className)}
                {...props}
            />
        </div>
    );
}
