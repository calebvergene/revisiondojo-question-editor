import React, { useEffect, useState, useRef } from 'react';

interface Props {
    imagePreviewUrl: string;
}

type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null;

const ImageRender: React.FC<Props> = ({ imagePreviewUrl }) => {
    const [width, setWidth] = useState<number>(400);
    const [height, setHeight] = useState<number>(300);
    const [markdown, setMarkdown] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [activeCorner, setActiveCorner] = useState<Corner>(null);
    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);

    // Using MutableRefObject instead of RefObject for proper typing
    const imageRef = useRef<HTMLImageElement | null>(null);
    const topLeftRef = useRef<HTMLDivElement | null>(null);
    const topRightRef = useRef<HTMLDivElement | null>(null);
    const bottomLeftRef = useRef<HTMLDivElement | null>(null);
    const bottomRightRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (imagePreviewUrl) {
            generateMarkdown();
        }
    }, [imagePreviewUrl, width, height]);

    const generateMarkdown = (): void => {
        // standard Markdown image syntax
        let imgMarkdown = `![](${imagePreviewUrl})`;
        setMarkdown(imgMarkdown);
    };

    // Load image and set aspect ratio
    useEffect(() => {
        if (imagePreviewUrl) {
            const img = new Image();
            img.onload = () => {
                const ratio = img.width / img.height;
                setAspectRatio(ratio);

                // Set initial dimensions if not already set
                if (!width || !height) {
                    setWidth(img.width);
                    setHeight(img.height);
                }
            };
            img.src = imagePreviewUrl;
        }
    }, [imagePreviewUrl]);

    // Set up resize event listeners
    useEffect(() => {
        const handleResize = (corner: Corner) => (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = width;
            const startHeight = height;

            setIsDragging(true);
            setActiveCorner(corner);

            const onMouseMove = (moveEvent: MouseEvent) => {
                let deltaX: number, deltaY: number, newWidth: number, newHeight: number;

                switch (corner) {
                    case 'topLeft':
                        deltaX = startX - moveEvent.clientX;
                        deltaY = startY - moveEvent.clientY;
                        newWidth = Math.max(50, startWidth + deltaX);

                        if (lockAspectRatio) {
                            newHeight = Math.round(newWidth / aspectRatio);
                        } else {
                            newHeight = Math.max(50, startHeight + deltaY);
                        }
                        break;

                    case 'topRight':
                        deltaX = moveEvent.clientX - startX;
                        deltaY = startY - moveEvent.clientY;
                        newWidth = Math.max(50, startWidth + deltaX);

                        if (lockAspectRatio) {
                            newHeight = Math.round(newWidth / aspectRatio);
                        } else {
                            newHeight = Math.max(50, startHeight + deltaY);
                        }
                        break;

                    case 'bottomLeft':
                        deltaX = startX - moveEvent.clientX;
                        deltaY = moveEvent.clientY - startY;
                        newWidth = Math.max(50, startWidth + deltaX);

                        if (lockAspectRatio) {
                            newHeight = Math.round(newWidth / aspectRatio);
                        } else {
                            newHeight = Math.max(50, startHeight + deltaY);
                        }
                        break;

                    case 'bottomRight':
                    default:
                        deltaX = moveEvent.clientX - startX;
                        deltaY = moveEvent.clientY - startY;
                        newWidth = Math.max(50, startWidth + deltaX);

                        if (lockAspectRatio) {
                            newHeight = Math.round(newWidth / aspectRatio);
                        } else {
                            newHeight = Math.max(50, startHeight + deltaY);
                        }
                        break;
                }

                setWidth(newWidth);
                setHeight(newHeight);
            };

            const onMouseUp = () => {
                setIsDragging(false);
                setActiveCorner(null);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        // Add event listeners to all four corners
        const addResizeListener = (ref: React.RefObject<HTMLDivElement | null>, corner: Corner) => {
            if (ref.current) {
                const handler = handleResize(corner);
                ref.current.addEventListener('mousedown', handler as unknown as EventListener);
                return () => ref.current?.removeEventListener('mousedown', handler as unknown as EventListener);
            }
            return () => { };
        };

        const cleanupTopLeft = addResizeListener(topLeftRef, 'topLeft');
        const cleanupTopRight = addResizeListener(topRightRef, 'topRight');
        const cleanupBottomLeft = addResizeListener(bottomLeftRef, 'bottomLeft');
        const cleanupBottomRight = addResizeListener(bottomRightRef, 'bottomRight');

        return () => {
            cleanupTopLeft();
            cleanupTopRight();
            cleanupBottomLeft();
            cleanupBottomRight();
        };
    }, [width, height, aspectRatio, lockAspectRatio]);

    return (
        <div>
            <div className="border rounded-md p-4 h-64 flex items-center justify-center bg-gray-50 overflow-hidden relative">
                {imagePreviewUrl ? (
                    <div className={`flex justify-center w-full relative`}>
                        <div className="relative inline-block" style={{ cursor: isDragging ? `${activeCorner}-resize` : 'default' }}>
                            <img
                                ref={imageRef}
                                src={imagePreviewUrl}
                                style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
                                className="max-h-56 object-contain"
                            />

                            {/* Top-left resize handle */}
                            <div
                                ref={topLeftRef}
                                className="absolute w-6 h-6 bg-blue-500 bg-opacity-70 rounded-full -top-2 -left-2 cursor-nwse-resize hover:bg-opacity-90 flex items-center justify-center border-2 border-white shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>

                            {/* Top-right resize handle */}
                            <div
                                ref={topRightRef}
                                className="absolute w-6 h-6 bg-blue-500 bg-opacity-70 rounded-full -top-2 -right-2 cursor-nesw-resize hover:bg-opacity-90 flex items-center justify-center border-2 border-white shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>

                            {/* Bottom-left resize handle */}
                            <div
                                ref={bottomLeftRef}
                                className="absolute w-6 h-6 bg-blue-500 bg-opacity-70 rounded-full -bottom-2 -left-2 cursor-nesw-resize hover:bg-opacity-90 flex items-center justify-center border-2 border-white shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>

                            {/* Bottom-right resize handle */}
                            <div
                                ref={bottomRightRef}
                                className="absolute w-6 h-6 bg-blue-500 bg-opacity-70 rounded-full -bottom-2 -right-2 cursor-nwse-resize hover:bg-opacity-90 flex items-center justify-center border-2 border-white shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-400">Upload an image to preview</div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Drag the handle in the corner to resize the image</p>
        </div>
    );
};

export default ImageRender;