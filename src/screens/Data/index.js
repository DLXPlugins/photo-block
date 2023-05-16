import './editor.scss';

import { useContext, useState, useEffect, forwardRef } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton, SelectControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { LogOut, Link2, File, FileText } from 'lucide-react';
import classNames from 'classnames';
import UploaderContext from '../../contexts/UploaderContext';
import AdvancedSelectControl from '../../components/AdvancedSelect';

const DataScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { dataImageSource, dataPostType, dataPostTitle } = attributes;

	const [ currentPostTypePostSuggestion, setCurrentPostTypePostSuggestion ] = useState( dataPostTitle ? dataPostTitle : false );

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
				<AdvancedSelectControl
					restNonce={ photoBlock.restNonce }
					restEndpoint={ photoBlock.restUrl + '/search/types' }
					itemIcon={ <Link2 /> }
					params={ {
						postType: dataPostType,
					} }
					savedValue={ '' }
					placeholder={ __( 'Search by ID or title', 'photo-block' ) }
					label={ __( 'Search by ID or title', 'photo-block' ) }
					currentSelectedSuggestion={ currentPostTypePostSuggestion }
				>
					{ ( showSuggestions, suggestions, selectedSuggestion ) => {
						if ( showSuggestions && suggestions.length > 0 ) {
							// Render the suggestions as button items.
							return (
								<div className="dlx-photo-block__post-suggestions">
									{ suggestions.map( ( suggestion, index ) => {
										const isSelected = selectedSuggestion === index;
										const suggestionClasses = classNames(
											'photo-block__post-suggestion',
											{
												'is-selected': isSelected,
											}
										);
										return (
											<Button
												key={ index }
												value={ suggestion.value }
												role="option"
												aria-selected={ suggestion.value === selectedSuggestion }
												className={ suggestionClasses }
												onClick={ ( e ) => {
													setCurrentPostTypePostSuggestion( suggestion.label );
													setAttributes( {
														dataPostId: suggestion.value,
														dataPostTitle: suggestion.label,
													} );
												} }
												icon={ 'post' === suggestion.type ? <FileText /> : <File /> }
												iconSize={ 2 }
												iconPosition="left"
											>
												<span className="photo-block-search-item">
													<span className="photo-block-search-item-title">{ suggestion.label }</span>
													<span className="photo-block-search-item-info">{ suggestion.permalink }</span>
												</span>
											</Button>
										);
									} ) }
								</div>
							);
						}
						return (
							<></>
						);
					} }
				</AdvancedSelectControl>
			</div>
		</>
	);
} );
export default DataScreen;
