import { SelectList } from "react-native-dropdown-select-list";

export default function CatBreedSelector(props) {
    const breed = [
        { key: "All", value: "All" },
        { key: "Siamese", value: "Siamese" },
        { key: "Maine-Coon", value: "Maine-Coon" },
        { key: "British-Shorthair", value: "British-Shorthair" },
        { key: "Persian", value: "Persian" },
        { key: "Ragdoll", value: "Ragdoll" },
        { key: "Sphynx", value: "Sphynx" },
        { key: "Birman", value: "Birman" },
        { key: "American-Shorthair", value: "American-Shorthair" },
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