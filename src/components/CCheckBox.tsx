/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
interface CCheckBoxProps {
  label: string;
  labelColor?: string;
  onChangeValue: (value: boolean) => void;
  bgCheckColor?: string;
  bgUncheckColor?: string;
  noPaddingLeft?: boolean;
}
const CCheckBox: React.FC<CCheckBoxProps> = props => {
  const {
    onChangeValue,
    label,
    labelColor = '#222222',
    bgCheckColor = 'gray',
    bgUncheckColor = 'gray',
    noPaddingLeft = false,
  } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    onChangeValue && onChangeValue(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handleOnChange}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          transform: noPaddingLeft ? [{translateX: -10}] : [],
        }}>
        <Checkbox.Android
          status={isChecked ? 'checked' : 'unchecked'}
          uncheckedColor={bgUncheckColor}
          color={bgCheckColor}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: labelColor,
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CCheckBox;
