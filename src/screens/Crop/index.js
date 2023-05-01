import './editor.scss';

import { useContext, useState, forwardRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import UploaderContext from '../../contexts/UploaderContext';
import { useEffect } from 'react';
import SendCommand from '../../utils/SendCommand';



const CropScreen = ( props ) => {
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;
	const [ setScreen ] = useState( true );
	const [ shouldShowLoading, setShouldShowLoading ] = useState( true );
	const [ shouldFetchImage, setShouldFetchImage ] = useState( true );
	const [ fullsizePhoto, setFullsizePhoto ] = useState( {} );

	useEffect( () => {
		async function fetchImage() {
			const response = await SendCommand( photoBlock.restNonce, {}, `${ photoBlock.restUrl + '/get-image' }/id=${ photo.id }`, 'GET' );
			const { data } = response;
			setFullsizePhoto( data );
			setAttributes( { photo: data } );
			setShouldShowLoading( false );
		}
		fetchImage();
	}, [ shouldFetchImage ] );
	return (
		<>
			<div className="dlx-photo-block__screen-edit">
				{
					shouldShowLoading && (
						<div className="dlx-photo-block__screen-edit-spinner" style={ { minWidth: width, minHeight: height, maxWidth: '100%', maxHeight: '100%' } }><h3>{ __( 'Loading Full Size Image', 'photo-block' ) }</h3><Spinner /></div>
					)
				}
				{
					! shouldShowLoading && (
						<>
							<img src={ fullsizePhoto?.url ?? '' } width={ width } height={ height } alt="" />
						</>
					)
				}
			</div>
		</>
	);
};
export default CropScreen;
