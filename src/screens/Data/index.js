import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
} from '@wordpress/element';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import {
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
	SelectControl,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHeading as Heading,
	BaseControl,
	PanelBody,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { LogOut, Link2, File, FileText, FileKey, Image } from 'lucide-react';
import classNames from 'classnames';
import UploaderContext from '../../contexts/UploaderContext';
import AdvancedSelectControl from '../../components/AdvancedSelect';

// Image Sizes.
const imageSizeOptions = [];
for ( const key in photoBlock.imageSizes ) {
	const size = photoBlock.imageSizes[ key ];
	imageSizeOptions.push( { value: key, label: size.label } );
}

const DataScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const {
		dataSource,
		dataImageSource,
		dataImageSourceCustomField,
		dataPostType,
		dataPostTitle,
		dataPostId,
		dataFallbackImage,
		dataHasFallbackImage,
		dataFallbackImageSize,
		dataScreen, /* can be `data` or `data-edit` */
	} = attributes;

	// Post type suggestion for selecting a post.
	const [ currentPostTypePostSuggestion, setCurrentPostTypePostSuggestion ] =
		useState( dataPostTitle ? dataPostTitle : false );

	// Custom field suggestion for selecting an image source.
	const [ currentCustomFieldSuggestion, setCurrentCustomFieldSuggestion ] =
		useState( dataImageSourceCustomField ? dataImageSourceCustomField : false );

	const { screen, setScreen } = useContext( UploaderContext );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody
				icon={ <Image /> }
				title={ __( 'Fallback Image', 'photo-block' ) }
				initialOpen={ true }
				className="photo-block__inspector-panel"
			>
				<div className="dlx-photo-block__data-row">
					<ToggleControl
						label={ __( 'Enable a Fallback Image', 'photo-block' ) }
						checked={ dataHasFallbackImage }
						onChange={ ( value ) => {
							setAttributes( { dataHasFallbackImage: value } );
						} }
					/>
				</div>
				{ dataHasFallbackImage && (
					<>
						<div className="dlx-photo-block__data-row">
							<SelectControl
								label={ __( 'Select the Fallback Image Size', 'photo-block' ) }
								value={ dataFallbackImageSize }
								onChange={ ( size ) => {
									setAttributes( { dataFallbackImageSize: size } );
								} }
								options={ imageSizeOptions }
							/>
						</div>
						<div className="dlx-photo-block__data-row">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes="image"
									mode="browse"
									multiple={ false }
									title={ __( 'Please select a Fallback Image', 'photo-block' ) }
									render={ ( { open } ) => (
										<Button
											variant="secondary"
											icon={ <Image /> }
											onClick={ () => {
												open();
											} }
										>
											{ __( 'Set Fallback Image', 'photo-block' ) }
										</Button>
									) }
									onSelect={ ( media ) => {
										const selectedMedia = {
											id: media.id,
											url: media.sizes?.large?.url ?? media.sizes.full.url,
											width:
												media.sizes?.large?.width ?? media.sizes.full.width,
											height:
												media.sizes?.large?.height ?? media.sizes.full.height,
											alt: media.alt,
											caption: media.caption,
										};
										setAttributes( {
											dataFallbackImage: selectedMedia,
										} );
									} }
								/>
							</MediaUploadCheck>
						</div>
						{ dataFallbackImage?.url && (
							<>
								<div className="dlx-photo-block__data-row">
									<img
										src={ dataFallbackImage.url }
										alt={ dataFallbackImage.alt }
										width={ dataFallbackImage.width }
										height={ dataFallbackImage.height }
										style={ {
											maxWidth: '175px',
											height: 'auto',
											border: '1px solid #ddd',
										} }
									/>
								</div>
							</>
						) }
					</>
				) }
			</PanelBody>
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

	/**
	 * Determine if the data apply button should be disabled.
	 *
	 * @return {boolean} Whether the button should be disabled.
	 */
	const isApplyButtonDisabled = () => {
		// If data type is current post, get the current post ID.
		if ( 'postType' === dataSource ) {
			if ( '' === dataPostType ) {
				return true;
			}
			if ( '' === dataPostId ) {
				return true;
			}
		}
		if ( 'postMeta' === dataImageSource ) {
			if ( '' === dataImageSourceCustomField ) {
				return true;
			}
		}
		return false;
	};

	return (
		<>
			{ localToolbar }
			{ localInspectorControls }
			<div className="dlx-photo-block__screen-data">
				<Card>
					<CardHeader
						isShady={ true }
					>
						{ __( 'Dynamic Image Data', 'photo-block' ) }
					</CardHeader>
					<CardBody
						isScrollable={ true }
					>
						<div className="dlx-photo-block__data-row">
							<SelectControl
								label={ __( 'Data Source', 'photo-block' ) }
								value={ dataSource }
								onChange={ ( value ) => {
									setAttributes( { dataSource: value } );
								} }
								options={ [
									{
										label: __( 'Current post', 'photo-block' ),
										value: 'currentPost',
									},
									{ label: __( 'Post type', 'photo-block' ), value: 'postType' },
								] }
							/>
						</div>
						{ 'postType' === dataSource && (
							<>
								<div className="dlx-photo-block__data-row">
									<SelectControl
										label={ __( 'Select a Post Type', 'photo-block' ) }
										value={ dataPostType }
										onChange={ ( value ) => {
											setAttributes( { dataPostType: value } );
										} }
										options={ photoBlock.postTypes }
									/>
								</div>
								<div className="dlx-photo-block__data-row">
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
										) }
										currentSelectedSuggestion={ currentPostTypePostSuggestion }
										onItemSelect={ ( event, suggestionValue ) => {
											if ( null === suggestionValue ) {
												setAttributes( {
													dataPostId: '',
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
																	aria-selected={
																		suggestion.value === selectedSuggestion
																	}
																	className={ suggestionClasses }
																	onClick={ ( e ) => {
																		setCurrentPostTypePostSuggestion(
																			suggestion.label
																		);
																		setAttributes( {
																			dataPostId: suggestion.value.toString(),
																			dataPostTitle: suggestion.label,
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
								</div>
							</>
						) }
						<div className="dlx-photo-block__data-row">
							<SelectControl
								label={ __( 'Image Source', 'photo-block' ) }
								value={ dataImageSource }
								onChange={ ( value ) => {
									setAttributes( { dataImageSource: value } );
								} }
							>
								<optgroup label={ __( 'Post Options', 'photo-block' ) }>
									<option value="featuredImage">
										{ __( 'Featured Image', 'photo-block' ) }
									</option>
									<option value="postMeta">{ __( 'Post Meta', 'photo-block' ) }</option>
								</optgroup>
								<optgroup label={ __( 'Author', 'photo-block' ) }>
									<option value="authorAvatar">
										{ __( 'Author Avatar', 'photo-block' ) }
									</option>
								</optgroup>
							</SelectControl>
						</div>
						{ 'postMeta' === dataImageSource && (
							<>
								<div className="dlx-photo-block__data-row">
									<AdvancedSelectControl
										restNonce={ photoBlock.restNonce }
										restEndpoint={ photoBlock.restUrl + '/search/custom-fields' }
										params={ {
											postType: dataPostType,
											postId: getPostId(),
										} }
										savedValue={ '' }
										onItemSelect={ ( event, suggestionValue ) => {
											if ( null === suggestionValue ) {
												setAttributes( {
													dataImageSourceCustomField: '',
												} );
											} else {
												setAttributes( {
													dataImageSourceCustomField: suggestionValue,
												} );
											}
										} }
										placeholder={ __(
											'Search for or enter a custom field',
											'photo-block'
										) }
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
								</div>
							</>
						) }
					</CardBody>
					<CardFooter>
						<div className="dlx-photo-block__data-row dlx-photo-block__data-button-apply">
							<BaseControl>
								<Button
									variant="primary"
									onClick={ () => {
										// Go to data edit screen.
										setAttributes( { dataScreen: 'data-edit' } );
										setScreen( 'data-edit' );
									} }
									disabled={ isApplyButtonDisabled() }
								>
									{ __( 'Apply Changes and Preview', 'photo-block' ) }
								</Button>
							</BaseControl>
						</div>
					</CardFooter>
				</Card>
			</div>
		</>
	);
} );
export default DataScreen;
