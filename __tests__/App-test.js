import React from 'react';
import App from '../src/App';
import renderer, {create} from 'react-test-renderer';
import Button from '../src/components/button';
import Home from '../src/pages/home';

jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line global-require
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

jest.mock('react-native-reanimated', () => {});
// jest.mock('react-native-tab-view', () => {});

it('renders correctly', () => {
  renderer.create(<Home />);
});

// describe('Button', () => {
//   it('should render without issues', () => {
//     const mockFn = jest.fn(() => result)
//     expect(component).toBe(1);
//     expect(toJson(component)).toMatchSnapshot();
//   })
// })
