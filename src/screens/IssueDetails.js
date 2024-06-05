import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentIssue } from '../store/issueSlice';

const IssueDetails = ({navigation}) => {

    const dispatch = useDispatch();

    const { currentIssue } = useSelector(state => state.issues)
    if (!currentIssue) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No Issue selected.</Text>
                <Button title="Back to Project Details" onPress={() => navigation.navigate('ProjectDetails')} />
            </View>
        );
    }
    const handleEdit = () => {
        navigation.navigate('EditIssue');
    };

    const handleDelete = () => {
        navigation.navigate('IssueDelete');
    };


    const handleBack = () => {
        dispatch(clearCurrentIssue());
        navigation.navigate('ProjectDetails');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Issue Title:</Text>
            <Text style={styles.value}>{currentIssue.title}</Text>

            <Text style={styles.label}>Issue Description:</Text>
            <Text style={styles.value}>{currentIssue.description}</Text>


            <Button title="Edit Issue" onPress={handleEdit} />
            <Button title="Delete Issue" onPress={handleDelete} />
            <Button title="Back to Issue" onPress={handleBack} />


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


export default IssueDetails