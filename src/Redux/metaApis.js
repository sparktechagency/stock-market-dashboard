import { baseApis } from './main/baseApis'

const metaApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => {
        return {
          url: '/meta/get-dashboard-meta-data',
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetMetaDataQuery } = metaApis

export default metaApis
