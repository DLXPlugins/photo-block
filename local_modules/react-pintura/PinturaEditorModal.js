import React from 'react';

import { openEditor } from '@pqina/pintura';
import { sub, unsub } from './events';

class PinturaEditorModal extends React.Component {
    constructor(props) {
        super(props);
        this.editor = undefined;
    }

    componentDidMount() {
        // We'll wrap the module in a container so we can use the container as a CSS module target
        this.el = document.createElement('div');
        if (this.props.className) this.el.className = this.props.className;
        document.body.append(this.el);

        // create editor and proxy events
        const props = { ...this.props };
        this.editor = openEditor({ ...props, enableAutoDestroy: false }, this.el);
        sub(this, props);
    }

    componentDidUpdate() {
        const props = { ...this.props };
        Object.assign(this.editor, props);
        sub(this, props);
    }

    componentWillUnmount() {
        if (!this.editor) return;
        unsub(this);
        this.editor.destroy();
        this.editor = undefined;
        this.el.remove();
    }

    show() {
        this.editor.show();
    }

    hide() {
        this.editor.hide();
    }

    render() {
        return null;
    }
}

export default PinturaEditorModal;
