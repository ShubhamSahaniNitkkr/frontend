import {Keyboard} from 'react-native';
import {useEffect, useState} from 'react';

export default function useKeyboardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const keyboardShowAndroidListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );

    const keyboardHideAndroidListener = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );

    const keyboardShowIOSListener = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keyboardHideIOSListener = Keyboard.addListener(
      'keyboardWillHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );

    return () => {
      keyboardShowAndroidListener.remove();
      keyboardHideAndroidListener.remove();
      keyboardShowIOSListener.remove();
      keyboardHideIOSListener.remove();
    };
  }, []);

  return keyboardOffsetHeight;
}
