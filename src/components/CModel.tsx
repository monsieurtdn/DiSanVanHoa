/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';

interface CModelProps {
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible?: boolean;
  children: ReactNode;
  dismissable?: boolean;
}
const CModel: React.FC<CModelProps> = ({
  children,
  isVisible = false,
  dismissable = true,
  setIsVisible,
}) => {
  // const [visible, setVisible] = useState(isVisible);

  // useEffect(() => {
  //     setIsVisible && setIsVisible(isVisible);
  // }, [isVisible]);
  const hideModal = () => {
    setIsVisible && setIsVisible(false);
  };
  return (
    <Modal
      visible={isVisible}
      onDismiss={hideModal}
      dismissable={dismissable}
      contentContainerStyle={styles.containerStyle}>
      {children}
    </Modal>
  );
};
export default CModel;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    borderRadius: 5,
  },
});
