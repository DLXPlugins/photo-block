import { registerPlugin } from '@wordpress/plugins';

const globalStyles = photoBlock?.globalStyles || [];

registerPlugin(
	'photo-block-global-styles',
	{
		render: () => {
			return (
				<div>
					<h2>Global Styles</h2>
				</div>
			);
		},
	}
);