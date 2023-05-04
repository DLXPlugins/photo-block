import './editor.scss';

import {
	useContext,
	useState,
	useEffect,
	forwardRef,
} from '@wordpress/element';
import { Spinner, ToolbarGroup, ToolbarButton, Popover, TabPanel, TextControl, TextareaControl, PanelBody, PanelRow } from '@wordpress/components';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Crop, Image, Accessibility, Link, Settings, Paintbrush } from 'lucide-react';

import UploaderContext from '../../contexts/UploaderContext';

const EditScreen = forwardRef( ( props, ref ) => {
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );
	const [ a11yButton, setA11yButton ] = useState( null );
	const [ a11yPopover, setA11yPopover ] = useState( null );
	const [ inspectorTab, setInspectorTab ] = useState( 'settings' ); // Can be settings|styles.

	const { screen, setScreen } =
		useContext( UploaderContext );

	// Set settings inspector Controls.
	const settingsInspectorControls = (
		<>
			<PanelBody title={ __( 'Image Settings', 'photo-block' ) }>
				<PanelRow>
					<TextControl
						label={ __( 'Image Title', 'photo-block' ) }
						value={ photo.title }
						onChange={ ( title ) => {
							setAttributes( { photo: { ...photo, title } } );
						} }
						placeholder={ __( 'Please enter a title for this image.', 'photo-block' ) }
					/>
				</PanelRow>
				<PanelRow>
					<TextareaControl
						label={ __( 'Alt Text', 'photo-block' ) }
						value={ photo.alt }
						onChange={ ( alt ) => {
							setAttributes( { photo: { ...photo, alt } } );
						} }
						placeholder={ __( 'Please describe this image.', 'photo-block' ) }
						help={ __( 'Alt text provides a description of the image for screen readers and search engines.', 'photo-block' ) }
					/>
				</PanelRow>
			</PanelBody>
		</>
	);

	const stylesInspectorControls = (
		<>
			styles go here
		</>
	);

	const interfaceTabs = (
		<TabPanel
			className="dlx-photo-block__inspector-tabs"
			activeClass="active-tab"
			onSelect={ ( tab ) => {
				setInspectorTab( tab );
			} }
			children={ () => ( <></> ) }
			tabs={ [
				{
					name: 'settings',
					title: __( 'Settings', 'photo-block' ),
					className: 'dlx-photo-block__inspector-tab',
					icon: <Settings />,
				},
				{
					name: 'styles',
					title: __( 'Styles', 'photo-block' ),
					className: 'dlx-photo-block__inspector-tab',
					icon: <Paintbrush />,
				},
			] }
		/>
	);

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			{ interfaceTabs }
			{ inspectorTab === 'settings' && settingsInspectorControls }
			{ inspectorTab === 'styles' && stylesInspectorControls }
		</InspectorControls>
	);

	const localToolbar = (
		<>
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
						{ __( 'Replace Photo', 'photo-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <Accessibility /> }
						label={ __( 'Set Accessibility Options', 'photo-block' ) }
						onClick={ () => {
							setA11yPopover( ! a11yPopover );
						} }
						ref={ setA11yButton }
					/>
					<ToolbarButton
						icon={ <Link /> }
						label={ __( 'Set Link Options', 'photo-block' ) }
						onClick={ () => {} }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ a11yPopover && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setA11yPopover( false );
					} }
					anchor={ a11yButton }
				>
					<div className="dlx-photo-block__a11y-popover">
						<h3>{ __( 'Accessibility Options', 'photo-block' ) }</h3>
						<TextareaControl
							label={ __( 'Alt Text', 'photo-block' ) }
							value={ photo.alt }
							onChange={ ( alt ) => {
								setAttributes( { photo: { ...photo, alt } } );
							} }
							placeholder={ __( 'Please describe this image.', 'photo-block' ) }
							help={ __( 'Alt text provides a description of the image for screen readers and search engines.', 'photo-block' ) }
						/>
					</div>
				</Popover>
			) }
		</>
	);

	return (
		<>
			{ localInspectorControls }
			{ localToolbar }
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
