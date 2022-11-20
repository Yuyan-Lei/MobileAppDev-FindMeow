import { View, Text, Pressable } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
export function CatCard({ cat }) {
  return (
    <View
      style={{
        flex: 1,
        margin: 8,
        justifyContent: "center",
        borderRadius: 8,
      }}
    >
      <Pressable onPress={() => rootStackNavigate("CatInformation")}>
        <View
          style={{ height: 120, backgroundColor: "gray", borderRadius: 8 }}
        ></View>

        <View
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "white",
            borderRadius: 8,
            padding: 4,
          }}
        >
          <View style={{ marginHorizontal: 4 }}>
            <Text style={{ color: "orange" }}>${cat.price}</Text>
          </View>
        </View>

        <View style={{ margin: 12 }}>
          <Text style={{ fontSize: 16 }}>{cat.name}</Text>
          <Text style={{ fontSize: 12, color: "gray" }}>
            {cat.sex}, {cat.month} {cat.month === 1 ? "month" : "months"}
          </Text>
          <Text style={{ fontSize: 12 }}>{cat.location}</Text>
        </View>
      </Pressable>

      <View style={{ position: "absolute", top: 0, left: 0 }}>
        <HeartButton />
      </View>
    </View>
  );
}
