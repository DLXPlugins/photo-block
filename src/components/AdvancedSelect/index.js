import './editor.scss';
/**
 * External dependencies
 */
import React, { useState, useEffect, createRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { UP, DOWN, ENTER, TAB } from '@wordpress/keycodes';
import { speak } from '@wordpress/a11y';
import {
	Button,
	Spinner,
	TextControl,
	BaseControl,
} from '@wordpress/components';
import { useInstanceId, useDebounce } from '@wordpress/compose';
import { isURL, filterURLForDisplay } from '@wordpress/url';

import {
	Search,
	CornerDownLeft,
	X,

} from 'lucide-react';

import SendCommand from '../../utils/SendCommand';

/**
 * Content Picker for post type data.
 *
 * @param {Object} props Incoming props.
 *
 * @return {React.Component} AdvancedSelectControl component.
 */
const AdvancedSelectControl = ( props ) => {
	/**
	 * Create Refs for inputs.
	 */
	const inputRef = createRef();

	const restEndPoint = props.restEndpoint;
	const restNonce = props.restNonce;
	const children = props.children;
	const params = props.params;
	const acceptDirectInput = props.acceptDirectInput;
	const currentSelectedSuggestion = props.currentSelectedSuggestion;

	/**
	 * Set Unique Instance ID.
	 */
	const generatedUniqueId = useInstanceId( AdvancedSelectControl, 'photo-block' );

	/**
	 * Set State.
	 */
	const [ suggestions, setSuggestions ] = useState( [] );
	const [ showSuggestions, setShowSuggestions ] = useState( false );
	const [ isUpdatingSuggestions, setIsUpdatingSuggestions ] = useState( false );
	const [ currentSuggestionRequest, setCurrentSuggestionRequest ] =
		useState( null );
	const [ selectedSuggestion, setSelectedSuggestion ] = useState( null );
	const [ currentSuggestion, setCurrentSuggestion ] = useState( null );
	const [ selectedSuggestionIndex, setSelectedSuggestionIndex ] = useState( null );
	const [ suggestionListboxId, setSuggestionListboxId ] = useState( '' );
	const [ suggestionValue, setSuggestionValue ] = useState( '' );
	const [ savedSuggestionValue, setSavedSuggestionValue ] = useState( props.savedValue );
	const [ uniqueInstanceId, setUniqueInstanceId ] = useState(
		`post-search-control-${ generatedUniqueId }`
	);
	const [ loading, setLoading ] = useState( false );
	const [ dataType, setDataType ] = useState( 'post' ); // Can be post, custom.

	/**
	 * Debounceing for delay.
	 */
	const debouncedRequest = useDebounce( ( value ) => {
		updateSuggestions( value );
	}, 200 );

	/**
	 * Effect.
	 */
	useEffect( () => {
		/**
		 * Run once. Set the suggestion value and current suggestion to saved value, then reset saved value.
		 */
		if ( '' !== savedSuggestionValue ) {
			setSuggestionValue( savedSuggestionValue );
			const newSuggestion = {
				permalink: savedSuggestionValue,
				label: filterURLForDisplay( savedSuggestionValue ),
				slug: '',
				value: '',
			};
			setSavedSuggestionValue( '' );
			setCurrentSuggestion( newSuggestion );
			return;
		}
		if ( '' !== suggestionValue ) {
			debouncedRequest( suggestionValue );
		}
	}, [ suggestionValue ] );

	/**
	 * Set up effect for getting the selected suggestion and displaying it.
	 */
	useEffect( () => {
		if ( false !== currentSelectedSuggestion ) {
			setCurrentSuggestion( currentSelectedSuggestion );
			setShowSuggestions( false );
		}
	}, [ currentSelectedSuggestion ] );

	/**
	 * Set Focus to input.
	 */
	useEffect( () => {
		if ( inputRef.current && props.hasInititialFocus ) {
			inputRef.current.focus();
		}
	}, [ inputRef ] );

	/**
	 * Set the current input.
	 *
	 * @param {string} newValue The value of the input.
	 */
	const onChange = ( newValue ) => {
		setSuggestionValue( newValue );
	};

	/**
	 * Search when focus and no results are present.
	 *
	 * @param {event} event Focus event.
	 */
	const onFocus = ( event ) => {
		event.preventDefault();
		if ( null === selectedSuggestion ) {
			debouncedRequest( suggestionValue );
		}
	};

	/**
	 * Perform keydown functions such as selecting the next items in a list.
	 *
	 * @param {event} event Keydown event.
	 *
	 * @return {void} Return nothing.
	 */
	const onKeyDown = ( event ) => {
		// If the suggestions are not shown or loading, we shouldn't handle the arrow keys
		// We shouldn't preventDefault to allow block arrow keys navigation.
		if ( ( ! showSuggestions && ! suggestions.length ) || loading ) {
			// In the Windows version of Firefox the up and down arrows don't move the caret
			// within an input field like they do for Mac Firefox/Chrome/Safari. This causes
			// a form of focus trapping that is disruptive to the user experience. This disruption
			// only happens if the caret is not in the first or last position in the text input.
			// See: https://github.com/WordPress/gutenberg/issues/5693#issuecomment-436684747
			switch ( event.keyCode ) {
				// When UP is pressed, if the caret is at the start of the text, move it to the 0
				// position.
				case UP: {
					if ( 0 !== event.target.selectionStart ) {
						event.preventDefault();

						// Set the input caret to position 0.
						event.target.setSelectionRange( 0, 0 );
					}
					break;
				}
				// When DOWN is pressed, if the caret is not at the end of the text, move it to the
				// last position.
				case DOWN: {
					if (
						suggestionValue !== event.target.selectionStart
					) {
						event.preventDefault();

						// Set the input caret to the last position.
						event.target.setSelectionRange(
							suggestionValue.length,
							suggestionValue.length
						);
					}
					break;
				}

				// Submitting while loading should trigger onSubmit.
				case ENTER: {
					event.preventDefault();

					// If direct input is allowed, we should add the value as the current suggestion.
					if ( acceptDirectInput && '' !== suggestionValue ) {
						setCurrentSuggestion( suggestionValue );
						setShowSuggestions( false );
						props.onItemSelect( event, suggestionValue );
					} else {
						debouncedRequest( event.target.value );
					}
					break;
				}
				case TAB: {
					// If direct input is allowed, we should add the value as the current suggestion.
					if ( acceptDirectInput && '' !== suggestionValue ) {
						setCurrentSuggestion( suggestionValue );
						setShowSuggestions( false );
						props.onItemSelect( event, suggestionValue );
					}
					break;
				}
			}

			return null;
		}

		switch ( event.keyCode ) {
			case UP: {
				event.preventDefault();
				const previousIndex = ! selectedSuggestionIndex
					? suggestions.length - 1
					: selectedSuggestionIndex - 1;
				setSelectedSuggestionIndex( previousIndex );
				setSelectedSuggestion( suggestions[ previousIndex ].value );
				break;
			}
			case DOWN: {
				event.preventDefault();
				if ( ! showSuggestions && suggestions.length > 0 ) {
					setShowSuggestions( true );
					setSelectedSuggestionIndex( 0 );
					setSelectedSuggestion( suggestions[ 0 ].value );
					return;
				}
				const nextIndex =
					selectedSuggestion === null ||
					selectedSuggestionIndex === suggestions.length - 1
						? 0
						: selectedSuggestionIndex + 1;
				setSelectedSuggestionIndex( nextIndex );
				setSelectedSuggestion( suggestions[ nextIndex ].value );
				break;
			}
			case TAB: {
				// If direct input is allowed, we should add the value as the current suggestion.
				if ( acceptDirectInput && '' !== suggestionValue ) {
					setCurrentSuggestion( suggestionValue );
					setShowSuggestions( false );
					props.onItemSelect( event, suggestionValue );
				}
				break;
			}
			case ENTER: {
				event.preventDefault();
				if ( acceptDirectInput && '' !== suggestionValue ) {
					setCurrentSuggestion( suggestionValue );
					setShowSuggestions( false );
					props.onItemSelect( event, suggestionValue );
				}
				break;
			}
		}
	};

	/**
	 * Get the current suggestion and output the label.
	 *
	 * @param {string} value The current download ID.
	 *
	 * @return {Object} The suggestion label.
	 */
	const getSuggestion = ( value ) => {
		const foundSuggestion = suggestions.find(
			( suggestion ) => suggestion.value === value
		);
		if ( null === foundSuggestion || undefined === foundSuggestion ) {
			return null;
		}
		return foundSuggestion;
	};

	/**
	 * Requests a new suggestion.
	 *
	 * @param {string} value Value to search for.
	 */
	const updateSuggestions = ( value = '' ) => {
		// Initial suggestions may only show if there is no value
		// (note: this includes whitespace).
		const isInitialSuggestions = ! value?.length;

		value = value.toString();

		// Trim only now we've determined whether or not it originally had a "length"
		// (even if that value was all whitespace).
		value = value.trim();

		setIsUpdatingSuggestions( true );
		setSelectedSuggestion( null );
		setLoading( true );

		const abortController = new AbortController();
		if ( null !== currentSuggestionRequest ) {
			currentSuggestionRequest.abort();
		}
		setCurrentSuggestionRequest( abortController );

		// Perform async ajax request.
		( async() => {
			try {
				setLoading( true );
				await SendCommand(
					restNonce,
					{
						signal: abortController.signal,
						search: encodeURIComponent( value ),
						...params,
					},
					restEndPoint,
					'POST'
				).then( ( response ) => {
					setCurrentSuggestionRequest( null );
					const { data } = response.data;
					setSuggestions( data );
					setShowSuggestions( true );
				} ).catch( ( error ) => {
				} ).then( () => {
					setLoading( false );
				} );
			} catch ( error ) {
			}
		} )();
	};

	return (
		<div className="photo-block-advanced-select">
			<div className="photo-block-pub-advanced-select__wrapper">
				<div className="photo-block-pub-advanced-select__input-wrapper">
					{ null !== currentSuggestion && (
						<>
							<div className="photo-block-pub-advanced-select__input-label-wrapper">
								<label
									htmlFor={ uniqueInstanceId }
									className="photo-block-pub-advanced-select__input-label"
								>
									{ props.label }
								</label>
							</div>
							<div className="photo-block-pub-advanced-select__suggestion-display-wrapper">
								<div className="photo-block-pub-advanced-select__suggestion-display">
									{ currentSuggestion }
								</div>
								<div className="photo-block-pub-advanced-select__suggestion-display-actions">
									<Button
										className="photo-block-pub-advanced-select__suggestion-display-action"
										icon={ <X /> }
										label={ __( 'Clear', 'photo-block' ) }
										onClick={ () => {
											setCurrentSuggestion( null );
											setSuggestionValue( '' );
											setShowSuggestions( false );
											setSelectedSuggestion( null );
											setSelectedSuggestionIndex( null );
											setSuggestions( [] );
											props.onItemSelect( null, null );
										} }
									/>
								</div>
							</div>
						</>
					) }
					{ null === currentSuggestion && (
						<>
							<div className="photo-block-pub-advanced-select__input-label-wrapper">
								<label
									htmlFor={ uniqueInstanceId }
									className="photo-block-pub-advanced-select__input-label"
								>
									{ props.label }
								</label>
							</div>
							<div className="photo-block-pub-advanced-select__input-search-wrapper">
								<TextControl
									id={ uniqueInstanceId }
									type="text"
									className="photo-block-pub-advanced-select__input"
									placeholder={ props.placeholder }
									value={ suggestionValue }
									onChange={ onChange }
									onFocus={ onFocus }
									onKeyDown={ onKeyDown }
									label={ props.label }
									hideLabelFromVision={ true }
									aria-autocomplete="list"
									ref={ inputRef }
								/>
								{
									( loading ) && (
										<div className="photo-block-pub-advanced-select__loading">
											<Spinner />
										</div>
									)
								}
								<Button
									className="photo-block-pub-advanced-select__search-button"
									icon={ <Search /> }
									iconSize={ 18 }
									label={ props.label }
									onClick={ () => {
										setShowSuggestions( true );
									} }
								/>
								{
									( ! loading && isURL( suggestionValue ) ) && (
										<>
											<Button
												className="photo-block-pub-advanced-select__apply-button"
												icon={ <CornerDownLeft /> }
												iconSize={ 18 }
												label={ __( 'Apply Link', 'photo-block' ) }
												onClick={ ( e ) => {
													const newSuggestion = {
														permalink: suggestionValue,
														label: filterURLForDisplay( suggestionValue ),
														slug: '',
														value: '',
													};
													setCurrentSuggestion( newSuggestion );
													props.onItemSelect( e, suggestionValue );
												} }
											/>
										</>
									)
								}
							</div>
						</>
					) }
				</div>
			</div>
			<div
				className={
					classNames(
						{
							'has-suggestions': showSuggestions && !! suggestions.length,
						}
					)
				}
			>
				{ children( showSuggestions, suggestions, selectedSuggestion ) }
			</div>
		</div>
	);
};

AdvancedSelectControl.defaultProps = {
	label: __( 'Search by ID or title', 'photo-block' ),
	placeholder: __( 'Search by ID or title', 'photo-block' ),
	onItemSelect: () => {},
	children: () => ( <></> ),
	hasInititialFocus: false,
	acceptDirectInput: false,
	itemIcon: <></>,
};

AdvancedSelectControl.propTypes = {
	restEndpoint: PropTypes.string.isRequired,
	restNonce: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	children: PropTypes.func.isRequired,
	hasInititialFocus: PropTypes.bool.isRequired,
	acceptDirectInput: PropTypes.bool,
	itemIcon: PropTypes.element.isRequired,
};

export default AdvancedSelectControl;
