'use client'

import { FormEvent } from 'react'

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/create', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center flex-col">
            <input type="url" placeholder="Place your URL here" />
            <input type="text" placeholder="Enter your URL title" />
            <button type="submit">Submit</button>
        </div>
      </form>
      <input type="url" disabled placeholder='Output here!'/>
    </div>
  );
}
