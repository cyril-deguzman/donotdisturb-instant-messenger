import React, { useState }  from "react";
import { Image, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"; 

import useIcon from "../hooks/useIcon";
import audienceBoxStyles from "./utils/audienceBoxStyles";


const AudienceBox = (props) => {
    const editIcon = useIcon("editIcon");
    const trashIcon = useIcon("trashIcon");
    const openIcon = useIcon("openIcon");
    const closeIcon = useIcon("closeIcon");

    const [isStatusMessageVisible, setStatusMessageVisible] = useState(false);
    const [isExcludeContainerVisible, setExcludeContainerVisible] = useState(true);
    const [isExcludePersonVisible, setExcludePersonVisible] = useState(false);

    const [isExcludeMorePersonVisible, setExcludeMorePersonVisible] = useState(true);

    const openCloseIcon = isExcludePersonVisible ? openIcon : closeIcon;

    return (
        <View style={audienceBoxStyles.audienceBoxContainer}>
            <View>
                <Image 
                    source={props.audienceIndicator}
                    style={audienceBoxStyles.audienceBoxIndicator}
                />
            </View>
            <View style={audienceBoxStyles.audienceBoxTextContainer}>
                {isStatusMessageVisible ? (
                    <Text style={audienceBoxStyles.audienceBoxStatusMessageText}>"Finals snz ;-;"</Text>
                ): null}
                
                <Text style={audienceBoxStyles.audienceBoxAudienceNameText}>DLSU Friends</Text>

                <TouchableWithoutFeedback onPress={() => setExcludePersonVisible(!isExcludePersonVisible)}>
                    <View>
                        <Text style={audienceBoxStyles.audienceBoxNameListText}>Status for: Leana Rebong, Rayden Lizan, and 10 more</Text>
                        
                        {isExcludeContainerVisible ? (
                            <View style={audienceBoxStyles.audienceBoxExcludeHeaderContainer}>
                                <Image
                                    source={openCloseIcon}
                                    style={audienceBoxStyles.audienceBoxExcludeOpenCloseIcon}
                                />

                                <Text style={audienceBoxStyles.audienceBoxExcludeHeaderText}>Excluding</Text>
                                
                            </View>
                        ) : null}
                    </View>
                </TouchableWithoutFeedback>

                {isExcludeContainerVisible ? (
                    <View style={audienceBoxStyles.audienceBoxExcludeContainer}>
                        {isExcludePersonVisible ? (
                            <View style={audienceBoxStyles.audienceBoxExlcudePersonContainer}>
                                <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person A</Text>
                                <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person B</Text>
                                <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person C</Text>

                                {isExcludeMorePersonVisible ? (
                                    <TouchableWithoutFeedback onPress={() => setExcludeMorePersonVisible(!isExcludeMorePersonVisible)}>
                                        <Text style={audienceBoxStyles.audienceBoxExcludeSeeMoreLessText}>See 4 more</Text>
                                    </TouchableWithoutFeedback>
                                ): (
                                    <View>
                                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person A</Text>
                                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person B</Text>
                                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person C</Text>
                                        <TouchableWithoutFeedback onPress={() => setExcludeMorePersonVisible(!isExcludeMorePersonVisible)}>
                                            <Text style={audienceBoxStyles.audienceBoxExcludeSeeMoreLessText}>See Less</Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )}
                                
                                
                            </View>
                        ): null}
                        
                    </View>
                ): null}

                <Text style={audienceBoxStyles.audienceBoxClearStatusText}>Status will clear after tomorrow 8:30 PM</Text>
            </View>
            <View style={audienceBoxStyles.audienceBoxIconsContainer}>
                <TouchableOpacity>
                    <Image
                        source={editIcon}
                        style={audienceBoxStyles.audienceBoxEditIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image 
                        source={trashIcon}
                        style={audienceBoxStyles.audienceBoxTrashIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>

    )
};

export default AudienceBox;



