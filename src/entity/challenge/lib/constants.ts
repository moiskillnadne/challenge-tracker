export type ChallengeType =
  (typeof ChallengeTypeValues)[keyof typeof ChallengeTypeValues]

export const ChallengeTypeValues = {
  Sport: 'SPORT',
  Language: 'LANGUAGE',
  Sugar: 'SUGAR',
  Water: 'WATER',
  Sleep: 'SLEEP',
  Other: 'OTHER',
} as const
