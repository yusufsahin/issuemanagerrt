import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";
import { addProject } from "../store/projectSlice";

const AddProjectForm = ({navigation}) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { name: '', description: '' }
    });

    const onSubmit = (data) => {
        dispatch(addProject({ ...data, owner: "john_doe" }));
        reset(); // Reset the form after submission if needed
        navigation.navigate('Projects')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Project Name</Text>
            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter project name"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Text style={styles.label}>Project Description</Text>
            <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter project description"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Button title="Save" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default AddProjectForm;
