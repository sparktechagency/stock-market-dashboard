import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGetProfileDataQuery } from '../../../Redux/profileApis'

const Navbar = () => {
  const { data: profileData } = useGetProfileDataQuery()
  return (
    <div className="flex justify-between items-center   py-3 mx-4 rounded-md">
      <div></div>
      <div className="flex items-center gap-4">
        <Link
          to="/settings/profile"
          className="flex items-center gap-2 border p-2 rounded-md"
        >
          <FaUserCircle className="text-3xl text-[#FDC105] " />
          <div className="text-left">
            <p className="text-sm font-semibold text-[#FDC105]">{profileData?.data?.name}</p>
            <p className="text-xs text-[#FDC105]/60 ">{profileData?.data?.email}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
