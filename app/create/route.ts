import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    
  }
  else {
    res.status(400).json({ error: 'Use POST method only on this route' })
  }
}