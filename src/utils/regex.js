const regex1 = new RegExp(/^([12]\d{3}-((0)?[1-9]|1[0-2])-((0)?[1-9]|[12]\d|3[0-1]{0,1}))$/mi)
const regex2 = new RegExp(/^(((0)?|1)\d{1})-(((0)?|1|2)\d{1})-((19|20)\d{2})/mi)

module.exports = { regex1, regex2 }