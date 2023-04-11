import React, { useState } from "react";
import { Image, View, Text, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import useIcon from "../hooks/useIcon";
import { Overlay } from "react-native-elements";
import modalStyles from "./utils/modalStyles";
import GestureRecognizer from 'react-native-swipe-gestures';
import OSIOptionBox from "./OSIOptionBox";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalDropdown from 'react-native-modal-dropdown';

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
    const [dropdownValue, setDropdownValue] = useState("1 hour");
    const [dropdownItems, setDropdownItems] = useState([
        {label: '1 hour', value: '1 hour', labelStyle: { color: "#4F457C" },},
        {label: '30 minutes', value: '30 minutes', labelStyle: { color: "#4F457C" },},
        {label: '6 hours', value: '6 hours', labelStyle: { color: "#4F457C" },},
        {label: '12 hours', value: '12 hours', labelStyle: { color: "#4F457C" },},
        {label: '1 day', value: '1 day', labelStyle: { color: "#4F457C" },},
        {label: 'Never', value: 'Never', labelStyle: { color: "#4F457C" },},
        {label: 'Custom', value: 'Custom', labelStyle: { color: "#4F457C" },},
    ]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        //setDropdownValue("3hours");
        
        const customDuration = date.getHours().toString() + " hours and " + date.getMinutes().toString() + " minutes";

        //setDropdownValue(date);
        setDropdownItems([
            {label: customDuration, value: customDuration, labelStyle: { color: "#4F457C" },},
            {label: '1 hour', value: '1 hour', labelStyle: { color: "#4F457C" },},
            {label: '30 minutes', value: '30 minutes', labelStyle: { color: "#4F457C" },},
            {label: '6 hours', value: '6 hours', labelStyle: { color: "#4F457C" },},
            {label: '12 hours', value: '12 hours', labelStyle: { color: "#4F457C" },},
            {label: '1 day', value: '1 day', labelStyle: { color: "#4F457C" },},
            {label: 'Never', value: 'Never', labelStyle: { color: "#4F457C" },},
            {label: 'Custom', value: 'Custom', labelStyle: { color: "#4F457C" },},
        ]);

        setDropdownValue(customDuration);

        hideDatePicker();
      };

    return (
        
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
                        backdropStyle={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    >
                        <TouchableWithoutFeedback onPress={() => props.set1stModalVisible(false)}>
                            <View style={modalStyles.modalSlideUpDownContainer}>
                                <Image 
                                    source={slideUpDownIcon}
                                    style={modalStyles.modalSlideUpDownButton}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback
                            onPress={() => {Keyboard.dismiss(); setOpenDropdown(false);}}
                            accessible={false}
                        >
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
                                            style={{padding: 8}}
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
                                    dropDownDirection="TOP"
                                    selectedItemContainerStyle={{
                                        backgroundColor: "rgba(217, 217, 217, 0.5)"
                                    }}
                                    selectedItemLabelStyle={{
                                        fontWeight: "600"
                                    }}
                                    style={{backgroundColor: "transparent"}}
                                    onChangeValue={() => { dropdownValue == "Custom" ? showDatePicker() : hideDatePicker }}
                                />
                                
                                {isDatePickerVisible ? (
                                    <View>
                                         <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="time"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                            is24Hour={true}
                                        />
                                    </View>
                                ): null}
                                    
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
                                    style={modalStyles.modalSaveButtonContainer}
                                >
                                    <Text style={modalStyles.modalSaveButtonText}>Save</Text>
                                    
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </Overlay>
                </GestureRecognizer>
            </View>

    );
};

export default ChangeHowTheySeeYouModal;
