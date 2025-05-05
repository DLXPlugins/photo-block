/**
 * Returns an aspect ratio in human readable format.
 *
 * @param {string} aspectRatio Aspect ratio in human readable format.
 * @param {number} width       Width in pixels.
 * @return {string} Aspect ratio in human readable format.
 */
const CalculateDimensionsFromAspectRatio = ( aspectRatio, width ) => {
	// Split the aspect ratio into its components.
	const [ x, y ] = aspectRatio.split( ':' ).map( parseFloat );

	// Calculate the height from the width and aspect ratio.
	const height = Math.round( width * ( y / x ) );

	// Return width/height.
	return {
		width,
		height,
	};
};
export default CalculateDimensionsFromAspectRatio;
