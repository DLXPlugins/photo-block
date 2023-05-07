/**
 * Unit Picker Component.
 * Credit: Forked from @GenerateBlocks
 */
import React from 'react';

import { __, sprintf, _x } from '@wordpress/i18n';
import './editor.scss';

import { ButtonGroup, Button, Tooltip } from '@wordpress/components';
import classnames from 'classnames';

const UnitPicker = ( props ) => {
	const { label, value, onClick, units } = props;

	return (
		<div className={ `components-photo-block-units-control-header__units ${ props?.className }` }>
			<div className="components-photo-block-control__units">
				<ButtonGroup
					className="components-photo-block-control-buttons__units"
					aria-label={ __( 'Select Units', 'photo-block' ) }
				>
					{ units.map( ( unit ) => {
						let unitName = unit;

						if ( 'px' === unit ) {
							unitName = _x(
								'Pixel',
								'A size unit for CSS markup',
								'photo-block'
							);
						}

						if ( 'em' === unit ) {
							unitName = _x(
								'Em',
								'A size unit for CSS markup',
								'photo-block'
							);
						}

						if ( '%' === unit ) {
							unitName = _x(
								'Percentage',
								'A size unit for CSS markup',
								'photo-block'
							);
						}

						if ( 'vw' === unit ) {
							unitName = _x(
								'View Width',
								'A size unit for CSS markup',
								'photo-block'
							);
						}

						if ( 'rem' === unit ) {
							unitName = _x(
								'Rem',
								'A size unit for CSS markup',
								'photo-block'
							);
						}

						if ( 'deg' === unit ) {
							unitName = _x(
								'Degree',
								'A size unit for CSS markup',
								'photo-block'
							);
						}

						return (
							<Tooltip
								text={ sprintf(
									/* translators: Unit type (px, em, %) */
									__( '%s Units', 'photo-block' ),
									unitName
								) }
								key={ unit }
							>
								<Button
									key={ unit }
									className={ 'components-photo-block-control-button__units--' + unit }
									isSmall
									variant={ value === unit ? 'primary' : 'secondary'}
									aria-pressed={ value === unit }
									aria-label={ sprintf(
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										__( '%s Units', 'photo-block' ),
										unitName
									) }
									onClick={ () => onClick( unit ) }
								>
									{ unit }
								</Button>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</div>
	);
};

export default UnitPicker;
