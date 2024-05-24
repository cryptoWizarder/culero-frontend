// import { PLATFORM_TYPE } from "@/helpers/constants.helpers";

export type Nullable<T> = T | null;

export type ApiError = {
    success: false;
    message?: string;
    errors?: {
      message: string;
    }[];
};

export type ApiSuccess = {
    success: true;
};

export type ApiResponse<TPayload = unknown, TAttrName extends string = 'data'> = Record<
  TAttrName,
  TPayload
> &
  ApiSuccess;

export type IUser = {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    picture: string;
    github?: string;
    linkedin?: string;
}
export type IReviewDetail = {
    content: string;
    score: number;
    reviewer_id: IUser;
}

export type IReview = {
    user_id: string;
    review: Array<IReviewDetail>;
    createdAt: string;
}

export type LoginRequest = {
    email: string;
    firstname: string;
    lastname: string;
    name: string;
    picture: string;
    type: string;
    token: string;
};
  
export type LoginResponse = ApiResponse<IUser, 'user'> & {
    jwtToken: string;
};

export type ReviewDataByUserResponse = {
    reviews: IReview,
    count: number;
}

export type ReviewDataByUserRequest = {
    user_id: string;
    skip: number;
    index: number;
}

export type ReviewRequest = {
    platform: string;
    text: string;
    link: string;
    score: number;
};

export type SearchUserRequest = {
    search_key: string; 
}

export type SearchUserResponse = {
    users: Array<{
        _id: string;
        picture: string;
        username: string;
    }>,
}