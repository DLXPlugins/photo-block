import './editor.scss';

import classnames from 'classnames';
import { useEffect, useState, useRef, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarDropdownMenu,
	Popover,
	PlaceHolder,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { useDispatch, useSelect, dispatch, select } from '@wordpress/data';
import { doAction } from '@wordpress/hooks';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { generateUniqueId } from '../../utils/Functions';

import { blockStore } from '../../store';


import InitialScreen from '../../screens/Initial';
//import EffectsScreen from '../../screens/Effects';
import CaptionAppender from '../../components/CaptionAppender';
import EditScreen from '../../screens/Edit';
import CropScreen from '../../screens/Crop';
import DataScreen from '../../screens/Data';
import DataEditScreen from '../../screens/DataEdit';
import LoadingScreen from '../../screens/Loading';
import FeaturedImageScreen from '../../screens/FeaturedImageEdit';
import globalStylesStore from '../../store/global-styles';

// For storing unique IDs.
const uniqueIds = [];

const PhotoBlock = ( props ) => {

	const {
		attributes,
		setAttributes,
		clientId,
		context,
		isSelected,
	} = props;

	const innerBlockCount = useSelect( ( coreSelect ) => coreSelect( 'core/block-editor' ).getBlock( clientId ).innerBlocks ).length;

	const newUniqueId = 'photo-block-' + clientId.substr( 2, 9 ).replace( '-', '' );

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		// Check context to see if we're in a query loop.
		const pid = context?.postId || null;
		const queryLoop = context.query;
		if ( 0 !== pid && null !== pid && 'none' !== queryLoop && typeof queryLoop !== 'undefined' ) {
			setInQueryLoop( true );
		}

		let realUniqueId = null;
		if ( ( null === uniqueId || uniqueIds.includes( uniqueId ) ) && ! inQueryLoop ) {
			const permUniqueId = newUniqueId;

			// If block is duplicated, set new store defaults.
			if ( uniqueIds.includes( uniqueId ) ) {
				const oldStore = select( blockStore( uniqueId ) );
				if ( oldStore ) {
					// Duplicate the store and set defaults.
					const newBlockStore = dispatch( blockStore( permUniqueId ) );
					newBlockStore.setBlockUniqueId( permUniqueId );
					newBlockStore.setPhotoMode( oldStore.getPhotoMode() );
					newBlockStore.setCaptionPosition( oldStore.getCaptionPosition() );
					newBlockStore.setHasCaption( oldStore.hasCaption() );
					newBlockStore.setInQueryLoop( oldStore.inQueryLoop() );
					newBlockStore.setImageData( oldStore.getImageData() );

					// Get the old screen, and if it's not edit, set new screen to initial.
					const oldScreen = oldStore.getCurrentScreen();
					let newScreen = 'initial';
					switch ( oldScreen ) {
						case 'edit':
						case 'crop':
							newScreen = 'edit';
							break;
						default:
							break;
					}
					newBlockStore.setScreen( newScreen );
					props.attributes.screen = newScreen;
					setAttributes( { screen: newScreen } );
				}
			}
			// If we're a brand new block, set the unique ID.
			if ( null === uniqueId ) {
				setBlockUniqueId( permUniqueId );
			}
			// We need this for duplicated state so one block doesn't affect another.
			props.attributes.uniqueId = permUniqueId;
			setAttributes( { uniqueId: permUniqueId } );
			uniqueIds.push( permUniqueId );
			realUniqueId = permUniqueId;
		} else {
			setBlockUniqueId( uniqueId );
			uniqueIds.push( uniqueId );
			realUniqueId = uniqueId;
		}

		/**
		 * Action: dlx_photo_block_has_loaded
		 *
		 * Fires after the block has loaded and after unique ID has been set.
		 */
		doAction(
			'dlx_photo_block_has_loaded',
			realUniqueId
		);

		// Set initial state of the block.
		setImageData( attributes.imageData );
		setHasCaption( attributes.hasCaption );
		setCaptionPosition( attributes.captionPosition );
		setPhotoMode( attributes.photoMode );
	}, [] );

	const {
		uniqueId,
		align,
		globalStyle,
		photoDropShadow,
	} = props.attributes;

	const { globalStyleCSSClassName } = useSelect( ( newSelect ) => {
		const maybeGlobalStyle = newSelect( globalStylesStore ).getGlobalStyleBySlug( globalStyle );
		if ( Object.keys( maybeGlobalStyle ).length === 0 ) {
			return '';
		}
		return {
			globalStyleCSSClassName: maybeGlobalStyle.css_class,
		};
	} );

	// Read in context values.
	const {
		setBlockUniqueId,
		setCaptionPosition,
		setHasCaption,
		setImageData,
		setPhotoMode,
		setInQueryLoop,
	} = useDispatch( blockStore( uniqueId ? uniqueId : newUniqueId ) );

	// Get current block data.
	const {
		currentScreen,
		isUploading,
		isProcessingUpload,
		isUploadError,
		filepondInstance,
		hasCaption,
		captionPosition,
		inQueryLoop,
		photoMode,
		blockUniqueId,
	} = useSelect( ( select ) => {
		return {
			currentScreen: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).getCurrentScreen(),
			isUploading: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).isUploading(),
			isProcessingUpload: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).isProcessingUpload(),
			isUploadError: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).isUploadError(),
			filepondInstance: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).getFilepondInstance(),
			hasCaption: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).hasCaption(),
			captionPosition: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).getCaptionPosition(),
			inQueryLoop: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).inQueryLoop(),
			photoMode: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).getPhotoMode(),
			blockUniqueId: select( blockStore( uniqueId ? uniqueId : newUniqueId ) ).getBlockUniqueId(),
		};
	} );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ currentScreen }`,
			`dlx-caption-position-${ captionPosition }`,
			globalStyleCSSClassName,
			{
				'dlx-has-drop-shadow': photoDropShadow.enabled,
			}
		),
	} );

	// Set caption position attribute as captionPosition context is updated so the parent knows the caption position.
	useEffect( () => {
		if ( props.attributes.captionPosition !== captionPosition ) {
			props.setAttributes( { captionPosition } );
		}
	}, [ captionPosition ] );

	

	// Store the filepond upload ref.
	const imageRef = useRef( null );

	// Set caption innerblocks classes.
	const captionInnerBlocksClasses = classnames(
		'dlx-photo-block__caption', {
			'dlx-photo-block__caption--has-overlay': 'overlay' === captionPosition,
		}
	);
	const captionInnerBlockProps = useInnerBlocksProps(
		{
			className: captionInnerBlocksClasses,
		},
		{
			allowedBlocks: [ 'dlxplugins/photo-caption-block' ],
			templateInsertUpdatesSelection: true,
			renderAppender: () => ( isSelected ? <CaptionAppender numBlocks={ innerBlockCount } clientId={ clientId } blockUniqueId={ blockUniqueId } /> : null ),
		}
	);

	// Set data mode when setting or exiting data mode.
	// useEffect( () => {
	// 	setAttributes( {
	// 		photoMode,
	// 	} );
	// }, [ photoMode ] );

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const initCurrentScreen = () => {
		// Don't load interface until uniqueId's are set. We need this to get block state later.
		if ( null === uniqueId || null === blockUniqueId ) {
			return null;
		}
		// Otherwise get the screen based on the current screen.
		switch ( currentScreen ) {
			case 'loading':
				return <LoadingScreen { ...props } blockUniqueId={ blockUniqueId } />;
			case 'initial':
				return <InitialScreen attributes={ attributes } setAttributes={ setAttributes } blockUniqueId={ blockUniqueId } clientId={ clientId } />;
			case 'edit':
				return <EditScreen attributes={ attributes } setAttributes={ setAttributes } ref={ imageRef } innerBlockProps={ captionInnerBlockProps } clientId={ clientId } blockUniqueId={ blockUniqueId } />;
			case 'crop':
				return <CropScreen attributes={ attributes } setAttributes={ setAttributes } blockUniqueId={ blockUniqueId } />;
			case 'featuredImage':
				return <FeaturedImageScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } innerBlockProps={ captionInnerBlockProps } blockUniqueId={ blockUniqueId } clientId={ clientId } />;
			case 'data':
				return <DataScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } blockUniqueId={ blockUniqueId } />;
			case 'data-edit':
				return <DataEditScreen attributes={ attributes } setAttributes={ setAttributes } context={ context } innerBlockProps={ captionInnerBlockProps } blockUniqueId={ blockUniqueId } />;
			case 'effects':
				return null;
				// return (
				// 	<EffectsScreen attributes={ attributes } setAttributes={ setAttributes } />
				// );
		}
		return null;
	};

	const block = (
		<>
			<section className="dlx-photo-block__container dlx-photo-block__block-wrapper" id={ uniqueId }>
				{ initCurrentScreen() }
			</section>
		</>
	);

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PhotoBlock;
