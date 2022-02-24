import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Camera } from "expo-camera";
import { AutoFocus, CameraType } from "expo-camera/build/Camera.types";
import flip from '../assets/flip.jpg';
import * as ImagePicker from 'expo-image-picker';

const Home = () => {
    const auth = getAuth();
    const navigation = useNavigation();

    //Camera state
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        }) ();
    },  []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Access to camera denied</Text>;
    }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("LoginScreen");
            })
            .catch(error =>  alert(error.message))
    };

    const onPressHandler = () => {
        navigation.navigate("RecipeScreen")
    };

    const pictureTaken = async () => {
        if (camera) {
            const data = await this.camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
        if (!result.cancelled) {
          setImageUri(result.uri);
        }
      };

    return(
        <View style={styles.container}>
            <View style={styles.container0}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Email: {auth.currentUser?.email}</Text>
            </View>
            <View style={styles.container3}>
                <Text style = {{fontWeight: 'bold', color: '#FFFFFF', fontSize: 40, marginBottom: 60, textAlign: 'center'}}>Welcome to Food Formula!</Text>
                <Camera style={styles.camera} type={type}
                    ref={(ref) =>{ camera = ref}}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back
                            )
                        }}>
                        <Image style={styles.touchContainer} source={flip} alt={"Flip"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pictureTaken}>
                        <Image source={{ uri: 'https://www.mcicon.com/wp-content/uploads/2021/02/Technology_Camera_1-copy-8.jpg' }} style={styles.cameraSelect} />
                        <Text title={'Gallery'} onPress={pickImage} />
                        <Image source={{ uri: imageUri}} style={{ flex: 1 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignOut}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </Camera>
                <StatusBar style="auto" />
            </View>
            <View style={styles.container2}>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container0: {
        marginTop: 90,
        //borderWidth: 2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffafcc'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    container2: {
        marginTop: 50,
        //borderWidth: 2,
    },
    camera: {
        width: 500,
        height: 400,
        alignItems: 'center',
      },
    cameraSelect: {
        width: 60,
        height: 60,
        bottom: 0,
        overflow: "hidden",
        borderRadius: 150/3,
      },
    touchContainer: {
        padding: 15,
        margin: 20,
        width: 300,
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 150/3
    },
    buttonText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: "#a2d2ff"
    },
    returnContainer: {
      padding: 15,
      margin: 20,
      marginTop: 40,
      width: 300,
      alignItems: 'center'
    },
    returnText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#fff"
    },
    container3: {
        //borderWidth: 2,
        // alignItems: 'center',
        // height: 500,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'flex-end'
    },
    touchContainer: {
        borderRadius: 150/3,
        width: 40,
        height: 40,
        bottom: 0,
        right: 0

    }
});

export default Home;