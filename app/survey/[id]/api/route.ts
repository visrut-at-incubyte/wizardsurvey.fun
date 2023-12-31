import clientPromise from '@/app/mongodb'
import { getClientIP } from '@/app/utils'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const surveyId = params.id

  const client = await clientPromise
  const db = client.db('survey-db')
  const survey = await db.collection('survey-templates').findOne({ uuid: surveyId })

  return NextResponse.json(survey, { status: StatusCodes.OK })
}

export async function POST(request: Request) {
  const ip = getClientIP(request)
  const { id, answers } = await request.json()

  const client = await clientPromise
  const db = client.db('survey-db')

  const filledSurveys = await db.collection(id).countDocuments()

  if (filledSurveys !== 0) {
    const is_response_filled = await db.collection(id).findOne({ ip })
    if (is_response_filled) {
      return NextResponse.json(
        { error: 'You have already filled survey response once.' },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      )
    }
  }

  const survey = await db.collection(id).insertOne({ ip, answers })

  return NextResponse.json(survey, { status: StatusCodes.ACCEPTED })
}
