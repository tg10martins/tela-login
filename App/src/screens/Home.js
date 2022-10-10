import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import Teste from '../components/Teste'
import { Context, Provider } from '../context/dataContext'

const Home = () => {
  const actualState = useContext(Context)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Text style={styles.text}>
        {actualState.state.counter}
      </Text>
      <Button 
        title="Aumentar" 
        onPress={() => actualState.dispatch({type:"aumentar", payload:10})} 
      />
      { actualState.state.showMessage ? <Text>Mensagem Secreta</Text> : null }
      <Button 
        title="Mostrar" 
        onPress={() => actualState.dispatch({type:"mostrar", payload: true})}
      />
      <Button 
        style={styles.baton}
        title="Esconder" 
        onPress={() => actualState.dispatch({type:"esconder", payload: false})}
      />
  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30
  }
})

export default () => {
  return (
    <Provider>
      <Home />
    </Provider>
  )
}