export type News = { 
    _id: string;
    title: string;
    subTitle: string;
    text: string;
    imageURL: number;
    isHidden: boolean;
    _createdBy: string;
}

// export type newNews = {
//     title: string;
//     subTitle: string;
//     text: string;
//     imageURL: number;
//     isHidden: boolean;
// }

export type newNews = Omit<News, '_id'> & Partial<Pick<News, '_createdBy'>>