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

export const getHeaderTextColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'text-sport-headerText'

    case 'SUGAR':
      return 'text-sugar-headerText'

    case 'SLEEP':
      return 'text-sleep-headerText'

    case 'WATER':
      return 'text-water-headerText'

    case 'LANGUAGE':
      return 'text-language-headerText'

    case 'OTHER':
      return 'text-other-headerText'

    default:
      return 'text-other-headerText'
  }
}

export const getTextColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'text-sport-defaultText'

    case 'SUGAR':
      return 'text-sugar-defaultText'

    case 'SLEEP':
      return 'text-sleep-defaultText'

    case 'WATER':
      return 'text-water-defaultText'

    case 'LANGUAGE':
      return 'text-language-defaultText'

    case 'OTHER':
      return 'text-other-defaultText'

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

export const getMonthTextColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'text-sport-monthText'

    case 'SUGAR':
      return 'text-sugar-monthText'

    case 'SLEEP':
      return 'text-sleep-monthText'

    case 'WATER':
      return 'text-water-monthText'

    case 'LANGUAGE':
      return 'text-language-monthText'

    case 'OTHER':
      return 'text-other-monthText'

    default:
      return 'text-other-monthText'
  }
}

export const getNavigationButtonColor = (type: ChallengeType) => {
  switch (type) {
    case 'SPORT':
      return 'stroke-sport-navigationButton'

    case 'SUGAR':
      return 'stroke-sugar-navigationButton'

    case 'SLEEP':
      return 'stroke-sleep-navigationButton'

    case 'WATER':
      return 'stroke-water-navigationButton'

    case 'LANGUAGE':
      return 'stroke-language-navigationButton'

    case 'OTHER':
      return 'stroke-other-navigationButton'

    default:
      return 'stroke-other-navigationButton'
  }
}
