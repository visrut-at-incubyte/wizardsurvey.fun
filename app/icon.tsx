import { ImageResponse } from 'next/server'
import WizardSurvey from './icons/WizardSurvey'

export const runtime = 'edge'

export const alt = 'Wizard Icon'
export const size = {
    width: 16,
    height: 16,
}

export const contentType = 'image/png'

export default async function Image() {

    return new ImageResponse(
        (
            <WizardSurvey width='100%' height='100%' color='#974EC3' />
        ),
        {
            ...size,
        }
    )
}