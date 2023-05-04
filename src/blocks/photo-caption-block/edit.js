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

import { Trash2, MoveVertical, SeparatorHorizontal, Check } from 'lucide-react';

import { useInstanceId } from '@wordpress/compose';

import UploaderContext from '../../contexts/UploaderContext';

const PhotoCaptionBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( PhotoCaptionBlock, 'photo-caption-block' );
	// Read in context values.
	const {
		hasCaption,
		setHasCaption,
		captionPosition,
		setCaptionPosition,
	} = useContext( UploaderContext );

	const [ captionPositionPopoverVisible, setCaptionPositionPopoverVisible ] = useState( false );
	const [ captionPopoverRef, setCaptionPopoverRef ] = useState( null );
	const [ removeCaptionModalVisible, setRemoveCaptionModalVisible ] = useState( false );

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


	const blockProps = useBlockProps( {
		className: classnames(
			`dlx-photo-caption-block`,
		),
	} );

	const { attributes, setAttributes, clientId } = props;

	const {
		uniqueId,
		captionPosition: blockCaptionPosition,

	} = attributes;

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Caption Block Settings', 'photo-block' ) }>
				settings go here.
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
			{ captionPositionPopoverVisible && (
				<Popover
					position="bottom center"
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

	const block = (
		<>
			{ localInspectorControls }
			{ localToolbar }
			<div { ...innerBlockProps } />
		</>
	);

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PhotoCaptionBlock;
