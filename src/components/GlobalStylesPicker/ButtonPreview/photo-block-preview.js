
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';
import getStyles from '../../../blocks/photo-block/block-styles';
import getCaptionStyles from '../../../blocks/photo-caption-block/block-styles';
import { blockStore } from '../../../store';
import CaptionBlockPreview from './caption-block-preview';
import globalStylesStore from '../../../store/global-styles';

const PhotoBlockPreview = ( { globalStyle, photoAttributes, captionAttributes, uniqueId } ) => {
	if ( 'undefined' === typeof photoAttributes ) {
		return null;
	}
	let styles = getStyles( photoAttributes, 'desktop', 'photo-block-preview' );
	styles += getCaptionStyles( captionAttributes, 'desktop', 'photo-block-preview' );
	styles += `
		#photo-block-preview .dlx-photo-block__screen-edit-image-wrapper {
			padding: 16px;
		}
		#photo-block-preview .dlx-photo-block__screen-edit-image-inner {
			min-width: 250px;
			max-width: 250px;
			max-height: 250px;
		}
		#photo-block-preview .dlx-photo-block__image-wrapper {
			min-width: 250px;
			max-width: 250px;
			max-height: 250px;
		}
	`;
	const {
		cssGramFilter,
		photoDropShadow,
	} = photoAttributes;

	const {
		captionPosition,
	} = captionAttributes;

	const {
		imageData,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore( uniqueId ) ).getImageData(),
		};
	} );

	const { globalStyleCSSClassName } = useSelect( ( newSelect ) => {
		const maybeGlobalStyle = newSelect( globalStylesStore ).getGlobalStyleBySlug( globalStyle );
		if ( Object.keys( maybeGlobalStyle ).length === 0 ) {
			return '';
		}
		return {
			globalStyleCSSClassName: maybeGlobalStyle.css_class,
		};
	} );

	/**
	 * Return an image URL. If in data mode, use a placeholder image.
	 *
	 * @return {string} Image URL.
	 */
	const getImageUrl = () => {
		const { url, id } = imageData;
		if ( ! url || 0 === id ) {
			const defaultImageUrl = photoBlock.defaultImagePlacheolder;
			return defaultImageUrl;
		}
		return url;
	};

	const classes = classnames( 'photo-block-preview dlx-photo-block', {
		'dlx-has-drop-shadow': photoDropShadow.enabled,
	} );

	const photoImg = (
		<img
			src={ getImageUrl() }
			className={ classnames(
				`photo-block-${ cssGramFilter } dlx-photo-block__image`,
				{
					'has-css-gram': cssGramFilter !== 'none',
				}
			) }
			alt=""
			style={ {
				maxWidth: `100%`,
				height: 'auto',
			} }
			width={ imageData.width }
			height={ imageData.height }
		/>
	);

	return (
		<>
			<style>{ styles }</style>
			<div className={ classes } id="photo-block-preview">
				<figure className={ `dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure ${ globalStyleCSSClassName }` }>
					{ 'top' === captionPosition && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
						>
							<CaptionBlockPreview
								photoAttributes={ photoAttributes }
								captionAttributes={ captionAttributes }
								uniqueId={ 'photo-block-preview' }
							/>
						</div>
					) }
					{ 'top' === captionPosition && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
						>
							<CaptionBlockPreview
								photoAttributes={ photoAttributes }
								captionAttributes={ captionAttributes }
								uniqueId={ 'photo-block-preview' }
							/>
						</div>
					) }
					<div className="dlx-photo-block__screen-edit-image dlx-photo-block__image-wrapper">
						<div className="dlx-photo-block__screen-edit-image-inner">
							{ photoImg }
							{ 'overlay' === captionPosition && (
								<div
									className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption dlx-photo-block__caption--overlay"
								>
									<CaptionBlockPreview
										photoAttributes={ photoAttributes }
										captionAttributes={ captionAttributes }
										uniqueId={ 'photo-block-preview' }
									/>
								</div>
							) }
						</div>
					</div>
					{ 'bottom' === captionPosition && (
						<div
							className="dlx-photo-block__screen-edit-caption dlx-photo-block__caption"
						>
							<CaptionBlockPreview
								photoAttributes={ photoAttributes }
								captionAttributes={ captionAttributes }
								uniqueId={ 'photo-block-preview' }
							/>
						</div>
					) }
				</figure>
			</div>
		</>
	);
};
export default PhotoBlockPreview;
