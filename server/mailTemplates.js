const mjml2html = require("mjml")
const mjmlUtils = require('mjml-utils')
const path = require('path')
const newsLetterPath = path.join(__dirname, './public/mail_templates/newsletter.html')
const welcomePath = path.join(__dirname, './public/mail_templates/welcome.html')
const nestedColPath = path.join(__dirname, './public/mail_templates/nestedColumns.html')
const carouselPath = path.join(__dirname, './public/mail_templates/carousel.html')
const multiPostsPath = path.join(__dirname, './public/mail_templates/multiposts.html')

const newsLetterTemplate = async (data) =>{
  const result =  await mjmlUtils.inject(newsLetterPath,data)
  return result
}
const welcomeTemplate = async (data) =>{
  const result =  mjmlUtils.inject(welcomePath,data)
  return result
}

const newstedColumn = async (data) =>{
  const result =  await mjmlUtils.inject(nestedColPath,data)
  return result
}
const carouselTemplate = async (data) =>{
  const result =  await mjmlUtils.inject(carouselPath,data)
  return result
}
const multiplePosts = async (data) =>{
  const result =  await mjmlUtils.inject(multiPostsPath,data)
  return result
}


module.exports = {newsLetterTemplate,welcomeTemplate,carouselTemplate,multiplePosts,newstedColumn}