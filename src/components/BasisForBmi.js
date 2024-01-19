import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import bmiBasis from '../../assets/bmiBasis.png';

const BasisForBmi = ({isVisible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ImageZoom
            cropWidth={300}
            cropHeight={500}
            imageWidth={300}
            imageHeight={500}>
            <Image source={bmiBasis} style={styles.image} />
          </ImageZoom>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BasisForBmi;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 500,
    resizeMode: 'contain',
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
  },
});
