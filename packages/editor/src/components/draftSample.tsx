import { Editor, EditorState, RichUtils, getDefaultKeyBinding, DraftHandleValue } from "draft-js";
import * as React from "react";
import { StyleButton } from "./style-button";
import "../../../../node_modules/draft-js/dist/Draft.css";
import "../../public/rich-editor.css";

export interface IDraftSampleProps { }

export interface IDraftSampleState {
  editorState: EditorState;
}

export class RichEditorExample extends React.Component<IDraftSampleProps, IDraftSampleState> {
  onChange: (editorState: any) => void;
  domEditor: React.RefObject<Editor>;

  constructor(props: IDraftSampleProps) {
    super(props);
    this.domEditor = React.createRef<Editor>();
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
    this._mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command: string, editorState: EditorState): DraftHandleValue {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  _mapKeyToEditorCommand(e:any) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType:any) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle:any) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this._toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this._toggleInlineStyle}
        />
        <div className={className}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this._handleKeyCommand}
            keyBindingFn={this._mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref={(ref: any) => { this.domEditor = ref }}
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block: any) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props:any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
