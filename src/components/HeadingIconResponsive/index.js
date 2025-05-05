import './editor.scss';

import {
	Monitor,
	Tablet,
	Smartphone,

} from 'lucide-react';
import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button } from '@wordpress/components';
import classnames from 'classnames';
import useDeviceType from '../../hooks/useDeviceType';

const HeadingIconResponsive = ( props ) => {
	const { screenSize, heading } = props;
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	// Retrieve an icon based on the screen size.
	const getIcon = () => {
		switch ( screenSize ) {
			case 'mobile':
				return <Smartphone />;
			case 'tablet':
				return <Tablet />;
			case 'desktop':
				return <Monitor />;
		}
	};

	return (
		<div className="dlx-photo-block__heading-icon-responsive-wrapper">
			<h3 className="dlx-photo-block__heading-icon-responsive">
				<span className="dlx-photo-block__heading-icon">{ getIcon() }</span>
				<span className="dlx-photo-block__heading">{ heading }</span>
			</h3>
			<div className="dlx-photo-block__heading-icon-responsive-icons">
				<ButtonGroup>
					<Button
						className={ classnames( 'dlx-photo-block__heading-icon-responsive-icon', {
							'is-active': deviceType === 'desktop',
						} ) }
						onClick={ () => setDeviceType( 'Desktop' ) }
						icon={ <Monitor /> }
						label={ __( 'Desktop', 'deluxe-photo-gallery' ) }
					/>
					<Button
						className={ classnames( 'dlx-photo-block__heading-icon-responsive-icon', {
							'is-active': deviceType === 'tablet',
						} ) }
						onClick={ () => setDeviceType( 'Tablet' ) }
						icon={ <Tablet /> }
						label={ __( 'Tablet', 'deluxe-photo-gallery' ) }
					/>
					<Button
						className={ classnames( 'dlx-photo-block__heading-icon-responsive-icon', {
							'is-active': deviceType === 'mobile',
						} ) }
						onClick={ () => setDeviceType( 'Mobile' ) }
						icon={ <Smartphone /> }
						label={ __( 'Mobile', 'deluxe-photo-gallery' ) }
					/>
				</ButtonGroup>
			</div>
		</div>
	);
};
export default HeadingIconResponsive;
