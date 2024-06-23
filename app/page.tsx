'use client'

import { ClipboardDocumentIcon, ExclamationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/16/solid'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {

  const [url, setUrl] = useState("")
  const [urlName, setUrlName] = useState("")
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
 
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    setIsLoading(true)
    const response = await fetch('/create', {
      method: 'POST',
      body: JSON.stringify({ url, urlName }),
      headers: {
        'content-type': 'application/json'
      }
    })

    const data = await response.json()

    setIsLoading(false)
    if (!data?.generatedUrl) {
      setError("ⓘ " + data.error)
      return
    }

    setGeneratedUrl(data.generatedUrl)
    setError("")
    setUrl("")
    setUrlName("")
    toast.success("Your Catchy URL is ready!")
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center flex-col min-w-96 space-y-1">
          <label className=' text-center'>URL Link</label>
          <input title="Fill URL link to be customized" disabled={isLoading} value={url} type="url" name="url" placeholder="Place your URL here" onChange={(e) => setUrl(e.target.value)}
            className='rounded-full border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500'
          />
          <div className=' h-3' />
          <label className=' text-center'>URL Name</label>
          <input title="Fill name for the short URL" disabled={isLoading} value={urlName} type="text" name="urlName" placeholder="Enter your custom URL" onChange={(e) => setUrlName(e.target.value)}
            className='rounded-full border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500'
          />
          <div className=' h-2' />
          <div className='text-sm text-red-600 text-center'>{error}</div>
          <button title="Submit" disabled={isLoading} type="submit" className='flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full h-10 m-32 disabled:bg-slate-400 disabled:hover:bg-slate-400'>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
      <div className='h-6' />
      <div className='flex flex-col justify-center'>
        <div className='text-center text-lg'>Your Catchy URL</div>
        <div title="Your shorten URL will be displayed here!" className='flex flex-row justify-center mt-1'>
          <input type="url" disabled placeholder={isLoading ? `Processing...` : `Output`} value={generatedUrl}
          className='rounded-full border-2 p-2 border-pink-300 disabled:bg-white min-w-96'
          />
          <button
            title='Copy to Clipboard'
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(generatedUrl)
              toast.success('Copied to Clipboard successfully!')
            }}
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-sm text-white py-1 px-4 rounded-full"
          >
            <ClipboardDocumentIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
