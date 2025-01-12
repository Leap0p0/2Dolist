import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

const TaskItem = ({ title, isDone, image, onToggle, onLongPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.taskContainer,
        { opacity: isDone ? 0.5 : 1 },
      ]}
      onPress={onToggle}
      onLongPress={onLongPress} // Ajout de l'appui long
    >
      {image && <Image source={{ uri: image }} style={styles.taskImage} />}
      <View style={styles.textContainer}>
        <Text style={[styles.taskText, isDone && styles.taskTextDone]}>
          {title}
        </Text>
      </View>
      <View
        style={[
          styles.taskBubble,
          { backgroundColor: isDone ? "#3498db" : "#ffffff" },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  taskText: {
    fontSize: 18,
    color: "#333",
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#3498db",
  },
  taskBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  taskImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default TaskItem;
