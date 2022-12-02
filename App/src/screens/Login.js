import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  Text,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import Logo from "../../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import { Context } from "../context/authContext";

const Login = ({ navigation }) => {
  const { dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPressed = async () => {
    try {
      await AsyncStorage.setItem("email", email);
      const authData = await api.post("/login", {
        email: email,
        password: password,
      });
      if (authData.status === 200) {
        await AsyncStorage.setItem("token", authData.data.token);
        dispatch({ type: "logIn", payload: true });
      } else {
        alert("Email ou Senha Inválidos");
        setPassword("");
      }
    } catch (error) {
      alert("Email ou Senha Inválidos");
      setPassword("");
    }
  };

  const { height } = useWindowDimensions();

  return (
    <View style={styles.view}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SENAI_S%C3%A3o_Paulo_logo.png/1280px-SENAI_S%C3%A3o_Paulo_logo.png"
        }
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <CustomInput placeholder="Email" value={email} setValue={setEmail} />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Login" onPress={onLoginPressed} />

      <TouchableOpacity onPress={() => navigation.navigate("RegisterUser")}>
        <Text>
          Não tem uma conta?{" "}
          <Text style={styles.createAccountText}>Crie uma</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    padding: 20,
    height: "100%",
    justifyContent: "center",
    //Aqui muda a cor
    backgroundImage:
      "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(29,144,253,1) 48%, rgba(252,176,69,1) 100%)",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  createAccountText: {
    fontWeight: "bold",
    color: "#6200ee",
  },
});

export default Login;
