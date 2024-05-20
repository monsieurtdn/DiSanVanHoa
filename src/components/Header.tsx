/* eslint-disable prettier/prettier */
import React, { ReactElement } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
interface IProps {
  content: ReactElement;
  handleGoBack?: () => void;
  hasShadow?: boolean;
  shadowElevation?: number;
  height?: number;
}
export const Header = ({
  content,
  handleGoBack,
  hasShadow = false,
  shadowElevation = Platform.OS === 'ios' ? 2 : 16,
  height = 60,
}: IProps) => {
  return (
    <View
      style={[
        styles.header,
        // !handleGoBack && styles.paddingLeft,
        hasShadow && styles.boxShadow,
        {elevation: shadowElevation},
        {height},
      ]}>
      {handleGoBack && (
        <IconButton icon={'arrow-left'} size={27} onPress={handleGoBack} />
      )}
      {React.cloneElement(content)}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#005BA5',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 10,
    // paddingRight: 10,
    zIndex: 50,
  },
  search: {
    flex: 2,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    marginLeft: 10,
    height: 38,
    marginRight: 10,
  },
  paddingLeft: {
    paddingLeft: 10,
  },
  boxShadow: {
    shadowColor: '#000', // Màu của bóng đổ
    shadowOffset: {
      width: 0, // Điều chỉnh vị trí ngang của bóng đổ
      height: 3, // Điều chỉnh vị trí dọc của bóng đổ
    },
    shadowOpacity: 0.5, // Độ đậm nhạt của bóng đổ
    shadowRadius: 5, // Độ rộng của bóng đổ
    elevation: 5, // Sử dụng elevation nếu không áp dụng shadow trên Android
    // Các thuộc tính khác nếu cần thiết
  },
});
