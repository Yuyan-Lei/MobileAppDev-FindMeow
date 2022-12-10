import ButtonToggleGroup from './ButtonGroupInitial';
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";


export function ButtonGroup({ selections, selectedValue, setSelectedValue, marginHorizontal }) {

    return (
    <View style={[styles.container, {marginHorizontal}]}>
        <View style={{ flex: 1 }}>
            <ButtonToggleGroup
                values={selections}
                value={selectedValue}
                onSelect={setSelectedValue}

                highlightBackgroundColor={Colors.orange}
                highlightTextColor={Colors.white}

                inactiveBackgroundColor={Colors.white}
                inactiveTextColor={Colors.gray}
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
  