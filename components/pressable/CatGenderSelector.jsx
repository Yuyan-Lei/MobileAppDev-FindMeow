import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function CatGenderSelector(props) {
  const ALL_GENDER = [
    { key: "Female", value: "Female" },
    { key: "Male", value: "Male" },
  ];

  const gender = props.hideAllOption
    ? ALL_GENDER
    : [{ key: "All", value: "All" }, ...ALL_GENDER];

  return (
    <SelectList
      setSelected={props.setSelectedGender}
      data={gender}
      save="value"
      placeholder="Select Gender"
      boxStyles={{
        backgroundColor: Colors.white,
        borderWidth: 0,
        height: 50,
      }}
      fontFamily={FontFamily.normal}
      defaultOption={{ key: props.selectedGender, value: props.selectedGender }}
      inputStyles={{
        marginLeft: -10,
        color: Colors.black,
        marginTop: 4,
        fontSize: FontSizes.text,
      }}
    />
  );
}
