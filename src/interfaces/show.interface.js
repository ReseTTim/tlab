/**
 * @typedef {Object} Schedule
 * @property {string} time
 * @property {string[]} days
 */

/**
 * @typedef {Object} Rating
 * @property {number|null} average
 */

/**
 * @typedef {Object} Country
 * @property {string} name
 * @property {string} code
 * @property {string} timezone
 */

/**
 * @typedef {Object} Network
 * @property {number} id
 * @property {string} name
 * @property {Country} country
 * @property {string|null} officialSite
 */

/**
 * @typedef {Object} Externals
 * @property {number|null} tvrage
 * @property {number|null} thetvdb
 * @property {string|null} imdb
 */

/**
 * @typedef {Object} Image
 * @property {string} medium
 * @property {string} original
 */

/**
 * @typedef {Object} Link
 * @property {string} href
 * @property {string} [name]
 */

/**
 * @typedef {Object} Links
 * @property {Link} self
 * @property {Link} [previousepisode]
 */

/**
 * @typedef {Object} Show
 * @property {number} id
 * @property {string} url
 * @property {string} name
 * @property {string} type
 * @property {string} language
 * @property {string[]} genres
 * @property {string} status
 * @property {number|null} runtime
 * @property {number|null} averageRuntime
 * @property {string|null} premiered
 * @property {string|null} ended
 * @property {string|null} officialSite
 * @property {Schedule} schedule
 * @property {Rating} rating
 * @property {number} weight
 * @property {Network|null} network
 * @property {Object|null} webChannel
 * @property {Object|null} dvdCountry
 * @property {Externals} externals
 * @property {Image|null} image
 * @property {string|null} summary
 * @property {number} updated
 * @property {Links} _links
 */

export default {};
