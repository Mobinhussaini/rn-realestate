import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Propery = () => {
    const {id} = useLocalSearchParams(); 
    return (
        <View>
            <Text>Propery: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Propery;
