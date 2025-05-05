/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */
import { useState } from '@wordpress/element';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import UploadTypes from '../../components/UploadTypes';
import UploadTarget from '../../components/UploadTarget';
import UploadStatus from '../../components/UploadStatus';
import { blockStore } from '../../store';
import ScreenshotOneContext from '../../contexts/ScreenshotOne';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const InitialScreen = ( props ) => {
	const { blockUniqueId, clientId } = props;
	const {
		isUploading,
		isProcessingUpload,
		isUploadError,
	} = useSelect( ( select ) => {
		return {
			isUploading: select( blockStore( blockUniqueId ) ).isUploading(),
			isProcessingUpload: select( blockStore( blockUniqueId ) ).isProcessingUpload(),
			isUploadError: select( blockStore( blockUniqueId ) ).isUploadError(),
		};
	} );

	const [ isScreenshotOneTypeSelected, setIsScreenshotOneTypeSelected ] = useState( false );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	const initialDefaultInterface = (
		<>
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-initial">
				{ ( ! isUploading && ! isProcessingUpload && ! isUploadError ) && (
					<UploadTypes attributes={ props.attributes } setAttributes={ props.setAttributes } blockUniqueId={ blockUniqueId } clientId={ clientId } />
				) }
				{ ( isUploading || isProcessingUpload || isUploadError ) && (
					<UploadStatus blockUniqueId={ blockUniqueId } />
				) }
				<div
					className={
						classnames(
							{
								'dlx-photo-block__is-uploading': isUploading || isProcessingUpload || isUploadError,
							}
						)
					}
				>
					<UploadTarget attributes={ props.attributes } setAttributes={ props.setAttributes } blockUniqueId={ blockUniqueId } />
				</div>
			</div>
		</>
	);

	const screenshotOneInterface = (
		<>
			<div className="dlx-photo-block__screen-initial">
				{ __( 'ScreenshotOne', 'photo-block' ) }
			</div>
		</>
	);

	return (
		<ScreenshotOneContext.Provider value={ { isScreenshotOneTypeSelected, setIsScreenshotOneTypeSelected } }>
			{
				! isScreenshotOneTypeSelected && (
					<>
						{ initialDefaultInterface }
					</>
				)
			}
			{
				isScreenshotOneTypeSelected && (
					<>
						{ screenshotOneInterface }
					</>
				)
			}
		</ScreenshotOneContext.Provider>
	);
};
export default InitialScreen;
