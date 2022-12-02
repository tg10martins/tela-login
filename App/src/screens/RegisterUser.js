import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from "../api";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterUser = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [telephone, setTelephone] = useState("");

  const { height } = useWindowDimensions();

  const onRegisterPressed = async () => {
    try {
      const payload = {
        street: street,
        district: district,
        number: number,
        city: city,
        state: state,
        telephone: telephone,
      };

      console.log(payload);
      AsyncStorage.setItem(`@${email}`, JSON.stringify(payload));
      const data = await api.post("/user/register", {
        name: name,
        email: email,
        password: password,
        admin: admin,
      });
      if (data.status === 200) {
        console.log(data);
        alert(data.data.message);
        navigation.navigate("Login");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function addMaskPhone(value) {
    if (value.length > 10) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return (
    <View style={styles.view}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SENAI_S%C3%A3o_Paulo_logo.png/1280px-SENAI_S%C3%A3o_Paulo_logo.png"
        }
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <CustomInput placeholder="Nome" value={name} setValue={setName} />

      <div style={styles.address}>
        <CustomInput placeholder="Rua" value={street} setValue={setStreet} />
        <CustomInput
          placeholder="Bairro"
          value={district}
          setValue={setDistrict}
        />
        <CustomInput placeholder="Número" value={number} setValue={setNumber} />
      </div>

      <div style={styles.city}>
        <CustomInput placeholder="Cidade" value={city} setValue={setCity} />
        <CustomInput
          placeholder="Estado"
          value={state}
          setValue={setState}
          maxLength={2}
        />
      </div>

      <CustomInput
        placeholder="Telefone"
        value={addMaskPhone(telephone)}
        setValue={setTelephone}
        maxLength={15}
      />

      <CustomInput placeholder="Email" value={email} setValue={setEmail} />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <Picker
        selectedValue={admin}
        style={styles.picker}
        onValueChange={setAdmin}
      >
        <Picker.Item label="Admin User" value="true" />
        <Picker.Item label="Regular User" value="false" />
      </Picker>

      <CustomButton text="Registre-se" onPress={onRegisterPressed} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>
          Já tem uma conta? <Text style={styles.loginText}>Faça o login</Text>
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
    //Aqui muda a cor
    backgroundImage: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(29,144,253,1) 48%, rgba(252,176,69,1) 100%);",
  },
  address: {
    display: "flex",
    justifyContent: "center",
    width: "33.4%",
  },
  city: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  loginText: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  picker: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "lightgray",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    borderWidth: 0,
    height: 45,
    width: "100%",
  },
});

export default RegisterUser;
