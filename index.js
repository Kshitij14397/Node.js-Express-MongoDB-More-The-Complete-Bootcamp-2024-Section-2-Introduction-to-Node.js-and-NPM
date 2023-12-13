//Section 2: Introduction to Node.js and NPM


/*
//#7. Using Modules 1: Core Modules
const fs = require('fs')
const hello = 'Hello World'
console.log(hello)
*/

/*
//#8. Reading and Writing Files
//Blocking synchronous way
const fs = require('fs')

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)

const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', textOut)
console.log('File written')
*/

/*
//#10. Reading and Writing Files Asynchronously
//Non-blocking asynchronous way
const fs = require('fs')

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('ERROR')
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2)

    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3)

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('Your file has been written')
      })
    })
  })
})

console.log('Will read file')
*/

/*
//#11. Creating a Simple Web Server
const http = require('http')

//Creating a Server
const server = http.createServer((req, res) => {
  res.end('Hello from the server!')
})

//Starting a Server and listening incoming requests from client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
*/

/*
//#12. Routing
const http = require('http')
const url = require('url')

//Creating a Server
const server = http.createServer((req, res) => {
  const pathName = req.url
  console.log(pathName)

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERIEW')
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    })
    res.end('<h1>Page Not Found!</h1>')
  }
})

//Starting a Server and listening incoming requests from client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
*/

/*
//#13. Building a (Very) Simple API
const http = require('http')
const url = require('url')
const fs = require('fs')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

//Creating a Server
const server = http.createServer((req, res) => {
  const pathName = req.url
  console.log(pathName)

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERIEW')
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    })
    res.end('<h1>Page Not Found!</h1>')
  }
})

//Starting a Server and listening incoming requests from client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
*/

/*
//#14. HTML Templating: Building the Templates
//#15. HTML Templating: Filling the Templates
//#16. Parsing Variables from URLs

const http = require('http')
const url = require('url')
const fs = require('fs')

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%ID%}/g, product.id)
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRICE%}/g, product.price)

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

  output = output.replace(/{%DESCRIPTION%}/g, product.description)

  return output
}

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8',
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8',
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8',
)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
//console.log(tempOverview)
//console.log(data)

//Creating a Server
const server = http.createServer((req, res) => {
  const pathName = req.url
  console.log(pathName)
  const { query, pathname } = url.parse(req.url, true)

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')
    //console.log(cardsHtml)

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    res.end(output)
  }

  //Product Page
  else if (pathname === '/product') {
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(output)
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  }

  //Not Found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    })
    res.end('<h1>Page Not Found!</h1>')
  }
})

//Starting a Server and listening incoming requests from client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
*/

/*
//#17. Using Modules 2: Our Own Modules

//Core Modules
const http = require('http')
const url = require('url')
const fs = require('fs')

//Own Modules
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8',
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8',
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8',
)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
//console.log(tempOverview)
//console.log(data)

//Creating a Server
const server = http.createServer((req, res) => {
  const pathName = req.url
  console.log(pathName)
  const { query, pathname } = url.parse(req.url, true)

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')
    //console.log(cardsHtml)

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    res.end(output)
  }

  //Product Page
  else if (pathname === '/product') {
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(output)
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  }

  //Not Found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    })
    res.end('<h1>Page Not Found!</h1>')
  }
})

//Starting a Server and listening incoming requests from client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
*/


//#20. Using Modules 3: 3rd Party Modules

//Core Modules
const http = require('http')
const url = require('url')
const fs = require('fs')

//3rd Party Modules
const slugify = require('slugify')

//Own Modules
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8',
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8',
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8',
)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
//console.log(tempOverview)
//console.log(data)

//slugify: 3rd party module
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }))
console.log(slugs)

//Creating a Server
const server = http.createServer((req, res) => {
  const pathName = req.url
  console.log(pathName)
  const { query, pathname } = url.parse(req.url, true)

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')
    //console.log(cardsHtml)

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    res.end(output)
  }

  //Product Page
  else if (pathname === '/product') {
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(output)
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  }

  //Not Found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    })
    res.end('<h1>Page Not Found!</h1>')
  }
})

//Starting a Server and listening incoming requests from client
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})

