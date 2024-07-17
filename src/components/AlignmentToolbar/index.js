/**
 * Upload data row including Upload|Media Library|URL|Data.
 */
import './editor.scss';

import {
	MenuGroup,
	MenuItem,
	ToolbarGroup,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * MediaLink component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const AlignmentToolbar = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		align,
	} = attributes;

	/**
	 * Retrieve an icon class based on alignment.
	 *
	 * @param {string} alignment Alignment.
	 * @return {string} Icon class.
	 */
	const getIcon = ( alignment ) => {
		switch ( alignment ) {
			case 'none':
			case '':
				return 'align-none';
			case 'full':
				return 'align-full-width';
			default:
				return `align-${ alignment }`;
		}
	};

	return (
		<>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={ getIcon( align ) }
					label={ __( 'Align', 'photo-block' ) }
					className="dlx-photo-block__alignment-dropdown"
				>
					{ ( { onClose } ) => (
						<>
							<MenuGroup className="dlx-photo-block__alignment-dropdown-group">
								<MenuItem
									icon="align-none"
									isSelected={ 'none' === align || '' === align }
									onClick={ () => {
										setAttributes( { align: '' } );
										onClose();
									} }
									iconPosition="left"
									label={ __( 'Align None', 'photo-block' ) }
									role="menuitemradio"
									className={
										classnames( {
											'is-active': 'none' === align || '' === align,
										} )
									}
								>
									{ __( 'None', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon="align-wide"
									isSelected={ 'wide' === align }
									onClick={ () => {
										setAttributes( { align: 'wide' } );
										onClose();
									} }
									iconPosition="left"
									label={ __( 'Align Wide', 'photo-block' ) }
									role="menuitemradio"
									className={
										classnames( {
											'is-active': 'wide' === align,
										} )
									}
								>
									{ __( 'Wide', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon="align-full-width"
									isSelected={ 'full' === align }
									onClick={ () => {
										setAttributes( { align: 'full' } );
										onClose();
									} }
									iconPosition="left"
									label={ __( 'Align Full', 'photo-block' ) }
									role="menuitemradio"
									className={
										classnames( {
											'is-active': 'full' === align,
										} )
									}
								>
									{ __( 'Full', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon="align-left"
									isSelected={ 'left' === align }
									onClick={ () => {
										setAttributes( { align: 'left' } );
										onClose();
									} }
									iconPosition="left"
									label={ __( 'Align Left', 'photo-block' ) }
									role="menuitemradio"
									className={
										classnames( {
											'is-active': 'left' === align,
										} )
									}
								>
									{ __( 'Left', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon="align-center"
									isSelected={ 'center' === align }
									onClick={ () => {
										setAttributes( { align: 'center' } );
										onClose();
									} }
									iconPosition="left"
									label={ __( 'Align Center', 'photo-block' ) }
									role="menuitemradio"
									className={
										classnames( {
											'is-active': 'center' === align,
										} )
									}
								>
									{ __( 'Center', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon="align-right"
									isSelected={ 'right' === align }
									onClick={ () => {
										setAttributes( { align: 'right' } );
										onClose();
									} }
									iconPosition="left"
									label={ __( 'Align Right', 'photo-block' ) }
									role="menuitemradio"
									className={
										classnames( {
											'is-active': 'right' === align,
										} )
									}
								>
									{ __( 'Right', 'photo-block' ) }
								</MenuItem>
							</MenuGroup>
						</>
					) }
				</ToolbarDropdownMenu>
			</ToolbarGroup>
		</>
	);
};
export default AlignmentToolbar;
