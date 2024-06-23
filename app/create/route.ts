import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

/**
 * This POST route is used to create new URL mapping.
 * The data needed are `url` and `urlName`.
 * This route returns `generatedUrl`; which is the shortened and customized URL. 
 */
export async function POST(
  req: NextRequest
) {
  try {
    const data: { url: string, urlName: string } = await req.json()

    // Make sure data exists
    if (!data?.url) return NextResponse.json({ error: 'Please provide a URL link'})
    if (!data?.urlName) return NextResponse.json({ error: 'Please provide a URL name'})
    
    // Parse URL before storing in database
    let { url, urlName }: { url: string, urlName: string } = data
    urlName = urlName.replaceAll(' ', '_')

    // Store in database
    try {
      await prisma.mapURL.create({
        data: {
          urlLink: url,
          urlName
        }
      })
    } catch (e) {
      // Handle duplication error caused by URL name that has been taken by other user
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        return NextResponse.json({ error: 'URL name has been taken' })
      }
    }
    
    // Return the shortened and customized URL
    return NextResponse.json({ generatedUrl: `${process.env.LOCAL_DOMAIN}/${urlName}` })

  } catch(e) {
    // Unknown error cases
    console.error(e)
    NextResponse.json({ error: 'Something wrong occurred' })
  }
}
