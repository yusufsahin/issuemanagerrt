import { View, Text ,StyleSheet,Button,TextInput} from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';

import { Controller, useForm } from "react-hook-form";
import { addIssue } from '../store/issueSlice';


const AddIssueForm = ({navigation}) => {
    const dispatch = useDispatch();

    const {currentProject} = useSelector(state=>state.projects);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { title: '', description: '', projectId:currentProject.id }
    });

    const onSubmit = (data) => {
        dispatch(addIssue(data));
        reset(); // Reset the form after submission if needed
        navigation.navigate('ProjectDetails')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Issue Title</Text>
            <Controller
                name="title"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Issue Title"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Text style={styles.label}>Issue Description</Text>
            <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter issue description"
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

export default AddIssueForm;