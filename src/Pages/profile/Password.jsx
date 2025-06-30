import { Form, Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useChangePasswordMutation } from '../../Redux/authApis'
import toast from 'react-hot-toast'

const Password = () => {
  const [form] = Form.useForm()

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const handleCancelClick = () => {
    form.resetFields()
  }

  const handleSaveClick = async (values) => {
    try {
      const response = await changePassword({
        oldPassword: values.old_password,
        newPassword: values.password,
        confirmNewPassword: values.confirm_password,
      }).unwrap()
      localStorage.removeItem('token')
      localStorage.setItem('token', response?.data?.accessToken)
      toast.success(response.message)
      form.resetFields()
    } catch (error) {
      toast.error(error.data?.message || 'Failed to update password.')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg  w-full ">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSaveClick}
        >
          <Form.Item
            label={
              <div className="text-white font-bold !font-poppins">
                Current Password
              </div>
            }
            name="old_password"
            rules={[
              { required: true, message: 'Please enter your current password' },
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[48px]"
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="text-white font-bold !font-poppins">
                New Password
              </div>
            }
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password' },
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[48px]"
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="text-white font-bold !font-poppins">
                Confirm New Password
              </div>
            }
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[48px]"
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-1.5">
            <Button
              type="primary"
              htmlType="submit"
              className="!px-10 !py-3 !font-poppins !h-[40px] "
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={handleCancelClick}
              className="!px-10 !h-[40px]  !py-3 !font-poppins"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Password
