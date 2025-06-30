import { baseApis } from './main/baseApis'

const usersApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: '/normal-user/get-all-user',
        method: 'GET',
        params,
      }),
      providesTags: ['users'],
    }),
    blockUnblockUser: builder.mutation({
      query: (data) => {
        return {
          url: '/manage/add-terms-conditions',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['users'],
    }),
  }),
  overrideExisting: false,
})

export const { useBlockUnblockUserMutation, useGetAllUsersQuery } = usersApis
export default usersApis
