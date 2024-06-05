import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentProject, deleteProject } from '../store/projectSlice';


const ProjectDelete = ({navigation}) => {

    const dispatch = useDispatch();

    const { currentProject } = useSelector(state => state.projects)
    if (!currentProject) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No Issue selected.</Text>
                <Button title="Back to Projects" onPress={() => navigation.navigate('Projects')} />
            </View>
        );
    }
    const handleDelete = (id) => {
        dispatch(deleteProject(id))
        navigation.navigate('Projects');
    };

    const handleBack = () => {
        dispatch(clearCurrentProject());
        navigation.navigate('Projects');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Do you want to delete Project ID : {currentProject.id}</Text>
            <Text style={styles.label}>Project Name:</Text>
            <Text style={styles.value}>{currentProject.name}</Text>

            <Text style={styles.label}>Project Description:</Text>
            <Text style={styles.value}>{currentProject.description}</Text>


            <Button title="Delete Project" onPress={()=>handleDelete(currentProject.id)} />
            <Button title="Back to Projects" onPress={()=>handleBack()} />


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


export default ProjectDelete;