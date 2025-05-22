export type News = {
  _id: string
  title: string
  subTitle: string
  text: string
  imageURL: string
  date: string
  theme: string
  isHidden: boolean
  userId: string
}

export type newNews = {
  title: string
  subTitle: string
  text: string
  imageURL: string
  date: string
  theme: string
  isHidden: boolean
  userId: string
}

// export type newNews = Omit<News, '_id'> & Partial<Pick<News, 'userId'>>
