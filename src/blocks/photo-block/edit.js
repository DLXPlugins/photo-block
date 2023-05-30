import './editor.scss';

import classnames from 'classnames';
import { useEffect, useState, useRef, useContext, lazy, Suspense } from '@wordpress/element';
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

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';


import { Crop, Image, Accessibility, Link, ZoomIn, RectangleHorizontal, RotateCcw, RotateCw, Save, X } from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';
import InitialScreen from '../../screens/Initial';
//import EffectsScreen from '../../screens/Effects';
import CaptionAppender from '../../components/CaptionAppender';

const initialScreen = lazy( () =>
	import( /* webpackChunkName: "InitialScreen.0.0.1" */ '../../screens/Initial' )
);
const getInitialScreen = ( props ) => {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<InitialScreen { ...props }/>
		</Suspense>
	);
};
const EditScreen = lazy( () =>
	import( /* webpackChunkName: "EditScreen.0.0.1" */ '../../screens/Edit' )
);
const getEditScreen = ( props ) => {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<EditScreen { ...props }/>
		</Suspense>
	);
};
const CropScreen = lazy( () =>
	import( /* webpackChunkName: "CropScreen.0.0.1" */ '../../screens/Crop' )
);
const getCropScreen = ( props ) => {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<CropScreen { ...props }/>
		</Suspense>
	);
};
const DataScreen = lazy( () =>
	import( /* webpackChunkName: "DataScreen.0.0.1" */ '../../screens/Data' )
);
const getDataScreen = ( props ) => {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<DataScreen { ...props }/>
		</Suspense>
	);
};
const DataEditScreen = lazy( () =>
	import( /* webpackChunkName: "DataEditScreen.0.0.1" */ '../../screens/DataEdit' )
);
const getDataEditScreen = ( props ) => {
	return (
		<Suspense fallback={ <div>Loading...</div> }>
			<DataEditScreen { ...props }/>
		</Suspense>
	);
};
const PhotoBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoBlock, 'photo-block' );

	// Read in context values.
	const {
		imageFile,
		screen,
		setScreen,
		isUploading,
		setIsUploading,
		isProcessingUpload,
		setIsProcessingUpload,
		blockToolbar,
		isUploadError,
		hasCaption,
		setHasCaption,
		captionPosition,
		dataMode,
		setDataMode,
	} = useContext( UploaderContext );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-block`,
			`align${ align }`,
			`dlx-screen-${ screen }`,
			`dlx-caption-position-${ captionPosition }`,
		),
	} );

	// Set caption position attribute as captionPosition context is updated so the parent knows the caption position.
	useEffect( () => {
		if ( props.attributes.captionPosition !== captionPosition ) {
			props.setAttributes( { captionPosition } );
		}
	}, [ captionPosition ] );

	// Store the filepond upload ref.
	const filepondRef = useRef( null );
	const imageRef = useRef( null );
	const [ captionInnerBlocksRef, setCaptionInnerBlocksRef ] = useState( null );

	const { attributes, setAttributes, clientId, context } = props;

	// Get a function that'll give us the innerblocks count for a custom inserter.
	const { getBlockCount } = useSelect(
        ( select ) => select( store ),
        []
    );
	const innerBlocksCount = getBlockCount( clientId );

	const {
		uniqueId,
		photo,
		align,
		caption,
		altText,
		overlayText,
		overlayTextPosition,
		paddingSize,
		marginSize,
		borderWidth,
		borderRadiusSize,
		typographyCaption,
		dataScreen, /* can be `data`, `data-edit`. */
	} = attributes;

	// Set caption innerblocks classes.
	const captionInnerBlocksClasses = classnames(
		'dlx-photo-block__caption', {
			'dlx-photo-block__caption--has-overlay': 'overlay' === captionPosition,
		}
	);
	const captionInnerBlockProps = useInnerBlocksProps(
		{
			className: captionInnerBlocksClasses,
			ref: setCaptionInnerBlocksRef,
		},
		{
			allowedBlocks: [ 'dlxplugins/photo-caption-block' ],
			templateInsertUpdatesSelection: true,
			renderAppender: () => ( <CaptionAppender numBlocks={ innerBlocksCount } clientId={ clientId } /> ),
		}
	);

	/**
	 * Detect when innerblock has changed.
	 */
	// useEffect( () => {
	// 	console.log( innerBlocksCount );
	// }, [ innerBlocksCount ] );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Photo Block Settings', 'photo-block' ) }>
				<PanelRow>
					<TextControl
						label={ __( 'Caption', 'photo-block' ) }
						value={ caption }
						onChange={ ( value ) => setAttributes( { caption: value } ) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		// Set unique ID for block (for styling).
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getCurrentScreen = () => {
		// If in data mode, show the data screen.
		if ( dataMode ) {
			if ( 'data' === dataScreen ) {
				return getDataScreen( {
					attributes,
					setAttributes,
					context,
				} );
			}
			if ( 'data-edit' === dataScreen ) {
				return getDataEditScreen( {
					attributes,
					setAttributes,
					innerBlockProps: captionInnerBlockProps,
					context,
				} );
			}
		}

		// Otherwise get the screen based on the current screen.
		switch ( screen ) {
			case 'initial':
				return getInitialScreen( {
					attributes,
					setAttributes,
				} );
			case 'edit':
				return getEditScreen( {
					ref: imageRef,
					attributes,
					setAttributes,
					innerBlockProps: captionInnerBlockProps,
				} );
			case 'crop':
				return getCropScreen( {
					attributes,
					setAttributes,
				} );
			case 'data':
				return getDataScreen( {
					attributes,
					setAttributes,
					context,
				} );
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
			<section className="dlx-photo-block__container" id={ uniqueId }>
				{ getCurrentScreen() }
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
