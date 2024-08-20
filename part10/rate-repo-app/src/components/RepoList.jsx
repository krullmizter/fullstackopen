import React, { useState, useMemo } from "react";
import { View, FlatList, StyleSheet, TextInput, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";
import RepoItem from "./RepoItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchInput: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepoList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading } = useRepositories(
    sortBy,
    orderDirection,
    debouncedSearchKeyword
  );

  const handleRepoPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const renderHeader = useMemo(
    () => (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <Picker
          selectedValue={`${sortBy},${orderDirection}`}
          onValueChange={(value) => {
            const [newSortBy, newOrderDirection] = value.split(",");
            setSortBy(newSortBy);
            setOrderDirection(newOrderDirection);
          }}
        >
          <Picker.Item label="Latest repositories" value="CREATED_AT,DESC" />
          <Picker.Item
            label="Highest rated repositories"
            value="RATING_AVERAGE,DESC"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="RATING_AVERAGE,ASC"
          />
        </Picker>
      </View>
    ),
    [searchKeyword, sortBy, orderDirection]
  );

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepoPress(item.id)}>
          <RepoItem repository={item} />
        </Pressable>
      )}
    />
  );
};

export default RepoList;
