import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/* Credits: Forked from GenerateBlocks */

export default () => {
	const { setDeviceType } = useDispatch( 'core/editor' );

	const deviceType = useSelect( ( select ) => {
		const { getDeviceType } = select( 'core/editor' );

		return getDeviceType().toLowerCase();
	}, [] );

	useEffect( () => {
	}, [ deviceType ] );

	return [ deviceType, setDeviceType ];
};
