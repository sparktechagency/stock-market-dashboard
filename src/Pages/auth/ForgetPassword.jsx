import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useForgetPasswordMutation } from '../../Redux/authApis'
import toast from 'react-hot-toast'
const ForgetPassword = () => {
  const navigate = useNavigate()

  const [postResendOtp, { isLoading }] = useForgetPasswordMutation()

  const [form] = Form.useForm()
  const onFinish = async (values) => {
    try {
      await postResendOtp({
        email: values.email,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('email')
          localStorage.setItem('email', values.email)
          navigate('/verify-code')
        })
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  return (
    <div className="h-screen flex responsive-base-width">
      <div className="w-1/2  flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-center mb-4">
          Provide email to receive verification code
        </h1>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <label htmlFor="email" className="text-white text-[16px] ">
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your  email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
            className="mt-1"
          >
            <Input
              placeholder="Enter  Email"
              className="h-[48px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#0095FF] text-white   h-[48px] rounded-md"
            >
              {isLoading ? 'Sending...' : ' Send Code'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center ">
        <div className="mt-5 w-[360px] text-gray-500 text-[18px] text-center leading-8">
          Welcome to out forgot password page ! provide your email for confirm 5
          digit verification code.
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
