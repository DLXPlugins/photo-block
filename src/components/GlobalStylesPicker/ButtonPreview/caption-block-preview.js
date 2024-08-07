
import classnames from 'classnames';
import getStyles from '../../../blocks/photo-caption-block/block-styles'
const CaptionBlockPreview = ( { photoAttributes, captionAttributes, uniqueId } ) => {
	const {
		mode,
		captionPosition,
		overlayBackgroundType,
		overlayDisplayAnimation,
		overlayDisplayOnHover,
		photoMode,
		overlayHorizontalPosition,
		overlayVerticalPosition,
		overlayCaptionHorizontalPosition,
		overlayCaptionVerticalPosition,
		captionAlign,
	} = captionAttributes;

	/**
	 * Get the caption for display.
	 *
	 * @return {JSX.Element} The caption.
	 */
	const getCaption = () => {
		const figClasses = classnames( `dlx-photo-block__caption align${ captionAlign }`, {
			'has-smart-styles': ( 'advanced' === mode && 'data' !== photoMode && 'featuredImage' !== photoMode ),
		} );

		return (
			<figcaption id={ 'photo-block-preview' } className={ figClasses }>This is a sample caption</figcaption>
		);
	};

	const overlayStyles = classnames(
		'dlx-photo-block__caption-wrapper',
		`overlay-type-${ overlayBackgroundType }`,
		{
			'is-overlay': 'overlay' === captionPosition,
			'overlay-vertical-bottom': 'bottom' === overlayVerticalPosition,
			'overlay-vertical-middle': 'middle' === overlayVerticalPosition,
			'overlay-vertical-top': 'top' === overlayVerticalPosition,
			'overlay-horizontal-left': 'left' === overlayHorizontalPosition,
			'overlay-horizontal-center': 'center' === overlayHorizontalPosition,
			'overlay-horizontal-right': 'right' === overlayHorizontalPosition,
			'caption-vertical-bottom': 'bottom' === overlayCaptionVerticalPosition,
			'caption-vertical-middle': 'middle' === overlayCaptionVerticalPosition,
			'caption-vertical-top': 'top' === overlayCaptionVerticalPosition,
			'caption-horizontal-left': 'left' === overlayCaptionHorizontalPosition,
			'caption-horizontal-center': 'center' === overlayCaptionHorizontalPosition,
			'caption-horizontal-right': 'right' === overlayCaptionHorizontalPosition,
			'overlay-display-hover': 'overlay' === captionPosition && overlayDisplayOnHover,
			'overlay-slide-down': overlayDisplayAnimation === 'slide-down',
			'overlay-slide-up': overlayDisplayAnimation === 'slide-up',
			'overlay-slide-left': overlayDisplayAnimation === 'slide-left',
			'overlay-slide-right': overlayDisplayAnimation === 'slide-right',
			'dlx-photo-block__caption-overlay': 'overlay' === captionPosition,
		}
	);

	const styles = getStyles( captionAttributes, 'desktop', 'photo-block-preview' );	
	return (
		<>
			<style>
				{ styles }
			</style>
			<div
				className={ overlayStyles }
				id="photo-block-preview"
			>
				{ getCaption() }
			</div>
		</>
	);
};
export default CaptionBlockPreview;
