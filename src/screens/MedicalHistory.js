import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';

const MedicalHistory = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical History Form</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="John Doe" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="MM/DD/YYYY" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} placeholder="Male" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput style={styles.input} placeholder="175" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput style={styles.input} placeholder="70" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List any allergies..."
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Current Medications</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List current medications..."
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Medical Conditions</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List any medical conditions..."
          multiline
          numberOfLines={4}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default MedicalHistory;
