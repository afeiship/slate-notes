import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import data from './assets/value';

// 构建初始状态…
const initialState = Value.fromJSON(data);

function CodeNode(inProps) {
  const { attributes, children } = inProps;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
}

export default class extends React.Component {
  state = {
    value: initialState
  };

  constructor(inProps) {
    super(inProps);
    this.editor = React.createRef();
  }

  _onChange = (inEvent) => {
    const { value } = inEvent;
    // console.log('value:->', value);
    // console.log(value.toJSON());
    this.setState({ value });
  };

  _onKeyDown = (inEvent, inEditor, inNext) => {
    if (inEvent.ctrlKey && inEvent.key === '`') {
      inEvent.preventDefault();
      const isCode = inEditor.value.blocks.some(
        (block) => block.type == 'code'
      );
      // toggle logic:
      return inEditor.setBlocks(isCode ? 'paragraph' : 'code');
    }
    return inNext();
  };

  _onRenderBlock = (inProps, inEditor, inNext) => {
    switch (inProps.node.type) {
      case 'code':
        return <CodeNode {...inProps} />;
      default:
        return inNext();
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Editor
          ref={this.editor}
          value={value}
          renderBlock={this._onRenderBlock}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
        />
      </div>
    );
  }
}
