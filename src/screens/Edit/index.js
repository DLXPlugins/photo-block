import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
} from '@wordpress/element';
import { Spinner, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Crop, Image, Accessibility, Link } from 'lucide-react';

import UploaderContext from '../../contexts/UploaderContext';

const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );

	const { screen, setScreen, setInspectorControls, setBlockToolbar } =
		useContext( UploaderContext );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>Edit options here</InspectorControls>
	);

	const localToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ <Crop /> }
					label={ __( 'Crop and Edit', 'photo-block' ) }
					onClick={ () => {
						setScreen( 'crop' );
					} }
				>
					{ __( 'Crop and Edit', 'photo-block' ) }
				</ToolbarButton>
				<ToolbarButton
					icon={ <Image /> }
					label={ __( 'Replace Image', 'photo-block' ) }
					onClick={ () => {
						setScreen( 'initial' );
					} }
				>
					{ __( 'Replace Image', 'photo-block' ) }
				</ToolbarButton>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton
					icon={ <Accessibility /> }
					label={ __( 'Set Accessibility Options', 'photo-block' ) }
					onClick={ () => {} }
				/>
				<ToolbarButton
					icon={ <Link /> }
					label={ __( 'Set Link Options', 'photo-block' ) }
					onClick={ () => {} }
				/>
			</ToolbarGroup>
		</BlockControls>
	);

	/**
	 * Get inspector controls for the screen.
	 */
	useEffect( () => {
		if ( 'edit' === screen ) {
			setInspectorControls( localInspectorControls );
			setBlockToolbar( localToolbar );
		}
	}, [ screen ] );

	return (
		<>
			<div className="dlx-photo-block__screen-edit">
				{ imageLoading && (
					<div
						className="dlx-photo-block__screen-edit-spinner"
						style={ {
							minWidth: width,
							minHeight: height,
							maxWidth: '100%',
							maxHeight: '100%',
						} }
					>
						<Spinner />
					</div>
				) }
				<img
					src={ url }
					width={ width }
					height={ height }
					alt=""
					onLoad={ () => {
						setImageLoading( false );
					} }
					ref={ ref }
				/>
			</div>
		</>
	);
} );
export default EditScreen;
