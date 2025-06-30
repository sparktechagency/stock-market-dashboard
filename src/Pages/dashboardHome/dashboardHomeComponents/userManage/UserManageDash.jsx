import { useEffect, useState } from 'react'
import { Table, Modal, Button, message, Avatar, Tooltip, Image } from 'antd'
import { MdBlock, MdClose } from 'react-icons/md'
import { CgProfile, CgUnblock } from 'react-icons/cg'
import { useGetAllUsersQuery } from '../../../../Redux/usersApis'
import { url } from '../../../../Redux/main/server'

const UserManageDash = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userDetails, setSelectedUser] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [actionType, setActionType] = useState('')
  const [owners, setOwners] = useState([])

  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: usersList } = useGetAllUsersQuery({
    page: page,
    limit: 10,
    searchTerm: searchQuery,
  })

  useEffect(() => {
    if (usersList) {
      setOwners(usersList?.data?.result)
    }
  }, [usersList])

  const handleView = (record) => {
    setSelectedUser(record)
    setIsModalOpen(true)
  }

  const handleAction = (record, type) => {
    setSelectedUser(record)
    setActionType(type)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmAction = () => {
    const newStatus = actionType === 'block'

    setOwners((prevOwners) =>
      prevOwners.map((item) =>
        item.key === userDetails.key ? { ...item, isBlocked: newStatus } : item
      )
    )

    message.success(
      `User ${userDetails.name} has been ${
        actionType === 'block' ? 'blocked' : 'unblocked'
      }.`
    )

    setIsConfirmModalOpen(false)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = [
    {
      title: <div className="font-bold text-xl !font-poppins">Serial No.</div>,
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => (
        <span className="text-[15px] text-gray-200 !font-poppins">
          {index + 1}
        </span>
      ),
    },
    {
      title: <div className="font-bold text-xl !font-poppins">Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center !font-poppins">
          <Avatar
            src={`${url}/${record?.profile_image.replace(/\\/g, '/')}`}
            className="mr-2 w-10 h-10"
          />
          <span className="text-[15px] text-gray-200">{text}</span>
        </div>
      ),
    },

    {
      title: <div className="font-bold text-xl !font-poppins">Email</div>,
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className="text-[15px] text-gray-200 !font-poppins">{text}</span>
      ),
    },
    // {
    //   title: <div className="font-bold text-xl !font-poppins">Location</div>,
    //   dataIndex: 'location',
    //   key: 'location',
    //   render: (text) => (
    //     <span className="text-[15px] text-gray-200 !font-poppins">{text}</span>
    //   ),
    // },

    {
      title: <div className="font-bold text-xl !font-poppins">Action</div>,
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2 items-center">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<CgProfile size={20} className="!text-yellow-300" />}
              onClick={() => handleView(record)}
            />
          </Tooltip>

          {/* <Tooltip title={record.isBlocked ? 'Unblock' : 'Block'}>
            <Button
              type="text"
              icon={
                record.isBlocked ? (
                  <CgUnblock size={23} className="!text-yellow-300" />
                ) : (
                  <MdBlock size={22} className="!text-red-500" />
                )
              }
              onClick={() =>
                handleAction(record, record.isBlocked ? 'unblock' : 'block')
              }
            />
          </Tooltip> */}
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 bg-black min-h-screen">
      <div className="bg-[#0F1724] rounded-lg shadow p-6">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-2xl text-white font-bold mb-6">
            User Management
          </h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="w-[300px] bg-transparent h-[48px] outline-none p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOwners}
          pagination={{
            defaultPageSize: 10,
            position: ['bottomCenter'],
            onChange: (page) => setPage(page),
          }}
          className="border-gray-200  rounded-lg overflow-hidden"
        />
      </div>

      {/* User Details Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={500}
        className="rounded-lg overflow-hidden  "
        closeIcon={<MdClose className="text-white  top-4 right-4 text-lg" />}
        centered
      >
        <div className="bg-yellow-300 p-6 -mt-6 -mx-6 mb-6 text-black text-center relative !font-poppins">
          <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full overflow-hidden border-4 border-white !font-poppins">
            <Image
              src={`${url}/${userDetails?.profile_image?.replace(/\\/g, '/')}`}
              alt="Avatar"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-xl font-bold mt-2 !font-poppins">
            {userDetails?.name}
          </h2>
          <p className="text-sm !font-poppins">Employee</p>
        </div>

        <div className="px-6 !font-poppins ">
          <div className="mb-4">
            <h3 className="text-gray-500 text-sm">Name</h3>
            <p>{userDetails?.name}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-500 text-sm ">Email</h3>
            <p>{userDetails?.email}</p>
          </div>

          {/* <div className="mb-4">
            <h3 className="text-gray-500 text-sm">Location</h3>
            <p>{userDetails?.location}</p>
          </div> */}
        </div>
      </Modal>

      {/* Confirm Block/Unblock Modal */}
      <Modal
        title={
          <div className="font-bold text-xl !font-poppins">
            Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
          </div>
        }
        open={isConfirmModalOpen}
        onOk={handleConfirmAction}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText={actionType === 'block' ? 'Block' : 'Unblock'}
        okButtonProps={{ danger: actionType === 'block' }}
        centered
      >
        <p className="!font-poppins">
          Are you sure you want to {actionType} {userDetails?.name}?
        </p>
      </Modal>
    </div>
  )
}

export default UserManageDash
