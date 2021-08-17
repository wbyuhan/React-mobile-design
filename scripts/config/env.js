const development = process.env.NODE_ENV === "development";
const production = process.env.NODE_ENV === "production";

module.exports = {
    development,
    production
}