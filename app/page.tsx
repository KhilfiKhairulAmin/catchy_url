'use client'

import { FormEvent, useState } from 'react'

export default function Home() {

  const [url, setUrl] = useState("")
  const [urlName, setUrlName] = useState("")
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [error, setError] = useState("")
 
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const response = await fetch('/create', {
      method: 'POST',
      body: JSON.stringify({ url, urlName }),
      headers: {
        'content-type': 'application/json'
      }
    })

    const data = await response.json()

    if (!data?.generatedUrl) {
      setError(data.error)
      return
    }

    setGeneratedUrl(data.generatedUrl)
    setError("")
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center flex-col">
          <input type="url" name="url" placeholder="Place your URL here" onChange={(e) => setUrl(e.target.value)} />
          <input type="text" name="urlName" placeholder="Enter your preferred text for the URL" onChange={(e) => setUrlName(e.target.value)} />
          <label>{error}</label>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <input type="url" disabled placeholder='Output here!' value={generatedUrl} />
        <button onClick={() => navigator.clipboard.writeText(generatedUrl)}>Copy</button>
      </div>
    </div>
  );
}
