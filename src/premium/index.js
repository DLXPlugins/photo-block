import { registerPlugin } from '@wordpress/plugins';
import { useDispatch } from '@wordpress/data';
import { Database } from 'lucide-react';

import { Fill, Button } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import blockStore from '../store/index';

// registerPlugin(
// 	'dlx-photo-block-data-image-type',
// 	{
// 		render: () => {
// 			const {
// 				setPhotoMode,
// 				setScreen,
// 			// eslint-disable-next-line react-hooks/rules-of-hooks
// 			} = useDispatch( blockStore( uniqueId ) );

// 			return (
// 				<Fill
// 					name="dlx-photo-block.upload-types"
// 				>
// 					{ ( { setAttributes } ) => {
// 						return (
// 							<>
// 								<Button
// 									variant="secondary"
// 									icon={ <Database /> }
// 									onClick={ () => {
// 										setAttributes( {
// 											photoMode: 'data',
// 											screen: 'data',
// 										} );
// 										setPhotoMode( 'data' );
// 										setScreen( 'data' );
// 									} }
// 								>
// 									{ __( 'Data', 'photo-block' ) }
// 								</Button>
// 							</>
// 						);
// 					} }

// 				</Fill>
// 			);
// 		},
// 	}
// );
