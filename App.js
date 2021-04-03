import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window")

export default function App(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    
      <Camera style={styles.camera} type={type}>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        <View style={styles.triangleCam}>
          <View style={styles.buttonCam}>
            
            <TouchableOpacity onPress={() => console.log(props)}>
            <View style={{backgroundColor:'white'}}>
              <Ionicons style={styles.cam} name="camera" />
              </View>
            </TouchableOpacity>

          </View>
          </View>
        </SafeAreaView>
      </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.5,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    margin: 5,
  },
  cam: {
    fontSize:40,
    alignSelf:'center'
  },
  buttonCam:{
    borderRadius:100,
  },
  triangleCam:{
    position:'absolute',
    width:50,
    fontSize: 40,
    marginTop:650,
    marginLeft:width/2.7,
    borderRadius:10,
    overflow:'hidden',
  },
});
