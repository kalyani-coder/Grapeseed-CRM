import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Easing,
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import { HStack, Pressable, Center, Icon, NativeBaseProvider } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';





function Footer() {
    const [selected, setSelected] = React.useState(0);
    const navigation = useNavigation();

    const items = [
        { name: 'Home', icon: 'home' },
        { name: 'Profile', icon: 'person' },
        { name: 'Settings', icon: 'settings' },
        // Add more items as needed
    ];

    const handlePress = (index) => {
        setSelected(index);

        // Navigate to the corresponding screen
        if (index === 0) { // Check if the user clicked on the "Home" button
            navigation.navigate('Dashboard'); // Navigate to the "Dashboard" screen
        } else if (index === 1) {
            navigation.navigate('ProfilePage'); // Navigate to the "ProfilePage" screen
        }
        // Add more navigation logic for other buttons if needed
    };

    return (
        <HStack bg="black" alignItems="center" shadow={6}>
            {items.map((item, index) => (
                <Pressable
                    key={index}
                    cursor="pointer"
                    opacity={selected === index ? 1 : 0.5}
                    py="2"
                    flex={1}
                    onPress={() => handlePress(index)}
                >
                    <Center>
                        <Icon mb="1" as={<MaterialIcons name={item.icon} />} size="sm" />
                        <Text color="white" fontSize="12" style={styles.footerText}>
                            {item.name}
                        </Text>
                    </Center>
                </Pressable>
            ))}
        </HStack>
    );
}



const CollapsibleSection = ({ title, children, isOpen, onToggle }) => {
    return (
        <View style={styles.collapsibleContainer}>
            <TouchableOpacity onPress={onToggle} style={styles.collapsibleHeader}>
                <Text style={styles.collapsibleHeaderText}>{title}</Text>
            </TouchableOpacity>
            {isOpen && <View style={styles.collapsibleContent}>{children}</View>}
        </View>
    );
};

