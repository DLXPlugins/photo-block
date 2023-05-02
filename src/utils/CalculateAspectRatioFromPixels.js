/**
 * Returns an aspect ratio in human readable format.
 *
 * @param {number} width  Width in pixels.
 * @param {number} height Height in pixels.
 * @return {string} Aspect ratio in human readable format.
 */
const CalculateAspectRatioFromPixels = ( width, height ) => {
	console.log( width, height );
	// Find the greatest common factor
	function findGCF( a, b ) {
		return b === 0 ? a : findGCF( b, a % b );
	}
	const gcf = findGCF( width, height );

	// Simplify the ratio
	const simplifiedWidth = width / gcf;
	const simplifiedHeight = height / gcf;

	// Format the ratio as "X:Y"
	return {
		width: simplifiedWidth,
		height: simplifiedHeight,
	};
};
export default CalculateAspectRatioFromPixels;
