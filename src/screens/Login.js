import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Controller, useForm } from "react-hook-form";
import { login } from '../store/authSlice';



const Login = ({ navigation }) => {
    const dispatch = useDispatch();

    const { status, error } = useSelector(state => state.auth);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { username: '', password: '' }
    });

    const onSubmit = (data) => {

        dispatch(login(data)).then(() => reset()).then(() => navigation.navigate('Projects'));


    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Login</Text>
            <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Username"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Text style={styles.label}>Password</Text>
            <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
            {status === 'loading' && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
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

export default Login;