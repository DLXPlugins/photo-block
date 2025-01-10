import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/editor';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { useForm, Controller, useWatch } from 'react-hook-form';
import apiRequest from '@wordpress/api-fetch';
import PhotoBlockIcon from '../../components/Icons/PhotoBlockIcon';
import { __ } from '@wordpress/i18n';

// Make sure the user has the capability to modify settings.
const canModifySettings = photoBlockUser.canModifySettings;
if ( canModifySettings ) {
	registerPlugin( 'photo-block-settings', {
		render: () => {
			const { control, setValue, getValues, handleSubmit } = useForm( { // eslint-disable-line react-hooks/rules-of-hooks
				defaultValues: {
					hideCaptionAppender: photoBlock.hideCaptionAppender,
				},
			} );

			const formData = useWatch( { // eslint-disable-line react-hooks/rules-of-hooks
				control,
			} );

			/**
			 * Save the option to the database.
			 */
			const saveOptions = async() => {
				const response = await apiRequest( {
					path: '/wp/v2/settings',
					method: 'POST',
					data: {
						photo_block_options: JSON.stringify( getValues() ),
					},
					headers: {
						'X-WP-Nonce': photoBlockUser.restNonce,
					},
				} );
				console.log( response );
			};

			const onSubmit = ( data ) => {
				saveOptions( data );
			};
			return (
				<PluginSidebar
					name="photo-block-settings"
					title={ __( 'Photo Block Settings', 'photo-block' ) }
					icon={ PhotoBlockIcon }
				>
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<PanelBody
							title={ __( 'Settings', 'photo-block' ) }
						>
							<Controller
								control={ control }
								name="hideCaptionAppender"
								render={ ( { field } ) => (
									<ToggleControl
										label={ __( 'Hide Caption Appender by Default', 'photo-block' ) }
										checked={ field.value }
										onChange={ ( value ) => {
											console.log( value );
											field.onChange( value );
											saveOptions();
										} }
										help={ __( 'If hidden, you can still show the caption by enabling it in the block toolbar.', 'photo-block' ) }
									/>
								) }
							/>
						</PanelBody>
					</form>
				</PluginSidebar>
			);
		},
	} );
}

