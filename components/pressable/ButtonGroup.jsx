import ButtonToggleGroup from 'react-native-button-toggle-group';
import { useState } from  'react';
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";


export function ButtonGroup({ selections }) {
    const [value, setValue] = useState('Newer Post');

    return (
    <View style={styles.container}>
        <View style={{ flex: 1 }}>
            <ButtonToggleGroup
                values={selections}
                value={value}
                onSelect={val => setValue(val)}

                highlightBackgroundColor={Colors.orange}
                highlightTextColor={Colors.white}

                inactiveBackgroundColor={'transparent'}
                inactiveTextColor={Colors.gray}

                style={styles.baseStyle}
                textStyle={styles.text}
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      margin: 20,
    },
    text: {
        fontFamily: FontFamily.bold,
        fontSize: FontSizes.medium,
    },
    baseStyle:{
        borderWidth: 1.2,
        borderColor: Colors.orange,
        borderRadius: 5,
        height: 40,
    },
});
  