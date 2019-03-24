import { Editor, EditorState } from "draft-js";
import * as React from "react";

export interface IDraftSampleProps {}

export interface IDraftSampleState {
  editorState: EditorState;
}

export class DraftSample extends React.Component<IDraftSampleProps, IDraftSampleState> {
  onChange: (editorState: EditorState) => void;
  setEditor: (editor: any) => void;
  editor: any;
  focusEditor: () => void;
  
  constructor(props:IDraftSampleProps) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  render() {
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};
