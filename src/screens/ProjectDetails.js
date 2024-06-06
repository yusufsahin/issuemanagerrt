import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Button } from 'react-native';
import { clearCurrentProject } from "../store/projectSlice";
import IssuesList from "./IssuesList";

const ProjectDetails = ({ navigation }) => {

    const dispatch = useDispatch();
    const { currentProject } = useSelector(state => state.projects);

    if (!currentProject) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No project selected.</Text>
                <Button title="Back to Projects" onPress={() => navigation.navigate('ProjectsList')} />
            </View>
        );
    }
    const handleEdit = () => {
        navigation.navigate('EditProject');
    };

    const handleBack = () => {
        dispatch(clearCurrentProject());
        navigation.navigate('Projects');
    };

    const handleDelete = () => {
        navigation.navigate('ProjectDelete')
    }
    return (

        <View style={styles.container}>
            <Text style={styles.label}>Project Id:</Text>
            <Text style={styles.value}>{currentProject._id}</Text>

            <Text style={styles.label}>Project Name:</Text>
            <Text style={styles.value}>{currentProject.name}</Text>

            <Text style={styles.label}>Project Description:</Text>
            <Text style={styles.value}>{currentProject.description}</Text>

            <Text style={styles.label}>Owner:</Text>
            <Text style={styles.value}>{currentProject.owner}</Text>

            <Button title="Edit Project" onPress={handleEdit} />
            <Button title="Back to Projects" onPress={handleBack} />
            <Button title="Delete Project" onPress={() => handleDelete()} />
            <IssuesList projectId={currentProject.id} navigation={navigation} />

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 15,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default ProjectDetails;