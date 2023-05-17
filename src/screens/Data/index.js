import './editor.scss';

import { useContext, useState, useEffect, forwardRef } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton, SelectControl, Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { LogOut, Link2, File, FileText, FileKey } from 'lucide-react';
import classNames from 'classnames';
import UploaderContext from '../../contexts/UploaderContext';
import AdvancedSelectControl from '../../components/AdvancedSelect';

const DataScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { dataSource, dataImageSource, dataImageSourceCustomField, dataPostType, dataPostTitle, dataPostId } = attributes;

	// Post type suggestion for selecting a post.
	const [ currentPostTypePostSuggestion, setCurrentPostTypePostSuggestion ] = useState( dataPostTitle ? dataPostTitle : false );

	// Custom field suggestion for selecting an image source.
	const [ currentCustomFieldSuggestion, setCurrentCustomFieldSuggestion ] = useState( dataImageSourceCustomField ? dataImageSourceCustomField : false );

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

	/**
	 * Get a post type label.
	 *
	 * @param {string} postType The post type.
	 * @return {string} The post type label.
	 */
	const getPostTypeLabel = ( postType ) => {
		let postTypeLabel = '';
		photoBlock.postTypes.forEach( ( postTypeOption ) => {
			if ( postTypeOption.value === postType ) {
				postTypeLabel = postTypeOption?.singular ?? postTypeOption.label;
			}
		} );
		return postTypeLabel;
	};

	/**
	 * Get a post ID either from the block or attribute.
	 *
	 * @return {number} The post ID.
	 */
	const getPostId = () => {
		let postId = 0;
		// If data type is current post, get the current post ID.
		if ( 'currentPost' === dataSource ) {
			// Get post ID from block editor.
			postId = wp.data.select( 'core/editor' ).getCurrentPostId();
			return postId;
		}
		// If data type is post type, get the post ID from the attribute.
		if ( 'postType' === dataSource && '' !== dataPostId ) {
			postId = dataPostId;
			return postId;
		}
		return postId;
	};


	return (
		<>
			{ localToolbar }
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-data">
				<h2>{ __( 'Dynamic Image Data', 'photo-block' ) }</h2>
				<SelectControl
					label={ __( 'Data Source', 'photo-block' ) }
					value={ dataSource }
					onChange={ ( value ) => {
						setAttributes( { dataSource: value } );
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
					label={ sprintf(
						/* Translators: %s: post type label. */
						__( 'Select a %s', 'photo-block' ),
						getPostTypeLabel( dataPostType )
					)
					}
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
				<SelectControl
					label={ __( 'Image Source', 'photo-block' ) }
					value={ dataImageSource }
					onChange={ ( value ) => {
						setAttributes( { dataImageSource: value } );
					} }
				>
					<optgroup label={ __( 'Post Options', 'photo-block' ) }>
						<option value="featuredImage">{ __( 'Featured Image', 'photo-block' ) }</option>
						<option value="postMeta">{ __( 'Post Meta', 'photo-block' ) }</option>
					</optgroup>
					<optgroup label={ __( 'Author', 'photo-block' ) }>
						<option value="authorAvatar">{ __( 'Author Avatar', 'photo-block' ) }</option>
					</optgroup>
				</SelectControl>
				<AdvancedSelectControl
					restNonce={ photoBlock.restNonce }
					restEndpoint={ photoBlock.restUrl + '/search/custom-fields' }
					params={ {
						postType: dataPostType,
						postId: getPostId(),

					} }
					savedValue={ '' }
					onItemSelect={ ( event, suggestionValue ) => {
						console.log( suggestionValue );
						setAttributes( { dataImageSourceCustomField: suggestionValue } );
					} }
					placeholder={ __( 'Search for or enter a custom field', 'photo-block' ) }
					label={ __( 'Select a Custom Field', 'photo-block' ) }
					currentSelectedSuggestion={ currentCustomFieldSuggestion }
					acceptDirectInput={ true }
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
												value={ suggestion }
												role="option"
												aria-selected={ suggestion === selectedSuggestion }
												className={ suggestionClasses }
												onClick={ ( e ) => {
													setCurrentCustomFieldSuggestion( suggestion );
													setAttributes( {
														dataImageSourceCustomField: suggestion,
													} );
												} }
												icon={ <FileKey /> }
												iconSize={ 2 }
												iconPosition="left"
											>
												<span className="photo-block-search-item">
													<span className="photo-block-search-item-title no-margin">{ suggestion }</span>
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
