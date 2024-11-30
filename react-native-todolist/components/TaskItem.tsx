import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const TaskItem = ({ title, isDone, onToggle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.taskContainer,
        { opacity: isDone ? 0.5 : 1 },
      ]}
      onPress={onToggle}
    >
      <Text style={[styles.taskText, isDone && styles.taskTextDone]}>
        {title}
      </Text>
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
    justifyContent: "space-between",
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
});

export default TaskItem;