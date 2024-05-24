export type FeedData = {
    index: number,
    avatar: string,
    name: string,
    link: string,
    star: number,
    socialPlatform: string,
    review: string,
    selectUser: (index: number) => void
}

export type FeedDetailType = {
    selectedItem: number,
    backWard: () => void
}

export type ReviewDetailType = {
    name: string,
    avatar: string,
    star: number,
    review: string
}
