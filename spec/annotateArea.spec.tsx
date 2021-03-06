import { shallow } from 'enzyme';
import * as React from 'react';
import AnnotateArea from '../src/renderer/components/annotate-area';
import { Tool } from '../src/renderer/components/snipping-tool';

const defaultProps = {
    paths: [],
    highlightColor: 'rgba(233, 0, 0, 0.64)',
    penColor: 'rgba(38, 196, 58, 1)',
    onChange: jest.fn(),
    imageDimensions: { width: 800, height: 800 },
    chosenTool: Tool.pen,
    screenSnippetPath: 'very-nice-path',
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('<AnnotateArea/>', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<AnnotateArea {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onChange when drawn on annotate area', () => {
        const wrapper = shallow(<AnnotateArea {...defaultProps} />);
        wrapper.simulate('mousedown', { pageX: 2, pageY: 49 });
        wrapper.simulate('mouseup');
        expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange with correct pen props if drawn drawn on annotate area with pen', () => {
        const wrapper = shallow(<AnnotateArea {...defaultProps} />);
        wrapper.simulate('mousedown', { pageX: 2, pageY: 49 });
        wrapper.simulate('mouseup');
        expect(defaultProps.onChange).toHaveBeenCalledWith([{
            color: 'rgba(38, 196, 58, 1)',
            key: 'path0',
            points: [{ x: 0, y: 0 }],
            shouldShow: true,
            strokeWidth: 5,
        }]);
    });

    it('should call onChange with correct highlight props if drawn drawn on annotate area with highlight', () => {
        const highlightProps = {
            paths: [],
            highlightColor: 'rgba(233, 0, 0, 0.64)',
            penColor: 'rgba(38, 196, 58, 1)',
            onChange: jest.fn(),
            imageDimensions: { width: 800, height: 800 },
            chosenTool: Tool.highlight,
            screenSnippetPath: 'very-nice-path',
        };
        const wrapper = shallow(<AnnotateArea {...highlightProps} />);
        wrapper.simulate('mousedown', { pageX: 2, pageY: 49 });
        wrapper.simulate('mouseup');
        expect(highlightProps.onChange).toHaveBeenCalledWith([{
            color: 'rgba(233, 0, 0, 0.64)',
            key: 'path0',
            points: [{ x: 0, y: 0 }],
            shouldShow: true,
            strokeWidth: 28,
        }]);
    });

    it('should render path if path is provided in props', () => {
        const pathProps = {
            paths: [{
                points: [{ x: 0, y: 0 }],
                shouldShow: true,
                strokeWidth: 5,
                color: 'rgba(233, 0, 0, 0.64)',
                key: 'path0',
            }],
            highlightColor: 'rgba(233, 0, 0, 0.64)',
            penColor: 'rgba(38, 196, 58, 1)',
            onChange: jest.fn(),
            imageDimensions: { width: 800, height: 800 },
            chosenTool: Tool.highlight,
            screenSnippetPath: 'very-nice-path',
        };
        const wrapper = shallow(<AnnotateArea {...pathProps} />);
        expect(wrapper.find('[data-testid="path0"]').exists()).toEqual(true);
    });

    it('should not render any path if no path is provided in props', () => {
        const wrapper = shallow(<AnnotateArea {...defaultProps} />);
        expect(wrapper.find('[data-testid="path0"]').exists()).toEqual(false);
    });
});
