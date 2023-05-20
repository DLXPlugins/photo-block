import './editor.scss';

import {
	useContext,
	useState,
} from '@wordpress/element';
import {
	SelectControl,
	Button,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import {
	FileKey,
	Link2,
	FileText,
	File,
} from 'lucide-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import UploaderContext from '../../contexts/UploaderContext';
import AdvancedSelectControl from '../../components/AdvancedSelect';

const MetaFieldControl = ( props ) => {
	const { setAttributes, attributeName, endpoint, params, label, placeholder, currentSuggestion, acceptDirectInput } = props;

	const [ currentMetaFieldSuggestion, setCurrentMetaFieldSuggestion ] = useState( currentSuggestion );

	return (
		<>
			<AdvancedSelectControl
				restNonce={ photoBlock.restNonce }
				restEndpoint={ photoBlock.restUrl + endpoint } /* '/search/types' */
				itemIcon={ <Link2 /> }
				params={ params }
				savedValue={ '' }
				placeholder={ placeholder }
				label={ label }
				currentSelectedSuggestion={ currentMetaFieldSuggestion }
				onItemSelect={ ( event, suggestionValue ) => {
					if ( null === suggestionValue ) {
						setAttributes( {
							[ attributeName ]: '',
						} );
					}
				} }
				acceptDirectInput={ acceptDirectInput }
			>
				{ ( showSuggestions, suggestions, selectedSuggestion ) => {
					if ( showSuggestions && suggestions.length > 0 ) {
						// Render the suggestions as button items.
						return (
							<div className="dlx-photo-block__post-suggestions">
								{ suggestions.map( ( suggestion, index ) => {
									const isSelected = selectedSuggestion === index;
									const suggestionClasses = classnames(
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
												setCurrentMetaFieldSuggestion( suggestion );
												setAttributes( {
													[ attributeName ]: suggestion,
												} );
											} }
											icon={ <FileKey /> }
											iconSize={ 2 }
											iconPosition="left"
										>
											<span className="photo-block-search-item">
												<span className="photo-block-search-item-title no-margin">
													{ suggestion }
												</span>
											</span>
										</Button>
									);
								} ) }
							</div>
						);
					}
					return <></>;
				} }
			</AdvancedSelectControl>
		</>
	);
};

