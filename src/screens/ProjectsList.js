// screens/ProjectsList.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, ScrollView, Modal } from "react-native";
import { Button, Text, ListItem } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects, setCurrentProject } from "../store/projectSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const ProjectsList = ({ navigation }) => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector(state => state.projects);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    
    const handleSelectProjectView = (project) => {
        dispatch(setCurrentProject(project));
        navigation.navigate('ProjectDetails')
    };
    

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProject(projectId));
    };
    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'failed' && <Text style={styles.errorText}>Error: {error}</Text>}
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Button
                    title="Add Project"
                    onPress={() => navigation.navigate('AddProject')}
                />

                {projects && projects.map((project, index) => (
                    <ListItem
                        key={project._id}
                        bottomDivider
                        containerStyle={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#ffebcd' : '#ffe4e1' }]}
                       onPress={() => handleSelectProjectView(project)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{project.name}</ListItem.Title>
                            
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: '100%',
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },

});

export default ProjectsList;
