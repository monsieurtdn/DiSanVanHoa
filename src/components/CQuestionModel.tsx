/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, Portal, Title } from 'react-native-paper';
import CModel from './CModel';
interface CQuestionModelProps {
  title: string;
  message?: string;
  isVisible?: boolean;
  onClick: (value: boolean) => void;
  children?: ReactNode;
}
const CQuestionModel: React.FC<CQuestionModelProps> = ({
  message,
  title,
  onClick,
  isVisible = false,
  children,
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);
  return (
    <Portal>
      <CModel isVisible={visible}>
        <View style={styles.modalHeader}>
          <IconButton color="#FAAD14" icon={'alert-circle-outline'} />
          <Title style={{color: 'black'}}>{title}</Title>
        </View>
        <View style={styles.modalHeader}>
          <View style={{width: 50}} />
          <Text style={{color: 'black'}}>{message}</Text>
          {children}
        </View>
        <View style={styles.modalFooter}>
          <Button
            style={styles.buttonNo}
            mode="contained"
            color="white"
            onPress={() => {
              setVisible(false);
              onClick(false);
            }}>
            {'Hủy'}
          </Button>
          <Button
            style={styles.buttonYes}
            color={'#1890FF'}
            mode="contained"
            onPress={() => {
              setVisible(false);
              onClick(true);
            }}>
            {'Đồng ý'}
          </Button>
        </View>
      </CModel>
    </Portal>
  );
};
export default CQuestionModel;

const styles = StyleSheet.create({
  modalHeader: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  modalFooter: {
    height: 57,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
  buttonNo: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    marginHorizontal: 5,
  },
  buttonYes: {
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    marginHorizontal: 5,
  },
});
