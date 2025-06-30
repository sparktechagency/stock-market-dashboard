import { baseApis } from './main/baseApis'

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-reset-otp',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: data,
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem('reset-token')}`,
          // },
        }
      },
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/resend-reset-code',
        method: 'POST',
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: data,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyEmailOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
} = authApis

export default authApis
