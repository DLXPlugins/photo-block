import './editor.scss';
import { useState } from '@wordpress/element';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import { Button, TextControl, PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { ArrowBigLeftDash } from 'lucide-react';
import classnames from 'classnames';
import { useSelect, useDispatch } from '@wordpress/data';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { blockStore } from '../../store';
import settingsStore from '../../store/settings';
import ScreenshotOneMark from '../../components/Icons/ScreenshotOneMark';
import ScreenshotOneText from '../../components/Icons/ScreenshotOneText';
/**
 * ScreenshotOne component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const ScreenshotOne = ( props ) => {
	const { blockUniqueId, clientId } = props;

	const {
		setScreen,
	} = useDispatch( blockStore( blockUniqueId ) );

	const {
		getSetting,
	} = useSelect( settingsStore );

	const { control, handleSubmit } = useForm( {
		defaultValues: {
			screenshotOneUrl: '',
			screenshotOneAPIValid: getSetting( 'screenshotOneAPIValid' ),
			screenshotOneEnableSignedRequests: getSetting( 'screenshotOneEnableSignedRequests' ),
			screenshotOneDefaultImageFormat: getSetting( 'screenshotOneDefaultImageFormat' ),
			screenshotOneEnableAnimatedScreenshots: getSetting( 'screenshotOneEnableAnimatedScreenshots' ),
			screenshotOneMaxImageWidth: getSetting( 'screenshotOneMaxImageWidth' ),
			screenshotOneMaxImageHeight: getSetting( 'screenshotOneMaxImageHeight' ),
			screenshotOneViewportWidth: getSetting( 'screenshotOneViewportWidth' ),
			screenshotOneViewportHeight: getSetting( 'screenshotOneViewportHeight' ),
			screenshotOneBlockCookieBanners: getSetting( 'screenshotOneBlockCookieBanners' ),
			screenshotOneBlockAds: getSetting( 'screenshotOneBlockAds' ),
		},
	} );

	const formValues = useWatch( { control } );

	const onSubmit = ( formValues ) => {
		console.log( formValues );
	};

	const screenshotOneInterface = (
		<>
			<div className="dlx-photo-block__screen-initial">
				<form onSubmit={ handleSubmit( onSubmit ) }>
					<div className="dlx-photo-block__screenshot-one__container block-editor-block-inspector">
						<div className="dlx-photo-block__screenshot-one__logo">
							<ScreenshotOneMark className="dlx-photo-block__screenshot-one__logo__mark" />
							<ScreenshotOneText className="dlx-photo-block__screenshot-one__logo__text" />
						</div>
						<div className="dlx-photo-block__panel-row">
							<Controller
								control={ control }
								name="screenshotOneUrl"
								render={ ( { field } ) => (
									<TextControl
										label={ __( 'Add Screenshot URL', 'photo-block' ) }
										type="url"
										help={ __( 'Add a screenshot URL to generate a screenshot.', 'photo-block' ) }
										name="search-url"
										{ ...field }
									/>
								) }
							/>
						</div>
						<div className="dlx-photo-block__panel-row">
							<PanelBody title={ __( 'Advanced', 'photo-block' ) } initialOpen={ false }>
								<div className="dlx-photo-block__panel-advanced">
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneDefaultImageFormat"
											render={ ( { field } ) => (
												<SelectControl
													label={ __( 'Select Image Format', 'photo-block' ) }
													options={ [
														{ value: 'jpg', label: 'JPEG' },
														{ value: 'png', label: 'PNG' },
														{ value: 'webp', label: 'WebP' },
													] }
													{ ...field }
												/>
											) }
										/>
									</div>
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneMaxImageWidth"
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Max Image Width', 'photo-block' ) }
													{ ...field }
													type="number"
												/>
											) }
										/>
									</div>
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneMaxImageHeight"
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Max Image Height', 'photo-block' ) }
													{ ...field }
													type="number"
												/>
											) }
										/>
									</div>
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneViewportWidth"
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Viewport Width', 'photo-block' ) }
													{ ...field }
													type="number"
												/>
											) }
										/>
									</div>
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneViewportHeight"
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Viewport Height', 'photo-block' ) }
													{ ...field }
													type="number"
												/>
											) }
										/>
									</div>
								</div>
								<div className="dlx-photo-block__panel-toggles">
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneBlockCookieBanners"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Block Cookie Banners', 'photo-block' ) }
													{ ...field }
													checked={ field.value }
												/>
											) }
										/>
									</div>
									<div className="dlx-photo-block__panel-row">
										<Controller
											control={ control }
											name="screenshotOneBlockAds"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Block Ads', 'photo-block' ) }
													{ ...field }
													checked={ field.value }
												/>
											) }
										/>
									</div>
								</div>
							</PanelBody>
						</div>
					</div>
					<div className="dlx-photo-block__screenshot-one__actions">
						<Button
							variant="secondary"
							icon={ <ArrowBigLeftDash /> }
							className="dlx-photo-block__screenshot-one__actions__back"
							onClick={ () => {
								setScreen( 'initial' );
							} }
						>
							{ __( 'Back', 'photo-block' ) }
						</Button>
						<Button
							variant="primary"
							className="dlx-photo-block__screenshot-one__actions__generate"
							onClick={ () => {
								// todo: generate
							} }
							type="submit"
							iconPosition="right"
							icon={ <ScreenshotOneMark /> }
						>
							{ __( 'Generate', 'photo-block' ) }
						</Button>
					</div>
				</form>
			</div>
		</>
	);

	return (
		<>
			{ screenshotOneInterface }
		</>
	);
};
export default ScreenshotOne;