const CustomerDetailsScreen = ({ navigation }) => {
    const [isOpenCustomerDetails, setIsOpenCustomerDetails] = useState(true);
    const [isOpenPersonalInfo, setIsOpenPersonalInfo] = useState(false);
    const [isOpenNomineeInfo, setIsOpenNomineeInfo] = useState(false);
    const [isOpenWorkDetails, setIsOpenWorkDetails] = useState(false);
    const [isOpenPhysicalInfo, setIsOpenPhysicalInfo] = useState(false);

    const toggleCustomerDetails = () => {
        setIsOpenCustomerDetails(!isOpenCustomerDetails);
    };

    const togglePersonalInfo = () => {
        setIsOpenPersonalInfo(!isOpenPersonalInfo);
    };

    const toggleNomineeInfo = () => {
        setIsOpenNomineeInfo(!isOpenNomineeInfo);
    };

    const toggleWorkDetails = () => {
        setIsOpenWorkDetails(!isOpenWorkDetails);
    };

    const togglePhysicalInfo = () => {
        setIsOpenPhysicalInfo(!isOpenPhysicalInfo);
    };

    const [Pan_Card, setPan_Card] = useState('');
    const [Adhar_Card, setAdhar_Card] = useState('');
    const [Cancelled_cheque, setCancelled_cheque] = useState('');
    const [Employeement_Status, setEmployeement_Status] = useState(null);
    const [animatedValue] = useState(new Animated.Value(0));
    const [name, setName] = useState('');
    const [mobile_nu, setmobile_nu] = useState('');
    const [Alternative_Mobile, setAlternative_Mobile] = useState('');
    const [Mother_Name, setMother_Name] = useState('');
    const [Last_Education, setLast_Education] = useState('');
    const [Email, setEmail] = useState('');
    const [Married_Status, setMarried_Status] = useState('');
    const [lifeStage, setLifeStage] = useState('');
    const lifeStageOptions = [
        'Single',
        'Married',
        'Married with Children',
        'Close to Retirement',
    ];
    const [Nominee_Name, setNominee_Name] = useState('');
    const [Nominee_DOB, setNominee_DOB] = useState('');
    const [Nominee_Ralationship, setNominee_Ralationship] = useState('');
    const [Company_Name, setCompany_Name] = useState('');
    const [Annual_Income, setAnnual_Income] = useState('');
    const [Industry_Name, setIndustry_Name] = useState('');
    const [Height, setHeight] = useState('');
    const [Weight, setWeight] = useState('');
    const [Life_Cover, setLife_Cover] = useState('');
    const [medical_History, setmedical_History] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const submitData = async () => {
        try {
            // Retrieve user data from AsyncStorage
            const userDataString = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(userDataString);

            const response = await fetch(
                'https://executive-grapeseed.onrender.com/api/enquiry',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Pan_Card,
                        Adhar_Card,
                        Cancelled_cheque,
                        name,
                        mobile_nu,
                        Alternative_Mobile,
                        Mother_Name,
                        Email,
                        Last_Education,
                        Married_Status,
                        Nominee_Name,
                        Nominee_DOB,
                        Nominee_Ralationship,
                        Company_Name,
                        Annual_Income,
                        Industry_Name,
                        Height,
                        Weight,
                        Life_Cover,
                        medical_History,
                        Employeement_Status,
                        // userEmail: userData.email,
                        // filename,
                        // path,
                        // serviceImage,
                    }),
                }
            );

            console.log('Response status:', response.status);
            console.log('Response data:', await response.json());

            if (response.status === 200) {
                Alert.alert('Data Submitted', 'Your data has been submitted successfully!');
            } else {
                // console.log('Error Response:', response);
                // Alert.alert('Error', 'Failed to submit data. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*',
            });

            if (result.type === 'success') {
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 20000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start(() => {
                    animatedValue.setValue(0);
                });
            }
        } catch (err) {
            console.error('Error picking a file', err);
        }
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setSelectedImage(result.uri);
            }
        } catch (error) {
            console.error('Error picking an image', error);
        }
    };

    useEffect(() => {
        if (Employeement_Status) {
            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 20000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ).start();
        }
    }, [Employeement_Status]);

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <CollapsibleSection
                        title="Customer Details"
                        isOpen={isOpenCustomerDetails}
                        onToggle={toggleCustomerDetails}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Pan Card"
                            value={Pan_Card}
                            onChangeText={(text) => setPan_Card(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Aadhar Card"
                            value={Adhar_Card}
                            onChangeText={(text) => setAdhar_Card(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cancelled Cheque"
                            value={Cancelled_cheque}
                            onChangeText={(text) => setCancelled_cheque(text)}
                        />
                        <ModalDropdown
                            options={['Self Employed', 'Salaried']}
                            onSelect={(index, value) => setEmployeement_Status(value)}
                            defaultValue="Select Employment Status"
                            style={styles.dropdown}
                            textStyle={{ fontSize: 16, color: 'black' }}
                            dropdownStyle={{ width: '80%', borderRadius: 8, zIndex: 100 }}
                            dropdownTextStyle={{ fontSize: 16 }}
                            dropdownIconStyle={styles.dropdownIcon}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleFilePick}>
                            <Animated.Text
                                style={[
                                    styles.buttonText,
                                    {
                                        marginLeft: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '-200%'],
                                        }),
                                    },
                                ]}
                            >
                                {Employeement_Status === 'Self Employed'
                                    ? 'Upload Last 2 years ITR with Computation of Income'
                                    : Employeement_Status === 'Salaried'
                                        ? 'Upload Last 3 Months Salary'
                                        : 'Upload Photograph'}
                            </Animated.Text>
                        </TouchableOpacity>
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Personal Information"
                        isOpen={isOpenPersonalInfo}
                        onToggle={togglePersonalInfo}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile No"
                            value={mobile_nu}
                            onChangeText={(text) => setmobile_nu(text)}
                            required
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Alternate Number"
                            value={Alternative_Mobile}
                            onChangeText={(text) => setAlternative_Mobile(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mother Name"
                            value={Mother_Name}
                            onChangeText={(text) => setMother_Name(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Education"
                            value={Last_Education}
                            onChangeText={(text) => setLast_Education(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mail ID"
                            value={Email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Marital Status"
                            value={Married_Status}
                            onChangeText={(text) => setMarried_Status(text)}
                        />
                        <ModalDropdown
                            options={lifeStageOptions}
                            onSelect={(index, value) => setLifeStage(value)}
                            defaultValue="Select Life Stage"
                            style={styles.dropdown}
                            textStyle={{ fontSize: 16 }}
                            dropdownStyle={{ width: '80%', borderRadius: 8 }}
                            dropdownTextStyle={{ fontSize: 16 }}
                            dropdownIconStyle={styles.dropdownIcon}
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Nominee Information"
                        isOpen={isOpenNomineeInfo}
                        onToggle={toggleNomineeInfo}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Nominee Name"
                            value={Nominee_Name}
                            onChangeText={(text) => setNominee_Name(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nominee DOB"
                            value={Nominee_DOB}
                            onChangeText={(text) => setNominee_DOB(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nominee Relationship"
                            value={Nominee_Ralationship}
                            onChangeText={(text) => setNominee_Ralationship(text)}
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Work Details"
                        isOpen={isOpenWorkDetails}
                        onToggle={toggleWorkDetails}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Company Name"
                            value={Company_Name}
                            onChangeText={(text) => setCompany_Name(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Annual Income"
                            value={Annual_Income}
                            onChangeText={(text) => setAnnual_Income(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Industry Name"
                            value={Industry_Name}
                            onChangeText={(text) => setIndustry_Name(text)}
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Physical Information"
                        isOpen={isOpenPhysicalInfo}
                        onToggle={togglePhysicalInfo}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Height"
                            value={Height}
                            onChangeText={(text) => setHeight(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Weight"
                            value={Weight}
                            onChangeText={(text) => setWeight(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Life Cover"
                            value={Life_Cover}
                            onChangeText={(text) => setLife_Cover(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Physical Challenges (Diabetes, BP, Medical History)"
                            value={medical_History}
                            onChangeText={(text) => setmedical_History(text)}
                            multiline
                        />
                    </CollapsibleSection>

                    <TouchableOpacity style={styles.saveAndNextButton} onPress={submitData}>
                        <Text style={styles.buttonText}>Save & Next</Text>
                    </TouchableOpacity>

                    {selectedImage && (
                        <View style={styles.previewContainer}>
                            <Text style={styles.previewText}>Uploaded Image Preview:</Text>
                            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                        </View>
                    )}
                </View>
            </ScrollView>
            <Footer />
        </NativeBaseProvider>
    );
};
const styles = {
    scrollContainer: {
        flexGrow: 1,
    },
    mainform: {
        width: "100%",
        marginLeft: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#daa520',
    },
    input: {
        height: 40,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '90%', // Set the width to 80%
        borderRadius: 8,
        backgroundColor: 'white',

    },
    dropdown: {
        height: 50,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '90%', // Set the width to 80%
        borderRadius: 8,
        backgroundColor: 'white',
        color: 'white',
    },
    dropdownIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '90%', // Set the width to 80%
        overflow: 'hidden',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    saveAndNextButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '90%', // Set the width to 80%
        overflow: 'hidden',
    },
    collapsibleContainer: {
        marginBottom: 16,
        width: '100%',
        marginLeft: 35,
    },
    collapsibleHeader: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 8,
        height: 50,
        width: '90%',
        alignItems: 'center',
    },
    collapsibleHeaderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    collapsibleContent: {
        marginTop: 8,
    },
    previewContainer: {
        alignItems: 'center',
        marginTop: 20,
        // Add any additional styles for the preview container here
    },
    previewText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        // Add any additional styles for the preview text here
    },
    previewImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        // Add any additional styles for the preview image here
    },
    footerText: {
        color: 'white',
    },

}
export default CustomerDetailsScreen;