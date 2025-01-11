import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Si vous utilisez expo pour la gestion des images

const AddTaskModal = ({ isVisible, onClose, onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [image, setImage] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask, image); // Passe l'image avec le titre
      setNewTask(""); // Réinitialise l'input
      setImage(null); // Réinitialise l'image
      onClose(); // Ferme la modal
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Utilise l'URI de l'image sélectionnée
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nouvelle tâche</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez une tâche"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.pickImageButton}>Choisir une image</Text>
          </TouchableOpacity>
          
          {image && <Image source={{ uri: image }} style={styles.previewImage} />}
          
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddTask}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  pickImageButton: {
    color: "#3498db",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
  },
  addButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddTaskModal;
