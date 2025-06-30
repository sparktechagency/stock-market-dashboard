import { useEffect, useState } from 'react'
import Password from './Password'
import { Button, Form, Image, Input } from 'antd'
import toast from 'react-hot-toast'
import {
  useGetProfileDataQuery,
  usePostProfileDataMutation,
} from '../../Redux/profileApis'
import { IoCameraOutline } from 'react-icons/io5'
import { url } from '../../Redux/main/server'
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState()
  const [imagePreview, setImagePreview] = useState()

  const { data: profileData, isLoading } = useGetProfileDataQuery()
  const [updateProfile, { isLoading: updateLoading }] =
    usePostProfileDataMutation()

  useEffect(() => {
    if (profileData?.data) {
      form.setFieldsValue({
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
      })

      if (profileData?.data?.profile_image) {
        const imageUrl = profileData.data.profile_image.startsWith('http')
          ? profileData.data.profile_image
          : `${url}/${profileData.data.profile_image}`
        setImagePreview(imageUrl)
      }
    }
  }, [profileData, form])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        const values = await form.validateFields()

        const formData = new FormData()

        formData.append(
          'data',
          JSON.stringify({
            name: values.name,
            phone: values.phone,
          })
        )
        if (imageFile) {
          formData.append('profile_image', imageFile)
        }

        const response = await updateProfile(formData).unwrap()
        toast.success(response?.message || 'Profile updated successfully!')
        setIsEditing(false)

        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview)
        }
      } catch (error) {
        if (error?.data?.message) {
          toast.error(error.data.message)
        } else {
          toast.error('Failed to update profile.')
        }
      }
    } else {
      setIsEditing(true)
    }
  }
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center py-10 !text-poppins">
        <div className="bg-[#0F1724] shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="relative w-[140px] h-[140px] mx-auto">
              <input
                type="file"
                onChange={handleImageChange}
                id="img"
                style={{ display: 'none' }}
                accept="image/*"
              />
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={140}
                  height={140}
                  className="border-2 p-[2px] w-[140px] h-[140px] object-cover rounded-full"
                />
              ) : (
                <div className="w-[140px] h-[140px] bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <label
                htmlFor="img"
                className={`
                absolute bottom-0 right-0
                bg-[var(--primary-color)]
                rounded-full
                w-10 h-10
                flex items-center justify-center
                cursor-pointer
                ${!isEditing && 'pointer-events-none opacity-50'}
              `}
              >
                <div className="bg-yellow p-2 rounded-full">
                  {isEditing && (
                    <IoCameraOutline className="text-4xl bg-black p-1 rounded-full hover:bg-gray-600" />
                  )}
                </div>
              </label>
            </div>

            <h2 className="mt-3 text-xl font-semibold !text-poppins">
              {profileData?.data?.name}
            </h2>
          </div>

          <div className="flex justify-center mt-6  ">
            <button
              className={`px-4 py-2 cursor-pointer !text-poppins ${
                activeTab === 'profile'
                  ? 'border-b-2 border-[yellow] text-[yellow]'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Edit Profile
            </button>
            <button
              className={`px-4 py-2 cursor-pointer ${
                activeTab === 'password'
                  ? 'border-b-2 border-[yellow] text-[yellow]'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="flex flex-col items-center !text-poppins">
              <div className="rounded-lg  w-full max-w-3xl !text-poppins">
                <Form form={form} layout="vertical" className="!text-poppins">
                  <div className="flex flex-col gap-1">
                    <Form.Item
                      label={
                        <div className="text-white font-bold !font-poppins">
                          User Name
                        </div>
                      }
                      name="name"
                      className="!text-poppins "
                    >
                      <Input disabled={!isEditing} className="h-[48px]" />
                    </Form.Item>

                    <Form.Item
                      label={
                        <div className="text-white font-bold !font-poppins">
                          Email
                        </div>
                      }
                      name="email"
                    >
                      <Input disabled={!isEditing} className="h-[48px]" />
                    </Form.Item>

{/* 
                    <Form.Item
                      label={
                        <div className="text-white font-bold !font-poppins">
                          Contact
                        </div>
                      }
                      name="contact"
                    >
                      <Input disabled={!isEditing} className="h-[48px]" />
                    </Form.Item>
                    <Form.Item
                      label={
                        <div className="text-white font-bold !font-poppins">
                          Address
                        </div>
                      }
                      name="address"
                    >
                      <Input disabled={!isEditing} className="h-[48px]" />
                    </Form.Item> */}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      type="primary"
                      onClick={handleUpdate}
                      loading={updateLoading}
                      className="!px-10 !py-3 !h-[40px] !font-poppins"
                    >
                      {isEditing ? 'Save' : 'Update Now'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}

          {activeTab === 'password' && <Password />}
        </div>
      </div>
    </>
  )
}

export default Profile
