const trash = require('trash');
const fs = require('fs');
const { promisify } = require('util');
const ncp = promisify(require('ncp'));

/**
 * clean
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function clean(posts, c) {
	return new Promise((resolve, reject) => {
		// Delete build directory
		trash('../../' + c.build)
			.then(() => {
				console.log('Build directory deleted.');
				// Create new public directory
				return promisify(fs.mkdir)('../../' + c.build);
			})
			.then(() => {
				console.log('New build directory created');
				// Copy assets directory
				return ncp('src/assets', c.build + 'assets');
			})
			.then(() => {
				console.log('Assets directory copied')
				resolve(posts);
			})
			.catch(e => reject(e))
	});
}

module.exports = clean;
