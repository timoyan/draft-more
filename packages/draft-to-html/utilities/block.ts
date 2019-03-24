import { forEach } from './common';

/**
* Mapping block-type to corresponding html tag.
*/
const blockTypesMapping: Object = {
    unstyled: 'p',
    'header-one': 'h1',
    'header-two': 'h2',
    'header-three': 'h3',
    'header-four': 'h4',
    'header-five': 'h5',
    'header-six': 'h6',
    'unordered-list-item': 'ul',
    'ordered-list-item': 'ol',
    blockquote: 'blockquote',
    code: 'pre',
};

/**
* Function will return HTML tag for a block.
*/
export function getBlockTag(type: string): string {
    return type && blockTypesMapping[type];
}

/**
* Function will return style string for a block.
*/
export function getBlockStyle(data: Object): string {
    let styles = '';

    forEach(data, (key, value) => {
        if (value) {
            styles += `${key}:${value};`;
        }
    });
    return styles;
}