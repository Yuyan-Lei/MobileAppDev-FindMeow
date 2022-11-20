import { View, Text, Pressable, StyleSheet } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { LocationText } from "../texts/LocationText";
export function CatCard({ cat }) {
  return (
    <View
      style={{
        margin: 8,
        justifyContent: "center",
      }}
    >
      <Pressable onPress={() => rootStackNavigate("CatInformation")}>
        <View
          style={{
            aspectRatio: 0.834,
            backgroundColor: "gray",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <View
            style={{ padding: 12, backgroundColor: "#F9F9F9", borderRadius: 5 }}
          >
            {/* cat name */}
            <Text style={[styles.fontStyle, styles.catNameStyle]}>
              {cat.name}
            </Text>

            {/* cat details */}
            <Text style={[styles.fontStyle, styles.catDetailStyle]}>
              {cat.sex}, {cat.month} {cat.month === 1 ? "month" : "months"}
            </Text>

            {/* cat location */}
            <LocationText
              textStyle={[styles.fontStyle, styles.locationStyle]}
              locationIconColor={styles.locationIconStyle.color}
            >
              {cat.location}
            </LocationText>
          </View>
        </View>
      </Pressable>

      {/* floating components */}
      <View style={{ position: "absolute", top: 0, left: 0 }}>
        <HeartButton />
      </View>

      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          padding: 4,
          backgroundColor: "#F9F9F9",
          borderRadius: 10,
          shadowColor: "rgba(245, 145, 86, 0.19)",
        }}
      >
        <View style={{ marginHorizontal: 4 }}>
          <Text style={{ color: "orange" }}>${cat.price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  fontStyle: {
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  catNameStyle: {
    color: "#2E2525",
    fontSize: 14,
  },
  catDetailStyle: {
    color: "rgba(46, 37, 37, 0.67)",
    fontSize: 12,
    fontWeight: "400",
  },
  locationStyle: {
    fontSize: 10,
    color: "#2E2525",
  },
  locationIconStyle: {
    color: "#F59156",
  },
});
