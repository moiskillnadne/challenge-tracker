import { ChallengeType } from '~/entity/challenge'

export const getBackgroundColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'bg-sport-background'

    case 'SUGAR':
      return 'bg-sugar-background'

    case 'SLEEP':
      return 'bg-sleep-background'

    case 'WATER':
      return 'bg-water-background'

    case 'LANGUAGE':
      return 'bg-language-background'

    case 'OTHER':
      return 'bg-other-background'

    default:
      return 'bg-other-background'
  }
}

export const getTextColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'text-sport-daysLeftText'

    case 'SUGAR':
      return 'text-sugar-daysLeftText'

    case 'SLEEP':
      return 'text-sleep-daysLeftText'

    case 'WATER':
      return 'text-water-daysLeftText'

    case 'LANGUAGE':
      return 'text-language-daysLeftText'

    case 'OTHER':
      return 'text-other-daysLeftText'

    default:
      return 'text-other-daysLeftText'
  }
}

export const getCircleColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'stroke-sport-dayCircles'

    case 'SUGAR':
      return 'stroke-sugar-dayCircles'

    case 'SLEEP':
      return 'stroke-sleep-dayCircles'

    case 'WATER':
      return 'stroke-water-dayCircles'

    case 'LANGUAGE':
      return 'stroke-language-dayCircles'

    case 'OTHER':
      return 'stroke-other-dayCircles'

    default:
      return 'stroke-other-dayCircles'
  }
}
