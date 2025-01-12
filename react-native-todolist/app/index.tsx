import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from "@/components/TaskItem";
import AddTaskModal from "@/components/AddTaskModel";
import TaskDetailModal from "@/components/TaskDetailModal";

export default function Index() {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [isModalVisible, setIsModalVisible] = useState(false); // État de la modal
  const [selectedTask, setSelectedTask] = useState(null); // Tâche sélectionnée pour la vue détaillée

  // Clé pour AsyncStorage
  const TASKS_STORAGE_KEY = "@tasks";

  // Charger les tâches au démarrage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error("Erreur lors du chargement des tâches :", e);
      }
    };

    loadTasks();
  }, []);

  // Sauvegarder les tâches chaque fois qu'elles changent
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.error("Erreur lors de la sauvegarde des tâches :", e);
      }
    };

    saveTasks();
  }, [tasks]);

  const addTask = (title, image) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), title, isDone: false, image }, // Ajoutez image ici
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks
        .map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task
        )
        .sort((a, b) => a.isDone - b.isDone)
    );
  };

  const openTaskDetails = (task) => setSelectedTask(task);
  const closeTaskDetails = () => setSelectedTask(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>À faire :</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            isDone={item.isDone}
            image={item.image}  // Passer l'image ici
            onToggle={() => toggleTask(item.id)}
            onLongPress={() => openTaskDetails(item)} // Ajout de onLongPress
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Ajoutez une première tâche !</Text>
        }
      />

      {/* Bouton flottant */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Composant AddTaskModal */}
      <AddTaskModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddTask={addTask}
      />

      {/* Modal de visualisation des tâches */}
      {selectedTask && (
        <TaskDetailModal
        task={selectedTask}
        onClose={closeTaskDetails}
        onToggle={() => {
          toggleTask(selectedTask.id);
          closeTaskDetails(); // Ferme la vue détaillée après basculement
        }}
      />      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101214",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#3498db",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});