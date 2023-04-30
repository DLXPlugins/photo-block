import './editor.scss';

import { useContext, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import UploaderContext from '../../contexts/UploaderContext';



const EditScreen = ( props ) => {
	const { attributes, setAttributes } = props;
	const { photo } = attributes;
	const { url, id, width, height } = photo;
	const [ imageLoading, setImageLoading ] = useState( true );
	return (
		<>
			<div className="dlx-photo-block__screen-edit">
				{
					imageLoading && (
						<div className="dlx-photo-block__screen-edit-spinner"><Spinner /></div>
					)
				}
				<img src={ url } width={ width } height={ height } alt="" onLoad={ () => {
					setImageLoading( false );
				}} />
			</div>
		</>
	);
};
export default EditScreen;
