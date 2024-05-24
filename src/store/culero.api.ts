import { toast } from 'react-toastify';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const API_PREFIX = 'http://localhost:3001/api';
import { setAuthToken, setUserReviewData, setTotalUserReviewCount, setUser, setUserSearchResult } from './status';
import { ApiError, LoginRequest, LoginResponse, ReviewDataByUserRequest, ReviewDataByUserResponse, ReviewRequest, SearchUserRequest, SearchUserResponse } from './interface';

export const displayError = (
  err: ApiError | undefined,
  defaultMessage = 'Error while sending the request',
) => {
  if (err?.errors?.length) {
    toast(err.errors[0].message, {
      type: 'error',
    });
  } else if (err?.message) {
    toast(err.message, {
      type: 'error',
    });
  } else if ((err as any)?.error?.message) {
    toast((err as any).error.message, {
      type: 'error',
    });
  } else {
    toast(defaultMessage, {
      type: 'error',
    });
  }
};

function getHeadersFromToken(token: string, json?: boolean) {
  const headers: Record<string, string> = {};
  if (json) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_PREFIX }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (creds) => ({
        body: creds,
        method: 'POST',
        url: '/auth/login',
        headers: getHeadersFromToken('', true),
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: {
              user,
              jwtToken
            }
          } = await queryFulfilled;
          dispatch(setAuthToken(jwtToken));
          dispatch(setUser(user));

          toast('Logged in successfully', {
            position: 'top-right',
            closeButton: false,
          });
        } catch (e: any) {
          displayError(e, 'Error while logging in');
        }
      },
      transformErrorResponse(err) {
        return err.data;
      },
    }),
    getReviewByUser: builder.mutation<ReviewDataByUserResponse, { payload: ReviewDataByUserRequest, token: string }>({
      query: ({payload, token}) => ({
        body: payload,
        method: 'POST',
        url: '/review/getReviewByUser',
        headers: getHeadersFromToken(token, true),
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: {
              reviews,
              count
            }
          } = await queryFulfilled;
          dispatch(setUserReviewData(reviews));
          dispatch(setTotalUserReviewCount(count));
        } catch (e: any) {
          displayError(e, 'Error while logging in');
        }
      },
      transformErrorResponse(err) {
        return err.data;
      },
    }),
    addReview: builder.mutation<boolean, { payload: ReviewRequest, token: string }>({
      query: ({ payload, token }) => ({
        body: payload,
        method: 'POST',
        url: '/review/addReview',
        headers: getHeadersFromToken(token, true),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;

          toast('Added review successfully', {
            position: 'top-right',
            closeButton: false,
          });
        } catch (e: any) {
          displayError(e, 'Error while adding your review');
        }
      },
      transformErrorResponse(err) {
        return err.data;
      },
    }),
    getUserBySearch: builder.mutation<SearchUserResponse, SearchUserRequest>({
      query: (cred) => ({
        body: cred,
        method: 'POST',
        url: '/user/getUserBySearch',
        headers: getHeadersFromToken('', true),
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: {
              users
            }
          } = await queryFulfilled;
          dispatch(setUserSearchResult(users));          
        } catch (e: any) {
          displayError(e, 'Error while logging in');
        }
      },
      transformErrorResponse(err) {
        return err.data;
      },
    }),
  })
})


