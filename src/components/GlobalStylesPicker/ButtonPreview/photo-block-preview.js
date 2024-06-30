
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';
import getStyles from '../../../blocks/photo-block/block-styles';
import blockStore from '../../../store';
import CaptionBlockPreview from './caption-block-preview';
const PhotoBlockPreview = ( { photoAttributes, captionAttributes, uniqueId } ) => {
	if ( 'undefined' === typeof photoAttributes ) {
		return null;
	}
	const styles = getStyles( photoAttributes, 'desktop', 'photo-block-preview' );

	const {
		captionPosition,
		cssGramFilter,
	} = photoAttributes;

	const {
		imageData,
	} = useSelect( ( select ) => {
		return {
			imageData: select( blockStore( uniqueId ) ).getImageData(),
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

	return (
		<>
			<style>{ styles }</style>
			<div className="dlx-photo-block__screen-edit" id="photo-block-preview">
				<figure className="dlx-photo-block__screen-edit-image-wrapper dlx-photo-block__figure">
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
						/>
						{ 'overlay' === captionPosition && (
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
