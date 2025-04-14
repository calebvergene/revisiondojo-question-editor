import type { Image } from '@/types';
import React, { useEffect, useState, useRef } from 'react';

interface Props {
    image: Image;
    updateImage: (updatedImage: Image) => void;
}

type Handle = 'left' | 'right' | null;

const ImageRender: React.FC<Props> = ({ image, updateImage }: Props) => {
    const [width, setWidth] = useState<number>(300);
    const [height, setHeight] = useState<number>(300);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [activeHandle, setActiveHandle] = useState<Handle>(null);
    const [aspectRatio, setAspectRatio] = useState<number>(1);

    const imageRef = useRef<HTMLImageElement | null>(null);
    const leftHandleRef = useRef<HTMLDivElement | null>(null);
    const rightHandleRef = useRef<HTMLDivElement | null>(null);

    // this just updates the images width and height each time the image is resized
    useEffect(() => {
        if (image) {
            updateImage({id: image.id, url: image.url, markdown:"", width: width, height: height});
        }
    }, [image.url, width, height]);

    // load image and set aspect ratio
    useEffect(() => {
        if (image) {
            const img = new Image();
            img.onload = () => {
                const ratio = img.width / img.height;
                setAspectRatio(ratio);

                if (!width || !height) {
                    setWidth(img.width);
                    setHeight(img.height);
                }
            };
            img.src = image.url;
        }
    }, [image.url]);

    // resize event listeners
    useEffect(() => {
        const handleResize = (handle: Handle) => (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startWidth = width;
            
            setIsDragging(true);
            setActiveHandle(handle);

            const onMouseMove = (moveEvent: MouseEvent) => {
                let deltaX: number, newWidth: number;

                if (handle === 'left') {
                    deltaX = startX - moveEvent.clientX;
                    newWidth = Math.max(50, startWidth + deltaX);
                } else { // right handle
                    deltaX = moveEvent.clientX - startX;
                    newWidth = Math.max(50, startWidth + deltaX);
                }

                let newHeight = Math.round(newWidth / aspectRatio);
                
                // height doesn't go below 50px so not smaller than bars on the side
                if (newHeight < 50) {
                    newHeight = 50;
                    newWidth = Math.round(newHeight * aspectRatio);
                }

                setWidth(newWidth);
                setHeight(newHeight);
            };

            const onMouseUp = () => {
                setIsDragging(false);
                setActiveHandle(null);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        // add event listeners to both side handles
        const addResizeListener = (ref: React.RefObject<HTMLDivElement | null>, handle: Handle) => {
            if (ref.current) {
                const handler = handleResize(handle);
                ref.current.addEventListener('mousedown', handler as unknown as EventListener);
                return () => ref.current?.removeEventListener('mousedown', handler as unknown as EventListener);
            }
            return () => { };
        };

        const cleanupLeftHandle = addResizeListener(leftHandleRef, 'left');
        const cleanupRightHandle = addResizeListener(rightHandleRef, 'right');

        return () => {
            cleanupLeftHandle();
            cleanupRightHandle();
        };
    }, [width, height, aspectRatio]);

    return (
        <div>
            {image ? (
                <div className="rounded-md p-2 max-w-full flex items-center justify-center overflow-hidden relative">
                    <div className={`flex justify-center w-full relative`}>
                        <div
                            className="relative inline-block"
                            style={{ cursor: isDragging ? `${activeHandle ? 'ew-resize' : 'default'}` : 'default' }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => {
                                if (!isDragging) setIsHovering(false);
                            }}
                        >
                            <img
                                ref={imageRef}
                                alt=''
                                src={image.url}
                                style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
                                className="max-w-full max-h-fit object-contain"
                            />

                            {/* Left resize handle - vertical bar */}
                            <div
                                ref={leftHandleRef}
                                className={`absolute w-1.5 h-10 bg-neutral-800 rounded-4xl border-1 top-1/2 -translate-y-1/2 left-1 cursor-col-resize hover:bg-opacity-90 flex items-center justify-center border-white shadow-md transition-opacity duration-300 ease-in-out ${isHovering || isDragging ? 'opacity-100' : 'opacity-0'}`}
                            ></div>

                            {/* Right resize handle - vertical bar */}
                            <div
                                ref={rightHandleRef}
                                className={`absolute w-1.5 h-10 bg-neutral-800 rounded-4xl border-1 top-1/2 -translate-y-1/2 right-1 cursor-col-resize hover:bg-opacity-90 flex items-center justify-center border-white shadow-md transition-opacity duration-300 ease-in-out ${isHovering || isDragging ? 'opacity-100' : 'opacity-0'}`}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div> </div>
            )}
        </div>
    );
}

export default ImageRender;