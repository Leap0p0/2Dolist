import React from "react";
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const TaskDetailModal = ({ task, onClose, onToggle }) => {
  return (
    <Modal visible={!!task} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {task?.image && (
              <Image
                source={{ uri: task.image }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.fullText}>{task?.title}</Text>
          </ScrollView>

          {/* Bouton pour basculer l'état de la tâche */}
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: task?.isDone ? "#e74c3c" : "#3498db" },
            ]}
            onPress={onToggle}
          >
            <Text style={styles.toggleButtonText}>
              {task?.isDone ? "Marquer comme non terminé" : "Marquer comme terminé"}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#101214",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  fullText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  toggleButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#101214",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TaskDetailModal;
