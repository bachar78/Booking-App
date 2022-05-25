const rating = (num) => {
  if (num > 1 && num <= 3) {
    return 'Good'
  } else if (num > 3 && num <= 5) {
    return 'Excelent'
  } else if (num === 1) {
    return 'Bad'
  }
}

export default rating
