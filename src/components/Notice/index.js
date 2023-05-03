// eslint-disable-next-line no-unused-vars
import './editor.scss';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { speak } from '@wordpress/a11y';
import { Notice as WPNotice } from '@wordpress/components';
import classNames from 'classnames';

const Notice = ( props ) => {
	const { message, status, politeness, icon, className, inline, children, animate, animationType } = props;

	useEffect( () => {
		speak( message, politeness );
	}, [ message, status, politeness ] );

	const hasIcon = () => {
		return icon !== null;
	};
	const getIcon = ( Icon ) => {
		return <Icon width={ 16 } height={ 16 } fill="#6c757d" />;
	};

	const containerClasses = classNames( className, 'photo-block-admin__notice', {
		'photo-block-admin__notice--photo-block-icon': hasIcon(),
		[ `photo-block-admin__notice-type--${ status }` ]: true,
		[ `photo-block-admin__notice-appearance--inline` ]: inline,
		[ `photo-block-admin__notice-appearance--block` ]: ! inline,
		[ `photo-block-admin__notice-animate` ]: animate,
		[ `photo-block-admin__notice-animate--${ animationType }` ]: animate,

	} );
	return (
		<div className={ containerClasses }>
			<WPNotice isDismissible={ false } spokenMessage={ message } actions={ [] } { ...props }>
				{ hasIcon() &&
					<div className="photo-block-admin__notice-icon">{ getIcon( icon ) }</div>
				}
				<div className="photo-block-admin__notice-message"><>{ message } { children } </></div>
			</WPNotice>
		</div>
	);
};

Notice.defaultProps = {
	message: '',
	status: 'info',
	politeness: 'polite',
	icon: null,
	className: '',
	inline: false,
	animate: false,
	animationType: 'fadein',
};

Notice.propTypes = {
	message: PropTypes.string.isRequired,
	status: PropTypes.oneOf( [ 'info', 'warning', 'success', 'error' ] ),
	politeness: PropTypes.oneOf( [ 'assertive', 'polite' ] ),
	icon: PropTypes.elementType,
	className: PropTypes.string,
	inline: PropTypes.bool,
	animate: PropTypes.bool,
	animatitionType: PropTypes.oneOf( [ 'fadein', 'fadeout' ] ),
};

export default Notice;
