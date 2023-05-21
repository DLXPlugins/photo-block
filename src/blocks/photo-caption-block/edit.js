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
	Modal,
	Popover,
	PlaceHolder,
	MenuGroup,
	Spinner,
	MenuItem,
} from '@wordpress/components';

import {
	InspectorControls,
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
	InnerBlocks,
	store,
} from '@wordpress/block-editor';

import {
	useDispatch
} from '@wordpress/data';

import {
	Trash2,
	SeparatorHorizontal,
	Check,
	Shrink,
	FormInput,
	Maximize,
} from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

import UploaderContext from '../../contexts/UploaderContext';
import DimensionsResponsiveControl from '../../components/DimensionsResponsive';
import BorderResponsiveControl from '../../components/BorderResponsive';
import SizeResponsiveControl from '../../components/SizeResponsive';
import useDeviceType from '../../hooks/useDeviceType';
import { DataSelect } from '../../components/DataSelect';
import SendCommand from '../../utils/SendCommand';

/**
 * Height units.
 */
const heightUnits = [ 'px', 'em', 'rem', '%', 'vh' ];

const PhotoCaptionBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoCaptionBlock, 'photo-caption-block' );
	// Read in context values.
	const {
		dataMode,
		imageFile,
		hasCaption,
		setHasCaption,
		captionPosition,
		setCaptionPosition,
		inQueryLoop,
	} = useContext( UploaderContext );

	const [ caption, setCaption ] = useState( '' ); // Only applicable if in daa mode.
	const [ captionLoading, setCaptionLoading ] = useState( false ); // Only applicable if in data mode.
	const [ captionPositionPopoverVisible, setCaptionPositionPopoverVisible ] = useState( false );
	const [ captionPopoverRef, setCaptionPopoverRef ] = useState( null );
	const [ removeCaptionModalVisible, setRemoveCaptionModalVisible ] = useState( false ); // only applicable if in data mode.
	const [ dataModalVisible, setDataModalVisible ] = useState( false ); // only applicable if in data mode.

	const innerBlocksRef = useRef( null );
	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'has-click-to-share-text has-click-to-share__share-text',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: photoBlock.captionInnerBlocks,
			template: [ [ 'core/paragraph', { placeholder: __( 'Enter your caption here.', 'photo-block' ) } ] ],
			templateInsertUpdatesSelection: true,
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender,
		}
	);

	const { removeBlocks } = useDispatch( store );

	// Get device.
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-caption-block`,
		),
	} );

	const { attributes, setAttributes, clientId, context } = props;

	// Get query loop vars.
	const { postId } = context;

	const {
		uniqueId,
		captionPosition: blockCaptionPosition,
		captionPaddingSize,
		captionMarginSize,
		captionBorder,
		captionBorderRadius,
		containerMaxWidth,
		containerMinWidth,
		containerMaxHeight,
		containerMinHeight,
		dataCaptionPostTitle,
		dataCaptionPostId,
		dataCaptionSource,
		dataCaptionType,
		dataCaptionImageCustomField,
		dataCaptionTypePostCustomField,
		dataCaptionPostType,
		dataCaptionPostTypeCustomField,
		dataCaptionTypePost,
		dataCaptionTypePostAuthorMeta,
		dataCaptionPostTypeSource,
		dataCaptionPostTypeAuthorMeta,
	} = attributes;

	/**
	 * Get a post ID either from the block or attribute.
	 *
	 * @return {number} The post ID.
	 */
	const getPostId = () => {
		let currentPostId = 0;
		// If data type is current post, get the current post ID.
		if ( 'currentPost' === dataCaptionSource ) {
			// Determine if we're in a query block.
			if ( inQueryLoop ) {
				currentPostId = postId;
			} else {
				currentPostId = wp.data.select( 'core/editor' ).getCurrentPostId();
			}
			return currentPostId;
		}
		// If data type is post type, get the post ID from the attribute.
		if ( 'postType' === dataCaptionSource && '' !== dataCaptionPostId ) {
			return dataCaptionPostId;
		}
		return currentPostId;
	};

	/**
	 * Retrieve a caption from data.
	 */
	const getCaptionFromData = () => {
		setCaptionLoading( true );
		SendCommand(
			photoBlock.restNonce,
			{
				dataCaptionPostTitle,
				dataCaptionPostId,
				dataCaptionSource,
				dataCaptionType,
				dataCaptionImageCustomField,
				dataCaptionTypePostCustomField,
				dataCaptionPostType,
				dataCaptionPostTypeCustomField,
				dataCaptionTypePost,
				dataCaptionTypePostAuthorMeta,
				dataCaptionPostTypeSource,
				dataCaptionPostTypeAuthorMeta,
				imageId: imageFile.id,
				postId: getPostId(),
			},
			`${ photoBlock.restUrl + '/get-caption-by-data' }`,
			'POST'
		)
			.then( ( response ) => {
				const { data } = response;
				setCaption( data );
			} )
			.catch( ( error ) => {
				// todo: error checking/display.
			} )
			.then( () => {
				setCaptionLoading( false );
			} );
	};


	// Do REST request to get dynamic caption if needed.
	useEffect( () => {
		if ( dataMode ) {
			getCaptionFromData();
		}
	}, [] );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Padding, Margin, and Border', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Maximize /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-dimensions-styles"
				uniqueId={ uniqueId }
				scrollAfterOpen={ false }
			>
				<DimensionsResponsiveControl
					label={ __( 'Caption Padding', 'photo-block' ) }
					values={ captionPaddingSize }
					onValuesChange={ ( values ) => {
						setAttributes( { captionPaddingSize: values } );
					} }
					labelTop={ __( 'Top Padding', 'photo-block' ) }
					labelRight={ __( 'Right Padding', 'photo-block' ) }
					labelBottom={ __( 'Bottom Padding', 'photo-block' ) }
					labelLeft={ __( 'Left Padding', 'photo-block' ) }
					labelAll={ __( 'Change Padding', 'photo-block' ) }
				/>
				<DimensionsResponsiveControl
					label={ __( 'Caption Margin', 'photo-block' ) }
					values={ captionMarginSize }
					onValuesChange={ ( values ) => {
						setAttributes( { photoMarginSize: values } );
					} }
					labelTop={ __( 'Top Margin', 'photo-block' ) }
					labelRight={ __( 'Right Margin', 'photo-block' ) }
					labelBottom={ __( 'Bottom Margin', 'photo-block' ) }
					labelLeft={ __( 'Left Margin', 'photo-block' ) }
					labelAll={ __( 'Change Margin', 'photo-block' ) }
					allowNegatives={ true }
				/>
				<BorderResponsiveControl
					label={ __( 'Caption Border', 'photo-block' ) }
					values={ captionBorder }
					onValuesChange={ ( values ) => {
						setAttributes( { captionBorder: values } );
					} }
					labelTop={ __( 'Top Border', 'photo-block' ) }
					labelRight={ __( 'Right Border', 'photo-block' ) }
					labelBottom={ __( 'Bottom Border', 'photo-block' ) }
					labelLeft={ __( 'Left Border', 'photo-block' ) }
					labelAll={ __( 'Change Border', 'photo-block' ) }
				/>
				<DimensionsResponsiveControl
					label={ __( 'Caption Border Radius', 'photo-block' ) }
					values={ captionBorderRadius }
					onValuesChange={ ( values ) => {
						setAttributes( { captionBorderRadius: values } );
					} }
					labelTop={ __( 'Top-left Radius', 'photo-block' ) }
					labelRight={ __( 'Top-right Radius', 'photo-block' ) }
					labelBottom={ __( 'Bottom-right Radius', 'photo-block' ) }
					labelLeft={ __( 'Bottom-left Radius', 'photo-block' ) }
					labelAll={ __( 'Change Border Radius', 'photo-block' ) }
					isBorderRadius={ true }
				/>

			</PanelBody>
			<PanelBody
				title={ __( 'Container Sizing', 'photo-block' ) }
				initialOpen={ false }
				icon={ <Shrink /> }
				className="photo-block__inspector-panel"
				id="photo-block__photo-container-styles"
				uniqueId={ uniqueId }
				scrollAfterOpen={ false }
			>
				<div className="dlx-photo-block__container-min-width">
					<SizeResponsiveControl
						label={ __( 'Min Width', 'photo-block' ) }
						values={ containerMinWidth }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMinWidth: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__container-min-height">
					<SizeResponsiveControl
						label={ __( 'Min Height', 'photo-block' ) }
						values={ containerMinHeight }
						screenSize={ deviceType }
						units={ heightUnits }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMinHeight: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__container-max-width">
					<SizeResponsiveControl
						label={ __( 'Max Width', 'photo-block' ) }
						values={ containerMaxWidth }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMaxWidth: newValues } );
						} }
					/>
				</div>
				<div className="dlx-photo-block__containermax-height">
					<SizeResponsiveControl
						label={ __( 'Max Height', 'photo-block' ) }
						values={ containerMaxHeight }
						screenSize={ deviceType }
						units={ heightUnits }
						onValuesChange={ ( newValues ) => {
							setAttributes( { containerMaxHeight: newValues } );
						} }
					/>
				</div>
			</PanelBody>
		</InspectorControls>
	);

	const localToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ <SeparatorHorizontal /> }
					label={ __( 'Caption Position', 'photo-block' ) }
					onClick={ () => {
						setCaptionPositionPopoverVisible( true );
					} }
					ref={ setCaptionPopoverRef }
				>
					{ __( 'Caption Position', 'photo-block' ) }
				</ToolbarButton>
				<ToolbarButton
					icon={ <Trash2 /> }
					label={ __( 'Remove Caption', 'photo-block' ) }
					onClick={ () => {
						setRemoveCaptionModalVisible( true );
					} }
				>
					{ __( 'Remove Caption', 'photo-block' ) }
				</ToolbarButton>
			</ToolbarGroup>
			{
				dataMode && (
					<ToolbarGroup>
						<ToolbarButton
							icon={ <FormInput /> }
							label={ __( 'Caption Data', 'photo-block' ) }
							onClick={ () => {
								setDataModalVisible( true );
							} }
						>
							{ __( 'Caption Data', 'photo-block' ) }
						</ToolbarButton>
					</ToolbarGroup>
				)
			}
			{ dataModalVisible && (
				<Modal
					title={ __( 'Caption Data', 'photo-block' ) }
					onRequestClose={ () => {
						setDataModalVisible( false );
					} }
					className="photo-block__remove-caption-modal"
				>
					<div className="dlx-photo-block__a11y-popover">
						<DataSelect
							attributes={ attributes }
							setAttributes={ setAttributes }
							context={ context }
							prefix="dataCaption"
						/>
						<ButtonGroup>
							<Button
								variant="primary"
								onClick={ () => {
									getCaptionFromData();
									setDataModalVisible( false );
								} }
							>
								{ __( 'Refresh Caption', 'photo-block' ) }
							</Button>
							<Button
								variant="secondary"
								onClick={ () => {
									setDataModalVisible( false );
								} }
							>
								{ __( 'Close', 'photo-block' ) }
							</Button>
						</ButtonGroup>
					</div>
				</Modal>
			) }
			{ captionPositionPopoverVisible && (
				<Popover
					placement="bottom"
					onClose={ () => {
						setCaptionPositionPopoverVisible( false );
					} }
					anchor={ captionPopoverRef }
					className="photo-block__caption-position-popover"
				>
					<MenuGroup>
						<MenuItem
							icon={ 'top' === captionPosition ? <Check /> : null }
							onClick={ () => {
								setCaptionPosition( 'top' );
								setCaptionPositionPopoverVisible( false );
							} }
						>
							{ __( 'Top', 'photo-block' ) }
						</MenuItem>
						<MenuItem
							icon={ 'overlay' === captionPosition ? <Check /> : null }
							onClick={ () => {
								setCaptionPosition( 'overlay' );
								setCaptionPositionPopoverVisible( false );
							} }
						>
							{ __( 'Overlay', 'photo-block' ) }
						</MenuItem>
						<MenuItem
							icon={ 'bottom' === captionPosition ? <Check /> : null }
							onClick={ () => {
								setCaptionPosition( 'bottom' );
								setCaptionPositionPopoverVisible( false );
							} }
						>
							{ __( 'Bottom', 'photo-block' ) }
						</MenuItem>
					</MenuGroup>
				</Popover>
			) }
			{ removeCaptionModalVisible && (
				<Modal
					title={ __( 'Remove Caption', 'photo-block' ) }
					onRequestClose={ () => {
						setRemoveCaptionModalVisible( false );
					} }
					className="photo-block__remove-caption-modal"
				>
					<p>{ __( 'Are you sure you want to remove the caption?', 'photo-block' ) }</p>
					<ButtonGroup>
						<Button
							variant="primary"
							onClick={ () => {
								removeBlocks( clientId );
								setRemoveCaptionModalVisible( false );
							} }
						>
							{ __( 'Remove Caption', 'photo-block' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setRemoveCaptionModalVisible( false );
							} }
						>
							{ __( 'Cancel', 'photo-block' ) }
						</Button>
					</ButtonGroup>
				</Modal>
			) }
		</BlockControls>
	);

	/**
	 * Get a unique ID for the block for inline styling if necessary.
	 */
	useEffect( () => {
		// Set unique ID for block (for styling).
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	const htmlToReactParser = new HtmlToReactParser();

	/**
	 * Get the caption for display.
	 *
	 * @returns {JSX.Element} The caption.
	 */
	const getCaption = () => {
		if ( dataMode ) {
			if ( captionLoading ) {
				return (
					<>
						{ __( 'Loading…', 'photo-block' ) }
						<Spinner />
					</>
				);
			} else if ( '' !== caption ) {
				return htmlToReactParser.parse( caption );
			}
			return __( 'No caption', 'photo-block' );
		}
		return <div { ...innerBlockProps } />;
	};

	const block = (
		<>
			{ localInspectorControls }
			{ localToolbar }
			{ getCaption() }
		</>
	);

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PhotoCaptionBlock;
