export const improveFullName = (fullName: string | undefined) => {
  if (!fullName) {
    return
  }
  let arr = fullName.split(' ')
  arr = arr.map((el) => el.substr(0, 1).toUpperCase() + el.substr(1))
  return arr.join(' ')
}