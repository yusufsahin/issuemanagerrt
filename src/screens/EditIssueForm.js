import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { updateIssue } from "../store/issueSlice";

const EditIssueForm = ({navigation}) => {
  const dispatch = useDispatch();
  const { currentIssue } = useSelector(state => state.issues)

  const { control, handleSubmit, reset, setValue } = useForm({
      defaultValues: { id: '', title: '', description: '',projectId:'' }
  });

  useEffect(() => {
      if (currentIssue) {
          setValue('id', currentIssue.id);
          setValue('title', currentIssue.title);
          setValue('description', currentIssue.description);
          setValue('projectId', currentIssue.projectId);
      }
  }, [currentIssue, setValue]

  );

  const onSubmit = (data) => {
      dispatch(updateIssue(data));
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
                      placeholder="Enter Issue title"
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

export default EditIssueForm;