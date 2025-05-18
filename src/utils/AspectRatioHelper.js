const aspectRatioRegex = /^(?:(?:(\d+)\s?(?:\/|:)\s?(\d+))|unset|\s*)$/;

/**
 * Get the aspect ratio from a string.
 *
 * @param {string} aspectRatio - The aspect ratio to get.
 * @return {string} The aspect ratio.
 */
const getAspectRatio = ( aspectRatio ) => {
	if ( 'unset' === aspectRatio || '' === aspectRatio ) {
		return aspectRatio;
	}
	if ( 0 === aspectRatio || '0' === aspectRatio ) {
		return '';
	}
	const match = aspectRatio.match( aspectRatioRegex );
	if ( match ) {
		return `${ parseInt( match[ 1 ] ) } / ${ parseInt( match[ 2 ] ) }`;
	}
	return null;
};

export { getAspectRatio, aspectRatioRegex };

