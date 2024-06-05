import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, ScrollView, Modal } from "react-native";
import { Button, Text, ListItem } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchIssues, setCurrentIssue, deleteIssue } from "../store/issueSlice";

const IssuesList = ({ projectId, navigation }) => {
    const dispatch = useDispatch();
    const { issues, status, error } = useSelector(state => state.issues);


    useEffect(() => {
        if(projectId){
            dispatch(fetchIssues(projectId));
        }
    }, [dispatch,projectId]);

    const handleSelectIssue = (issue) => {
        dispatch(setCurrentIssue(issue));
        setSelectedIssue(issue);
        setModalVisible(true);
    };

    const handleSelectIssueView = (issue) => {
        dispatch(setCurrentIssue(issue));
        navigation.navigate('IssueDetails');
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleDeleteIssue = (issueId) => {
        dispatch(deleteIssue(issueId));
    };

    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'failed' && <Text style={styles.errorText}>Error: {error}</Text>}
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Button
                    title="Add Issue"
                    onPress={() => navigation.navigate('AddIssue')}
                />

                {issues && issues.map((issue, index) => (
                    <ListItem
                        key={issue.id}
                        bottomDivider
                        containerStyle={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#ffebcd' : '#ffe4e1' }]}
                        onPress={() => handleSelectIssueView(issue)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{issue.title}</ListItem.Title>
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

export default IssuesList;
