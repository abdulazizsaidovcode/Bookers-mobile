export interface GalleryData {
    id: number,
    albumName: string,
    date: string,
    photos: null,
    mainPhotos: null,
    resGalleryAttachments: [
        {
            attachmentId: string,
            main: boolean,
            newStatus: boolean,
            attachmentStatus: string,
            message: string | null
        },
    ]
}

export interface EditMainPhoto {
    main: boolean,
    attachmentId: string
}