import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

/**
 * This route is used to redirect the user from the URL of this website to the `urlLink`.
 * This route takes the `urlName` and finds it in the database.
 * If it exists, the route will redirect to `urlLink` of this data.
 */
export async function GET(req: NextRequest, { params }: { params: { urlName: string } }) {
  try {
    const { urlName } = params

    // Get the data of the urlName
    const data = await prisma.mapURL.findFirst({
      where: {
        urlName: urlName?.toString() || ''
      }
    })
  
    if (data) {
      // Redirect
      return NextResponse.redirect(`${data.urlLink}`)
    }
    else {
      // Return error
      return NextResponse.json({ error: 'This name does not exist' })
    }
  } catch (e) {
    // Handle unknown error cases
    console.log(e)
    return NextResponse.error()
  }
}
