import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/authContext";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-web";

const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);

  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const email = await AsyncStorage.getItem("email");
      const response = await AsyncStorage.getItem(`@${email}`);
      setData(JSON.parse(response));
    }

    getData();
  }, []);

  console.log(data);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <>
        <Text style={styles.text}>Olá, {state.name}</Text>

        {data && (
          <>
            <Text style={styles.text}>Rua: {data.street}</Text>
            <Text style={styles.text}>Bairro: {data.district}</Text>
            <Text style={styles.text}>Número: {data.number}</Text>
            <Text style={styles.text}>Cidade: {data.city}</Text>
            <Text style={styles.text}>Estado: {data.state}</Text>
            <Text style={styles.text}>Telefone: {data.telephone}</Text>
          </>
        )}
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 30,
    margin: 40,
  },
});

export default Home;
