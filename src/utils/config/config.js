module.exports = {
    enviroment: process.env.ENV || 'develop',
    web: {
        port: Number(process.env.SERVER_PORT) || 3000,
    },
    application: {
        polygonURL: process.env.POLYGON_URL,
        polygonAPIKey: process.env.POLYGON_API_KEY
    }
}