import { Form, Button } from 'antd'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  useResendOtpMutation,
  useVerifyEmailOtpMutation,
} from '../../Redux/authApis'

const VerifyCode = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(Array(6).fill(''))
  const inputRefs = useRef([])
  const [form] = Form.useForm()

  const [postVerifyAccount, { isLoading }] = useVerifyEmailOtpMutation()
  const [postResendOtp, { isLoading: resendLoading }] = useResendOtpMutation()

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, '')
    if (!digit) return

    const newOtp = [...otp]
    newOtp[index] = digit[0]
    setOtp(newOtp)

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp]
      if (otp[index]) {
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
        newOtp[index - 1] = ''
        setOtp(newOtp)
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')

    if (pastedData.length === 0) return

    const newOtp = Array(6).fill('')

    pastedData
      .slice(0, 6)
      .split('')
      .forEach((char, i) => {
        newOtp[i] = char
      })

    setOtp(newOtp)

    // Focus on the appropriate field after paste
    const nextIndex = Math.min(pastedData.length, 5)
    setTimeout(() => {
      inputRefs.current[nextIndex]?.focus()
    }, 0)
  }

  const onFinishOtp = async () => {
    const email = localStorage.getItem('email') || ''
    const otpCode = otp.join('')

    console.log('OTP Code:', otpCode)

    if (!email) {
      navigate('/sign-up')
      return
    }

    // Check if all 6 digits are filled
    const filledDigits = otp.filter((digit) => digit !== '').length
    if (filledDigits !== 6) {
      toast.error('Please enter complete 6-digit OTP')
      return
    }

    try {
      const res = await postVerifyAccount({
        email,
        resetCode: Number(otpCode),
      }).unwrap()

      toast.success(res?.message)
      localStorage.setItem('token', res?.data?.accessToken)
      localStorage.setItem('reset-token', res?.data?.resetToken)
      navigate('/reset-password')
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  const handleResendOtp = async () => {
    const email = localStorage.getItem('email') || ''
    if (!email) return

    try {
      const res = await postResendOtp({ email }).unwrap()
      toast.success(res?.message)

      const emptyOtp = Array(6).fill('')
      setOtp(emptyOtp)
      inputRefs.current[0]?.focus()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex responsive-base-width">
      <div className="w-1/2  flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold mb-4">Verification Code</h1>

        <div className="w-full max-w-sm">
          {/* OTP Input Section */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onPaste={handlePaste}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-11 text-center text-black border rounded text-lg focus:border-blue-500 focus:outline-none"
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <Button
            type="primary"
            onClick={onFinishOtp}
            loading={isLoading}
            className="w-full bg-[#0095FF] text-white h-[48px] rounded-md"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </div>

        <div className="flex gap-1 mt-4">
          <div className="text-gray-500">Send new verification email?</div>
          <div
            className="text-blue-400 hover:text-blue-300 cursor-pointer"
            onClick={handleResendOtp}
          >
            {resendLoading ? 'Resending...' : 'Resend'}
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center ">
        <div className="mt-5 w-[360px] text-gray-500  text-center leading-8">
          Please enter the 6-digit verification code sent to your email to
          continue
        </div>
      </div>
    </div>
  )
}

export default VerifyCode
