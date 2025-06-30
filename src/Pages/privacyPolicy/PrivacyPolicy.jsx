import { useState, useRef, useEffect } from 'react'
import JoditEditor from 'jodit-react'
import toast from 'react-hot-toast'
import {
  useGetPrivacyQuery,
  usePostPrivacyMutation,
} from '../../Redux/privacyApis'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
  const navigate = useNavigate()
  const editor = useRef(null)

  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  const { data: privacyData, isLoading, isError } = useGetPrivacyQuery()
  const [updatePrivacy, { isLoading: isSaving }] = usePostPrivacyMutation()

  console.log(privacyData)

  useEffect(() => {
    if (privacyData?.data?.description) {
      setContent(privacyData.data.description)
      setOriginalContent(privacyData.data.description)
    }
  }, [privacyData])

  useEffect(() => {
    setHasChanges(content !== originalContent)
  }, [content, originalContent])

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all content?')) {
      setContent('')
    }
  }

  const handleSave = async () => {
    try {
      await updatePrivacy({
        description: content,
      }).unwrap()

      toast.success('Privacy policy saved successfully!')
      setOriginalContent(content)
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to save privacy policy:', error)
      toast.error('Failed to save privacy policy. Please try again.')
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          'You have unsaved changes. Are you sure you want to discard them?'
        )
      ) {
        setContent(originalContent)
      }
    } else {
      navigate(-1)
    }
  }

  if (isLoading) {
    return <div>Loading....</div>
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Failed to load privacy policy. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="mb-10 bg-black px-4 h-screen">
      <div className="flex items-center space-x-2 "></div>

      <div className="w-full px-6 py-8  rounded-lg mt-6  !bg-[#0F1724] !text-black">
        <h1 className="text-2xl font-bold mb-5 text-white"> Privacy Policy</h1>
        <div className="flex flex-col w-full ">
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={handleContentChange}
            config={{
              buttons:
                'bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source',
              height: 400,
              placeholder: 'Type here...',
              style: {
                backgroundColor: 'black',
                color: 'white',
              },
            }}
            className="border rounded-md"
          />

          <div className="flex justify-end space-x-4 mt-4 ">
            <button
              onClick={handleClear}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              disabled={isSaving || !hasChanges}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
