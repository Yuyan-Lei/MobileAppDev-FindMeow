import ButtonToggleGroup from './ButtonGroupInitial';
import { useState } from  'react';
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";


export function ButtonGroup({ selections, selectedValue, setSelectedValue }) {

    return (
    <View style={styles.container}>
        <View style={{ flex: 1 }}>
            <ButtonToggleGroup
                values={selections}
                value={selectedValue}
                onSelect={setSelectedValue}

                highlightBackgroundColor={Colors.orange}
                highlightTextColor={Colors.white}

                inactiveBackgroundColor={Colors.unselectedButton}
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
});
  