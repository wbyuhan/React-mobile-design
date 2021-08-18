const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
const demo = require('./demo')

const mockDir = path.join(process.cwd(), 'mock')
const mocks = [...demo]

function registerRoutes(app) {
    let mockLastIndex
    const mocksForServer = mocks.map((route) => {
        return responseFake(route.url, route.type, route.response)
    })
    for (const mock of mocksForServer) {
        app[mock.type](mock.url, mock.response)
        mockLastIndex = app._router.stack.length
    }
    const mockRoutesLength = Object.keys(mocksForServer).length
    return {
        mockRoutesLength: mockRoutesLength,
        mockStartIndex: mockLastIndex && mockLastIndex - mockRoutesLength
    }
}

function unregisterRoutes() {
    Object.keys(require.cache).forEach(i => {
        if (i.includes(mockDir)) {
            delete require.cache[require.resolve(i)]
        }
    })
}
// for mock server
const responseFake = (url, type, respond) => {
        console.log(chalk.green(`Mock Server Request is ${`http://localhost:3000/mock${url}`}`))
    return {
        url: new RegExp(`${url}`),
        type: type || 'get',
        response(req, res) {
            console.log('request invoke:' + req.path)
            res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
        }
    }
}
module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    const mockRoutes = registerRoutes(app)
    var mockRoutesLength = mockRoutes.mockRoutesLength
    var mockStartIndex = mockRoutes.mockStartIndex
    chokidar.watch(mockDir, {
        ignored: /mock-server/,
        ignoreInitial: true
    }).on('all', (event, path) => {
        if (event === 'change' || event === 'add') {
            try {
                // remove mock routes stack
                app._router.stack.splice(mockStartIndex, mockRoutesLength)
                // clear routes cache
                unregisterRoutes()
                const mockRoutes = registerRoutes(app)
                mockRoutesLength = mockRoutes.mockRoutesLength
                mockStartIndex = mockRoutes.mockStartIndex

                console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))

            } catch (error) {
                console.log(chalk.redBright(error))
            }
        }
    })
}