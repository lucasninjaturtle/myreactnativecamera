import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");

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
    return <View style={{backgroundColor:'red'}}/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Camera style={styles.camera} type={type}>
      <SafeAreaView style={styles.header}>
        <View>
        <View >
            <Ionicons 
            size={100}
            name='camera'
            color={'red'}
            />

        </View>
        </View>
      </SafeAreaView> 
        <View styles={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <View >
              <View >
            <Ionicons style={{color:'white'}} name="camera-reverse-outline"></Ionicons>
            </View>
            </View>
          </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log(props)}>
              <View style={styles.snapButton}>
                <View style={styles.innerSnapButton}>
                  <Ionicons style={{color:'white'}} name="camera" />
                </View>
              </View>
            </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex:1,
    alignItems:"center",
    justifyContent:'space-between',
  },
  footer: {
    flexDirection:'row',
    alignSelf:'auto',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  snapButton:{
    width:64,
    height:64,
    borderRadius:32,
    borderWidth:4,
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center',
    margin:20,
  },
  innerSnapButton:{
    backgroundColor:'purple',
    width:52,
    height:52,
    borderRadius:25.5,
    justifyContent:'center',
    alignItems:'center',
  }
});
