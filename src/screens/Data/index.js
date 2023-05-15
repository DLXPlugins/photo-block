import './editor.scss';

import { useContext, useState, useEffect, forwardRef } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton, SelectControl, ComboboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { LogOut, Link2 } from 'lucide-react';
import UploaderContext from '../../contexts/UploaderContext';
import PostSelectorControl from '../../components/PostSelector';

const DataScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { dataImageSource, dataPostType, dataPostId } = attributes;

	const { screen, setScreen } = useContext( UploaderContext );


	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			Data options here
		</InspectorControls>
	);

	const localToolbar = (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <LogOut /> }
						label={ __( 'Exit Data Mode', 'photo-block' ) }
						onClick={ () => {
							setAttributes( { dataMode: false, screen: 'initial' } );
							setScreen( 'initial' );
						} }
					>
						{ __( 'Exit Data Mode', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
		</>
	);

	return (
		<>
			{ localToolbar }
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-data">
				<h2>{ __( 'Dynamic Image Data', 'photo-block' ) }</h2>
				<SelectControl
					label={ __( 'Image Data Source', 'photo-block' ) }
					value={ dataImageSource }
					onChange={ ( value ) => {
						setAttributes( { dataImageSource: value } );
					} }
					options={ [
						{ label: __( 'Current post', 'photo-block' ), value: 'currentPost' },
						{ label: __( 'Post type', 'photo-block' ), value: 'postType' },
					] }
				/>
				<SelectControl
					label={ __( 'Select a Post Type', 'photo-block' ) }
					value={ dataPostType }
					onChange={ ( value ) => {
						setAttributes( { dataPostType: value } );
					} }
					options={ photoBlock.postTypes }
				/>
				<PostSelectorControl
					restNonce={ photoBlock.restNonce }
					restEndpoint={ photoBlock.restUrl + '/search/pages' }
					itemIcon={ <Link2 /> }
					onItemSelect={ ( e, url ) => {
						setAttributes( {
							mediaLinkUrl: url,
						} );
					} }
					savedValue={ '' }
				/>
			</div>
		</>
	);
} );
export default DataScreen;
