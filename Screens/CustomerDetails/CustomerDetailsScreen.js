import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CustomerDetailsScreen = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [serviceName, setServiceName] = useState("");

    const handleFileChange = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
    
            if (status === "granted") {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    quality: 1,
                });
    
                console.log("ImagePicker Result:", result);
    
                if (!result.cancelled) {
                    setSelectedFile(result);
                }
            } else {
                Alert.alert("Permission denied", "You need to grant camera roll permission");
            }
        } catch (error) {
            console.error("Error in handleFileChange:", error);
        }
    };
    

   
    const handleUpload = async () => {
        try {
            if (selectedFile) {
                const formData = new FormData();
                const imageInfo = selectedFile.assets[0]; // Access the first item in the assets array
                formData.append("image", {
                    uri: imageInfo.uri,
                    type: "image/jpeg",
                    name: "serviceImage.jpg",
                });
                formData.append("path", imageInfo.uri);  // Add path to the formData
                formData.append("filename", "serviceImage.jpg");  // Add filename to the formData
    
                const response = await fetch("https://executive-grapeseed.onrender.com/api/enquiry", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                });
    
                const data = await response.json();
                console.log("Server Response:", data);
    
                if (data._id) {
                    console.log("Image uploaded Successfully:", data._id);
                    showAlert("Service Added Successfully", "success");
                } else {
                    console.error("Error uploading image:", data.error || "Unknown error");
                    showAlert("Error adding service", "error");
                }
            }
        } catch (error) {
            console.error("Error in handleUpload:", error);
            showAlert("Error adding service", "error");
        }
    };
    
    

    const showAlert = (message, type) => {
        Alert.alert(type, message);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", margin: 20 }}>
            <Text>Add Image 1</Text>
           



            <Button title="Upload Image" onPress={handleFileChange} />

            <Button title="Save" onPress={handleUpload} />
        </View>
    );
};

export default CustomerDetailsScreen;