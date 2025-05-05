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
} from '@wordpress/components';
import { useInstanceId, useDebounce } from '@wordpress/compose';
import { isURL, filterURLForDisplay } from '@wordpress/url';

import {
	Search,
	CornerDownLeft,
	XCircle,
	ExternalLink,
	Link,
	File,
	FileText,

} from 'lucide-react';

import SendCommand from '../../utils/SendCommand';

/**
 * URL Selector for Media Library.
 *
 * @param {Object} props Incoming props.
 *
 * @return {React.Component} UrlInput component.
 */
const URLPicker = ( props ) => {
	/**
	 * Create Refs for inputs.
	 */
	const inputRef = createRef();

	const restEndPoint = props.restEndpoint;
	const restNonce = props.restNonce;

	/**
	 * Set Unique Instance ID.
	 */
	const generatedUniqueId = useInstanceId( URLPicker, 'app' );

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
		`url-input-control-${ generatedUniqueId }`
	);
	const [ loading, setLoading ] = useState( false );

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
	 * @param {event} event The onChange event.
	 */
	const onChange = ( event ) => {
		setSuggestionValue( event.target.value );
	};

	/**
	 * Search when focus and no results are present.
	 *
	 * @param {event} event Focus event.
	 */
	const onFocus = ( event ) => {
		event.preventDefault();
		if ( null === selectedSuggestion && '' !== suggestionValue && ! isURL( suggestionValue ) ) {
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
					debouncedRequest( event.target.value );
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
				if ( selectedSuggestion !== null ) {
					// Announce a link has been selected when tabbing away from the input field.
					speak( __( 'Link selected.', 'photo-block' ) );
				}
				break;
			}
			case ENTER: {
				event.preventDefault();
				setShowSuggestions( false );
				if ( selectedSuggestion !== null ) {
					props.onItemSelect( event, getSuggestion( selectedSuggestion ) );
					inputRef.current.focus();
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

		// Return early if value is a URL.
		if ( isURL( value ) ) {
			setSuggestions( [] );
			setShowSuggestions( false );
			setLoading( false );
			return;
		}

		// Allow a suggestions request if:
		// - there are at least 2 characters in the search input (except manual searches where
		//   search input length is not required to trigger a fetch)
		// - this is a direct entry (eg: a URL)
		if ( ! isInitialSuggestions && value.length < 2 ) {
			// todo - cancel any pending requests
			setSuggestions( [] );
			setShowSuggestions( false );
			setLoading( false );

			return;
		}

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
		<div className="photo-block-url-input">
			<div className="photo-block-pub-url-input__wrapper">
				<div className="photo-block-pub-url-input__input-wrapper">
					{ null !== currentSuggestion && (
						<div className="photo-block-pub-url-input__suggestion">
							<div className="photo-block-pub-url-input__suggestion-item">
								<span className="photo-block-pub-url-input__suggestion-label">
									<Button
										variant="link"
										icon={ <ExternalLink /> }
										iconSize={ 18 }
										iconPosition="right"
										label={ __( 'Open in new tab', 'photo-block' ) }
										href={ currentSuggestion.permalink }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ filterURLForDisplay( currentSuggestion.permalink ) }
									</Button>
								</span>
								<Button
									variant="secondary"
									icon={ <XCircle /> }
									iconSize={ 18 }
									label={ __( 'Remove Current Selection', 'photo-block' ) }
									onClick={ () => {
										setCurrentSuggestion( null );
									} }
								/>
							</div>
						</div>
					) }
					{ null === currentSuggestion && (
						<div className="photo-block-pub-url-search-wrapper">
							<input
								type="text"
								placeholder={ __( 'Paste in URL or search', 'photo-block' ) }
								id={ uniqueInstanceId }
								className="photo-block-pub-url-input__input"
								value={ suggestionValue }
								onChange={ onChange }
								onFocus={ onFocus }
								onKeyDown={ onKeyDown }
								aria-label={
									props.label
										? undefined
										: __( 'Page', 'photo-block' )
								}
								aria-autocomplete="list"
								ref={ inputRef }
							/>
							{
								loading && (
									<div className="photo-block-pub-url-input__loading">
										<Spinner />
									</div>
								)
							}
							{
								( ! loading && ! isURL( suggestionValue ) ) && (
									<>
										<Button
											className="photo-block-pub-url-input__search-button"
											icon={ <Search /> }
											iconSize={ 18 }
											label={ __( 'Search for a Page', 'photo-block' ) }
											onClick={ () => {
												setShowSuggestions( true );
											} }
										/>
									</>
								)
							}
							{
								( ! loading && isURL( suggestionValue ) ) && (
									<>
										<Button
											className="photo-block-pub-url-input__apply-button"
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
					) }

				</div>
			</div>
			{ showSuggestions && !! suggestions.length && (
				<div
					className="photo-block-suggestions-wrapper"
				>
					<div
						role="listbox"
						id={ suggestionListboxId }
						className="photo-block-url-input__suggestions"
					>
						{ suggestions.map( ( suggestion, index ) => {
							const suggestionId = `photo-block-suggested-value-${ suggestion.value }`;
							const suggestionClass = classNames(
								'photo-block-url-input__suggestion',
								{
									'is-selected': suggestion.value === selectedSuggestion,
								}
							);

							return (
								<Button
									key={ suggestionId }
									id={ suggestionId }
									value={ suggestion.value }
									role="option"
									aria-selected={ suggestion.value === selectedSuggestion }
									className={ suggestionClass }
									onClick={ ( e ) => {
										setSelectedSuggestion( parseInt( e.target.value ) );
										setSelectedSuggestionIndex( index );
										setCurrentSuggestion( suggestion );
										setShowSuggestions( false );
										props.onItemSelect( e, suggestion.permalink );
									} }
									icon={ 'post' === suggestion.type ? <FileText /> : <File /> }
									iconSize={ 2 }
									iconPosition="left"
								>
									<span className="photo-block-search-item">
										<span className="photo-block-search-item-title">{ suggestion.label }</span>
										<span className="photo-block-search-item-info">{ suggestion.permalink }</span>
									</span>
								</Button>
							);
						} ) }
					</div>
				</div>
			) }
		</div>
	);
};

URLPicker.defaultProps = {
	label: __( 'Page', 'photo-block' ),
	onItemSelect: () => {},
	hasInititialFocus: false,
	itemIcon: <></>,
};

URLPicker.propTypes = {
	restEndpoint: PropTypes.string.isRequired,
	restNonce: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	hasInititialFocus: PropTypes.bool.isRequired,
	itemIcon: PropTypes.element.isRequired,
};

export default URLPicker;
