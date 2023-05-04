import metadata from './block.json';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import UploaderContext from '../../contexts/UploaderContext';
import Edit from './edit';

const PhotoBlock = ( props ) => {
	const [ imageFile, setImageFile ] = useState( props.attributes.photo ?? null );
	const [ screen, setScreen ] = useState( props.attributes.screen ); // Can be initial, edit, crop, preview, data.
	const [ isUploading, setIsUploading ] = useState( false );
	const [ isProcessingUpload, setIsProcessingUpload ] = useState( false );
	const [ isUploadError, setIsUploadError ] = useState( false );
	const [ filepondInstance, setFilepondInstance ] = useState( null );

	return (
		<UploaderContext.Provider
			value={ {
				imageFile,
				setImageFile,
				screen,
				setScreen,
				isUploading,
				setIsUploading,
				isProcessingUpload,
				setIsProcessingUpload,
				isUploadError,
				setIsUploadError,
				filepondInstance,
				setFilepondInstance,
			} }
		>
			<Edit { ...props } />
		</UploaderContext.Provider>
	);
};

// Import JS

const PhotoBlockIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={ {
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinejoin: 'round',
			strokeMiterlimit: 2,
		} }
		viewBox="0 0 866 866"
	>
		<path
			d="M1336.22 851.626c0 162.564-131.79 294.354-294.35 294.354-162.567 0-294.352-131.79-294.352-294.354 0-162.565 131.785-294.35 294.352-294.35 162.56 0 294.35 131.785 294.35 294.35Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="m716.848 775.416-23.495-5.485c22.958-98.308 87.015-182.793 175.743-231.797l11.663 21.121c-82.76 45.707-142.503 124.495-163.911 216.161Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M708.112 851.626h-24.127c0-27.586 3.152-55.07 9.368-81.695l23.495 5.485c-5.796 24.829-8.736 50.469-8.736 76.21ZM1371.97 990.117l-22.24-9.345c17.18-40.915 25.9-84.367 25.9-129.146 0-11.811-.63-23.705-1.85-35.354l23.99-2.526a361.662 361.662 0 0 1 1.98 37.88c0 48.005-9.34 94.6-27.78 138.491Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M1041.87 1241.84c-215.163 0-390.212-175.05-390.212-390.214 0-165.407 104.783-313.383 260.742-368.216l4.802 13.657C767.03 549.866 666.134 692.352 666.134 851.626c0 207.184 168.553 375.734 375.736 375.734 144.05 0 277.23-84.05 339.3-214.12l13.07 6.23c-64.46 135.08-202.77 222.37-352.37 222.37Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M1041.87 1168.39c-174.663 0-316.761-142.1-316.761-316.764 0-58.162 15.899-115.027 45.983-164.453l8.242 5.019c-29.16 47.912-44.574 103.044-44.574 159.434 0 169.344 137.769 307.104 307.11 307.104 145.26 0 271.79-103.12 300.87-245.208l9.45 1.937c-29.99 146.551-160.5 252.931-310.32 252.931Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M1041.87 438.118c-228.012 0-413.51 185.498-413.51 413.508 0 228.014 185.498 413.504 413.51 413.504 228.01 0 413.51-185.49 413.51-413.504 0-228.01-185.5-413.508-413.51-413.508Zm0 846.132c-238.551 0-432.628-194.07-432.628-432.624C609.242 613.077 803.319 419 1041.87 419c238.55 0 432.62 194.077 432.62 432.626 0 238.554-194.07 432.624-432.62 432.624Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M1041.87 605.808c-135.547 0-245.819 110.273-245.819 245.818 0 135.545 110.272 245.814 245.819 245.814 135.54 0 245.82-110.269 245.82-245.814s-110.28-245.818-245.82-245.818Zm0 506.112c-143.529 0-260.296-116.766-260.296-260.294 0-143.528 116.767-260.294 260.296-260.294 143.53 0 260.29 116.766 260.29 260.294 0 143.528-116.76 260.294-260.29 260.294Z"
			style={ {
				fill: '#fff',
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M1290.38 689.685c0 38.714-31.39 70.098-70.1 70.098-38.71 0-70.1-31.384-70.1-70.098s31.39-70.098 70.1-70.098c38.71 0 70.1 31.384 70.1 70.098ZM1145.61 851.626c0 57.298-46.44 103.747-103.74 103.747-57.299 0-103.748-46.449-103.748-103.747 0-57.297 46.449-103.746 103.748-103.746 57.3 0 103.74 46.449 103.74 103.746Z"
			style={ {
				fill: '#fff',
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
		<path
			d="M1002.57 933.972c0 16.337-13.239 29.581-29.576 29.581-16.338 0-29.581-13.244-29.581-29.581s13.243-29.581 29.581-29.581c16.337 0 29.576 13.244 29.576 29.581ZM1027.28 894.167c0 9.01-7.31 16.313-16.32 16.313-9 0-16.308-7.303-16.308-16.313 0-9.009 7.308-16.312 16.308-16.312 9.01 0 16.32 7.303 16.32 16.312Z"
			style={ {
				fillRule: 'nonzero',
			} }
			transform="translate(-609.242 -419)"
		/>
	</svg>
);

registerBlockType( metadata, {
	icon: PhotoBlockIcon,
	edit: PhotoBlock,

	// Render via PHP
	save() {
		return null;
	},
	transforms: {
		from: [
			{
				type: 'enter',
				regExp: /^photoblock$/,
				transform: () => createBlock( 'dlxplugins/photo-block' ),
			},
		],
		to: [],
	},
} );
