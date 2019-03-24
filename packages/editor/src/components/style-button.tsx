import * as React from "react";

export interface IStyleButtonProps {
  active: boolean;
  label: string;
  style: string;
  onToggle: (...args) => any;
};

export interface IStyleButtonState { };

export class StyleButton extends React.Component<IStyleButtonProps, IStyleButtonState> {
  onToggle: (e: any) => void;
  constructor(props: IStyleButtonProps) {
    super(props);
    this.onToggle = (e:any) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}