const DataSelect = ( props ) => {
	const { attributes, setAttributes, context, title, prefix } = props;

	const [ postTypeSuggestion, setPostTypeSuggestion ] = useState( attributes[ `${ prefix }PostTitle` ] );
	const {
		dataSource,
		dataPostType,
		dataPostId,
	} = attributes;

	const { inQueryLoop } = useContext( UploaderContext );

	// Get query loop vars.
	const { postId } = context;

	/**
	 * Get a post ID either from the block or attribute.
	 *
	 * @return {number} The post ID.
	 */
	const getPostId = () => {
		let currentPostId = 0;
		// If data type is current post, get the current post ID.
		if ( 'currentPost' === dataSource ) {
			// Determine if we're in a query block.
			if ( inQueryLoop ) {
				currentPostId = postId;
			} else {
				currentPostId = wp.data.select( 'core/editor' ).getCurrentPostId();
			}
			return currentPostId;
		}
		// If data type is post type, get the post ID from the attribute.
		if ( 'postType' === dataSource && '' !== dataPostId ) {
			return dataPostId;
		}
		return currentPostId;
	};

	/**
	 * Get a post type label.
	 *
	 * @param {string} postTypeValue The post type.
	 * @return {string} The post type label.
	 */
	const getPostTypeLabel = ( postTypeValue ) => {
		let postTypeLabel = '';
		photoBlock.postTypes.forEach( ( postTypeOption ) => {
			if ( postTypeOption.value === postTypeValue ) {
				postTypeLabel = postTypeOption?.singular ?? postTypeOption.label;
			}
		} );
		return postTypeLabel;
	};

	/**
	 * Get an attribute based on prefix and source.
	 *
	 * @param {string} source The source variable.
	 * @return {string} The attribute.
	 */
	const getAttribute = ( source ) => {
		let attribute = null;

		// If prefix and source are in attributes, return value.
		if ( attributes[ `${ prefix }${ source }` ] ) {
			attribute = attributes[ `${ prefix }${ source }` ];
		}
		return attribute;
	};

	return (
		<>
			<h3>{ title }</h3>
			<SelectControl
				label={ __( 'Data Source', 'photo-block' ) }
				value={ getAttribute( 'Source' ) }
				onChange={ ( source ) => {
					setAttributes( { [ `${ prefix }Source` ]: source } );
				} }
				help={ __( 'Select where the alt text should come from.', 'photo-block' ) }
			>
				<option value="none">{ __( 'None', 'photo-block' ) }</option>
				<option value="currentImage">{ __( 'Current Image', 'photo-block' ) }</option>
				<option value="currentPost">{ __( 'Current Post', 'photo-block' ) }</option>
				<option value="postType">{ __( 'Post Type', 'photo-block' ) }</option>
			</SelectControl>
			{
				( getAttribute( 'Source' ) === 'postType' ) && (
					<>
						<SelectControl
							label={ __( 'Select a Post Type', 'photo-block' ) }
							value={ getAttribute( 'PostType' ) }
							onChange={ ( value ) => {
								setAttributes( { [ `${ prefix }PostType` ]: value } );
							} }
							options={ photoBlock.postTypes }
						/>
						<AdvancedSelectControl
							restNonce={ photoBlock.restNonce }
							restEndpoint={ photoBlock.restUrl + '/search/types' }
							itemIcon={ <Link2 /> }
							params={ {
								postType: getAttribute( 'PostType' ),
							} }
							savedValue={ '' }
							placeholder={ __( 'Search by ID or title', 'photo-block' ) }
							label={ sprintf(
								/* Translators: %s: post type label. */
								__( 'Select a %s', 'photo-block' ),
								getPostTypeLabel( getAttribute( 'PostType' ) )
							) }
							currentSelectedSuggestion={ postTypeSuggestion }
							onItemSelect={ ( event, suggestionValue ) => {
								if ( null === suggestionValue ) {
									setAttributes( {
										[ `${ prefix }PostId` ]: '',
									} );
								}
							} }
						>
							{ ( showSuggestions, suggestions, selectedSuggestion ) => {
								if ( showSuggestions && suggestions.length > 0 ) {
									// Render the suggestions as button items.
									return (
										<div className="dlx-photo-block__post-suggestions">
											{ suggestions.map( ( suggestion, index ) => {
												const isSelected = selectedSuggestion === index;
												const suggestionClasses = classnames(
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
														aria-selected={
															suggestion.value === selectedSuggestion
														}
														className={ suggestionClasses }
														onClick={ ( e ) => {
															setPostTypeSuggestion(
																suggestion.label
															);
															setAttributes( {
																[ `${ prefix }PostId` ]: suggestion.value.toString(),
																[ `${ prefix }PostTitle` ]: suggestion.label,
															} );
														} }
														icon={
															'post' === suggestion.type ? (
																<FileText />
															) : (
																<File />
															)
														}
														iconSize={ 2 }
														iconPosition="left"
													>
														<span className="photo-block-search-item">
															<span className="photo-block-search-item-title">
																{ suggestion.label }
															</span>
															<span className="photo-block-search-item-info">
																{ suggestion.permalink }
															</span>
														</span>
													</Button>
												);
											} ) }
										</div>
									);
								}
								return <></>;
							} }
						</AdvancedSelectControl>
						{
							( getAttribute( 'PostId' ) !== '' ) && (
								<>
									<SelectControl
										label={ __( 'Post Data Type', 'photo-block' ) }
										value={ getAttribute( 'PostTypeSource' ) }
										onChange={ ( type ) => {
											setAttributes( { [ `${ prefix }PostTypeSource` ]: type } );
										} }
										help={ __( 'Select the type of data to use for the alt text.', 'photo-block' ) }
										options={ [
											/* can be title, postAuthorName, postExcerpt, customField
														*/
											{ label: __( 'Post Title', 'photo-block' ), value: 'title' },
											{ label: __( 'Post Author Name', 'photo-block' ), value: 'postAuthorName' },
											{ label: __( 'Post Author Meta', 'photo-block' ), value: 'postAuthorMeta' },
											{ label: __( 'Post Excerpt', 'photo-block' ), value: 'postExcerpt' },
											{ label: __( 'Custom Field', 'photo-block' ), value: 'customField' },
										] }
									/>
									{
										( getAttribute( 'PostTypeSource' ) === 'postAuthorMeta' ) && (
											<MetaFieldControl
												setAttributes={ setAttributes }
												attributeName={ `${ prefix }PostTypeAuthorMeta` }
												endpoint={ '/search/author-meta' }
												params={ {
													postType: getAttribute( 'PostType' ),
													postId: getAttribute( 'PostId' ),
												} }
												label={ __( 'Select an author meta field', 'photo-block' ) }
												placeholder={ __(
													'Search for or enter an author meta field',
													'photo-block'
												) }
												currentSuggestion={ getAttribute( 'PostTypeAuthorMeta' ) }
											/>
										)
									}
									{
										( getAttribute( 'PostTypeSource' ) === 'customField' ) && (
											<MetaFieldControl
												setAttributes={ setAttributes }
												attributeName={ `${ prefix }PostTypeCustomField` }
												params={ {
													postType: getAttribute( 'PostType' ),
													postId: getPostId(),
												} }
												currentSuggestion={ getAttribute( 'PostTypeCustomField' ) }
											/>
										)
									}
								</>
							)
						}
					</>
				)
			}
			{
				( getAttribute( 'Source' ) === 'currentImage' ) && (
					<>
						<SelectControl
							label={ __( 'Image Data Type', 'photo-block' ) }
							value={ getAttribute( 'Type' ) }
							onChange={ ( type ) => {
								setAttributes( { [ `${ prefix }Type` ]: type } );
							} }
							help={ __( 'Select the type of data to use for the alt text.', 'photo-block' ) }
							options={ [
								{ label: __( 'Alt Text', 'photo-block' ), value: 'altText' },
								{ label: __( 'Caption', 'photo-block' ), value: 'caption' },
								{ label: __( 'Image Title', 'photo-block' ), value: 'imageTitle' },
								{ label: __( 'Custom Field', 'photo-block' ), value: 'customField' },
							] }
						/>
						{
							( getAttribute( 'Type' ) === 'customField' ) && (
								<MetaFieldControl
									setAttributes={ setAttributes }
									attributeName={ `${ prefix }ImageCustomField` }
									params={ {
										postType: 'attachment',
										postId: 0,
									} }
									currentSuggestion={ getAttribute( 'ImageCustomField' ) }
								/>
							)
						}
					</>
				)
			}
			{
				( getAttribute( 'Source' ) === 'currentPost' ) && (
					<>
						<SelectControl
							label={ __( 'Post Data Type', 'photo-block' ) }
							value={ getAttribute( 'TypePost' ) }
							onChange={ ( type ) => {
								setAttributes( { [ `${ prefix }TypePost` ]: type } );
							} }
							help={ __( 'Select the type of data to use for the alt text.', 'photo-block' ) }
							options={ [
								/* can be title, postAuthorName, postExcerpt, customField
											*/
								{ label: __( 'Post Title', 'photo-block' ), value: 'title' },
								{ label: __( 'Post Author Name', 'photo-block' ), value: 'postAuthorName' },
								{ label: __( 'Post Author Meta', 'photo-block' ), value: 'postAuthorMeta' },
								{ label: __( 'Post Excerpt', 'photo-block' ), value: 'postExcerpt' },
								{ label: __( 'Custom Field', 'photo-block' ), value: 'customField' },
							] }
						/>
						{
							( getAttribute( 'TypePost' ) === 'postAuthorMeta' ) && (
								<MetaFieldControl
									setAttributes={ setAttributes }
									attributeName={ `${ prefix }TypePostAuthorMeta` }
									endpoint={ '/search/author-meta' }
									params={ {
										postType: dataPostType,
										postId: getPostId(),
									} }
									label={ __( 'Select an author meta field', 'photo-block' ) }
									placeholder={ __(
										'Search for or enter an author meta field',
										'photo-block'
									) }
									currentSuggestion={ getAttribute( 'TypePostAuthorMeta' ) }
								/>
							)
						}
						{
							( getAttribute( 'TypePost' ) === 'customField' ) && (
								<MetaFieldControl
									setAttributes={ setAttributes }
									attributeName={ `${ prefix }TypePostCustomField` }
									params={ {
										postType: dataPostType,
										postId: getPostId(),
									} }
									currentSuggestion={ getAttribute( 'TypePostCustomField' ) }
								/>
							)
						}
					</>
				)
			}
		</>
	);
};

MetaFieldControl.propTypes = {
	setAttributes: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	acceptDirectInput: PropTypes.bool,
	attributeName: PropTypes.string.isRequired,
	endpoint: PropTypes.string,
};

MetaFieldControl.defaultProps = {
	label: __( 'Select a Custom Field', 'photo-block' ),
	placeholder: __( 'Search by ID or title', 'photo-block' ),
	acceptDirectInput: true,
	endpoint: '/search/custom-fields',
};

export default DataSelect;
