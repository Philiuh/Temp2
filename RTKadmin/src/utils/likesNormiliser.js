const likesNormiliser = likesAmount => {
  const likesString = likesAmount.toString()

  switch (likesAmount[likesAmount.length - 1]) {
    case '1':
      return likesString + ' лайк'
    case '2':
    case '3':
    case '4':
      return likesString + ' лайка'
    default:
      return likesString + ' лайков'
  }
}

export default likesNormiliser
