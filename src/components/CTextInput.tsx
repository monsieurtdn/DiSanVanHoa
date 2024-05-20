/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { createRef, Ref } from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
interface CTextInputProps extends TextInputProps {
  refC?: Ref<any>;
  rightComponnent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CTextInput: React.FC<CTextInputProps> = props => {
  const {
    refC,
    placeholder = '',
    keyboardType = 'default',
    autoCapitalize = 'none',
    secureTextEntry = false,
    blurOnSubmit = false,
    onChangeText,
    rightComponnent,
    leftComponent,
    placeholderTextColor,
    style = {backgroundColor: 'white'},
    editable = true,
  } = props;
  return (
    <View style={[styles.inputStyle, style]}>
      {leftComponent ? leftComponent : <View />}
      <TextInput
        {...props}
        style={{flex: 1, minHeight: 50, color: 'black'}}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        ref={refC ?? createRef<TextInput>()}
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={blurOnSubmit}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="#f000"
        returnKeyType="next"
        editable={editable}
      />
      {rightComponnent ? rightComponnent : <View />}
    </View>
  );
};
export default CTextInput;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    flex: 1,
    color: '#18273A',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
