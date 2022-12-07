import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { Colors } from "../styles/Colors";

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
      fontFamily="Poppins"
      defaultOption={{ key: props.selectedBreed, value: props.selectedBreed }}
      inputStyles={{ marginLeft: -10 }}
    />
  );
}
