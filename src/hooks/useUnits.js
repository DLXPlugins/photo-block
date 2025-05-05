import unitList from '../utils/UnitsList';

const useUnits = () => {
	// Test if the value starts with a number, decimal or a single dash. Single dash is for negative numbers.
	const startsWithNumber = ( number ) => {
		if ( 0 === number ) {
			return false;
		}
		return /^([-]?\d|[-]?\.)/.test( number );
	};
	const getNumericValue = ( values ) => values.length > 0 ? values[ 0 ].trim() : '';
	const defaultUnitValue = 'px';
	const getUnitValue = ( values ) => values.length > 1 ? values[ 1 ] : defaultUnitValue;

	/**
	 * Handle when a unit value changes.
	 *
	 * @param {string}   newValue The value to get the numeric value from.
	 * @param {Function} onChange The onChange function.
	 * @param {Function} setValue The setValue function.
	 * @param {string}   device   The device type.
	 * @param {string}   unitSlug The unit slug.
	 * @return {void}
	 */
	const onUnitChange = ( newValue, onChange, setValue, device, unitSlug ) => {
		if ( startsWithNumber( newValue ) ) {
			const newValuesSplit = splitValues( newValue );
			const numericValue = getNumericValue( newValuesSplit );
			setValue( `${ device }.${ unitSlug }`, getUnitValue( newValuesSplit ) );
			onChange( numericValue );
		} else {
			// Starts with a string, hide the unit.
			setValue( `${ device }.${ unitSlug }`, '' );
			onChange( newValue );
		}
	};

	const splitValues = ( values ) => {
		const unitRegex = unitList.join( '|' );
		const splitRegex = new RegExp( `(${ unitRegex })` );

		return values
			? values.toString().toLowerCase().split( splitRegex ).filter( ( singleValue ) => '' !== singleValue )
			: [];
	};

	return {
		onUnitChange,
		splitValues,
		getNumericValue,
		getUnitValue,
		startsWithNumber,
	};
};
export default useUnits;
