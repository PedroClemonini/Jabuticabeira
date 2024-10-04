import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Camera, CameraView } from 'expo-camera';

export default function index() {

  const [hasPermission, setHasPermission] = useState(false);
  const [jabId, setID] = useState('');
  const [gleba, setGleba] = useState('...');
  const [token, setToken] = useState('...');

  const [cameraVisible, setCameraVisible] = useState(false); 

    useEffect(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    try{
    data = data.replace(/'/g, '"');
    let jsonstring = JSON.parse(data)
    setID(String(jsonstring.id))
    setToken(jsonstring.token)
    setGleba(jsonstring.gleba)
    showCamera()
  }catch(e){
    alert('QR Code Inválido')
    showCamera()
  }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    const showCamera = function () {
      if(cameraVisible ==false){
        setCameraVisible(true);
      }else{
        setCameraVisible(false);
      }
    };


  return (
    <View style={styles.container}>
  
      <Button
        onPress={showCamera}
        title="Clique aqui para escanear"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <TextInput
        style={styles.input}
        value= {jabId}
        editable={false}
      />
    <TextInput
        style={styles.input}
        value={token}
        editable={false}
      />
    <TextInput
        style={styles.input}
        value={gleba}
        editable={false}
      />

      {cameraVisible && 
   <CameraView
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={styles.camera}
      />
    }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
   input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text:{
    fontFamily:"arial",
  },
  camera: {
    flex: 1
  },
});
