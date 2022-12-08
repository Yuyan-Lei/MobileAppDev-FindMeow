import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function CatBreedSelector(props) {
  const breed = props.hideAllOption
    ? ALL_BREEDS
    : [{ key: "All", value: "All" }, ...ALL_BREEDS];

  return (
    <SelectList
      setSelected={props.setSelectedBreed}
      data={breed}
      save="value"
      placeholder="Select Type"
      boxStyles={{
        backgroundColor: Colors.white,
        borderWidth: 0,
        height: 50,
      }}
      fontFamily={FontFamily.normal}
      defaultOption={{ key: props.selectedBreed, value: props.selectedBreed }}
      inputStyles={{
        marginLeft: -10,
        color: Colors.black,
        marginTop: 4,
        fontSize: FontSizes.text,
      }}
    />
  );
}
