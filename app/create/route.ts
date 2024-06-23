import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == 'POST') {
      const data = await req.body
  
      if (!data?.url) res.status(400).json({ error: 'Please provide a URL link'})
      if (!data?.urlName) res.status(400).json({ error: 'Please provide a URL name'})
      
      let { url, urlName }: { url: string, urlName: string } = data
      
      // Parse URL name
      urlName.replace(' ', '_')
  
      await prisma.mapURL.create({
        data: {
          fromUrl: url,
          toUrl: urlName
        }
      })
      
      return res.status(201).json({ generatedUrl: `${process.env.LOCAL_DOMAIN}/${urlName}` })
    }
    else {
      res.status(400).json({ error: 'Use POST method only on this route' })
    }
  } catch(e) {
    console.error(e)
    res.status(500).json({ error: 'Some error occurred on the server' })
  }
}