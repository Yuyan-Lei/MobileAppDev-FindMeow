import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "./allBreeds";

export default function CatBreedSelector(props) {
    const breed = props.hideAllOption ? ALL_BREEDS : [
        { key: "All", value: "All" },
        ...ALL_BREEDS,
    ];

  return (
    <SelectList
      setSelected={props.setSelectedBreed}
      data={breed}
      save="value"
      placeholder="Select Type"
      boxStyles={{
        backgroundColor: "white",
        borderWidth: 0
      }}
      defaultOption={{ key: props.selectedBreed, value: props.selectedBreed }}
    />
  );
};