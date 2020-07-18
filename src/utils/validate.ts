const isValidateUserName = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0
const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)  //判断是否是外链
export {
  isValidateUserName,
  isExternal
}