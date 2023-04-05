import React, { useState} from "react";
import { Image, View, Text, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import { ScrollView } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import modalStyles from "./utils/modalStyles";
import GestureRecognizer from 'react-native-swipe-gestures';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import OSIOptionBox from "./OSIOptionBox";
import DropDownPicker from 'react-native-dropdown-picker';

const ChangeHowTheySeeYouModal = (props) => {
    const slideUpDownIcon = useIcon("slideUpDownIcon");
    const toggleOffIcon = useIcon("toggleOffIcon");
    const toggleOnIcon = useIcon("toggleOnIcon");

    const [isToggledOn, setToggledOn] = useState(false);
    const toggleIcon = isToggledOn ? toggleOnIcon : toggleOffIcon;

    const isModalVisible = props.is2ndModalVisible;
    //const setModalVisible = props.set2ndModalVisible;

    const [isOSISelected, setIsOSISelected] = useState([
        {id : 1, value:"openToChat", indicator: "openToChat", name: "Open To Chat", selected: true},
        {id : 2, value: "idle", indicator: "idle", name: "Be Right Back", selected: false},
        {id : 3, value: "doNotDisturb", indicator: "doNotDisturb", name: "Do Not Disturb", selected: false},
        {id : 4, value: "invisible", indicator: "invisible", name: "Invisible", selected: false},
    ]);

    const onRadioBtnClick = (item) => {
        let updatedState = isOSISelected.map((isSelectedItem) =>
          isSelectedItem.id === item.id
            ? { ...isSelectedItem, selected: true }
            : { ...isSelectedItem, selected: false }
        );
        setIsOSISelected(updatedState);
    };

    const [customMessageValue, onChangeText] = React.useState('');
    
    const [openDropdown, setOpenDropdown] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownItems, setDropdownItems] = useState([
        {label: '1 hour', value: '1 hour'},
        {label: '30 minutes', value: '30 minutes'},
        {label: '6 hour', value: '6 hours'},
        {label: '12 hours', value: '12 hours'},
        {label: '1 day', value: '1 day'},
        {label: 'Never', value: 'Never'},
        {label: 'Custom', value: 'Custom'},
    ]);

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}
        >
            <View style={modalStyles.modalStatusContainer}>
                <GestureRecognizer
                    onSwipeDown={ () =>
                        props.set1stModalVisible(false)
                    }
                >
                    <Overlay 
                        isVisible={isModalVisible} 
                        onBackdropPress={() => {
                            props.set1stModalVisible(false);
                        }} 
                        children={Modal} 
                        overlayStyle={modalStyles.modalStatusContainer}
                        animationType="slide"
                    >
                        <Pressable onPress={() => props.set1stModalVisible(false)}>
                            <View style={modalStyles.modalSlideUpDownContainer}>
                                <Image 
                                    source={slideUpDownIcon}
                                    style={modalStyles.modalSlideUpDownButton}
                                />
                            </View>
                        </Pressable>

                        
                        <View>
                            <Text style={modalStyles.modalHeaderText}>Your Status</Text>
                            <Text style={modalStyles.modalHeaderSubtext}>for FirstName LastName</Text>


                            {isOSISelected.map((item) => 
                                <OSIOptionBox value={item.value} indicator={item.indicator} name={item.name} selected={item.selected} key={item.id} onPress={() => onRadioBtnClick(item)}/>
                            )}                         

                            <View>
                                <View style={modalStyles.modalSubheaderTextContainer}>
                                    <Text style={modalStyles.modalSubheaderText}>Set Custom Messsage</Text>
                                    <Text style={modalStyles.modalSubheaderNoteText}>(optional)</Text>
                                </View>
                                
                                <View style={modalStyles.modalTextInputContainer}>
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={1}
                                        maxLength={40}
                                        onChangeText={text => onChangeText(text)}
                                        value={customMessageValue}
                                        style={{padding: 5}}
                                    />
                                </View>
                            </View>
                            
                            <View style={modalStyles.modalSubheaderTextContainer}>
                                <Text style={modalStyles.modalSubheaderText}>Clear After</Text>
                                
                                
                             
                               
                            </View>
                            <DropDownPicker
                                    open={openDropdown}
                                    value={dropdownValue}
                                    items={dropdownItems}
                                    setOpen={setOpenDropdown}
                                    setValue={setDropdownValue}
                                    setItems={setDropdownItems}
                                />
                            <TouchableOpacity onPress={() => setToggledOn(!isToggledOn)}>
                                <View style={modalStyles.modalSubheaderTextContainer}>
                                    <Text style={modalStyles.modalSubheaderSubtext}>Display duration of status to others?</Text>
                                    <Image 
                                        source={toggleIcon}
                                        style={modalStyles.modalToggleIcon}
                                    />  
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => props.set1stModalVisible(false)}
                                activeOpacity={0.5}
                            >
                                <View style={modalStyles.modalSaveButtonContainer}>
                                    <Text style={modalStyles.modalSaveButtonText}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    
                    </Overlay>
                </GestureRecognizer>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default ChangeHowTheySeeYouModal;
